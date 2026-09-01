"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Brand from "./Brand";
import { NAV_ITEMS, whatsappUrl } from "@/config/site";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="container nav-shell">
                <a
                    className="brand-link"
                    href="#inicio"
                    aria-label="Poπ - ir al inicio"
                >
                    <Brand />
                </a>

                <nav className="nav-desktop" aria-label="Navegación principal">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.href} href={item.href}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* <a
                    className="button button--primary nav-cta"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Consultar por WhatsApp"
                >
                    <FaWhatsapp size={20} aria-hidden="true" />
                    Consultar
                </a> */}

                <button
                    className="menu-button"
                    type="button"
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={open}
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
                <nav className="nav-mobile" aria-label="Navegación móvil">
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

                        <a
                            className="button button--primary"
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setOpen(false)}
                            aria-label="Consultar por WhatsApp"
                        >
                            <FaWhatsapp size={20} aria-hidden="true" />
                            Consultar por WhatsApp
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
