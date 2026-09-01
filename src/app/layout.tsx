import type { Metadata, Viewport } from "next";
import { Comfortaa } from "next/font/google";

import "./globals.css";
import "./hero-visual.css";

import { SITE } from "@/config/site";

const comfortaa = Comfortaa({
    subsets: ["latin"],
    variable: "--font-comfortaa",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: SITE.title,
    description: SITE.description,
    keywords: [
        "clases particulares de matemática",
        "apoyo matemática secundario",
        "ingreso universitario matemática",
        "clases de álgebra",
        "clases de análisis matemático",
        "clases de estadística",
        "preparación de exámenes",
        "clases online de matemática",
    ],

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
    },

    robots: {
        index: true,
        follow: true,
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
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
    };

    return (
        <html lang="es-AR">
            <body className={`${comfortaa.className} ${comfortaa.variable}`}>
                {children}

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
