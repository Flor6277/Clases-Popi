import {
    ArrowDown,
    CheckCircle2,
    MessageCircle,
} from "lucide-react";

import MathHeroVisual from "./MathHeroVisual";
import WhatsAppLink from "./WhatsAppLink";
import { SITE } from "@/config/site";

export default function Hero() {
    return (
        <section id="inicio" className="hero section-anchor">
            <div className="hero-blob hero-blob--mint" aria-hidden="true" />

            <div className="hero-blob hero-blob--lilac" aria-hidden="true" />

            <div className="container hero__grid">
                <div className="hero__copy">
                    <span className="eyebrow">
                        San Juan · Presencial y online
                    </span>

                    <h1>
                        Clases particulares de <span>Matemática</span> para
                        entender y avanzar
                    </h1>

                    <p className="hero__lead">
                        Secundaria, ingresos y algunas materias universitarias.
                        Trabajamos paso a paso, con explicaciones claras y
                        práctica orientada a lo que necesitás preparar.
                    </p>

                    <div className="hero__actions">
                        <WhatsAppLink
                            className="button button--primary button--large"
                            source="hero"
                            aria-label="Consultar disponibilidad por WhatsApp"
                        >
                            <MessageCircle size={20} aria-hidden="true" />
                            Consultar disponibilidad
                        </WhatsAppLink>

                        <a
                            className="button button--ghost button--large"
                            href="#metodo"
                        >
                            ¿Cómo trabajamos?
                            <ArrowDown size={18} aria-hidden="true" />
                        </a>
                    </div>

                    <div className="trust-row" aria-label="Datos de Poπ">
                        <span>
                            <CheckCircle2 size={17} aria-hidden="true" />
                            {SITE.experience} años de experiencia
                        </span>
                        <span>
                            <CheckCircle2 size={17} aria-hidden="true" />
                            {SITE.students} alumnos acompañados
                        </span>
                        <span>
                            <CheckCircle2 size={17} aria-hidden="true" />
                            Atención personalizada
                        </span>
                    </div>
                </div>

                <MathHeroVisual />
            </div>
        </section>
    );
}
