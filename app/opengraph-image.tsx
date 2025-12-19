import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function OpenGraphImage() {
  // Use absolute URL for the logo
  const logoUrl = "https://aeatechnology.com/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
          color: "#1e293b",
          position: "relative",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        }}
      >
        {/* Subtle background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 55%), radial-gradient(circle at 80% 70%, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 55%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            padding: "80px 100px",
            zIndex: 1,
          }}
        >
          {/* Logo - larger and more prominent */}
          <img
            src={logoUrl}
            width={600}
            height={200}
            style={{ objectFit: "contain" }}
            alt="AEA Technology, Inc."
          />

          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              textAlign: "center",
              color: "#475569",
              marginTop: 8,
            }}
          >
            Professional RF &amp; Cable Test Equipment
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#64748b",
              textAlign: "center",
              marginTop: -8,
            }}
          >
            TDR • VNA • SWR Meters
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [],
    },
  )
}


