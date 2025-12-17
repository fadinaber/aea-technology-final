// Press Releases Data - CMS Ready
// Extracted from app/press/press-page-client.tsx for headless CMS preparation

export interface PressRelease {
  id: string
  title: string
  date: string // Format: "MONTH YEAR" for display
  dateISO?: string // ISO date for sorting/filtering
  description: string
  featured?: boolean
  image?: string
  externalUrl?: string // For linking to external press coverage
}

export interface MediaContact {
  email: string
  buttonText: string
}

export interface PressPageData {
  meta: {
    title: string
    description: string
  }
  headline: string
  subheadline: string
  pressReleases: PressRelease[]
  mediaContact: MediaContact
}

export const pressPageData: PressPageData = {
  meta: {
    title: "Press Releases & News",
    description:
      "Stay updated with the latest news, product announcements, and company milestones from AEA Technology.",
  },
  headline: "Press Releases & News",
  subheadline: "Stay updated with the latest news, product announcements, and company milestones from AEA Technology.",
  pressReleases: [
    {
      id: "south-pole-icecube-2010",
      title: "AEA Technology's 20/20 TDRs chosen for work at the South Pole",
      date: "APRIL 2010",
      dateISO: "2010-04-01",
      description:
        "Project IceCube is a massive undertaking by an international team of scientists and engineers to bury a neutrino tracking sensor array into extremely pure ice at the South Pole. Critical to retrieving the data are the cables connecting the strings of sensors buried over a mile deep in the ice. Project IceCube selected AEA Technology's 20/20 TDR to test those cables and connections.",
      featured: true,
      image: "/images/south-pole-aea.jpg",
    },
    {
      id: "new-website-2015",
      title: "AEA Technology, Inc. Releases New Mobile Responsive Site and Dedicated Help Desk for Users",
      date: "NOVEMBER 2015",
      dateISO: "2015-11-01",
      description:
        "AEA Technology, Inc. is proud to announce the unveiling of its refreshed and updated website. The new site has a brighter layout with easier navigation, and new features such as our sales and help desks. The site is optimized for newer mobile devices like tablets and Android or Apple iOS smart phones.",
    },
    {
      id: "boeing-approval-2015",
      title: "Boeing Company Approves AEA Technology, Inc. E20/20 TDR Avionics Kit",
      date: "OCTOBER 2015",
      dateISO: "2015-10-01",
      description:
        "The Boeing Company, after a thorough evaluation, has approved the AEA Technology, Inc. E20/20 TDR Avionics Kit for testing and troubleshooting all types of wiring on their aircraft.",
    },
    {
      id: "navy-hawt-evaluation-2013",
      title:
        "AEA Technology, Inc. and Exelis successfully pass US Navy's evaluation for the Hand-held Aircraft Wire Tester (HAWT) Contract",
      date: "JULY 2013",
      dateISO: "2013-07-01",
      description:
        'On February 7, 2013, AEA Technology, Inc. in partnership with ITT Exelis was informed by NAVAIR Lakehurst, NJ, that the final technical evaluation results concluded "The Hand-held Aircraft Wire Tester (HAWT) is deemed suitable and recommended for fleet use."',
    },
    {
      id: "iso-certification-2013",
      title: "AEA Technology, Inc. is now ISO 9001-2008 Certified",
      date: "MARCH 2013",
      dateISO: "2013-03-01",
      description:
        "On January 7, 2013, AEA Technology, Inc. received official notice it had successfully completed all requirements and audits to be certified as an ISO 9001-2008 company. Certification was accomplished by NSF International Strategic Registrations. Certificate number CO124155-IS1 was issued on January 8, 2013.",
    },
    {
      id: "navy-hawt-contract-2012",
      title: "AEA Technology, Inc. and ITT Exelis win US Navy Hand-held Aircraft Wire Tester (HAWT) Contract",
      date: "JULY 2012",
      dateISO: "2012-07-01",
      description:
        "On November 30, 2012, AEA Technology, Inc. in partnership with ITT Exelis were awarded a multi-year contract to provide the US Navy with a Hand-held Aircraft Wire Tester (HAWT). The HAWT is a complete kit with aircraft specific test leads and other accessories. At its core is AEA Technology's E20/20 TDR modified per NAVAIR specifications.",
    },
    {
      id: "e20-20-release-2012",
      title: "New E20/20 Step Time Domain Reflectometer (TDR) is Released",
      date: "JULY 2012",
      dateISO: "2012-07-01",
      description:
        'AEA Technology, Inc. is proud to introduce our latest new product, the E20/20 Step TDR. "E" standing for the "Enhanced" version of our 20/20 TDR. The new E20/20 TDR replaces our 20/20 TDR which has been on the market for eight years, pioneered a path for hand-held Step TDRs, and has gained steadily in popularity and a loyal following among its users.',
    },
  ],
  mediaContact: {
    email: "info@aeatech.com",
    buttonText: "Contact Us",
  },
}

// Helper functions for CMS integration
export const getPressPageData = () => pressPageData
export const getPressReleases = () => pressPageData.pressReleases
export const getFeaturedPressReleases = () => pressPageData.pressReleases.filter((pr) => pr.featured)
export const getPressReleaseById = (id: string) => pressPageData.pressReleases.find((pr) => pr.id === id)
