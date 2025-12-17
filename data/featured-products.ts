export interface FeaturedProduct {
  id: string
  name: string
  description: string
  image: string
  category: string
  features: string[]
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "e20-20-avionics",
    name: "E20/20 Avionics TDR Kit",
    description: "Complete aviation cable testing solution with precision fault location capabilities",
    image: "/images/avionics-tdr-kit.png",
    category: "Aviation",
    features: ["Sub-meter accuracy", "Rugged field design", "Aviation-specific connectors"],
  },
  {
    id: "via-bravo-mri-3000",
    name: "Bravo MRI-3000 Analyzer",
    description: "Specialized RF testing for medical environments and MRI facility compliance",
    image: "/images/featured/bravo-mri.jpg",
    category: "Medical",
    features: ["MRI-safe design", "MRI System Alignment", "Precision analysis"],
  },
  {
    id: "e20-20n",
    name: "E20/20N TDR",
    description: "Enhanced Step TDR for broadcast transmission line testing and network analysis",
    image: "/images/featured/e20-20-tdr.png",
    category: "Broadcast",
    features: ["High resolution", "Network diagnostics", "Fast fault location"],
  },
  {
    id: "swr-site-analyzer",
    name: "SWR Site Analyzer",
    description: "Field-ready analyzer for comprehensive site testing and analysis",
    image: "/images/featured/swr-analyzer.png",
    category: "Field Testing",
    features: ["Portable design", "Wide frequency range", "Real-time analysis"],
  },
]
