import { getGoogleAnalyticsId, getPublicSiteUrl, getPublicSocialUrl } from "@/lib/public-config";

const configuredWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const SITE = {
    name: "Poπ",
    descriptor: "Clases particulares de Matemática",

    title: "Clases particulares de Matemática en San Juan | Poπ",

    description:
        "Clases particulares de Matemática en San Juan y online para secundaria, preuniversitarios, ingresos universitarios y materias con contenido matemático.",

    url: getPublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),

    location: "San Juan, Argentina",
    areaServed: "San Juan, Argentina",

    whatsappNumber: /^[1-9]\d{7,14}$/.test(configuredWhatsappNumber)
        ? configuredWhatsappNumber
        : "5492646716267",

    whatsappMessage:
        "Hola, quiero consultar por las clases de Matemática. Mi nivel es ___ y necesito preparar ___.",

    googleBusinessUrl: getPublicSocialUrl(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL, [
        "google.com", "www.google.com", "maps.google.com", "search.google.com",
        "google.com.ar", "www.google.com.ar", "maps.app.goo.gl", "g.page", "g.co",
        "business.google.com",
    ]),

    instagramUrl: getPublicSocialUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL, [
        "instagram.com", "www.instagram.com",
    ]),

    googleAnalyticsId: getGoogleAnalyticsId(process.env.NEXT_PUBLIC_GA_ID),

    experience: "+15",
    students: "+300",
} as const;

export function getWhatsAppUrl(message: string = SITE.whatsappMessage) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodedMessage}`;

    return url;
}


export const NAV_ITEMS = [
    {
        href: "/#inicio",
        label: "Inicio",
    },
    {
        href: "/#instituto",
        label: "Poπ",
    },
    {
        href: "/#servicios",
        label: "Servicios",
    },
    {
        href: "/#modalidad",
        label: "Modalidad",
    },
    {
        href: "/#metodo",
        label: "Método",
    },
    {
        href: "/#preguntas",
        label: "Preguntas",
    },
    {
        href: "/#contacto",
        label: "Contacto",
    },
] as const;
