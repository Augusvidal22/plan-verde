import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Plan Verde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #C9E7D6 0%, #FFFDF8 55%, #FFFDF8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 150 }}>🌿</div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#1C1C1C",
            marginTop: 8,
          }}
        >
          Plan Verde
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            color: "#1C1C1CAA",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Elegí una carta y descubrí nuestro próximo plan ✨
        </div>
      </div>
    ),
    { ...size, emoji: "twemoji" }
  );
}
