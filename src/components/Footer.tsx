import { Instagram, MapPin, MessageCircle, Star } from "lucide-react";

import Brand from "./Brand";
import WhatsAppLink from "./WhatsAppLink";
import { NAV_ITEMS, SITE } from "@/config/site";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand-block">
                    <div className="footer-brand-surface">
                        <Brand />
                    </div>

                    <p className="footer-about">
                        Clases particulares de Matemática
                    </p>

                    <p className="footer-levels">
                        Secundaria · Universidad · Ingresos
                    </p>
                </div>

                <div>
                    <h2>Secciones</h2>

                    <nav
                        className="footer-links"
                        aria-label="Navegación del pie"
                    >
                        {NAV_ITEMS.slice(1).map((item) => (
                            <a key={item.href} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div>
                    <h2>Contacto</h2>

                    <p className="footer-contact-text">
                        <MapPin size={16} aria-hidden="true" />
                        San Juan · Presencial y online
                    </p>

                    <WhatsAppLink
                        className="footer-whatsapp"
                        source="footer"
                        aria-label="Escribirme por WhatsApp"
                    >
                        <MessageCircle size={17} aria-hidden="true" />
                        Escribime por WhatsApp
                    </WhatsAppLink>

                    <div className="footer-social-links">
                        {SITE.googleBusinessUrl ? (
                            <a
                                href={SITE.googleBusinessUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Star size={16} aria-hidden="true" />
                                Reseñas en Google
                            </a>
                        ) : null}

                        {SITE.instagramUrl ? (
                            <a
                                href={SITE.instagramUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Instagram size={16} aria-hidden="true" />
                                Instagram
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <span>
                    © {new Date().getFullYear()} Poπ. Todos los derechos
                    reservados
                </span>

                <span className="footer-credit">
                    Diseño y desarrollo ·{" "}
                    <a
                        href="https://www.github.com/Flor6277"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Flor Molina
                    </a>
                </span>
            </div>
        </footer>
    );
}
