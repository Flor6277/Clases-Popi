import Brand from "./Brand";
import { NAV_ITEMS, whatsappUrl } from "@/config/site";
import { MessageCircle } from "lucide-react";

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

                    <p className="footer-contact-text">¿Tenés alguna duda?</p>

                    <a
                        className="footer-whatsapp"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <MessageCircle size={17} aria-hidden="true" />
                        Escribime por WhatsApp
                    </a>
                </div>
            </div>

            <div className="container footer-bottom">
                <span>
                    © {new Date().getFullYear()} Poπ. Todos los derechos
                    reservados.
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
