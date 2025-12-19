// About Page Data - CMS Ready
// Extracted from app/about/about-page-client.tsx for headless CMS preparation

export interface CoreValue {
  id: string
  icon: string // Icon component name for dynamic rendering
  title: string
  description: string
  highlight: string
}

export interface Industry {
  id: string
  name: string
  icon: string
  description: string
  customers: string
}

export interface LeadershipProfile {
  id: string
  name: string
  title: string
  subtitle: string
  image: string
  quote: string
  bio: string[]
  tagline: string
}

export interface CompanyStory {
  mission: {
    title: string
    icon: string
    content: string
  }
  vision: {
    title: string
    icon: string
    content: string
  }
  history: string[]
}

export interface CertificationDisplay {
  id: string
  name: string
  image: string
  link: string | null
  width: number
  height: number
  isDownload?: boolean
}

export interface AboutPageData {
  meta: {
    title: string
    description: string
  }
  leadership: LeadershipProfile
  companyStory: CompanyStory
  coreValues: CoreValue[]
  industries: Industry[]
  certifications: {
    headline: string
    description: string
    items: CertificationDisplay[]
  }
  cta: {
    headline: string
    description: string
    primaryButton: { text: string; href: string }
    secondaryButton: { text: string; href: string }
  }
}

export const aboutPageData: AboutPageData = {
  meta: {
    title: "About AEA Technology",
    description:
      "Learn about AEA Technology's 30+ years of RF testing excellence, American manufacturing, and commitment to quality.",
  },
  leadership: {
    id: "george-naber",
    name: "George Naber",
    title: "President & CEO",
    subtitle: "Founder & Visionary Leader",
    image: "/images/design-mode/5fecf0649903fb854a0aeb17_AEA%20Staff%20george.png",
    quote: "The only thing better than the product you receive is the support from our amazing staff.",
    bio: [
      "George Naber embodies the true American success story, an entrepreneur who believed in his vision to create and grow a business focused on commercial RF cable testing markets. With over 30 years of executive experience in manufacturing and engineering operations, George has built AEA Technology into a recognized industry leader.",
    ],
    tagline: '"Testing Made Simple!" — Our commitment to excellence in every interaction.',
  },
  companyStory: {
    mission: {
      title: "Our Mission",
      icon: "Award",
      content:
        "To design and manufacture the world's most reliable RF and cable testing equipment, empowering professionals with precision tools that ensure critical infrastructure operates flawlessly.",
    },
    vision: {
      title: "Our Vision",
      icon: "Zap",
      content:
        "To be the global standard for RF testing technology, recognized for innovation, quality, and integrity, backed by decades of proven performance and American manufacturing excellence.",
    },
    history: [
      "Founded in 1990, AEA Technology emerged from a powerful vision: to create the most reliable and accurate RF testing equipment available. What began as a small engineering company has evolved into a respected industry leader, serving customers across aviation, military, medical, telecommunications, and broadcast sectors.",
      "Our journey started with the development of our first Time Domain Reflectometer, designed to meet the exacting standards of the aviation industry. This initial success established our reputation for precision engineering and unwavering commitment to quality. These are values that continue to drive us today.",
      "Today, AEA Technology continues to innovate while maintaining our core principles: American manufacturing, exceptional quality, and dedicated customer support. Every product represents decades of expertise and our ongoing commitment to excellence.",
    ],
  },
  coreValues: [
    {
      id: "american-manufacturing",
      icon: "Flag",
      title: "American Manufacturing Excellence",
      description:
        "Every product designed, manufactured, and assembled in the United States with premium components and rigorous quality control.",
      highlight: "Made in USA",
    },
    {
      id: "quality-reliability",
      icon: "Shield",
      title: "Uncompromising Quality & Reliability",
      description:
        "Decades of field-proven performance with instruments built to withstand demanding conditions while maintaining precision.",
      highlight: "Field-Proven",
    },
    {
      id: "industry-expertise",
      icon: "Award",
      title: "Industry-Leading Expertise",
      description:
        "Over 30 years of specialized RF and cable testing experience, with ANAB accreditation and industry certifications.",
      highlight: "Expert Certified",
    },
    {
      id: "customer-centric",
      icon: "Users",
      title: "Customer-Centric Philosophy",
      description:
        "Building lasting partnerships through exceptional support, from initial consultation to ongoing technical assistance.",
      highlight: "Partnership Focused",
    },
  ],
  industries: [
    {
      id: "aviation-aerospace",
      name: "Aviation & Aerospace",
      icon: "✈️",
      description: "Critical cable testing for aircraft systems",
      customers: "Airbus, Military, Airlines",
    },
    {
      id: "medical-mri",
      name: "Medical & MRI",
      icon: "🏥",
      description: "RF testing for medical environments",
      customers: "Hospitals, MRI Centers",
    },
    {
      id: "telecommunications",
      name: "Telecommunications",
      icon: "📡",
      description: "Network infrastructure testing",
      customers: "Telecom Providers",
    },
    {
      id: "broadcast-media",
      name: "Broadcast & Media",
      icon: "📺",
      description: "Transmission line testing",
      customers: "TV/Radio Stations",
    },
    {
      id: "military-defense",
      name: "Military & Defense",
      icon: "🛡️",
      description: "Rugged testing for defense applications",
      customers: "DoD, Contractors",
    },
    {
      id: "research-development",
      name: "Research & Development",
      icon: "🔬",
      description: "Precision testing for R&D labs",
      customers: "Universities, Labs",
    },
  ],
  certifications: {
    headline: "Quality & Certifications",
    description: "Certified excellence backed by industry-leading standards and accreditations",
    items: [
      {
        id: "iso-9001",
        name: "ISO 9001:2015 Certificate",
        image: "/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf",
        link: "/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf",
        width: 140,
        height: 140,
        isDownload: true,
      },
      {
        id: "anab-accredited",
        name: "ANAB Accredited",
        image: "/images/design-mode/ANAB-MS-CB-3C.png",
        link: "https://anab.ansi.org/",
        width: 140,
        height: 140,
        isDownload: false,
      },
      {
        id: "made-in-usa",
        name: "Made in USA",
        image: "/images/design-mode/made%20in%20usa.jpg.jpeg",
        link: null,
        width: 100,
        height: 80,
        isDownload: false,
      },
    ],
  },
  cta: {
    headline: "Ready to Experience the AEA Technology Difference?",
    description:
      "Join thousands of professionals who trust their critical measurements to AEA Technology. Let our experts help you find the perfect testing solution.",
    primaryButton: { text: "Get Expert Consultation", href: "/contact" },
    secondaryButton: { text: "Browse Products", href: "/products" },
  },
}

// Helper functions for CMS integration
export const getAboutPageData = () => aboutPageData
export const getCoreValues = () => aboutPageData.coreValues
export const getIndustries = () => aboutPageData.industries
export const getLeadership = () => aboutPageData.leadership
