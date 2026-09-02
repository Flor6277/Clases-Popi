const steps = [
    {
        number: "01",
        title: "Primero veo dónde estás",
        text: "Reviso qué estás estudiando, qué temas te cuestan y qué material estás usando.",
    },
    {
        number: "02",
        title: "Te explico el tema",
        text: "Lo trabajamos paso a paso y volvemos sobre lo que haga falta hasta que quede claro.",
    },
    {
        number: "03",
        title: "Practicamos",
        text: "Resolvemos ejercicios juntos, revisando cómo se hace cada paso y por qué.",
    },
    {
        number: "04",
        title: "Preparamos lo que vas a rendir",
        text: "Organizamos el repaso y practicamos teniendo en cuenta el tipo de examen, el material y el tiempo que queda.",
    },
];

export default function Method() {
    return (
        <section id="metodo" className="section section-anchor method-section">
            <div className="container">
                <div className="section-heading section-heading--center section-heading--light">
                    <span className="section-kicker section-kicker--light">
                        Método de trabajo
                    </span>

                    <h2 className="section-title">Así trabajamos</h2>

                    <p className="section-text">
                        Primero veo qué necesitas y, a partir de ahí,
                        organizamos la clase.
                    </p>
                </div>

                <div className="method-grid">
                    {steps.map((step) => (
                        <article className="method-card" key={step.number}>
                            <span>{step.number}</span>

                            <h3>{step.title}</h3>

                            <p>{step.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
