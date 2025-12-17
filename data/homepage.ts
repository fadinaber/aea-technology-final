/**
 * Homepage Data - CMS Ready (Page Builder Pattern)
 *
 * This file structures the homepage as a list of sections,
 * enabling a "Page Builder" approach in the CMS.
 * Each section has a type and corresponding data.
 */

// ============================================================
// SECTION TYPES
// ============================================================

export type SectionType =
  | "hero"
  | "featured-products"
  | "why-choose-us"
  | "resources-teaser"
  | "testimonials"
  | "cta-banner"

export interface BaseSection {
  id: string
  type: SectionType
  enabled: boolean
  order: number
}

// ============================================================
// HERO SECTION
// ============================================================

export interface HeroBadge {
  text: string
  icon: string
  variant: "default" | "primary" | "success"
}

export interface HeroStat {
  number: string
  label: string
  sublabel: string
}

export interface HeroValueProp {
  text: string
  icon: string
}

export interface HeroFeaturedProduct {
  slug: string
  name: string
  description: string
  image: string
  badge: string
}

export interface HeroSection extends BaseSection {
  type: "hero"
  data: {
    badges: HeroBadge[]
    headline: {
      line1: string
      line2: string
      line3: string
    }
    description: string
    valuePropositions: HeroValueProp[]
    cta: {
      primary: { text: string; href: string }
      secondary: { text: string; href: string }
    }
    stats: HeroStat[]
    featuredProduct: HeroFeaturedProduct
  }
}

// ============================================================
// FEATURED PRODUCTS SECTION
// ============================================================

export interface FeaturedProductItem {
  id: string
  name: string
  description: string
  image: string
  category: string
  features: string[]
}

export interface FeaturedProductsSection extends BaseSection {
  type: "featured-products"
  data: {
    badge: string
    headline: string
    description: string
    products: FeaturedProductItem[]
    cta: { text: string; href: string }
  }
}

// ============================================================
// WHY CHOOSE US SECTION
// ============================================================

export interface FeatureCardItem {
  title: string
  description: string
  image: string
  icon: string
  iconColor: string
  bgColor: string
  stat: string
  statIcon: string
}

export interface CertificationItem {
  name: string
  image: string
  link: string | null
  isDownload?: boolean
}

export interface WhyChooseUsSection extends BaseSection {
  type: "why-choose-us"
  data: {
    badge: string
    headline: { line1: string; line2: string }
    description: string
    mainFeature: {
      title: string
      badge: string
      description: string
      image: string
    }
    featureCards: FeatureCardItem[]
    certifications: {
      headline: string
      description: string
      items: CertificationItem[]
    }
  }
}

// ============================================================
// RESOURCES TEASER SECTION
// ============================================================

export interface ResourceTypeItem {
  title: string
  description: string
  icon: string
  count: string
}

export interface ResourcesTeaserSection extends BaseSection {
  type: "resources-teaser"
  data: {
    headline: string
    description: string
    resourceTypes: ResourceTypeItem[]
    cta: { text: string; href: string }
  }
}

// ============================================================
// UNION TYPE FOR ALL SECTIONS
// ============================================================

export type HomepageSection = HeroSection | FeaturedProductsSection | WhyChooseUsSection | ResourcesTeaserSection

// ============================================================
// HOMEPAGE DATA
// ============================================================

export const homepageData: {
  meta: {
    title: string
    description: string
  }
  sections: HomepageSection[]
} = {
  meta: {
    title: "Professional RF Testing Equipment",
    description:
      "AEA Technology - Designing and manufacturing precision RF and cable testing equipment for over 30 years.",
  },
  sections: [
    // --------------------------------------------------------
    // HERO SECTION
    // --------------------------------------------------------
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 1,
      data: {
        badges: [
          { text: "Made in USA", icon: "Flag", variant: "default" },
          { text: "ISO 9001", icon: "Shield", variant: "primary" },
        ],
        headline: {
          line1: "Professional",
          line2: "RF Testing",
          line3: "Equipment",
        },
        description:
          "Trusted by aviation, military, and telecommunications professionals for over 30 years. Precision instruments designed and manufactured in the USA for critical applications.",
        valuePropositions: [
          { text: "Sub-meter accuracy", icon: "CheckCircle" },
          { text: "Field-proven reliability", icon: "CheckCircle" },
          { text: "Expert technical support", icon: "CheckCircle" },
          { text: "Comprehensive warranties", icon: "CheckCircle" },
        ],
        cta: {
          primary: { text: "Browse Equipment", href: "/products" },
          secondary: { text: "Request Quote", href: "/contact" },
        },
        stats: [
          { number: "30+", label: "Years", sublabel: "In Business" },
          { number: "1000+", label: "Global", sublabel: "Customers" },
          { number: "Expert", label: "Technical", sublabel: "Support" },
        ],
        featuredProduct: {
          slug: "e20-20-avionics",
          name: "Avionics TDR Kit",
          description: "Professional aviation cable testing with precision fault location capabilities",
          image: "/images/products/avionics/full-kit.png",
          badge: "Aviation Grade",
        },
      },
    },

    // --------------------------------------------------------
    // FEATURED PRODUCTS SECTION
    // --------------------------------------------------------
    {
      id: "featured-products",
      type: "featured-products",
      enabled: true,
      order: 2,
      data: {
        badge: "Featured Products",
        headline: "Professional Testing Solutions",
        description:
          "Discover our most popular testing instruments, each designed for specific applications and built to deliver exceptional performance in demanding environments.",
        products: [
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
        ],
        cta: { text: "View All Products", href: "/products" },
      },
    },

    // --------------------------------------------------------
    // WHY CHOOSE US SECTION
    // --------------------------------------------------------
    {
      id: "why-choose-us",
      type: "why-choose-us",
      enabled: true,
      order: 3,
      data: {
        badge: "Why Choose AEA Technology",
        headline: {
          line1: "The Standard for",
          line2: "RF Testing Excellence",
        },
        description:
          "Three decades of innovation, precision, and unwavering commitment to quality have made us the trusted choice for professionals worldwide.",
        mainFeature: {
          title: "Made in USA",
          badge: "American Made",
          description:
            "Every AEA Technology instrument is proudly designed, manufactured, and assembled in the United States. This commitment ensures the highest quality standards while supporting American manufacturing excellence and providing you with equipment you can trust.",
          image: "/images/made-in-usa-flag.png",
        },
        featureCards: [
          {
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
            title: "Global Recognition",
            description: "Trusted by aerospace, defense, and telecommunications companies worldwide.",
            image: "/images/design-mode/740.jpg",
            icon: "Users",
            iconColor: "text-primary",
            bgColor: "bg-primary/10",
            stat: "1000+ Global Customers",
            statIcon: "Check",
          },
        ],
        certifications: {
          headline: "Industry Certifications",
          description: "Recognized by leading industry standards and accreditation bodies",
          items: [
            {
              name: "ISO 9001 Certificate",
              image: "/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf",
              link: "/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf",
              isDownload: true,
            },
          ],
        },
      },
    },

    // --------------------------------------------------------
    // RESOURCES TEASER SECTION
    // --------------------------------------------------------
    {
      id: "resources-teaser",
      type: "resources-teaser",
      enabled: true,
      order: 4,
      data: {
        headline: "Comprehensive Support Resources",
        description:
          "Access everything you need to get the most out of your AEA Technology equipment. From software downloads to training materials, we've got you covered.",
        resourceTypes: [
          {
            title: "Software Downloads",
            description: "Latest firmware and utility software",
            icon: "Download",
            count: "10+ Downloads",
          },
          {
            title: "Documentation",
            description: "User manuals and technical guides",
            icon: "FileText",
            count: "20+ Documents",
          },
          {
            title: "Training Videos",
            description: "Tutorials and how-to guides",
            icon: "Play",
            count: "15+ Videos",
          },
        ],
        cta: { text: "Visit Resource Hub", href: "/resources" },
      },
    },
  ],
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export const getHomepageSections = () =>
  homepageData.sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order)

export const getSectionById = <T extends HomepageSection>(id: string): T | undefined =>
  homepageData.sections.find((s) => s.id === id) as T | undefined

export const getHomepageMeta = () => homepageData.meta
