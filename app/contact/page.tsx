import type { Metadata } from "next"
import ContactPageClient from "./contact-client"

const products = [
  "E20/20B Network TDR (RF/VDV)",
  "E20/20 Avionics TDR Kit",
  "E20/20F CATV Network TDR",
  "E20/20N TDR (Broadcast)",
  "Bravo MRI-3000 Analyzer",
  "VIA Bravo EX2",
  "SWR Site Analyzer",
  "Other",
]

export const metadata: Metadata = {
  title: "Contact AEA Technology - Get a Quote, Sales & Technical Support",
  description:
    "Contact AEA Technology for RF test equipment quotes, sales inquiries, and technical support. Reach us at 1-800-258-7805. Located in Carlsbad, CA. Open Monday-Friday 7:30am-4:30pm PST.",
  keywords: [
    "contact AEA Technology",
    "get a quote",
    "TDR quote",
    "VNA quote",
    "technical support",
    "sales inquiry",
    "Carlsbad California",
    "1-800-258-7805",
  ],
  openGraph: {
    title: "Contact AEA Technology - Quotes, Sales & Support",
    description:
      "Get in touch with our sales and technical support team. Request quotes for TDRs, VNAs, and SWR meters.",
    url: "https://aeatechnology.com/contact",
  },
  alternates: {
    canonical: "https://aeatechnology.com/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient products={products} />
}
