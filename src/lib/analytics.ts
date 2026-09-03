export type AnalyticsPayload = {
    event: string;
    source?: string;
    pathname?: string;
    value?: number;
    rating?: string;
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function sendAnalyticsEvent(payload: AnalyticsPayload) {
    const body = JSON.stringify(payload);

    if (typeof window !== "undefined") {
        if (typeof window.gtag === "function") {
            window.gtag("event", payload.event, {
                source: payload.source,
                page_path: payload.pathname,
                value: payload.value,
                rating: payload.rating,
            });
        }

        if (typeof navigator.sendBeacon === "function") {
            navigator.sendBeacon("/api/analytics", body);
        } else {
            void fetch("/api/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
                keepalive: true,
            });
        }
    }
}
