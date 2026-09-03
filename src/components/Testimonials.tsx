"use client";

import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Pause,
    Play,
    Quote,
} from "lucide-react";

const AUTO_PLAY_DELAY = 10000;

const testimonials = [
    {
        text: "Flor queríamos agradecerte por tu gran apoyo. Siempre estuviste dispuesta a ayudarlo cada vez que te llamé. Él se siente muy cómodo con vos y te entiende todo; sos una gran profesional y salió todo excelente.",
        author: "Mamá de Juan S.",
        detail: "Secundaria",
    },
    {
        text: "Hola Flor!! Muchas gracias por todo lo que Lu aprendió en estos meses. Está súper contenta con todo lo que pudo avanzar y nosotros también estamos muy felices con su progreso. Seguramente te vamos a seguir contactando el año que viene para que la acompañes también en la secundaria.",
        author: "Mamá de Luciana P.",
        detail: "Ingreso a colegio preuniversitario",
    },
    {
        text: "Aprobé Matemáticas! Me sirvieron muchísimo las clases virtuales para repasar los temas que más me costaban del cursillo. Gracias por la paciencia y por explicarme todas las dudas que me iban surgiendo.",
        author: "Gerónimo C.",
        detail: "Ingreso universitario",
    },
    {
        text: "Sos una profe excelente y con una paciencia enorme, me ayudaste un montón a entender Álgebra y encarar los parciales de la facultad con mucha más confianza.",
        author: "Germán G.",
        detail: "Universidad",
    },
];

function getNextIndex(index: number) {
    let newIndex = index + 1;

    if (newIndex >= testimonials.length) {
        newIndex = 0;
    }

    return newIndex;
}

function getPreviousIndex(index: number) {
    let newIndex = index - 1;

    if (newIndex < 0) {
        newIndex = testimonials.length - 1;
    }

    return newIndex;
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);

    const testimonial = testimonials[activeIndex];

    useEffect(() => {
        let timer: number | undefined;

        if (!isPaused && !isInteracting) {
            timer = window.setInterval(() => {
                setActiveIndex((currentIndex) =>
                    getNextIndex(currentIndex),
                );
            }, AUTO_PLAY_DELAY);
        }

        return () => {
            if (timer !== undefined) {
                window.clearInterval(timer);
            }
        };
    }, [isPaused, isInteracting]);

    const previous = () => {
        setActiveIndex((currentIndex) =>
            getPreviousIndex(currentIndex),
        );
    };

    const next = () => {
        setActiveIndex((currentIndex) =>
            getNextIndex(currentIndex),
        );
    };

    const goTo = (index: number) => {
        setActiveIndex(index);
    };

    const togglePause = () => {
        setIsPaused((currentValue) => !currentValue);
    };

    return (
        <section
            id="testimonios"
            className="section section-anchor testimonials-section"
        >
            <div className="container testimonials-layout">
                <div className="testimonials-intro">
                    <span className="section-kicker">
                        Testimonios
                    </span>

                    <h2 className="section-title">
                        Lo que cuentan quienes ya tomaron clases conmigo
                    </h2>

                    <p className="section-text">
                        Algunas experiencias reales de alumnos y familias
                        que pasaron por Poπ
                    </p>
                </div>

                <div
                    className="testimonials-carousel"
                    onMouseEnter={() => setIsInteracting(true)}
                    onMouseLeave={() => setIsInteracting(false)}
                    onFocusCapture={() => setIsInteracting(true)}
                    onBlurCapture={() => setIsInteracting(false)}
                >
                    <div
                        className="testimonial-stage"
                        aria-live={isPaused ? "polite" : "off"}
                    >
                        <article
                            className="testimonial-card testimonial-card--animated"
                            key={`${testimonial.author}-${activeIndex}`}
                        >
                            <Quote
                                className="testimonial-card__quote"
                                size={36}
                                aria-hidden="true"
                            />

                            <blockquote>
                                “{testimonial.text}”
                            </blockquote>

                            <div className="testimonial-card__author">
                                <strong>
                                    {testimonial.author}
                                </strong>

                                <span>
                                    {testimonial.detail}
                                </span>
                            </div>
                        </article>
                    </div>

                    <div className="testimonials-controls">
                        <button
                            className="testimonial-arrow"
                            type="button"
                            onClick={previous}
                            aria-label="Ver testimonio anterior"
                        >
                            <ChevronLeft
                                size={21}
                                aria-hidden="true"
                            />
                        </button>

                        <div
                            className="testimonial-dots"
                            aria-label="Seleccionar testimonio"
                        >
                            {testimonials.map((item, index) => (
                                <button
                                    key={`${item.author}-${index}`}
                                    className={
                                        index === activeIndex
                                            ? "testimonial-dot testimonial-dot--active"
                                            : "testimonial-dot"
                                    }
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-label={`Ver testimonio ${index + 1}`}
                                    aria-current={
                                        index === activeIndex
                                            ? "true"
                                            : undefined
                                    }
                                />
                            ))}
                        </div>

                        <button
                            className="testimonial-pause"
                            type="button"
                            onClick={togglePause}
                            aria-label={
                                isPaused
                                    ? "Reanudar testimonios automáticos"
                                    : "Pausar testimonios automáticos"
                            }
                        >
                            {isPaused ? (
                                <Play
                                    size={17}
                                    aria-hidden="true"
                                />
                            ) : (
                                <Pause
                                    size={17}
                                    aria-hidden="true"
                                />
                            )}
                        </button>

                        <button
                            className="testimonial-arrow"
                            type="button"
                            onClick={next}
                            aria-label="Ver siguiente testimonio"
                        >
                            <ChevronRight
                                size={21}
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
