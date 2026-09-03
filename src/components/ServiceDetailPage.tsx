import {
    ArrowLeft,
    CheckCircle2,
    MessageCircle,
} from "lucide-react";

import Footer from "./Footer";
import MathHeroVisual from "./MathHeroVisual";
import Navbar from "./Navbar";
import WhatsAppFloat from "./WhatsAppFloat";
import WhatsAppLink from "./WhatsAppLink";
import type { ServicePageData } from "@/config/services";
import { SITE } from "@/config/site";

type ServiceDetailPageProps = {
    service: ServicePageData;
};

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.seoDescription,
        url: `${SITE.url}/${service.slug}/`,
        serviceType: "Clases particulares de Matemática",
        provider: {
            "@id": `${SITE.url}/#organization`,
        },
        areaServed: {
            "@type": "AdministrativeArea",
            name: SITE.areaServed,
        },
    };

    return (
        <>
            <Navbar />
            <main>
                <section className="hero service-detail-hero">
                    <div
                        className="hero-blob hero-blob--mint"
                        aria-hidden="true"
                    />
                    <div
                        className="hero-blob hero-blob--lilac"
                        aria-hidden="true"
                    />

                    <div className="container hero__grid">
                        <div className="hero__copy">
                            <a className="service-back-link" href="/#servicios">
                                <ArrowLeft size={17} aria-hidden="true" />
                                Volver a servicios
                            </a>

                            <span className="eyebrow">{service.eyebrow}</span>

                            <h1>{service.title}</h1>

                            <p className="hero__lead">
                                {service.description}
                            </p>

                            <div className="hero__actions">
                                <WhatsAppLink
                                    className="button button--primary button--large"
                                    source={`service_${service.slug}`}
                                    message={service.whatsappMessage}
                                    aria-label="Consultar disponibilidad por WhatsApp"
                                >
                                    <MessageCircle
                                        size={20}
                                        aria-hidden="true"
                                    />
                                    Consultar disponibilidad
                                </WhatsAppLink>
                            </div>

                            <div className="trust-row">
                                <span>
                                    <CheckCircle2
                                        size={17}
                                        aria-hidden="true"
                                    />
                                    {SITE.experience} años de experiencia
                                </span>
                                <span>
                                    <CheckCircle2
                                        size={17}
                                        aria-hidden="true"
                                    />
                                    Presencial y online
                                </span>
                            </div>
                        </div>

                        <MathHeroVisual />
                    </div>
                </section>

                <section className="section service-detail-section">
                    <div className="container service-detail-layout">
                        <div className="section-heading">
                            <span className="section-kicker">Sobre estas clases</span>
                            <h2 className="section-title">
                                Una preparación enfocada en lo que necesitás
                            </h2>
                            <p className="section-text section-text--large">
                                {service.intro}
                            </p>
                        </div>

                        <div className="service-detail-grid">
                            <article className="service-card">
                                <h3>{service.audienceTitle}</h3>
                                <ul>
                                    {service.audience.map((item) => (
                                        <li key={item}>
                                            <CheckCircle2
                                                size={17}
                                                aria-hidden="true"
                                            />{" "}
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            <article className="service-card">
                                <h3>{service.workTitle}</h3>
                                <ul>
                                    {service.work.map((item) => (
                                        <li key={item}>
                                            <CheckCircle2
                                                size={17}
                                                aria-hidden="true"
                                            />{" "}
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            <article className="service-card">
                                <h3>{service.methodTitle}</h3>
                                <ul>
                                    {service.method.map((item) => (
                                        <li key={item}>
                                            <CheckCircle2
                                                size={17}
                                                aria-hidden="true"
                                            />{" "}
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="section service-detail-cta-section">
                    <div className="container">
                        <div className="contact-card">
                            <div className="contact-card__copy">
                                <span className="contact-label">
                                    ¿Querés consultar disponibilidad?
                                </span>
                                <h2>Mandame el material y vemos cómo prepararlo</h2>
                                <p>
                                    Contame qué necesitás preparar y, si ya
                                    tenés material o fecha de examen, podés
                                    incluir esa información en el primer
                                    mensaje.
                                </p>
                            </div>

                            <WhatsAppLink
                                className="button button--contact"
                                source={`service_cta_${service.slug}`}
                                message={service.whatsappMessage}
                            >
                                <MessageCircle size={21} aria-hidden="true" />
                                Consultar por WhatsApp
                            </WhatsAppLink>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppFloat />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </>
    );
}
