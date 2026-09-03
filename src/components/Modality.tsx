import {
    ArrowUpRight,
    CheckCircle2,
    MapPin,
    Monitor,
} from "lucide-react";

const modalities = [
    {
        icon: MapPin,
        title: "Presencial",
        description:
            "En las clases presenciales trabajamos cara a cara con explicación, práctica y el material que estés usando.",
        benefits: [
            "Explicación en el momento",
            "Material de apoyo",
            "A tu ritmo",
        ],
        href: "",
    },
    {
        icon: Monitor,
        title: "Online",
        description:
            "En las clases online trabajamos por videollamada compartiendo ejercicios, apuntes y material durante la clase.",
        benefits: [
            "Desde cualquier lugar",
            "Recursos digitales",
            "Horarios coordinados",
        ],
        href: "/clases-matematica-online/",
    },
];

export default function Modality() {
    return (
        <section
            id="modalidad"
            className="section section-anchor modality-section"
        >
            <div className="container modality-layout">
                <div className="modality-intro">
                    <span className="section-kicker">Modalidad</span>

                    <h2 className="section-title">
                        Elegí la forma que mejor se adapte a vos
                    </h2>

                    <p className="section-text">
                        Doy clases presenciales en San Juan y también online.
                        Coordinamos la modalidad según tu disponibilidad y lo
                        que necesites trabajar.
                    </p>
                </div>

                <div className="modality-cards">
                    {modalities.map((modality) => (
                        <article className="modality-card" key={modality.title}>
                            <div className="modality-card__icon">
                                <modality.icon size={27} aria-hidden="true" />
                            </div>

                            <div>
                                <h3>{modality.title}</h3>

                                <p>{modality.description}</p>

                                <ul>
                                    {modality.benefits.map((benefit) => (
                                        <li key={benefit}>
                                            <CheckCircle2
                                                size={16}
                                                aria-hidden="true"
                                            />{" "}
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                {modality.href ? (
                                    <a
                                        className="detail-link"
                                        href={modality.href}
                                    >
                                        Ver clases online
                                        <ArrowUpRight
                                            size={17}
                                            aria-hidden="true"
                                        />
                                    </a>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
