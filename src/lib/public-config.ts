export function getPublicSiteUrl(value: string | undefined): string {
    const fallback = "https://popiclases.vercel.app";
    if (!value) return fallback;
    try {
        const url = new URL(value);
        const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
        const allowedProtocol = url.protocol === "https:" ||
            (process.env.NODE_ENV === "development" && local && url.protocol === "http:");
        if (
            !allowedProtocol ||
            (local && process.env.NODE_ENV !== "development") ||
            url.username || url.password || url.search || url.hash || url.pathname !== "/"
        ) return fallback;
        return url.origin;
    } catch {
        return fallback;
    }
}

export function getPublicSocialUrl(value: string | undefined, hosts: readonly string[]): string {
    if (!value) return "";
    try {
        const url = new URL(value);
        return url.protocol === "https:" && !url.username && !url.password &&
            !url.port && hosts.includes(url.hostname)
            ? url.href : "";
    } catch {
        return "";
    }
}

export function getGoogleAnalyticsId(value: string | undefined): string {
    const id = value?.trim() ?? "";
    return /^G-[A-Z0-9]{10}$/.test(id) ? id : "";
}
