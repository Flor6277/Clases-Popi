import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

const WINDOW_MS = 60_000;
const MAX_PER_CLIENT = 30;
const MAX_PER_INSTANCE = 300;

// Best effort per warm instance, not a distributed or DDoS protection system.
export function createAnalyticsRateLimiter() {
    let windowEnds = 0;
    let total = 0;
    let salt = randomBytes(32);
    const clients = new Map<string, number>();

    return (headers: Headers, now = Date.now()): number => {
        if (now >= windowEnds) {
            windowEnds = now + WINDOW_MS;
            total = 0;
            clients.clear();
            salt = randomBytes(32);
        }

        const retryAfter = Math.max(1, Math.ceil((windowEnds - now) / 1000));
        if (total >= MAX_PER_INSTANCE) {
            return retryAfter;
        }
        total += 1;

        // Vercel supplies/overwrites this header. Other deployments share a bucket
        // rather than trusting a client-provided X-Forwarded-For header.
        const ip = process.env.VERCEL === "1"
            ? headers.get("x-vercel-forwarded-for")?.trim()
            : undefined;
        const key = ip && isIP(ip)
            ? createHmac("sha256", salt).update(ip).digest("hex")
            : "shared";
        const count = clients.get(key) ?? 0;
        if (count >= MAX_PER_CLIENT) {
            return retryAfter;
        }
        clients.set(key, count + 1);
        return 0;
    };
}

export const limitAnalyticsRequest = createAnalyticsRateLimiter();
