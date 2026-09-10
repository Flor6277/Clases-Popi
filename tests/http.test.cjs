const assert = require("node:assert/strict");
const { test } = require("node:test");

const base = process.env.SECURITY_TEST_URL;
const routes = ["/", "/clases-matematica-online/", "/clases-matematica-secundaria-san-juan/", "/ingreso-preuniversitarios-unsj/", "/ingreso-universitario-matematica/"];

test("production HTTP: routes, SEO, assets, security headers and API abuse", { skip: !base }, async () => {
    const origin = new URL(base).origin;
    assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname), "Security requests must stay on localhost");
    const get = (pathname, options = {}) => fetch(origin + pathname, { ...options, signal: AbortSignal.timeout(10000) });
    const checkHeaders = (response) => {
        assert.equal(response.headers.get("x-content-type-options"), "nosniff");
        assert.equal(response.headers.get("x-frame-options"), "DENY");
        assert.equal(response.headers.get("referrer-policy"), "strict-origin");
        const csp = response.headers.get("content-security-policy");
        assert.ok(csp.includes("frame-ancestors 'none'"));
        assert.ok(!csp.includes("unsafe-eval"));
        assert.equal(response.headers.get("x-powered-by"), null);
    };

    for (const route of routes) {
        const response = await get(route);
        assert.equal(response.status, 200, route);
        checkHeaders(response);
        const html = await response.text();
        assert.match(html, /<html[^>]+lang="es-AR"/);
        assert.match(html, /rel="canonical"[^>]+href="https:\/\/popiclases\.vercel\.app\//);
        assert.ok(!html.includes("http://localhost"));
        assert.ok(!html.includes("node:crypto"));
        const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
        assert.ok(ld.length >= 1);
        for (const [, json] of ld) assert.ok(JSON.parse(json)["@context"]);
        for (const [anchor] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
            assert.match(anchor, /rel="noopener noreferrer"/);
        }
        for (const [, src] of html.matchAll(/<script[^>]+src="([^"]+)"/g)) {
            if (src.startsWith("/")) assert.equal((await get(src)).status, 200);
        }
    }
    const sitemap = await (await get("/sitemap.xml")).text();
    for (const route of routes) assert.ok(sitemap.includes(`https://popiclases.vercel.app${route}`));
    assert.ok(!sitemap.includes("/api/"));
    const robots = await (await get("/robots.txt")).text();
    assert.ok(robots.includes("https://popiclases.vercel.app/sitemap.xml"));
    for (const pathname of ["/logo-popi.png", "/perfil.webp", "/favicon.ico", "/opengraph-image/"]) {
        const response = await get(pathname);
        assert.equal(response.status, 200, pathname);
        assert.match(response.headers.get("content-type"), /^image\//);
    }
    for (const pathname of ["/.env", "/.env.production", "/.git/config", "/README.md", "/package.json", "/src/config/site.ts"]) assert.equal((await get(pathname)).status, 404, pathname);

    for (const pathname of ["/logo-popi.png", "/perfil.webp"]) {
        const response = await get(`/_next/image?url=${encodeURIComponent(pathname)}&w=640&q=75`);
        assert.equal(response.status, 200, pathname);
        assert.match(response.headers.get("content-type"), /^image\//);
    }
    for (const pathname of ["/api/analytics/", "/perfil.webp?extra=1", "https://example.com/photo.jpg", "http://127.0.0.1/private"]) assert.equal((await get(`/_next/image?url=${encodeURIComponent(pathname)}&w=640&q=75`)).status, 400);

    const api = "/api/analytics/";
    for (const method of ["GET", "HEAD", "PUT", "PATCH", "DELETE"]) {
        const response = await get(api, { method });
        assert.equal(response.status, 405, method);
        assert.equal(response.headers.get("cache-control"), "no-store");
    }
    const options = await get(api, { method: "OPTIONS" });
    assert.equal(options.status, 204);
    assert.equal(options.headers.get("access-control-allow-origin"), null);
    assert.ok(options.headers.get("allow").includes("POST"));
    const valid = { event: "whatsapp_click", source: "hero", pathname: "/" };
    const cases = [
        [JSON.stringify(valid), {}, 204],
        [JSON.stringify({ event: "web_vital_cls", pathname: "/", value: 0.01, rating: "good" }), {}, 204],
        ["", {}, 400], ["{", {}, 400], ["{}", {}, 400], ["null", {}, 400],
        [JSON.stringify({ ...valid, extra: "private" }), {}, 400],
        [JSON.stringify({ ...valid, event: "fake" }), {}, 400],
        [JSON.stringify({ ...valid, source: "x".repeat(101) }), {}, 400],
        [JSON.stringify({ ...valid, source: "<script>alert(1)</script>" }), {}, 400],
        [JSON.stringify({ ...valid, pathname: "/?email=private@example.test" }), {}, 400],
        ["x".repeat(2048), {}, 413],
        [JSON.stringify(valid), { "content-type": "text/plain" }, 415],
        [JSON.stringify(valid), { origin: "https://attacker.example" }, 403],
        [JSON.stringify(valid), { "sec-fetch-site": "cross-site" }, 403],
    ];
    for (const [body, headers, status] of cases) {
        const response = await get(api, { method: "POST", body, headers: { origin, "content-type": "application/json", ...headers } });
        assert.equal(response.status, status, `Expected ${status} for ${body.slice(0, 80)}`);
        assert.equal(await response.text(), "");
        assert.equal(response.headers.get("access-control-allow-origin"), null);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
        checkHeaders(response);
    }
    let limited = 0;
    for (let i = 0; i < 40; i++) {
        const response = await get(api, { method: "POST", body: "{}", headers: { origin, "content-type": "application/json" } });
        if (response.status === 429) {
            limited += 1;
            assert.ok(Number(response.headers.get("retry-after")) > 0);
        } else assert.equal(response.status, 400);
    }
    assert.ok(limited >= 10, "Repeated requests must be limited");
});
