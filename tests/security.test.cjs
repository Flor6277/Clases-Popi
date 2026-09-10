const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

function replaceProperty(t, object, key, value) {
    const descriptor = Object.getOwnPropertyDescriptor(object, key);
    Object.defineProperty(object, key, { value, writable: true, configurable: true, enumerable: true });
    t.after(() => {
        if (descriptor) Object.defineProperty(object, key, descriptor);
        else delete object[key];
    });
}

// Test the actual TS modules using the project's existing compiler, no new runner.
function createLoader(mocks = {}) {
    const cache = new Map();
    function load(relative) {
        const file = path.resolve(root, relative);
        if (cache.has(file)) return cache.get(file).exports;
        const module = { exports: {} };
        cache.set(file, module);
        const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
            fileName: file,
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
        }).outputText;
        const nativeRequire = createRequire(file);
        const localRequire = (id) => {
            if (Object.hasOwn(mocks, id)) return mocks[id];
            if (id.startsWith("@/") || id.startsWith(".")) {
                const target = id.startsWith("@/") ? path.join(root, "src", id.slice(2)) : path.resolve(path.dirname(file), id);
                return load(fs.existsSync(target + ".ts") ? target + ".ts" : target + ".tsx");
            }
            return nativeRequire(id);
        };
        vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(localRequire, module, module.exports);
        return module.exports;
    }
    return load;
}

const valid = { event: "whatsapp_click", source: "hero", pathname: "/" };
const origin = "http://localhost:3100";
function request(body = JSON.stringify(valid), headers = {}) {
    return new Request(`${origin}/api/analytics/`, {
        method: "POST", body,
        headers: { origin, "content-type": "application/json", ...headers },
        ...(body instanceof ReadableStream ? { duplex: "half" } : {}),
    });
}

test("API: valid events have minimal logs and empty, uncacheable responses", async (t) => {
    const logs = [];
    t.mock.method(console, "info", (...args) => logs.push(args));
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    for (const payload of [valid, { event: "web_vital_lcp", pathname: "/", value: 1250, rating: "good" }]) {
        const response = await POST(request(JSON.stringify(payload)));
        assert.equal(response.status, 204);
        assert.equal(await response.text(), "");
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
        const [, logged] = logs.at(-1);
        assert.deepEqual(Object.keys(logged).sort(), [...Object.keys(payload), "timestamp"].sort());
    }
    assert.equal(logs.length, 2);
});

test("API: malformed, unexpected, HTML, deep and oversized inputs are rejected without logging", async (t) => {
    const logs = [];
    t.mock.method(console, "info", (...args) => logs.push(args));
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    const cases = [
        ["", 400], ["{", 400], ["null", 400], ["[]", 400], ["{}", 400],
        [JSON.stringify({ ...valid, secret: "must-not-be-logged" }), 400],
        [JSON.stringify({ ...valid, event: "login" }), 400],
        [JSON.stringify({ ...valid, source: "x".repeat(101) }), 400],
        [JSON.stringify({ ...valid, source: "</script><script>alert(1)</script>" }), 400],
        [JSON.stringify({ ...valid, pathname: "/?email=private@example.test" }), 400],
        [JSON.stringify({ ...valid, pathname: "/private@example.test/" }), 400],
        [JSON.stringify({ ...valid, pathname: 123 }), 400],
        [JSON.stringify({ event: "web_vital_lcp", pathname: "/", value: -1, rating: "poor" }), 400],
        [JSON.stringify({ event: "web_vital_lcp", pathname: "/", value: "100", rating: "good" }), 400],
        ['{"event":"web_vital_lcp","pathname":"/","value":1e999,"rating":"poor"}', 400],
        [JSON.stringify({ event: "web_vital_lcp", pathname: "/", value: 1, rating: "unknown" }), 400],
        [JSON.stringify({ event: "web_vital_lcp", pathname: "/", value: 1, rating: "good", source: "id" }), 400],
        ["[".repeat(400) + "]".repeat(400), 400],
        [" ".repeat(1025), 413],
        [JSON.stringify({ ...valid, source: "é".repeat(500) }), 413],
    ];
    for (const [body, status] of cases) {
        const response = await POST(request(body));
        assert.equal(response.status, status, body.slice(0, 90));
        assert.equal(await response.text(), "");
    }
    assert.equal(logs.length, 0);
});

test("API: Origin, Fetch Metadata, media type and encoding are checked", async () => {
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    for (const [headers, status] of [
        [{ origin: "https://attacker.example" }, 403],
        [{ origin: "null" }, 403],
        [{ "sec-fetch-site": "cross-site" }, 403],
        [{ "sec-fetch-site": "same-site" }, 403],
        [{ "content-type": "text/plain" }, 415],
        [{ "content-type": "application/x-www-form-urlencoded" }, 415],
        [{ "content-type": "application/json; charset=utf-16" }, 415],
        [{ "content-encoding": "gzip" }, 415],
        [{ "content-length": "999999" }, 413],
    ]) assert.equal((await POST(request(JSON.stringify(valid), headers))).status, status);
    const noOrigin = request();
    noOrigin.headers.delete("origin");
    assert.equal((await POST(noOrigin)).status, 403);
});

test("API: a different internal Next hostname does not reject the real same-origin Host", async (t) => {
    t.mock.method(console, "info", () => {});
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    const req = request(JSON.stringify(valid), { host: "127.0.0.1:3100", origin: "http://127.0.0.1:3100" });
    assert.equal((await POST(req)).status, 204);
    const forged = request(JSON.stringify(valid), { host: "127.0.0.1:3100", origin: "https://evil.test", "x-forwarded-host": "evil.test" });
    assert.equal((await POST(forged)).status, 403);
});

test("API: actual stream bytes are bounded independently of Content-Length", async () => {
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    let cancelled = false;
    const stream = new ReadableStream({
        start(controller) { controller.enqueue(new Uint8Array(600)); controller.enqueue(new Uint8Array(600)); },
        cancel() { cancelled = true; },
    });
    assert.equal((await POST(request(stream, { "content-length": "20" }))).status, 413);
    assert.equal(cancelled, true);
});

test("API: a stalled body times out and cancels the stream", async () => {
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    let cancelled = false;
    const stream = new ReadableStream({ cancel() { cancelled = true; } });
    assert.equal((await POST(request(stream))).status, 408);
    assert.equal(cancelled, true);
});

test("API: repeated requests receive 429 and Retry-After, including invalid traffic", async (t) => {
    t.mock.method(console, "info", () => {});
    const { POST } = createLoader()("src/app/api/analytics/route.ts");
    for (let i = 0; i < 30; i++) assert.equal((await POST(request("{}"))).status, 400);
    const response = await POST(request());
    assert.equal(response.status, 429);
    assert.ok(Number(response.headers.get("retry-after")) > 0);
});

test("limiter: proxy trust, separate clients, global cap and window expiry", (t) => {
    replaceProperty(t, process.env, "VERCEL", "1");
    const { createAnalyticsRateLimiter } = createLoader()("src/lib/analytics-rate-limit.ts");
    const limit = createAnalyticsRateLimiter();
    const client = (i) => new Headers({ "x-vercel-forwarded-for": `192.0.2.${i}` });
    for (let i = 0; i < 30; i++) assert.equal(limit(client(1), 1000), 0);
    assert.equal(limit(client(1), 1000), 60);
    assert.equal(limit(client(2), 1000), 0);
    assert.equal(limit(client(1), 61000), 0);
    const globalLimit = createAnalyticsRateLimiter();
    for (let i = 0; i < 300; i++) assert.equal(globalLimit(client((i % 200) + 1), 1000), 0);
    assert.equal(globalLimit(client(250), 1000), 60);
    process.env.VERCEL = "0";
    const shared = createAnalyticsRateLimiter();
    for (let i = 0; i < 30; i++) assert.equal(shared(client(i + 1), 1000), 0);
    assert.equal(shared(client(250), 1000), 60);
});

test("schema covers every service page and real WhatsApp source", () => {
    const load = createLoader();
    const { ANALYTICS_PATHS, parseAnalyticsPayload, getAnalyticsPath } = load("src/lib/analytics-schema.ts");
    const { SERVICE_PAGES } = load("src/config/services.ts");
    assert.deepEqual([...ANALYTICS_PATHS].sort(), ["/", ...SERVICE_PAGES.map((s) => `/${s.slug}/`)].sort());
    for (const service of SERVICE_PAGES) {
        for (const prefix of ["service_", "service_cta_"]) assert.ok(parseAnalyticsPayload({ ...valid, source: prefix + service.slug, pathname: `/${service.slug}/` }));
    }
    for (const source of ["hero", "navbar_desktop", "navbar_mobile", "floating_button", "footer", "contact_section"]) assert.ok(parseAnalyticsPayload({ ...valid, source }));
    assert.equal(getAnalyticsPath("/clases-matematica-online"), "/clases-matematica-online/");
    assert.equal(getAnalyticsPath("/unknown?email=private"), null);
});

test("public config rejects script URLs, credentials, wrong hosts and production localhost", (t) => {
    replaceProperty(t, process.env, "NODE_ENV", "production");
    const { getPublicSiteUrl, getPublicSocialUrl, getGoogleAnalyticsId } = createLoader()("src/lib/public-config.ts");
    for (const url of ["javascript:alert(1)", "http://example.com", "https://user:pass@example.com", "https://example.com/?token=secret", "https://localhost"]) assert.equal(getPublicSiteUrl(url), "https://popiclases.vercel.app");
    assert.equal(getPublicSiteUrl("https://example.com/"), "https://example.com");
    for (const url of ["javascript:alert(1)", "https://instagram.com.evil.test/a", "https://user@instagram.com/a"]) assert.equal(getPublicSocialUrl(url, ["instagram.com"]), "");
    assert.equal(getPublicSocialUrl("https://instagram.com/popi", ["instagram.com"]), "https://instagram.com/popi");
    assert.equal(getGoogleAnalyticsId("G-TEST123456"), "G-TEST123456");
    assert.equal(getGoogleAnalyticsId("G-TEST123456');alert(1);//"), "");
});

test("JSON-LD cannot close a script element and still round-trips as JSON", () => {
    const { serializeJson } = createLoader()("src/lib/serialize-json.ts");
    const input = { name: '</script><script>alert("x")</script><!--', url: "https://example.com/<tag>" };
    const serialized = serializeJson(input);
    assert.equal(serialized.includes("<"), false);
    assert.deepEqual(JSON.parse(serialized), input);
});

test("client: beacon uses JSON; failure falls back once; GA failure and rejected fetch are contained", async (t) => {
    const beacons = [], fetches = [], gaCalls = [];
    replaceProperty(t, globalThis, "window", {
        location: { pathname: "/", href: `${origin}/?email=private@example.test#secret` },
        gtag: (...args) => gaCalls.push(args),
    });
    replaceProperty(t, globalThis, "navigator", { sendBeacon: (...args) => { beacons.push(args); return true; } });
    t.mock.method(globalThis, "fetch", (...args) => { fetches.push(args); return Promise.reject(new Error("offline")); });
    const { sendAnalyticsEvent } = createLoader()("src/lib/analytics.ts");
    sendAnalyticsEvent(valid);
    assert.equal(beacons[0][0], "/api/analytics/");
    assert.equal(beacons[0][1].type, "application/json");
    assert.deepEqual(JSON.parse(await beacons[0][1].text()), valid);
    assert.equal(fetches.length, 0);
    assert.ok(!JSON.stringify(gaCalls).includes("private@example.test"));
    assert.equal(gaCalls[0][2].page_referrer, "");
    navigator.sendBeacon = () => false;
    window.gtag = () => { throw new Error("GA blocked"); };
    assert.doesNotThrow(() => sendAnalyticsEvent(valid));
    await new Promise(setImmediate);
    assert.equal(fetches.length, 1);
    assert.equal(fetches[0][1].credentials, "omit");
    navigator.sendBeacon = () => { throw new Error("beacon blocked"); };
    assert.doesNotThrow(() => sendAnalyticsEvent(valid));
    await new Promise(setImmediate);
    assert.equal(fetches.length, 2);
    window.location.pathname = "/private@example.test/";
    sendAnalyticsEvent(valid);
    assert.equal(fetches.length, 2);
});

test("GA: absent/invalid IDs load nothing; configured init sends one sanitized page view", (t) => {
    replaceProperty(t, process.env, "NEXT_PUBLIC_GA_ID", "");
    function getScripts() {
        const Component = createLoader()("src/components/GoogleAnalytics.tsx").default;
        const scripts = [];
        function visit(node) {
            if (!node || typeof node !== "object") return;
            if (node.props?.id === "google-analytics" || node.props?.src) scripts.push(node.props);
            for (const child of [node.props?.children].flat()) visit(child);
        }
        visit(Component());
        return scripts;
    }
    assert.equal(getScripts().length, 0);
    process.env.NEXT_PUBLIC_GA_ID = "G-bad');alert(1)";
    assert.equal(getScripts().length, 0);
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123456";
    const scripts = getScripts();
    assert.equal(scripts.length, 2);
    const window = { location: { pathname: "/", search: "?email=private", hash: "#secret" } };
    vm.runInNewContext(scripts.find((s) => s.id).children, { window });
    const calls = window.dataLayer.map((args) => [...args]);
    const config = calls.find((args) => args[0] === "config")[2];
    assert.equal(config.send_page_view, false);
    assert.equal(config.allow_google_signals, false);
    assert.equal(config.allow_ad_personalization_signals, false);
    assert.equal(config.page_referrer, "");
    assert.equal(calls.filter((args) => args[0] === "event" && args[1] === "page_view").length, 1);
    assert.ok(!JSON.stringify(calls).includes("private"));
});

test("CSP: production excludes eval and unconfigured third parties; dev supports HMR", (t) => {
    replaceProperty(t, process.env, "NODE_ENV", "production");
    replaceProperty(t, process.env, "NEXT_PUBLIC_GA_ID", "");
    const loadConfig = () => createLoader()("next.config.ts").default;
    return (async () => {
        const policy = async () => (await loadConfig().headers())[0].headers.find((h) => h.key === "Content-Security-Policy").value;
        const prod = await policy();
        assert.ok(!prod.includes("unsafe-eval"));
        assert.ok(!prod.includes("googletagmanager"));
        assert.ok(prod.includes("frame-ancestors 'none'"));
        assert.ok(prod.includes("script-src-attr 'none'"));
        process.env.NEXT_PUBLIC_GA_ID = "G-TEST123456";
        assert.ok((await policy()).includes("https://www.googletagmanager.com"));
        process.env.NODE_ENV = "development";
        assert.ok((await policy()).includes("unsafe-eval"));
        assert.equal(loadConfig().images.localPatterns.length, 2);
        assert.deepEqual(loadConfig().images.remotePatterns, []);
    })();
});
