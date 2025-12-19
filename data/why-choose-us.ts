export interface FeatureCard {
  id: string
  title: string
  description: string
  image: string
  icon: string
  iconColor: string
  bgColor: string
  stat: string
  statIcon: string
}

export interface Certification {
  id: string
  name: string
  image: string
  link: string | null
  isDownload?: boolean
}

export const mainFeature = {
  id: "made-in-usa",
  title: "Made in USA",
  badge: "American Made",
  description:
    "Every AEA Technology instrument is proudly designed, manufactured, and assembled in the United States. This commitment ensures the highest quality standards while supporting American manufacturing excellence and providing you with equipment you can trust.",
  image: "/images/made-in-usa-soldier.png",
}

export const featureCards: FeatureCard[] = [
  {
    id: "uncompromising-quality",
    title: "Uncompromising Quality",
    description:
      "Premium components and rigorous testing procedures ensure every instrument meets our exacting standards.",
    image: "/images/quality-testing-lab.png",
    icon: "Shield",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
    stat: "99.9% Reliability Rate",
    statIcon: "Check",
  },
  {
    id: "decades-expertise",
    title: "Decades of RF Expertise",
    description: "Over 30 years of specialized experience in RF testing, understanding unique challenges.",
    image: "/images/rf-expertise-engineer.png",
    icon: "Award",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    stat: "30+ Years Experience",
    statIcon: "Clock",
  },
  {
    id: "global-recognition",
    title: "Global Recognition",
    description: "Trusted by aerospace, defense, and telecommunications companies worldwide.",
    image: "/images/global-night-map.jpg",
    icon: "Users",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    stat: "1000+ Global Customers",
    statIcon: "Check",
  },
]

export const certifications: Certification[] = [
  {
    id: "iso-9001-certificate",
    name: "ISO 9001 Certificate",
    image: "/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf",
    link: "/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf",
    isDownload: true,
  },
  {
    id: "anab-accredited",
    name: "ANAB Accredited",
    image: "/images/design-mode/ANAB-MS-CB-3C.png",
    link: "https://anab.ansi.org/",
    isDownload: false,
  },
]

// Helper functions for CMS integration
export const getMainFeature = () => mainFeature
export const getFeatureCards = () => featureCards
export const getCertifications = () => certifications
export const getFeatureCardById = (id: string) => featureCards.find((f) => f.id === id)
