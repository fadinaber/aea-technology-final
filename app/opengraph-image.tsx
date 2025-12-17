import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1220 0%, #0f1a33 55%, #0b1220 100%)",
          color: "#ffffff",
          position: "relative",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 55%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0) 55%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            padding: "64px 80px",
            borderRadius: 28,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            zIndex: 1,
          }}
        >
          <img
            src="https://aeatechnology.com/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png"
            width={520}
            height={170}
            style={{ objectFit: "contain" }}
            alt="AEA Technology"
          />

          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", textAlign: "center" }}>
            TDR • VNA • SWR Test Equipment
          </div>
          <div style={{ fontSize: 22, opacity: 0.9, textAlign: "center" }}>
            Designed &amp; manufactured in the USA since 1990
          </div>
        </div>
      </div>
    ),
    size,
  )
}


