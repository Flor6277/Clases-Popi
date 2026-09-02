import { ArrowUpRight, MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/config/site";

export default function Contact() {
    return (
        <section
            id="contacto"
            className="section section-anchor contact-section"
        >
            <div className="container">
                <div className="contact-card">
                    <div className="contact-card__copy">
                        <span className="contact-label">
                            ¿Necesitás preparar Matemática?
                        </span>

                        <h2>Contame qué necesitas preparar y comenzamos</h2>

                        <p>
                            Escribime por WhatsApp y contame el nivel, la
                            materia o el ingreso que estás preparando. Con eso
                            puedo ver qué necesitás trabajar y coordinamos la
                            modalidad, el día y el horario. Las clases pueden
                            ser presenciales u online.
                        </p>
                    </div>

                    <a
                        className="button button--contact"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <MessageCircle size={21} aria-hidden="true" />
                        Consultar
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}
