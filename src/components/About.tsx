"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, Clock3, Target, Users } from "lucide-react";

import { SITE } from "@/config/site";

const ANIMATION_DURATION = 1800;

function parseCounterValue(value: string) {
    return Number(value.replace(/[^\d]/g, ""));
}

function getAnimatedValue(target: number, progress: number) {
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    return Math.round(target * easedProgress);
}

const stats = [
    {
        icon: Clock3,
        target: parseCounterValue(SITE.experience),
        prefix: "+",
        suffix: "",
        label: "años de experiencia",
    },
    {
        icon: Users,
        target: parseCounterValue(SITE.students),
        prefix: "+",
        suffix: "",
        label: "alumnos acompañados",
    },
    {
        icon: BookOpen,
        target: 3,
        prefix: "",
        suffix: "",
        label: "etapas educativas",
    },
    {
        icon: Target,
        target: 100,
        prefix: "",
        suffix: "%",
        label: "seguimiento personalizado",
    },
];

export default function About() {
    const statsRef = useRef<HTMLDivElement | null>(null);

    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const element = statsRef.current;

        let observer: IntersectionObserver | null = null;

        if (element && !started) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];

                    if (entry?.isIntersecting) {
                        setStarted(true);
                        observer?.disconnect();
                    }
                },
                {
                    threshold: 0.35,
                },
            );

            observer.observe(element);
        }

        return () => {
            observer?.disconnect();
        };
    }, [started]);

    useEffect(() => {
        let animationFrame = 0;
        let startTime = 0;

        const animate = (timestamp: number) => {
            if (startTime === 0) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;

            const nextProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

            setProgress(nextProgress);

            if (nextProgress < 1) {
                animationFrame = window.requestAnimationFrame(animate);
            }
        };

        if (started) {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (reducedMotion) {
                setProgress(1);
            } else {
                animationFrame = window.requestAnimationFrame(animate);
            }
        }

        return () => {
            window.cancelAnimationFrame(animationFrame);
        };
    }, [started]);

    return (
        <section
            id="instituto"
            className="section section-anchor about-section"
        >
            <div className="container">
                <div className="about-grid">
                    <div className="about-copy">
                        <span className="section-kicker">Sobre mí</span>

                        <h2 className="section-title">
                            No todos aprendemos Matemática de la misma manera
                        </h2>

                        <p className="section-text section-text--large">
                            Soy Florencia y hace varios años doy clases
                            particulares de Matemática. Trabajo principalmente
                            con alumnos de secundaria y también preparo a chicos
                            de 6º grado de primaria para el ingreso a los
                            colegios preuniversitarios de la UNSJ.
                        </p>

                        <p className="section-text section-text--large">
                            También preparo ingresos universitarios de
                            Matemática y acompaño en algunas materias de nivel
                            universitario que tienen contenidos matemáticos. En
                            cada caso me adapto al material, al nivel y a lo que
                            necesita preparar el o la alumna. La idea no es
                            resolver ejercicios porque sí, sino entender qué
                            estamos haciendo para que después pueda hacerlo con
                            mayor seguridad.
                        </p>
                    </div>

                    <figure className="about-photo">
                        <Image
                            src="/perfil.webp"
                            alt="Flor, profesora de Matemática de Poπ"
                            width={650}
                            height={800}
                            className="about-photo__image"
                            sizes="(max-width: 920px) 90vw, 420px"
                        />

                        <figcaption>Florencia</figcaption>
                    </figure>
                </div>

                <div className="stats-grid" ref={statsRef}>
                    {stats.map((stat) => {
                        const animatedValue = getAnimatedValue(
                            stat.target,
                            progress,
                        );

                        return (
                            <article className="stat-card" key={stat.label}>
                                <stat.icon size={24} aria-hidden="true" />

                                <strong>
                                    {stat.prefix}
                                    {animatedValue}
                                    {stat.suffix}
                                </strong>

                                <span>{stat.label}</span>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
