"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";

const AUTO_PLAY_DELAY = 8000;

const testimonials = [
    {
        text: "¡Aprobé Matemáticas! Me sirvieron muchísimo las clases virtuales para repasar los temas que más me costaban del cursillo. Gracias por la paciencia y por explicarme todas las dudas que me iban surgiendo.",
        author: "Gerónimo C.",
        detail: "Ingreso universitario",
    },
    {
        text: "¡Hola profe, aprobé Matemáticas! Me sirvió muchísimo poder combinar las clases virtuales con las presenciales, sobre todo para repasar los temas que más me costaban del cursillo. Gracias por la paciencia y por explicarme todas las dudas que me iban surgiendo.",
        author: "Julián M.",
        detail: "Ingreso universitario",
    },
    {
        text: "Profe, muchas gracias por todo lo que Paz aprendió en estos meses. Está súper contenta con todo lo que pudo avanzar y nosotros también estamos muy felices con su progreso. Gracias por la paciencia y por acompañarla en este proceso. Seguramente te vamos a seguir contactando el año que viene para que la acompañes también en la secundaria.",
        author: "Mamá de Paz L.",
        detail: "Ingreso a colegio preuniversitario",
    },
    {
        text: "Flor, queríamos agradecerte por tu gran apoyo. Siempre estuviste dispuesta a ayudarlo cada vez que te llamé. Él se siente muy cómodo con vos y te entiende todo; sos una gran profesional y salió todo excelente.",
        author: "Mamá de Juan S.",
        detail: "Secundaria",
    },
];

const carouselTestimonials = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
];

function getCurrentIndex(position: number) {
    let index = position - 1;

    if (position === 0) {
        index = testimonials.length - 1;
    }

    if (position === testimonials.length + 1) {
        index = 0;
    }

    return index;
}

export default function Testimonials() {
    const [position, setPosition] = useState(1);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const current = getCurrentIndex(position);

    useEffect(() => {
        let timer: number | undefined;

        if (!isPaused && !isHovered) {
            timer = window.setInterval(() => {
                setPosition((value) => value + 1);
            }, AUTO_PLAY_DELAY);
        }

        return () => {
            if (timer !== undefined) {
                window.clearInterval(timer);
            }
        };
    }, [isPaused, isHovered]);

    const previous = () => {
        setPosition((value) => value - 1);
    };

    const next = () => {
        setPosition((value) => value + 1);
    };

    const goTo = (index: number) => {
        setPosition(index + 1);
    };

    const handleTransitionEnd = () => {
        let newPosition = position;

        if (position === 0) {
            newPosition = testimonials.length;
        }

        if (position === testimonials.length + 1) {
            newPosition = 1;
        }

        if (newPosition !== position) {
            setTransitionEnabled(false);
            setPosition(newPosition);

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    setTransitionEnabled(true);
                });
            });
        }
    };

    const togglePause = () => {
        setIsPaused((value) => !value);
    };

    return (
        <section
            id="testimonios"
            className="section section-anchor testimonials-section"
        >
            <div className="container testimonials-layout">
                <div className="testimonials-intro">
                    <span className="section-kicker">Testimonios</span>

                    <h2 className="section-title">
                        Lo que cuentan quienes ya tomaron clases conmigo
                    </h2>

                    <p className="section-text">
                        Algunas experiencias reales de alumnos y familias que
                        pasaron por Poπ
                    </p>
                </div>

                <div
                    className="testimonials-carousel"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="testimonials-viewport">
                        <div
                            className={
                                transitionEnabled
                                    ? "testimonials-track testimonials-track--animated"
                                    : "testimonials-track"
                            }
                            style={{
                                transform: `translate3d(-${position * 100}%, 0, 0)`,
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {carouselTestimonials.map((testimonial, index) => (
                                <div
                                    className="testimonial-slide"
                                    key={`${testimonial.author}-${index}`}
                                    aria-hidden={index !== position}
                                >
                                    <article className="testimonial-card">
                                        <Quote
                                            className="testimonial-card__quote"
                                            size={38}
                                            aria-hidden="true"
                                        />

                                        <blockquote>
                                            “{testimonial.text}”
                                        </blockquote>

                                        <div className="testimonial-card__author">
                                            <strong>
                                                {testimonial.author}
                                            </strong>

                                            <span>{testimonial.detail}</span>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="testimonials-controls">
                        <button
                            className="testimonial-arrow"
                            type="button"
                            onClick={previous}
                            aria-label="Ver testimonio anterior"
                        >
                            <ChevronLeft size={21} aria-hidden="true" />
                        </button>

                        <div
                            className="testimonial-dots"
                            aria-label="Seleccionar testimonio"
                        >
                            {testimonials.map((testimonial, index) => (
                                <button
                                    key={`${testimonial.author}-${index}`}
                                    className={
                                        index === current
                                            ? "testimonial-dot testimonial-dot--active"
                                            : "testimonial-dot"
                                    }
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-label={`Ver testimonio ${index + 1}`}
                                    aria-current={
                                        index === current ? "true" : undefined
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
                                <Play size={17} aria-hidden="true" />
                            ) : (
                                <Pause size={17} aria-hidden="true" />
                            )}
                        </button>

                        <button
                            className="testimonial-arrow"
                            type="button"
                            onClick={next}
                            aria-label="Ver siguiente testimonio"
                        >
                            <ChevronRight size={21} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
