/**
 * Site Configuration - CMS Ready
 *
 * This file contains all site-wide configuration data.
 * In a CMS setup, this would be fetched from your CMS API.
 */

// ============================================================
// TYPES
// ============================================================

export interface NavLink {
  label: string
  href: string
  isDropdown?: boolean
  dropdownType?: "products" | "resources"
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ContactInfo {
  phone: {
    local: string
    tollFree: string
  }
  fax?: string
  emails: {
    sales: string
    support: string
    general?: string
  }
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  hours: {
    days: string
    time: string
    timezone: string
  }
}

export interface FooterSection {
  title: string
  links: {
    label: string
    href: string
    external?: boolean
  }[]
}

export interface SiteConfig {
  siteName: string
  siteUrl: string
  tagline: string
  description: string
  logo: {
    light: string
    dark?: string
    alt: string
  }
  navigation: {
    main: NavLink[]
    mobile: NavLink[]
  }
  contact: ContactInfo
  social: SocialLink[]
  footer: {
    sections: FooterSection[]
    copyright: string
    legalLinks: {
      label: string
      href: string
    }[]
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
    keywords: string[]
    ogImage: string
  }
}

// ============================================================
// SITE CONFIGURATION DATA
// ============================================================

export const siteConfig: SiteConfig = {
  siteName: "AEA Technology",
  siteUrl: "https://aeatechnology.com",
  tagline: "Professional RF Testing Equipment",
  description:
    "Designing and manufacturing precision RF and cable testing equipment for over 30 years. Trusted by professionals worldwide.",

  logo: {
    light: "/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png",
    alt: "AEA Technology Logo",
  },

  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Products", href: "/products", isDropdown: true, dropdownType: "products" },
      { label: "Resources", href: "/resources", isDropdown: true, dropdownType: "resources" },
      { label: "Contact", href: "/contact" },
    ],
    mobile: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },

  contact: {
    phone: {
      local: "(760) 931-8979",
      tollFree: "1-(800) 258-7805",
    },
    emails: {
      sales: "SALES@AEATECHNOLOGY.COM",
      support: "TECHSUPPORT@AEATECHNOLOGY.COM",
    },
    address: {
      street: "5933 Sea Lion Place, Ste 112",
      city: "Carlsbad",
      state: "CA",
      zip: "92010",
      country: "United States",
    },
    hours: {
      days: "Monday-Friday",
      time: "7:30 am – 4:30 pm",
      timezone: "PST",
    },
  },

  social: [
    // Add social links when available
    // { platform: "LinkedIn", url: "https://linkedin.com/company/aeatechnology", icon: "Linkedin" },
    // { platform: "YouTube", url: "https://youtube.com/aeatechnology", icon: "Youtube" },
  ],

  footer: {
    sections: [
      {
        title: "Products",
        links: [
          { label: "Time Domain Reflectometers", href: "/products#tdrs" },
          { label: "Network Analyzers (VNAs) & SWR Meters", href: "/products#vnas-swr" },
          { label: "View All Products", href: "/products" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Resource Hub", href: "/resources" },
          { label: "Software Downloads", href: "/resources#software" },
          { label: "Manuals & Documentation", href: "/resources#manuals" },
          { label: "Training Videos", href: "/resources#videos" },
          { label: "FAQs", href: "/resources#faqs" },
        ],
      },
    ],
    copyright: "© 2025 AEA Technology. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },

  seo: {
    defaultTitle: "AEA Technology",
    titleTemplate: "%s | AEA Technology",
    defaultDescription:
      "Professional RF testing equipment designed and manufactured in the USA. TDRs, VNAs, and SWR analyzers for aviation, military, and telecommunications.",
    keywords: [
      "TDR",
      "Time Domain Reflectometer",
      "VNA",
      "Vector Network Analyzer",
      "SWR Meter",
      "RF Testing",
      "Cable Testing",
      "Aviation Testing",
      "AEA Technology",
    ],
    ogImage: "/images/og-image.png",
  },
}

// Helper functions for easy access
export const getNavigation = () => siteConfig.navigation
export const getContact = () => siteConfig.contact
export const getFooter = () => siteConfig.footer
export const getSEO = () => siteConfig.seo
