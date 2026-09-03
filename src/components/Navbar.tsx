"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Brand from "./Brand";
import WhatsAppLink from "./WhatsAppLink";
import { NAV_ITEMS } from "@/config/site";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="container nav-shell">
                <a
                    className="brand-link"
                    href="/#inicio"
                    aria-label="Poπ - ir al inicio"
                >
                    <Brand priority />
                </a>

                <nav className="nav-desktop" aria-label="Navegación principal">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.href} href={item.href}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <WhatsAppLink
                    className="button button--primary nav-cta"
                    source="navbar_desktop"
                    aria-label="Consultar disponibilidad por WhatsApp"
                >
                    <FaWhatsapp size={20} aria-hidden="true" />
                    Consultar
                </WhatsAppLink>

                <button
                    className="menu-button"
                    type="button"
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? (
                        <X size={24} aria-hidden="true" />
                    ) : (
                        <Menu size={24} aria-hidden="true" />
                    )}
                </button>
            </div>

            {open && (
                <nav
                    id="mobile-navigation"
                    className="nav-mobile"
                    aria-label="Navegación móvil"
                >
                    <div className="container nav-mobile__inner">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}

                        <WhatsAppLink
                            className="button button--primary"
                            source="navbar_mobile"
                            onPointerDown={() => setOpen(false)}
                            aria-label="Consultar disponibilidad por WhatsApp"
                        >
                            <FaWhatsapp size={20} aria-hidden="true" />
                            Consultar por WhatsApp
                        </WhatsAppLink>
                    </div>
                </nav>
            )}
        </header>
    );
}
