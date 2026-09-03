import { NextResponse } from "next/server";

const ALLOWED_EVENTS = new Set([
    "whatsapp_click",
    "web_vital_cls",
    "web_vital_inp",
    "web_vital_lcp",
]);

type AnalyticsRequest = {
    event?: unknown;
    source?: unknown;
    pathname?: unknown;
    value?: unknown;
    rating?: unknown;
};

function asShortString(value: unknown, maxLength: number) {
    let result = "";

    if (typeof value === "string") {
        result = value.slice(0, maxLength);
    }

    return result;
}

function asFiniteNumber(value: unknown) {
    let result: number | null = null;

    if (typeof value === "number" && Number.isFinite(value)) {
        result = value;
    }

    return result;
}

export async function POST(request: Request) {
    let status = 204;

    try {
        const payload = (await request.json()) as AnalyticsRequest;
        const event = asShortString(payload.event, 60);

        if (ALLOWED_EVENTS.has(event)) {
            console.info("popi_analytics", {
                event,
                source: asShortString(payload.source, 100),
                pathname: asShortString(payload.pathname, 200),
                value: asFiniteNumber(payload.value),
                rating: asShortString(payload.rating, 40),
                timestamp: new Date().toISOString(),
            });
        } else {
            status = 400;
        }
    } catch {
        status = 400;
    }

    return new NextResponse(null, { status });
}
