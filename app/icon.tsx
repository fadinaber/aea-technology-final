import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

// Next.js will automatically generate different sizes from this
// For Google search results, we need at least 32x32, but Next.js handles multiple sizes
export const size = {
  width: 512,
  height: 512,
}

export const contentType = "image/png"

export default async function Icon() {
  // Load logo from local file system and convert to data URL
  let logoDataUrl: string | null = null
  try {
    const logoPath = join(process.cwd(), "public", "images", "design-mode", "5fecf0649903fbea970aeb38_AEA-Logo-4c.png")
    const logoBuffer = await readFile(logoPath)
    const base64 = logoBuffer.toString("base64")
    logoDataUrl = `data:image/png;base64,${base64}`
  } catch (error) {
    console.error("Failed to load logo for icon:", error)
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
          padding: "20%",
        }}
      >
        {logoDataUrl ? (
          <img
            src={logoDataUrl}
            width={512}
            height={512}
            style={{ 
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
            alt="AEA Technology"
          />
        ) : (
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              color: "#1e40af",
              textAlign: "center",
            }}
          >
            AEA
          </div>
        )}
      </div>
    ),
    {
      ...size,
    },
  )
}

