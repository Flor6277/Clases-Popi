import { NextResponse } from "next/server";
import { limitAnalyticsRequest } from "@/lib/analytics-rate-limit";
import { parseAnalyticsPayload } from "@/lib/analytics-schema";

const MAX_BODY_BYTES = 1024;
const BODY_TIMEOUT_MS = 5000;

class BodyError extends Error {
    constructor(readonly status: number) {
        super("Invalid analytics body");
    }
}

async function readBody(request: Request): Promise<unknown> {
    const length = request.headers.get("content-length");
    if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) {
        throw new BodyError(413);
    }
    if (!request.body) {
        throw new BodyError(400);
    }

    const reader = request.body.getReader();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
        return await Promise.race([
            (async () => {
                const chunks: Uint8Array[] = [];
                let size = 0;
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    size += value.byteLength;
                    if (size > MAX_BODY_BYTES) throw new BodyError(413);
                    chunks.push(value);
                }
                return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)));
            })(),
            new Promise<never>((_, reject) => {
                timer = setTimeout(() => reject(new BodyError(408)), BODY_TIMEOUT_MS);
            }),
        ]);
    } finally {
        clearTimeout(timer);
        // Do not wait for a slow sender to finish cancelling the stream.
        void reader.cancel().catch(() => undefined);
    }
}

function respond(status: number, retryAfter?: number) {
    return new NextResponse(null, {
        status,
        headers: {
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
            ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
        },
    });
}

export async function POST(request: Request) {
    try {
        const retryAfter = limitAnalyticsRequest(request.headers);
        if (retryAfter) return respond(429, retryAfter);

        // Next may construct request.url with its internal listening hostname.
        // Use the actual Host authority, never an untrusted X-Forwarded-Host.
        const requestUrl = new URL(request.url);
        const expectedOrigin = `${requestUrl.protocol}//${request.headers.get("host") ?? requestUrl.host}`;
        // Browser-origin checks reduce cross-site submission, not automated forgery.
        if (
            request.headers.get("origin") !== expectedOrigin ||
            (request.headers.has("sec-fetch-site") &&
                request.headers.get("sec-fetch-site") !== "same-origin")
        ) {
            return respond(403);
        }

        if (
            !/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(request.headers.get("content-type") ?? "") ||
            ![null, "identity"].includes(request.headers.get("content-encoding"))
        ) {
            return respond(415);
        }

        const payload = parseAnalyticsPayload(await readBody(request));
        if (!payload) return respond(400);

        console.info("popi_analytics", {
            ...payload,
            timestamp: new Date().toISOString(),
        });
        return respond(204);
    } catch (error) {
        return respond(error instanceof BodyError ? error.status : 400);
    }
}
