export type ServicePageData = {
    slug: string;
    eyebrow: string;
    title: string;
    description: string;
    intro: string;
    audienceTitle: string;
    audience: readonly string[];
    workTitle: string;
    work: readonly string[];
    methodTitle: string;
    method: readonly string[];
    seoTitle: string;
    seoDescription: string;
    whatsappMessage: string;
};

export const SERVICE_PAGES: readonly ServicePageData[] = [
    {
        slug: "clases-matematica-secundaria-san-juan",
        eyebrow: "Nivel secundario · San Juan y online",
        title: "Clases particulares de Matemática para secundaria",
        description:
            "Apoyo personalizado para entender temas, preparar evaluaciones, recuperar materias y reforzar contenidos que quedaron pendientes.",
        intro:
            "Es el nivel con el que más trabajo. Partimos del material que usás en la escuela y revisamos qué contenidos necesitás comprender o practicar para avanzar con una base más clara.",
        audienceTitle: "¿Para qué situaciones sirve?",
        audience: [
            "Preparar evaluaciones y recuperatorios",
            "Reforzar temas que no quedaron claros",
            "Preparar materias previas",
            "Acompañar el cursado durante el año",
        ],
        workTitle: "¿Qué trabajamos en clase?",
        work: [
            "Explicación de conceptos paso a paso",
            "Resolución y justificación de ejercicios",
            "Práctica con el material de la escuela",
            "Repaso orientado a la evaluación que tengas que rendir",
        ],
        methodTitle: "¿Cómo empezamos?",
        method: [
            "Me enviás los temas, guías o evaluaciones que estés usando",
            "Vemos qué base tenés y qué contenidos requieren más trabajo",
            "Organizamos explicación y práctica según tu objetivo",
            "Coordinamos modalidad presencial en San Juan u online",
        ],
        seoTitle: "Clases de Matemática para secundaria en San Juan | Poπ",
        seoDescription:
            "Clases particulares de Matemática para secundaria en San Juan y online. Evaluaciones, materias previas, apoyo durante el cursado y refuerzo de contenidos.",
        whatsappMessage:
            "Hola, quiero consultar por clases de Matemática para secundaria. El tema que necesito preparar es ___ y tengo que rendir el ___.",
    },
    {
        slug: "ingreso-preuniversitarios-unsj",
        eyebrow: "6º grado · Institutos preuniversitarios UNSJ",
        title: "Preparación para el ingreso a institutos preuniversitarios",
        description:
            "Preparación de Matemática para alumnos de 6º grado que van a rendir el ingreso a institutos preuniversitarios, especialmente los de la UNSJ.",
        intro:
            "Trabajamos con el material correspondiente al ingreso, organizamos los temas y practicamos de manera progresiva para que el alumno llegue al examen con mayor seguridad.",
        audienceTitle: "¿Qué incluye la preparación?",
        audience: [
            "Trabajo con el material de ingreso",
            "Repaso de contenidos de 6º grado",
            "Práctica organizada por temas",
            "Simulacros y ejercicios orientados al examen",
        ],
        workTitle: "¿Cómo se organiza el trabajo?",
        work: [
            "Primero revisamos el nivel y los contenidos que ya maneja",
            "Retomamos las bases que hagan falta antes de avanzar",
            "Practicamos procedimientos y tipos de ejercicios frecuentes",
            "Organizamos repasos según el tiempo disponible hasta el examen",
        ],
        methodTitle: "¿Qué necesitás enviarme?",
        method: [
            "Material o cuadernillo de ingreso",
            "Temas que ya trabajó el alumno",
            "Ejercicios que le presentan mayor dificultad",
            "Fecha aproximada del examen, si ya está disponible",
        ],
        seoTitle: "Ingreso a preuniversitarios UNSJ: Matemática | Poπ",
        seoDescription:
            "Preparación de Matemática para el ingreso a institutos preuniversitarios de la UNSJ. Clases para alumnos de 6º grado en San Juan y modalidad online.",
        whatsappMessage:
            "Hola, quiero consultar por preparación de Matemática para el ingreso a un instituto preuniversitario de la UNSJ. El alumno está en 6º grado y necesito información sobre disponibilidad.",
    },
    {
        slug: "ingreso-universitario-matematica",
        eyebrow: "Ingresos universitarios · San Juan y online",
        title: "Preparación de Matemática para ingresos universitarios",
        description:
            "Clases orientadas a la parte de Matemática de ingresos universitarios, trabajando con el programa, guías y material específico de cada carrera.",
        intro:
            "Suelo preparar especialmente ingresos de carreras de la UNSJ y también puedo trabajar con material de otras universidades. Antes de coordinar reviso el programa para confirmar los contenidos.",
        audienceTitle: "¿Qué podemos preparar?",
        audience: [
            "Matemática de cursillos e ingresos universitarios",
            "Repaso de contenidos previos necesarios para el ingreso",
            "Guías y ejercicios del material oficial",
            "Práctica orientada a parciales o evaluaciones de ingreso",
        ],
        workTitle: "¿Cómo son las clases?",
        work: [
            "Explicamos teoría y procedimientos desde la base necesaria",
            "Resolvemos ejercicios del material que estés usando",
            "Detectamos los temas que más cuestan y los priorizamos",
            "Organizamos el repaso según la fecha y el tiempo disponible",
        ],
        methodTitle: "También podés consultar por materias universitarias",
        method: [
            "Matemática Básica",
            "Álgebra y Álgebra Lineal",
            "Análisis Matemático",
            "Probabilidad y Estadística, según el programa de la materia",
        ],
        seoTitle: "Clases para ingreso universitario de Matemática | Poπ",
        seoDescription:
            "Preparación de Matemática para ingresos universitarios en San Juan y online. Trabajo con programas, guías y material de la UNSJ y otras universidades.",
        whatsappMessage:
            "Hola, quiero consultar por preparación de Matemática para un ingreso universitario. La carrera/universidad es ___ y tengo que rendir el ___.",
    },
    {
        slug: "clases-matematica-online",
        eyebrow: "Modalidad online",
        title: "Clases particulares de Matemática online",
        description:
            "Clases por videollamada para secundaria, ingresos y algunas materias universitarias, trabajando con ejercicios, apuntes y material digital durante la clase.",
        intro:
            "La modalidad online permite trabajar desde cualquier lugar manteniendo una clase personalizada. Compartimos el material en pantalla y resolvemos los ejercicios paso a paso igual que en una clase presencial.",
        audienceTitle: "¿Para quién puede servir?",
        audience: [
            "Estudiantes que no pueden asistir de manera presencial",
            "Alumnos que viven fuera de San Juan",
            "Ingresos de universidades con material digital",
            "Parciales o finales que necesitan preparación puntual",
        ],
        workTitle: "¿Qué necesitás para la clase?",
        work: [
            "Conexión estable a internet",
            "Dispositivo para la videollamada",
            "Guías, programa, apuntes o ejercicios en formato digital o foto",
            "Un espacio donde puedas trabajar con comodidad durante la clase",
        ],
        methodTitle: "¿Cómo trabajamos online?",
        method: [
            "Me enviás previamente el material que estás usando",
            "Durante la videollamada compartimos ejercicios y explicaciones",
            "Practicamos sobre los temas que necesitás preparar",
            "Coordinamos día y horario según disponibilidad",
        ],
        seoTitle: "Clases particulares de Matemática online | Poπ",
        seoDescription:
            "Clases particulares de Matemática online para secundaria, ingresos universitarios, preuniversitarios y algunas materias universitarias.",
        whatsappMessage:
            "Hola, quiero consultar por clases de Matemática online. Mi nivel es ___ y necesito preparar ___.",
    },
] as const;

export function getServicePage(slug: string) {
    const service = SERVICE_PAGES.find((item) => item.slug === slug);

    return service;
}
