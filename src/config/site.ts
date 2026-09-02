export const SITE = {
    name: "Poπ",

    descriptor: "Clases particulares de Matemática",

    title:
        "Clases particulares de Matemática en San Juan | Poπ",

    description:
        "Clases particulares de Matemática en San Juan y online para secundaria, ingreso a colegios preuniversitarios, ingresos universitarios y algunas materias universitarias.",

    url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://clases-popi.vercel.app",

    whatsappNumber:
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
        "5492646716267",

    whatsappMessage:
        "Hola, quiero consultar por clases de Matemática!",

    experience: "+15",

    students: "+200",
} as const;

export const whatsappUrl =
    `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
        SITE.whatsappMessage,
    )}`;

export const NAV_ITEMS = [
    {
        href: "#inicio",
        label: "Inicio",
    },
    {
        href: "#instituto",
        label: "Poπ",
    },
    {
        href: "#servicios",
        label: "Servicios",
    },
    {
        href: "#modalidad",
        label: "Modalidad",
    },
    {
        href: "#metodo",
        label: "Método",
    },
    {
        href: "#preguntas",
        label: "Preguntas",
    },
    {
        href: "#contacto",
        label: "Contacto",
    },
] as const;