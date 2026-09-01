export default function MathHeroVisual() {
    return (
        <div className="math-visual" aria-hidden="true">
            <svg
                className="math-visual__svg"
                viewBox="105 70 555 485"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Curva principal: índigo → coral */}
                    <linearGradient
                        id="curveGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#1566ED" />
                        <stop offset="52%" stopColor="#D824A9" />
                        <stop offset="100%" stopColor="#F47C04" />
                    </linearGradient>

                    {/* Símbolo π */}
                    <linearGradient id="piGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#021174" />
                        <stop offset="52%" stopColor="#D824A9" />
                        <stop offset="100%" stopColor="#F9A101" />
                    </linearGradient>

                    {/* Luz índigo */}
                    <radialGradient id="glowIndigo">
                        <stop
                            offset="0%"
                            stopColor="#CFE0FF"
                            stopOpacity="0.65"
                        />

                        <stop
                            offset="100%"
                            stopColor="#CFE0FF"
                            stopOpacity="0"
                        />
                    </radialGradient>

                    {/* Luz coral */}
                    <radialGradient id="glowCoral">
                        <stop
                            offset="0%"
                            stopColor="#FFD9E8"
                            stopOpacity="0.58"
                        />

                        <stop
                            offset="100%"
                            stopColor="#FFD9E8"
                            stopOpacity="0"
                        />
                    </radialGradient>
                </defs>

                {/* Fondo luminoso */}
                <circle
                    className="math-visual__glow math-visual__glow--one"
                    cx="455"
                    cy="190"
                    r="195"
                    fill="url(#glowIndigo)"
                />

                <circle
                    className="math-visual__glow math-visual__glow--two"
                    cx="520"
                    cy="430"
                    r="220"
                    fill="url(#glowCoral)"
                />

                {/* Grilla matemática */}
                <g className="math-visual__grid">
                    {[160, 210, 260, 310, 360, 410, 460, 510, 560].map((x) => (
                        <line key={`v-${x}`} x1={x} y1="100" x2={x} y2="520" />
                    ))}

                    {[140, 190, 240, 290, 340, 390, 440, 490].map((y) => (
                        <line key={`h-${y}`} x1="130" y1={y} x2="610" y2={y} />
                    ))}
                </g>

                {/* Ejes cartesianos */}
                <g className="math-visual__axes">
                    <line x1="120" y1="350" x2="640" y2="350" />

                    <line x1="360" y1="80" x2="360" y2="540" />

                    <path d="M 636 345 L 646 350 L 636 355" />

                    <path d="M 355 86 L 360 76 L 365 86" />
                </g>

                {/* Curva principal */}
                <path
                    className="math-visual__curve"
                    d="
            M 135 420
            C 210 470, 260 430, 305 350
            C 350 270, 410 250, 455 320
            C 500 390, 545 385, 615 245
          "
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                />

                {/* Curva secundaria */}
                <path
                    className="math-visual__curve-secondary"
                    d="
            M 145 300
            C 225 185, 315 195, 365 280
            C 420 375, 520 360, 610 205
          "
                    fill="none"
                    stroke="#F77CAC"
                    strokeWidth="2.3"
                    strokeDasharray="8 12"
                    strokeLinecap="round"
                />

                {/* Símbolo π */}
                <text
                    x="420"
                    y="475"
                    className="math-visual__pi"
                    fill="url(#piGradient)"
                >
                    π
                </text>

                {/* Fórmulas */}
                <text x="145" y="180" className="math-visual__formula">
                    y = mx + b
                </text>

                <text x="430" y="135" className="math-visual__formula">
                    f(x) = ax² + bx + c
                </text>

                <text
                    x="155"
                    y="505"
                    className="math-visual__formula math-visual__formula--coral"
                >
                    x² + y² = r²
                </text>

                {/* Puntos */}
                <g className="math-visual__points">
                    <circle cx="190" cy="350" r="7" />

                    <circle cx="305" cy="350" r="6" />

                    <circle cx="455" cy="320" r="7" />

                    <circle cx="550" cy="350" r="6" />

                    <circle cx="470" cy="185" r="5" />

                    <circle cx="590" cy="235" r="5" />
                </g>

                {/* Geometría */}
                <circle
                    className="math-visual__geometry"
                    cx="505"
                    cy="405"
                    r="110"
                />

                <path
                    className="math-visual__geometry"
                    d="M 420 480 L 535 250 L 620 480 Z"
                />
            </svg>
        </div>
    );
}
