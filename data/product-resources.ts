// Product Resources Data - Links manuals and documents to products
// This data can be managed in Sanity CMS for easy editing

export interface ProductResourceItem {
  type: "manual" | "guide" | "video" | "datasheet" | "application-note" | "firmware" | "software" | "training" | "faq"
  title: string
  description?: string
  // File paths - use one of these
  localPath?: string // Path in /public folder (e.g., /documents/manuals/6021/filename.pdf)
  url?: string // External URL (YouTube, Google Drive, etc.)
  // Video-specific
  thumbnailUrl?: string
  duration?: string
  // File metadata
  fileSize?: string
}

// Mapping of product slugs to their resources
export const productResourcesMap: Record<string, ProductResourceItem[]> = {
  // ===============================
  // E20/20N TDR (shares resources with Avionics)
  // ===============================
  "e20-20n": [
    // Videos
    {
      type: "video",
      title: "Introduction to AEA Technology's E20/20 Step TDRs",
      description: "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
      url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
      thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
      duration: "4:13",
    },
    {
      type: "video",
      title: "How TDRs Work",
      description: "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
      url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
      thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
      duration: "3:58",
    },
    {
      type: "video",
      title: "The Advantages of Using Step TDR Technology",
      description: "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
      url: "https://www.youtube.com/watch?v=gFivwDvYSXs",
      thumbnailUrl: "https://img.youtube.com/vi/gFivwDvYSXs/hqdefault.jpg",
      duration: "4:38",
    },
    {
      type: "video",
      title: "E20/20 TDRs' Menus",
      description: "Describes the menus, menu navigation, and available testing and setup features.",
      url: "https://www.youtube.com/watch?v=PmCPHc6uXTc",
      thumbnailUrl: "https://img.youtube.com/vi/PmCPHc6uXTc/hqdefault.jpg",
      duration: "5:12",
    },
    {
      type: "video",
      title: "E20/20 TDRs' Function Keys",
      description: "Describes the Function Keys actions, features and uses.",
      url: "https://www.youtube.com/watch?v=FT0WLpiiM5k",
      thumbnailUrl: "https://img.youtube.com/vi/FT0WLpiiM5k/hqdefault.jpg",
      duration: "6:45",
    },
    {
      type: "video",
      title: "ETDR PC Vision Software",
      description: "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
      url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
      thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
      duration: "8:30",
    },
    {
      type: "video",
      title: "Coaxial Cable Testing",
      description: "Describes various setups and testing examples on coax cables. Also shows some common coax cable faults.",
      url: "https://www.youtube.com/watch?v=cOyJnAZ--WM",
      thumbnailUrl: "https://img.youtube.com/vi/cOyJnAZ--WM/hqdefault.jpg",
      duration: "10:15",
    },
    // Manuals & Guides (shared with Avionics - 6021 folder)
    {
      type: "manual",
      title: "E20/20 and Avionics TDR Operator Manual",
      description: "Complete operator manual with setup guides, operation instructions, and troubleshooting (May 2025 with LHT Note)",
      localPath: "/documents/manuals/6021/E2020_and_Avionics_TDR_Operator_Manual-05 2025 with LHT Note.pdf",
      fileSize: "12.4 MB",
    },
    {
      type: "guide",
      title: "E20/20 and Avionics TDR Quick Start Guide",
      description: "Quick reference guide for getting started with your E20/20 or Avionics TDR",
      localPath: "/documents/manuals/6021/6021-3010 E2020 and Avionics TDR QSG Rev May 2016 WEB.pdf",
      fileSize: "3.2 MB",
    },
    {
      type: "guide",
      title: "E20/20 Avionics TDR Basic Guide",
      description: "Basic operation guide covering essential functions and measurements",
      localPath: "/documents/manuals/6021/E2020_Avionics_TDR_Basic_Guide_ Aug 2022.pdf",
      fileSize: "4.8 MB",
    },
    {
      type: "training",
      title: "Avionics Kit & Avionics TDR Training Presentation",
      description: "Comprehensive training presentation covering product features and testing procedures",
      localPath: "/documents/manuals/6021/Avionics Kit & Avionics TDR Training.ppt",
      fileSize: "8.5 MB",
    },
    {
      type: "training",
      title: "Introduction to Avionics TDR",
      description: "Interactive presentation introducing Avionics TDR capabilities and applications",
      localPath: "/documents/manuals/6021/Intoduction to Avionics TDR.ppsx",
      fileSize: "6.2 MB",
    },
    // Software
    {
      type: "software",
      title: "ETDR PC Vision™ Software",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities",
      localPath: "/documents/software/TDR_PC_Vision/setup_2023_2.exe",
      fileSize: "85 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "E20/20 General Data Sheet",
      description: "Complete specifications and features for E20/20 TDR series",
      localPath: "/documents/datasheets/E2020 General Data Sheet Nov 2025.pdf",
      fileSize: "1.2 MB",
    },
  ],

  // ===============================
  // Avionics TDR Kit (shares resources with E20/20)
  // ===============================
  "e20-20-avionics": [
    // Videos
    {
      type: "video",
      title: "Aircraft Wire Testing",
      description: "Shows how to test single-wires in aircraft wiring harnesses using AEA Technology's Avionics step TDR.",
      url: "https://www.youtube.com/watch?v=HN__xjMtXl0",
      thumbnailUrl: "https://img.youtube.com/vi/HN__xjMtXl0/hqdefault.jpg",
      duration: "9:45",
    },
    {
      type: "video",
      title: "Introduction to AEA Technology's E20/20 Step TDRs",
      description: "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
      url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
      thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
      duration: "4:13",
    },
    {
      type: "video",
      title: "How TDRs Work",
      description: "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
      url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
      thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
      duration: "3:58",
    },
    {
      type: "video",
      title: "The Advantages of Using Step TDR Technology",
      description: "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
      url: "https://www.youtube.com/watch?v=gFivwDvYSXs",
      thumbnailUrl: "https://img.youtube.com/vi/gFivwDvYSXs/hqdefault.jpg",
      duration: "4:38",
    },
    {
      type: "video",
      title: "ETDR PC Vision Software",
      description: "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
      url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
      thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
      duration: "8:30",
    },
    // Manuals & Guides (6021 folder)
    {
      type: "manual",
      title: "E20/20 and Avionics TDR Operator Manual",
      description: "Complete operator manual with setup guides, operation instructions, and troubleshooting (May 2025 with LHT Note)",
      localPath: "/documents/manuals/6021/E2020_and_Avionics_TDR_Operator_Manual-05 2025 with LHT Note.pdf",
      fileSize: "12.4 MB",
    },
    {
      type: "guide",
      title: "E20/20 and Avionics TDR Quick Start Guide",
      description: "Quick reference guide for getting started with your E20/20 or Avionics TDR",
      localPath: "/documents/manuals/6021/6021-3010 E2020 and Avionics TDR QSG Rev May 2016 WEB.pdf",
      fileSize: "3.2 MB",
    },
    {
      type: "guide",
      title: "E20/20 Avionics TDR Basic Guide",
      description: "Basic operation guide covering essential functions and measurements",
      localPath: "/documents/manuals/6021/E2020_Avionics_TDR_Basic_Guide_ Aug 2022.pdf",
      fileSize: "4.8 MB",
    },
    {
      type: "training",
      title: "Avionics Kit & Avionics TDR Training Presentation",
      description: "Comprehensive training presentation covering product features and testing procedures",
      localPath: "/documents/manuals/6021/Avionics Kit & Avionics TDR Training.ppt",
      fileSize: "8.5 MB",
    },
    {
      type: "training",
      title: "Introduction to Avionics TDR",
      description: "Interactive presentation introducing Avionics TDR capabilities and applications",
      localPath: "/documents/manuals/6021/Intoduction to Avionics TDR.ppsx",
      fileSize: "6.2 MB",
    },
    // Software
    {
      type: "software",
      title: "ETDR PC Vision™ Software",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities",
      localPath: "/documents/software/TDR_PC_Vision/setup_2023_2.exe",
      fileSize: "85 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "Avionics TDR Data Sheet",
      description: "Complete specifications and features for Avionics TDR Kit",
      localPath: "/documents/datasheets/Avionics Data Sheet 10 2025.pdf",
      fileSize: "1.5 MB",
    },
  ],

  // ===============================
  // E20/20B Network TDR (shares resources with E20/20)
  // ===============================
  "e20-20b": [
    // Videos
    {
      type: "video",
      title: "Testing Twisted Pair Cables",
      description: "Shows how to test twisted pair cables using an AEA Technology E20/20 step TDR.",
      url: "https://www.youtube.com/watch?v=bJoVwkob6O0",
      thumbnailUrl: "https://img.youtube.com/vi/bJoVwkob6O0/hqdefault.jpg",
      duration: "7:22",
    },
    {
      type: "video",
      title: "Introduction to AEA Technology's E20/20 Step TDRs",
      description: "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
      url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
      thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
      duration: "4:13",
    },
    {
      type: "video",
      title: "How TDRs Work",
      description: "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
      url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
      thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
      duration: "3:58",
    },
    {
      type: "video",
      title: "The Advantages of Using Step TDR Technology",
      description: "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
      url: "https://www.youtube.com/watch?v=gFivwDvYSXs",
      thumbnailUrl: "https://img.youtube.com/vi/gFivwDvYSXs/hqdefault.jpg",
      duration: "4:38",
    },
    {
      type: "video",
      title: "E20/20 TDRs' Menus",
      description: "Describes the menus, menu navigation, and available testing and setup features.",
      url: "https://www.youtube.com/watch?v=PmCPHc6uXTc",
      thumbnailUrl: "https://img.youtube.com/vi/PmCPHc6uXTc/hqdefault.jpg",
      duration: "5:12",
    },
    {
      type: "video",
      title: "ETDR PC Vision Software",
      description: "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
      url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
      thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
      duration: "8:30",
    },
    // Manuals (shares with E20/20 - 6021 folder)
    {
      type: "manual",
      title: "E20/20 and Avionics TDR Operator Manual",
      description: "Complete operator manual with setup guides, operation instructions, and troubleshooting",
      localPath: "/documents/manuals/6021/E2020_and_Avionics_TDR_Operator_Manual-05 2025 with LHT Note.pdf",
      fileSize: "12.4 MB",
    },
    {
      type: "guide",
      title: "E20/20 and Avionics TDR Quick Start Guide",
      description: "Quick reference guide for getting started",
      localPath: "/documents/manuals/6021/6021-3010 E2020 and Avionics TDR QSG Rev May 2016 WEB.pdf",
      fileSize: "3.2 MB",
    },
    {
      type: "guide",
      title: "E20/20 TDR Basic Guide",
      description: "Basic operation guide covering essential functions and measurements",
      localPath: "/documents/manuals/6021/E2020_Avionics_TDR_Basic_Guide_ Aug 2022.pdf",
      fileSize: "4.8 MB",
    },
    // Software
    {
      type: "software",
      title: "ETDR PC Vision™ Software",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities",
      localPath: "/documents/software/TDR_PC_Vision/setup_2023_2.exe",
      fileSize: "85 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "E20/20 General Data Sheet",
      description: "Complete specifications and features for E20/20 TDR series",
      localPath: "/documents/datasheets/E2020 General Data Sheet Nov 2025.pdf",
      fileSize: "1.2 MB",
    },
  ],

  // ===============================
  // E20/20F CATV Network TDR (shares resources with E20/20)
  // ===============================
  "e20-20f-catv": [
    // Videos
    {
      type: "video",
      title: "Coaxial Cable Testing",
      description: "Describes various setups and testing examples on coax cables. Also shows some common coax cable faults.",
      url: "https://www.youtube.com/watch?v=cOyJnAZ--WM",
      thumbnailUrl: "https://img.youtube.com/vi/cOyJnAZ--WM/hqdefault.jpg",
      duration: "10:15",
    },
    {
      type: "video",
      title: "Introduction to AEA Technology's E20/20 Step TDRs",
      description: "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
      url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
      thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
      duration: "4:13",
    },
    {
      type: "video",
      title: "How TDRs Work",
      description: "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
      url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
      thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
      duration: "3:58",
    },
    {
      type: "video",
      title: "The Advantages of Using Step TDR Technology",
      description: "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
      url: "https://www.youtube.com/watch?v=gFivwDvYSXs",
      thumbnailUrl: "https://img.youtube.com/vi/gFivwDvYSXs/hqdefault.jpg",
      duration: "4:38",
    },
    {
      type: "video",
      title: "E20/20 TDRs' Menus",
      description: "Describes the menus, menu navigation, and available testing and setup features.",
      url: "https://www.youtube.com/watch?v=PmCPHc6uXTc",
      thumbnailUrl: "https://img.youtube.com/vi/PmCPHc6uXTc/hqdefault.jpg",
      duration: "5:12",
    },
    {
      type: "video",
      title: "ETDR PC Vision Software",
      description: "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
      url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
      thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
      duration: "8:30",
    },
    // Manuals (shares with E20/20 - 6021 folder)
    {
      type: "manual",
      title: "E20/20 and Avionics TDR Operator Manual",
      description: "Complete operator manual with setup guides, operation instructions, and troubleshooting",
      localPath: "/documents/manuals/6021/E2020_and_Avionics_TDR_Operator_Manual-05 2025 with LHT Note.pdf",
      fileSize: "12.4 MB",
    },
    {
      type: "guide",
      title: "E20/20 and Avionics TDR Quick Start Guide",
      description: "Quick reference guide for getting started",
      localPath: "/documents/manuals/6021/6021-3010 E2020 and Avionics TDR QSG Rev May 2016 WEB.pdf",
      fileSize: "3.2 MB",
    },
    {
      type: "guide",
      title: "E20/20 TDR Basic Guide",
      description: "Basic operation guide covering essential functions and measurements",
      localPath: "/documents/manuals/6021/E2020_Avionics_TDR_Basic_Guide_ Aug 2022.pdf",
      fileSize: "4.8 MB",
    },
    // Software
    {
      type: "software",
      title: "ETDR PC Vision™ Software",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities",
      localPath: "/documents/software/TDR_PC_Vision/setup_2023_2.exe",
      fileSize: "85 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "E20/20 General Data Sheet",
      description: "Complete specifications and features for E20/20 TDR series",
      localPath: "/documents/datasheets/E2020 General Data Sheet Nov 2025.pdf",
      fileSize: "1.2 MB",
    },
  ],

  // ===============================
  // SWR Site Analyzer (6050 folder)
  // ===============================
  "swr-site-analyzer": [
    // Videos
    {
      type: "video",
      title: "AEA Liberator Spectrum Analyzer Operation",
      description: "Setting up and Using the Spectrum Analyzer Function In Liberator Series VNA Site Analyzer.",
      url: "https://www.youtube.com/watch?v=eHVRupI0Z60",
      thumbnailUrl: "https://img.youtube.com/vi/eHVRupI0Z60/hqdefault.jpg",
      duration: "12:30",
    },
    // Manuals (6050 folder)
    {
      type: "manual",
      title: "SWR Site Analyzer Operation Manual",
      description: "Complete operation manual with setup guides and troubleshooting",
      localPath: "/documents/manuals/6050/SWR Site Analyzer Manual Oct 2021.pdf",
      fileSize: "8.5 MB",
    },
    {
      type: "guide",
      title: "SWR Site Analyzer Quick Start Guide",
      description: "Quick reference guide for getting started with your SWR Site Analyzer",
      localPath: "/documents/manuals/6050/SWR Site Analyzer QSG X7_web.pdf",
      fileSize: "2.1 MB",
    },
    // Software
    {
      type: "software",
      title: "Site Analyzer PC Vision",
      description: "Analysis software for SWR, VNA and EX2 instruments",
      localPath: "/documents/software/Site_Analyzer_PC_Vision/PC-Vision_1_16_1_1.msi",
      fileSize: "72 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "SWR Site Analyzer Data Sheet",
      description: "Complete specifications and features for SWR Site Analyzer",
      localPath: "/documents/datasheets/SWR Data Sheet 10 2025.pdf",
      fileSize: "1.3 MB",
    },
  ],

  // ===============================
  // VIA Bravo EX2 (6053 folder)
  // ===============================
  "via-bravo-ex2": [
    // Videos
    {
      type: "video",
      title: "AEA Liberator Spectrum Analyzer Operation",
      description: "Setting up and Using the Spectrum Analyzer Function In Liberator Series VNA Site Analyzer.",
      url: "https://www.youtube.com/watch?v=eHVRupI0Z60",
      thumbnailUrl: "https://img.youtube.com/vi/eHVRupI0Z60/hqdefault.jpg",
      duration: "12:30",
    },
    // Manuals (6053 folder)
    {
      type: "manual",
      title: "Bravo EX2 Operation Manual",
      description: "Complete operation manual with setup guides, operation instructions, and troubleshooting",
      localPath: "/documents/manuals/6053/Bravo EX2 Operation Manual 10 2021.pdf",
      fileSize: "15.3 MB",
    },
    {
      type: "guide",
      title: "Bravo EX2 Analyzer Quick Start Guide",
      description: "Quick reference guide for getting started with your Bravo EX2",
      localPath: "/documents/manuals/6053/Bravo EX2 Analyzer QSG Ver 3 10 2021.pdf",
      fileSize: "2.1 MB",
    },
    {
      type: "training",
      title: "Bravo EX2 Training Presentation",
      description: "Comprehensive training presentation covering product features and testing procedures",
      localPath: "/documents/manuals/6053/Bravo ex2 Training PPP Aug 2021.ppsx",
      fileSize: "7.8 MB",
    },
    // Software
    {
      type: "software",
      title: "Site Analyzer PC Vision",
      description: "Analysis software for SWR, VNA and EX2 instruments",
      localPath: "/documents/software/Site_Analyzer_PC_Vision/PC-Vision_1_16_1_1.msi",
      fileSize: "72 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "Bravo EX2 Data Sheet",
      description: "Complete specifications and features for Bravo EX2 Analyzer",
      localPath: "/documents/datasheets/Bravo EX Data Sheet 10 2025.pdf",
      fileSize: "1.4 MB",
    },
  ],

  // ===============================
  // Bravo MRI-3000 (6055 folder)
  // ===============================
  "via-bravo-mri-3000": [
    // Manuals (6055 folder)
    {
      type: "manual",
      title: "Bravo MRI-3000 Operation Manual",
      description: "Complete operation manual for MRI RF coil testing and system alignment",
      localPath: "/documents/manuals/6055/Bravo MRI-3000 Operation Manual 08 2023.pdf",
      fileSize: "10.2 MB",
    },
    {
      type: "guide",
      title: "Bravo MRI-3000 Quick Start Guide",
      description: "Quick reference guide for getting started with your Bravo MRI-3000",
      localPath: "/documents/manuals/6055/6055-3010 QSG Oct 2021 Bravo MRI-3000.pdf",
      fileSize: "1.8 MB",
    },
    {
      type: "training",
      title: "Bravo MRI-3000 Training Presentation",
      description: "Comprehensive training presentation covering MRI coil testing procedures",
      localPath: "/documents/manuals/6055/Bravo MRI-3000 Training PPP Aug 2021.ppsx",
      fileSize: "6.5 MB",
    },
    // Software
    {
      type: "software",
      title: "MRI Vision",
      description: "Remote application software for Bravo MRI 3000",
      localPath: "/documents/software/MRI_Vision/setup_1_0_1_1.exe",
      fileSize: "63 MB",
    },
    // Datasheet
    {
      type: "datasheet",
      title: "Bravo MRI-3000 Data Sheet",
      description: "Complete specifications and features for Bravo MRI-3000 Analyzer",
      localPath: "/documents/datasheets/Bravo MRI 3000 Data Sheet 10 2025.pdf",
      fileSize: "1.2 MB",
    },
  ],
}

// Helper function to get resources for a product
export function getProductResources(slug: string): ProductResourceItem[] {
  return productResourcesMap[slug] || []
}

// Helper function to get all manuals for the resources page
export function getAllManuals(): (ProductResourceItem & { productSlug: string })[] {
  const manuals: (ProductResourceItem & { productSlug: string })[] = []
  const seenPaths = new Set<string>()

  for (const [productSlug, resources] of Object.entries(productResourcesMap)) {
    for (const resource of resources) {
      if (resource.type === "manual" || resource.type === "guide" || resource.type === "training") {
        // Avoid duplicates (same path for multiple products)
        const key = resource.localPath || resource.url || resource.title
        if (!seenPaths.has(key)) {
          seenPaths.add(key)
          manuals.push({ ...resource, productSlug })
        }
      }
    }
  }

  return manuals
}

// Helper function to get all datasheets
export function getAllDatasheets(): (ProductResourceItem & { productSlug: string })[] {
  const datasheets: (ProductResourceItem & { productSlug: string })[] = []
  const seenPaths = new Set<string>()

  for (const [productSlug, resources] of Object.entries(productResourcesMap)) {
    for (const resource of resources) {
      if (resource.type === "datasheet") {
        const key = resource.localPath || resource.url || resource.title
        if (!seenPaths.has(key)) {
          seenPaths.add(key)
          datasheets.push({ ...resource, productSlug })
        }
      }
    }
  }

  return datasheets
}

// Product slug to display name mapping
export const productDisplayNames: Record<string, string> = {
  "e20-20n": "E20/20N TDR",
  "e20-20-avionics": "Avionics TDR Kit",
  "e20-20b": "E20/20B Network TDR",
  "e20-20f-catv": "E20/20F CATV TDR",
  "swr-site-analyzer": "SWR Site Analyzer",
  "via-bravo-ex2": "VIA Bravo EX2",
  "via-bravo-mri-3000": "Bravo MRI-3000",
}

