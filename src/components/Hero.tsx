import { ArrowDown, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import MathHeroVisual from "./MathHeroVisual";

export default function Hero() {
    return (
        <section id="inicio" className="hero section-anchor">
            <div className="hero-blob hero-blob--mint" aria-hidden="true" />

            <div className="hero-blob hero-blob--lilac" aria-hidden="true" />

            <div className="container hero__grid">
                <div className="hero__copy">
                    <span className="eyebrow">
                        Clases particulares de Matemática en San Juan
                    </span>

                    <h1>
                        Una forma más simple de aprender <span>Matemática</span>
                    </h1>

                    <p className="hero__lead">
                        Trabajamos los temas paso a paso, con explicaciones
                        claras y práctica orientada a lo que necesitás preparar.
                    </p>

                    <div className="hero__actions">
                        <a
                            className="button button--primary button--large"
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <MessageCircle size={20} aria-hidden="true" />
                            Consultar
                        </a>

                        <a
                            className="button button--ghost button--large"
                            href="#metodo"
                        >
                            ¿Cómo trabajamos?
                            <ArrowDown size={18} aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <MathHeroVisual />
            </div>
        </section>
    );
}
