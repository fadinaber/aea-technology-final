import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function OpenGraphImage() {
  // Load logo from local file system and convert to data URL
  let logoDataUrl: string | null = null
  try {
    const logoPath = join(process.cwd(), "public", "images", "design-mode", "5fecf0649903fbea970aeb38_AEA-Logo-4c.png")
    const logoBuffer = await readFile(logoPath)
    const base64 = logoBuffer.toString("base64")
    logoDataUrl = `data:image/png;base64,${base64}`
  } catch (error) {
    console.error("Failed to load logo:", error)
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo centered and prominent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "60px",
          }}
        >
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              width={800}
              height={400}
              style={{ 
                objectFit: "contain",
                maxWidth: "90%",
                maxHeight: "90%",
              }}
              alt="AEA Technology, Inc."
            />
          ) : (
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#1e40af",
                textAlign: "center",
              }}
            >
              AEA Technology, Inc.
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}


