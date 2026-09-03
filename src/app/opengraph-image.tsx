import { ImageResponse } from "next/og";

export const alt =
    "Poπ - Clases particulares de Matemática en San Juan y online";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    overflow: "hidden",
                    padding: "72px 82px",
                    background:
                        "linear-gradient(135deg, #f9fbff 0%, #eef4ff 58%, #fff1f5 100%)",
                    color: "#17213b",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: 420,
                        height: 420,
                        right: -90,
                        top: -120,
                        borderRadius: "50%",
                        background: "rgba(80, 109, 255, 0.12)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 310,
                        height: 310,
                        right: 100,
                        bottom: -150,
                        borderRadius: "50%",
                        background: "rgba(247, 124, 172, 0.14)",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "72%",
                        zIndex: 2,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                            fontSize: 42,
                            fontWeight: 700,
                            color: "#274fdb",
                        }}
                    >
                        <span>Poπ</span>
                        <span
                            style={{
                                fontSize: 22,
                                fontWeight: 600,
                                color: "#53617c",
                            }}
                        >
                            San Juan · Presencial y online
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                fontSize: 62,
                                lineHeight: 1.08,
                                fontWeight: 700,
                            }}
                        >
                            Clases particulares de Matemática
                        </div>
                        <div
                            style={{
                                display: "flex",
                                fontSize: 27,
                                lineHeight: 1.4,
                                color: "#53617c",
                            }}
                        >
                            Secundaria · Ingresos · Universidad
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        right: 100,
                        top: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 280,
                        height: 280,
                        borderRadius: "50%",
                        border: "2px solid rgba(39, 79, 219, 0.22)",
                        background: "rgba(255,255,255,0.72)",
                        fontSize: 150,
                        fontWeight: 700,
                        color: "#274fdb",
                    }}
                >
                    π
                </div>
            </div>
        ),
        size,
    );
}
