import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const hasGoogleAnalytics = /^G-[A-Z0-9]{10}$/.test(process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "");
const analyticsConnections = hasGoogleAnalytics
    ? " https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com"
    : "";

// Static App Router pages contain inline hydration scripts. Nonces would make
// every page dynamic; keep static rendering and document this CSP limitation.
const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${hasGoogleAnalytics ? " https://www.googletagmanager.com" : ""}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob:${analyticsConnections}`,
    "font-src 'self'",
    `connect-src 'self'${analyticsConnections}${isDev ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
];

const nextConfig: NextConfig = {
    trailingSlash: true,
    devIndicators: false,
    poweredByHeader: false,
    images: {
        localPatterns: [
            { pathname: "/logo-popi.png", search: "" },
            { pathname: "/perfil.webp", search: "" },
        ],
        remotePatterns: [],
    },

    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
            {
                source: "/api/:path*",
                headers: [
                    { key: "Cache-Control", value: "no-store" },
                    { key: "X-Robots-Tag", value: "noindex, nofollow" },
                ],
            },
        ];
    },
};

export default nextConfig;
