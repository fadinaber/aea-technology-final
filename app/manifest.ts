import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AEA Technology - TDR, VNA & SWR Test Equipment",
    short_name: "AEA Technology",
    description: "Professional RF and cable testing equipment. Time Domain Reflectometers, Vector Network Analyzers, and SWR meters American Made (Made in USA).",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

