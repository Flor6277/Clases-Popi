import type { Metadata, Viewport } from "next";
import { Comfortaa } from "next/font/google";

import "./globals.css";
import "./hero-visual.css";
import "./responsive-fixes.css";
import "./service-detail.css";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import WebVitals from "@/components/WebVitals";
import { SITE } from "@/config/site";

const comfortaa = Comfortaa({
    subsets: ["latin"],
    variable: "--font-comfortaa",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: SITE.title,
    description: SITE.description,
    applicationName: SITE.name,
    category: "education",

    alternates: {
        canonical: "/",
    },

    openGraph: {
        type: "website",
        locale: "es_AR",
        url: SITE.url,
        siteName: SITE.name,
        title: SITE.title,
        description: SITE.description,
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Poπ - Clases particulares de Matemática en San Juan y online",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.description,
        images: ["/opengraph-image"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#F9FBFF",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sameAs = [SITE.googleBusinessUrl, SITE.instagramUrl].filter(Boolean);

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "EducationalOrganization",
                "@id": `${SITE.url}/#organization`,
                name: SITE.name,
                description: SITE.description,
                url: SITE.url,
                logo: `${SITE.url}/logo-popi.png`,
                image: `${SITE.url}/perfil.webp`,
                telephone: `+${SITE.whatsappNumber}`,
                areaServed: {
                    "@type": "AdministrativeArea",
                    name: SITE.areaServed,
                },
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: `+${SITE.whatsappNumber}`,
                    contactType: "customer service",
                    availableLanguage: "Spanish",
                    url: `https://wa.me/${SITE.whatsappNumber}`,
                },
                ...(sameAs.length > 0 ? { sameAs } : {}),
            },
            {
                "@type": "WebSite",
                "@id": `${SITE.url}/#website`,
                url: SITE.url,
                name: SITE.name,
                description: SITE.description,
                inLanguage: "es-AR",
                publisher: {
                    "@id": `${SITE.url}/#organization`,
                },
            },
            {
                "@type": "Service",
                "@id": `${SITE.url}/#service`,
                name: "Clases particulares de Matemática",
                serviceType: "Clases particulares de Matemática",
                description: SITE.description,
                provider: {
                    "@id": `${SITE.url}/#organization`,
                },
                areaServed: {
                    "@type": "AdministrativeArea",
                    name: SITE.areaServed,
                },
            },
        ],
    };

    return (
        <html lang="es-AR">
            <body className={`${comfortaa.className} ${comfortaa.variable}`}>
                {children}
                <WebVitals />
                <GoogleAnalytics />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            </body>
        </html>
    );
}
