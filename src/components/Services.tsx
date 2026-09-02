import {
    BookOpenCheck,
    GraduationCap,
    School,
    CheckCircle2,
} from "lucide-react";

const services = [
    {
        icon: School,
        label: "Clases de Nivel Secundario",
        text: "Es el nivel con el que más trabajo. Te ayudo a entender temas, resolver dudas, preparar evaluaciones, recuperar materias o reforzar contenidos que quedaron pendientes",
        items: [
            "Clases personalizadas",
            "Evaluaciones",
            "Materias previas",
            "Apoyo durante el cursado",
        ],
    },
    {
        icon: BookOpenCheck,
        label: "Ingreso a Institutos Preuniversitarios",
        text: "Preparo a alumnos de 6º grado de primaria para rendir el ingreso a los institutos preuniversitarios de la UNSJ",
        items: [
            "6º grado de primaria",
            "Material de ingreso",
            "Práctica por temas",
            "Simulacros de examen",
        ],
    },
    {
        icon: GraduationCap,
        label: "Clases de nivel Universitario e ingresos",
        text: "Te ayudo a preparar el ingreso a la universidad en y también algunas materias universitarias con contenido matemático y de programación. ",
        items: [
            "Ingresos a la universidad",
            "Matemática Básica",
            "Álgebra lineal",
            "Análisis Matemático",
        ],
    },
];

export default function Services() {
    return (
        <section
            id="servicios"
            className="section section-anchor services-section"
        >
            <div className="container">
                <div className="section-heading section-heading--center">
                    <span className="section-kicker">Clases</span>

                    <h2 className="section-title">
                        Estos son los niveles con los que más trabajo
                    </h2>

                    <p className="section-text">
                        La mayor parte de mis clases son de secundaria, pero
                        también preparo ingresos a institutos preuniversitarios,
                        ingresos universitarios y algunas materias de nivel
                        universitario.
                    </p>
                </div>

                <div className="service-grid">
                    {services.map((service) => (
                        <article className="service-card" key={service.label}>
                            <div className="icon-box">
                                <service.icon size={28} aria-hidden="true" />
                            </div>

                            <h3>{service.label}</h3>

                            <p>{service.text}</p>

                            <ul>
                                {service.items.map((item) => (
                                    <li key={item}>
                                        <CheckCircle2
                                            size={17}
                                            aria-hidden="true"
                                        />{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
