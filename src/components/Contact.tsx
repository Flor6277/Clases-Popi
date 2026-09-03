import { ArrowUpRight, MessageCircle } from "lucide-react";

import WhatsAppLink from "./WhatsAppLink";

const CONTACT_MESSAGE =
    "Hola, quiero consultar por las clases de Matemática. Mi nivel es ___, necesito preparar ___ y mi fecha de examen es ___. Me interesa modalidad presencial/online.";

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

                        <h2>Contame qué necesitás preparar y comenzamos</h2>

                        <p>
                            Escribime por WhatsApp y contame el nivel, la
                            materia o el ingreso que estás preparando. Si ya
                            tenés fecha de examen, agregala también. Con eso
                            puedo ver qué necesitás trabajar y coordinamos la
                            modalidad, el día y el horario. Las clases pueden
                            ser presenciales en San Juan u online.
                        </p>
                    </div>

                    <WhatsAppLink
                        className="button button--contact"
                        source="contact_section"
                        message={CONTACT_MESSAGE}
                        aria-label="Consultar disponibilidad por WhatsApp"
                    >
                        <MessageCircle size={21} aria-hidden="true" />
                        Consultar disponibilidad
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </WhatsAppLink>
                </div>
            </div>
        </section>
    );
}
