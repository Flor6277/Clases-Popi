export const SITE = {
    name: "Poπ",
    descriptor: "Clases particulares de Matemática",

    title: "Clases particulares de Matemática en San Juan | Poπ",

    description:
        "Clases particulares de Matemática en San Juan y online para secundaria, preuniversitarios, ingresos universitarios y materias con contenido matemático.",

    url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://popiclases.vercel.app",

    location: "San Juan, Argentina",
    areaServed: "San Juan, Argentina",

    whatsappNumber:
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
        "5492646716267",

    whatsappMessage:
        "Hola, quiero consultar por las clases de Matemática. Mi nivel es ___ y necesito preparar ___.",

    googleBusinessUrl:
        process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || "",

    instagramUrl:
        process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",

    googleAnalyticsId:
        process.env.NEXT_PUBLIC_GA_ID || "",

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
