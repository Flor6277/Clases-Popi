"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

const questions = [
    {
        question: "¿Con qué niveles trabajo?",
        answer: "Trabajo principalmente con alumnos de nivel secundario. También preparo a chicos de 6.º grado para el ingreso a institutos preuniversitarios y a estudiantes que necesitan Matemática para ingresos o algunas materias universitarias.",
    },
    {
        question: "¿Preparás para el ingreso a institutos preuniversitarios?",
        answer: "Sí. Preparo a alumnos de 6.º grado de primaria que van a rendir el ingreso a institutos preuniversitarios, especialmente los de la UNSJ. Trabajamos con el material correspondiente, repasamos los temas y hacemos práctica orientada al examen.",
    },
    {
        question: "¿También preparás ingresos universitarios?",
        answer: "Sí. Trabajo la parte de Matemática de distintos ingresos universitarios. Suelo preparar especialmente carreras de la UNSJ, aunque también puedo trabajar con ingresos de otras universidades si me enviás el programa o el material.",
    },
    {
        question: "¿Puedo consultarte por una materia universitaria?",
        answer: "Sí. Doy apoyo en algunas materias universitarias que tienen contenidos de Matemática, Álgebra, Análisis, Probabilidad o Estadística. Antes de coordinar, mandame el programa o los temas para confirmar que puedo ayudarte.",
    },
    {
        question: "¿Qué material tengo que llevar o enviar?",
        answer: "Lo ideal es que me compartas lo que estés usando en la escuela, el ingreso o la universidad: programa, guías, apuntes, trabajos prácticos o evaluaciones anteriores. Así trabajamos directamente sobre lo que necesitás.",
    },
    {
        question:
            "¿Puedo empezar aunque tenga temas anteriores que no entiendo?",
        answer: "Sí. Muchas veces la dificultad actual viene de contenidos anteriores que no quedaron claros. Primero vemos dónde está el problema y, si hace falta, retomamos esa base antes de seguir.",
    },
    {
        question: "¿Cómo coordinamos las clases?",
        answer: "Escribime por WhatsApp y contame qué estás preparando, qué temas necesitás trabajar y si tenés una fecha de examen. Después coordinamos modalidad, día y horario según disponibilidad.",
    },
    {
        question: "¿Las clases pueden ser presenciales u online?",
        answer: "Sí. Doy clases presenciales en San Juan y también online por videollamada. Elegimos la modalidad que te resulte más conveniente.",
    },
    {
        question: "¿Qué pasa si tengo que rendir dentro de pocos días?",
        answer: "Podemos trabajar con el tiempo disponible, pero primero necesito saber cuánto contenido entra y qué base tenés. Si la fecha está cerca, priorizamos los temas más importantes y organizamos la práctica de forma realista.",
    },
    {
        question: "¿Cómo se cobra la clase?",
        answer: "Las clases se cobran por hora. Si necesitás varias clases también podemos coordinar un paquete. Escribime por WhatsApp y te paso los valores actualizados.",
    },
];

const INITIAL_QUESTIONS = 4;

export default function Faq() {
    const [showAll, setShowAll] = useState(false);

    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenQuestion((current) => (current === index ? null : index));
    };

    const toggleMoreQuestions = () => {
        setShowAll((current) => !current);

        setOpenQuestion(null);
    };

    return (
        <section id="preguntas" className="section section-anchor faq-section">
            <div className="container faq-layout">
                <div className="faq-intro">
                    <span className="section-kicker">Preguntas frecuentes</span>

                    <h2 className="section-title">
                        Algunas dudas antes de empezar
                    </h2>

                    <p className="section-text">
                        Si tenés otra duda, escribime por WhatsApp.
                    </p>
                </div>

                <div className="faq-content">
                    <div className="faq-list">
                        {questions.map((item, index) => {
                            const isOpen = openQuestion === index;

                            const isVisible =
                                showAll || index < INITIAL_QUESTIONS;

                            return (
                                <article
                                    className={
                                        isOpen
                                            ? "faq-item faq-item--open"
                                            : "faq-item"
                                    }
                                    key={item.question}
                                    hidden={!isVisible}
                                >
                                    <button
                                        className="faq-question"
                                        type="button"
                                        onClick={() => toggleQuestion(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.question}</span>

                                        <span
                                            className="faq-question__icon"
                                            aria-hidden="true"
                                        >
                                            {isOpen ? (
                                                <Minus size={17} />
                                            ) : (
                                                <Plus size={17} />
                                            )}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="faq-answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    <button
                        className="faq-more"
                        type="button"
                        onClick={toggleMoreQuestions}
                        aria-expanded={showAll}
                    >
                        {showAll ? (
                            <>
                                Ver menos preguntas
                                <ChevronUp size={18} aria-hidden="true" />
                            </>
                        ) : (
                            <>
                                Ver más preguntas
                                <ChevronDown size={18} aria-hidden="true" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
