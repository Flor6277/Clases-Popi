import {
    ClipboardCheck,
    FileCheck2,
    Layers3,
    RefreshCcw,
    Sigma,
    Trophy,
} from "lucide-react";

const needs = [
    {
        icon: Sigma,
        title: "Entender desde la base",
        text: "Cuando el problema no es un ejercicio puntual sino conceptos que quedaron sin consolidar.",
    },
    {
        icon: ClipboardCheck,
        title: "Preparar una evaluación",
        text: "Organizamos los temas y practicamos con foco en lo que realmente tenés que rendir.",
    },
    {
        icon: RefreshCcw,
        title: "Recuperar una materia",
        text: "Armamos un recorrido posible para retomar contenidos y prepararte con orden.",
    },
    {
        icon: Trophy,
        title: "Preparar un ingreso",
        text: "Planificamos práctica, repasos y simulacros según el material y la fecha disponible.",
    },
    {
        icon: Layers3,
        title: "Parcial o final universitario",
        text: "Trabajamos teoría, procedimientos y tipos de ejercicios frecuentes de tu materia.",
    },
    {
        icon: FileCheck2,
        title: "Acompañar un trabajo práctico",
        text: "Revisamos conceptos y procedimientos para que puedas desarrollar y justificar tu trabajo.",
    },
];

export default function Needs() {
    return (
        <section
            className="section needs-section"
            aria-labelledby="needs-title"
        >
            <div className="container">
                <div className="section-heading section-heading--center">
                    <span className="section-kicker section-heading--center">
                        Objetivos frecuentes
                    </span>
                    <h2 className="section-title" id="needs-title">
                        Venís con una necesidad concreta. Trabajamos desde ahí.
                    </h2>
                </div>
                <div className="needs-grid">
                    {needs.map((need) => (
                        <article key={need.title} className="need-card">
                            <need.icon size={23} aria-hidden="true" />
                            <div>
                                <h3>{need.title}</h3>
                                <p>{need.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
