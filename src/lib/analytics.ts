import { SITE } from "@/config/site";
import { getAnalyticsPath, parseAnalyticsPayload, type AnalyticsPayload } from "./analytics-schema";

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function sendAnalyticsEvent(payload: AnalyticsPayload) {
    if (typeof window === "undefined") return;

    const pathname = getAnalyticsPath(window.location.pathname);
    const event = parseAnalyticsPayload({ ...payload, pathname });
    if (!event) return;

    const body = JSON.stringify(event);
    try {
        if (typeof window.gtag === "function") {
            window.gtag("event", event.event, {
                ...(event.event === "whatsapp_click"
                    ? { source: event.source }
                    : { value: event.value, rating: event.rating }),
                page_path: event.pathname,
                page_location: `${SITE.url}${event.pathname}`,
                page_referrer: "",
            });
        }
    } catch {
        // Optional analytics must not interfere with navigation or local metrics.
    }

    try {
        if (typeof navigator.sendBeacon === "function" &&
            navigator.sendBeacon("/api/analytics/", new Blob([body], { type: "application/json" }))) {
            return;
        }
    } catch {
        // A browser may refuse to queue a beacon. Try a bounded fetch once.
    }

    try {
        void fetch("/api/analytics/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            credentials: "omit",
            keepalive: true,
            signal: AbortSignal.timeout(5000),
        }).catch(() => undefined);
    } catch {
        // Unsupported APIs and blocked requests are non-fatal. No retries.
    }
}
