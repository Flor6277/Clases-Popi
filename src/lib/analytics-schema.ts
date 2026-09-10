// Only public pages and fixed UI labels belong in analytics, never arbitrary URLs.
export const ANALYTICS_PATHS = [
    "/",
    "/clases-matematica-secundaria-san-juan/",
    "/ingreso-preuniversitarios-unsj/",
    "/ingreso-universitario-matematica/",
    "/clases-matematica-online/",
] as const;

const WHATSAPP_SOURCES = new Set([
    "hero",
    "navbar_desktop",
    "navbar_mobile",
    "floating_button",
    "footer",
    "contact_section",
    ...ANALYTICS_PATHS.slice(1).flatMap((path) => {
        const slug = path.slice(1, -1);
        return [`service_${slug}`, `service_cta_${slug}`];
    }),
]);

export type VitalEvent = "web_vital_cls" | "web_vital_inp" | "web_vital_lcp";
export type VitalRating = "good" | "needs-improvement" | "poor";

export type AnalyticsPayload =
    | { event: "whatsapp_click"; source: string; pathname: string }
    | { event: VitalEvent; pathname: string; value: number; rating: VitalRating };

export function getAnalyticsPath(pathname: string): string | null {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return ANALYTICS_PATHS.find((allowed) => allowed === path) ?? null;
}

export function parseAnalyticsPayload(input: unknown): AnalyticsPayload | null {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
        return null;
    }

    const data = input as Record<string, unknown>;
    if (
        typeof data.pathname !== "string" ||
        data.pathname.length > 100 ||
        !ANALYTICS_PATHS.some((path) => path === data.pathname)
    ) {
        return null;
    }

    if (data.event === "whatsapp_click") {
        if (
            Object.keys(data).some((key) => !["event", "source", "pathname"].includes(key)) ||
            typeof data.source !== "string" ||
            data.source.length > 100 ||
            !WHATSAPP_SOURCES.has(data.source)
        ) {
            return null;
        }
        return { event: data.event, source: data.source, pathname: data.pathname };
    }

    if (
        (data.event !== "web_vital_cls" &&
            data.event !== "web_vital_inp" &&
            data.event !== "web_vital_lcp") ||
        Object.keys(data).some((key) => !["event", "pathname", "value", "rating"].includes(key)) ||
        typeof data.value !== "number" ||
        !Number.isFinite(data.value) ||
        data.value < 0 ||
        data.value > (data.event === "web_vital_cls" ? 100 : 3_600_000) ||
        (data.rating !== "good" && data.rating !== "needs-improvement" && data.rating !== "poor")
    ) {
        return null;
    }

    return {
        event: data.event,
        pathname: data.pathname,
        value: data.value,
        rating: data.rating,
    };
}
