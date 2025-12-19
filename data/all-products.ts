// Master product data file - CMS-ready structure
// Each product has a unique slug for dynamic routing

export interface Specification {
  parameter: string
  value: string
}

export interface Certification {
  name: string
  description: string
}

export interface ProductModel {
  name: string
  partNumber: string
  type: string
  description: string
  includes: string[]
  popular?: boolean
  includedImage?: string
}

export interface Accessory {
  name: string
  partNumber: string
  description: string
  image?: string
  iconType?: "case" | "cable" | "power" | "certificate" | "battery"
}

export interface ProductResource {
  type: "video" | "manual" | "datasheet" | "application-note" | "firmware" | "software" | "guide" | "faq"
  title: string
  description?: string
  url: string
  thumbnailUrl?: string // For videos
  fileSize?: string // For downloads, e.g., "2.4 MB"
  duration?: string // For videos, e.g., "5:30"
}

export interface Product {
  // Core identifiers
  slug: string
  name: string
  tagline: string
  shortDescription: string
  category: "tdr" | "vna-swr"

  // Display
  badges: { text: string; variant: "green" | "blue" }[]
  modelImages: Record<number, string[]>

  // Content
  keyFeatures: string[]
  displayFeatures: string[] // Subset shown in hero

  // Technical
  specifications: {
    performance?: Specification[]
    advanced?: Specification[]
    hardware?: Specification[]
    physical?: Specification[]
    kitCase?: Specification[]
  }
  certifications: Certification[]
  models: ProductModel[]
  accessories: Accessory[]

  // Links
  datasheetUrl: string

  resources?: ProductResource[]

  // Overview content
  overviewDescription: string
  applications: string[]
  capabilityCards: {
    title: string
    icon: string
    items: string[]
  }[]

  // Software tab
  softwareInfo: {
    name: string
    description: string
    screenshotUrl?: string
    features: string[]
  }
}

export const allProducts: Product[] = [
  // ===== TDR PRODUCTS =====
  {
    slug: "e20-20n",
    name: "E20/20N TDR",
    tagline: "Ultimate in Hand-held Step TDR Technology for Broadcast",
    shortDescription:
      "The enhanced version of the 20/20 Step TDR is ideal for troubleshooting all types of coax, OSP cables, twisted pairs Cat2 to Cat6A and single wires in bundle/harness. Perfect for broadcast transmission line testing and network analysis.",
    category: "tdr",
    badges: [
      { text: "Made in USA", variant: "green" },
      { text: "Broadcast Grade", variant: "blue" },
    ],
    modelImages: {
      0: ["/images/featured/e20-20-tdr.png", "/images/design-mode/image-0052.png"],
    },
    keyFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with 64 broadcast cable types",
      "N-type connector with BNC adapter included",
      "Setup Wizard – step-by-step start up assistance",
      "Context sensitive help",
      "Cell phone style alpha-numeric entry pad",
      "Keypad LED indicators for active function",
      "Cable toning – coax or twisted pair",
      "Stores 32 traces with name, date & time",
      "Rechargeable NiMH AA cells (included)",
      "ETDR PC Vision software (included)",
      "MicroFault locating for small coax kinks and crushes",
      "Noise detection and noise filter",
    ],
    displayFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with 64 broadcast cable types",
      "ETDR PC Vision software (included)",
      "MicroFault locating for small coax kinks and crushes",
    ],
    specifications: {
      performance: [
        { parameter: "Max Ranges", value: "20Kft (5Km) @ .99c or 14Kft (4.3Km) @ .66c" },
        { parameter: "Min Range", value: "0-10ft (0-2m)" },
        { parameter: "Range Scales", value: "11 selectable ranges" },
        { parameter: "Range Accuracy", value: "<0.2% ±1 inch (2cm) + VF uncertainty" },
        { parameter: "Z Accuracy", value: "<2% (Cable Z=45 to 125 Ohms)" },
        { parameter: "Resolution", value: "0.5 inch on 10ft range scale or 10ft Zoom" },
        { parameter: "Dead Zone", value: "Zero on any range setting" },
        { parameter: "Z Ranges", value: "20, 50, 100, 200, 500, & 1,000 Ohms" },
        { parameter: "Cursors", value: "2 independent and differential readings" },
        {
          parameter: "Memory",
          value: "32 traces with 1920 data points (feet), 2000 data points (meters), name, date, and time",
        },
      ],
      advanced: [
        { parameter: "Advanced Features", value: "Test Lead Null, MicroFault Locating" },
        { parameter: "Setup Wizard", value: "Step-by-step setup instructions" },
        { parameter: "Help System", value: "Context Sensitive Help" },
        {
          parameter: "Cable List",
          value: "64 Cable types with their Z and VF. PC upload or download custom cable lists",
        },
        { parameter: "Tones", value: "900/1100Hz warble, 977.5, 850, 577Hz steady or pulsed" },
      ],
      hardware: [
        { parameter: "Display", value: "Quarter VGA transflective & backlit" },
        { parameter: "Communications", value: "USB-2/serial" },
        { parameter: "Internal Power", value: "8 AA NiMH cells (installed) ~5.5 hours continuous operation" },
        { parameter: "Alternate Cells", value: "8 AA alkaline, ~ 7 hours continuous operation" },
        { parameter: "External Power", value: "90-240VAC 50/60Hz adapter to 12VDC, 12VDC Vehicle adapter included" },
      ],
      physical: [
        { parameter: "TDR Size", value: "8.5 x 4.3 x 2.25 inches (216 x 109 x 57mm)" },
        { parameter: "TDR Weight", value: "2.1 lbs (923 grams) with batteries and belt case" },
        { parameter: "Environmental", value: "Splash and dust resistant" },
        {
          parameter: "Ruggedness",
          value: "MIL-STD 810G Transient Drop tested, 48 inches (1.2m) to concrete, 27 drops",
        },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "Made in USA", description: "Designed and manufactured in the United States" },
      { name: "ISO 9001", description: "Registered to ISO 9001 quality standards" },
    ],
    models: [
      {
        name: "E20/20N TDR",
        partNumber: "6021-5000",
        type: "Broadcast Network Testing",
        description: "Professional broadcast TDR with N-type connector and broadcast cable library",
        includes: [
          "E20/20N TDR with N-type connector and broadcast cable list",
          "Belt case, AC power adapter",
          "8AA NiMH cells (installed), USB Cable",
          "N-to-BNC Adapter",
          "BNC-to-alligator clips test leads",
          "Basic Guide, Quick Start Guide",
          "CD-ROM with ETDR PC Vision software",
          "Operation Manual, Training Presentation, Application Notes",
          "Calibration Certificate with data",
        ],
        popular: true,
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Large padded soft case with custom protective foam interior and shoulder strap.",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "Test Lead Coax N-type",
        partNumber: "0070-1501",
        description: "N(m)-to-N(f) 50 Ohm Coax cable 6 ft (2m) for broadcast applications.",
        iconType: "cable",
      },
      {
        name: "DC Vehicle Power Adapter",
        partNumber: "6025-0250",
        description: "12 VDC Vehicle Adapter with fuse, 6' (2m) cord & DC plug for mobile use.",
        iconType: "power",
      },
      {
        name: "Certificate of Calibration",
        partNumber: "6000-0402",
        description: "Factory calibration certificate with test data and traceability documentation.",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "/docs/datasheets/e20-20n-datasheet.pdf",
    resources: [
      {
        type: "video",
        title: "Introduction to AEA Technology's E20/20 Step TDRs",
        description:
          "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
        url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
        thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
        duration: "4:13",
      },
      {
        type: "video",
        title: "How TDRs Work",
        description:
          "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
        url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
        thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
        duration: "3:58",
      },
      {
        type: "video",
        title: "The Advantages of Using Step TDR Technology",
        description:
          "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
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
        description:
          "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
        url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
        thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
        duration: "8:30",
      },
      {
        type: "video",
        title: "Coaxial Cable Testing",
        description:
          "Describes various setups and testing examples on coax cables. Also shows some common coax cable faults.",
        url: "https://www.youtube.com/watch?v=cOyJnAZ--WM",
        thumbnailUrl: "https://img.youtube.com/vi/cOyJnAZ--WM/hqdefault.jpg",
        duration: "10:15",
      },
      {
        type: "manual",
        title: "E20/20N User Manual",
        description: "Complete operation and reference guide",
        url: "/docs/manuals/e20-20n-manual.pdf",
        fileSize: "4.2 MB",
      },
      {
        type: "application-note",
        title: "Broadcast Transmission Line Testing",
        description: "Best practices for broadcast industry applications",
        url: "/docs/app-notes/broadcast-testing.pdf",
        fileSize: "1.8 MB",
      },
    ],
    overviewDescription:
      "The E20/20 Series of Step TDR's are ideal for troubleshooting all types of coax, OSP cables, twisted pairs Cat2 to Cat6A and single wires in bundle/harness. Based on AEA's \"Step\" technology, these TDR's possess amazingly accurate fault locating and display capabilities. The E20/20N TDR is specifically configured for broadcast applications with an N-type connector and contains a comprehensive broadcast cable list.",
    applications: [
      "Broadcast transmission line testing",
      "Coaxial cable fault location and analysis",
      "Twisted pair cable testing (Cat2 to Cat6A)",
      "OSP (Outside Plant) cable troubleshooting",
      "Single wire testing in bundles/harnesses",
      "Network infrastructure maintenance",
      "RF system installation and commissioning",
      "Cable integrity verification",
    ],
    capabilityCards: [
      {
        title: "Precision Performance",
        icon: "zap",
        items: [
          "Sub-inch accuracy with ±0.5 inch resolution for precise fault location.",
          "Zero dead zone on any range, from 10ft up to 20,000ft.",
          "Advanced noise detection and filtering for clean signals.",
        ],
      },
      {
        title: "Advanced Diagnostics",
        icon: "settings",
        items: [
          "MicroFault detection finds small coax kinks and crushes.",
          "Range and impedance zoom for in-depth analysis of fault areas.",
          "Cable toning for coax and twisted pair identification.",
        ],
      },
      {
        title: "Software & Data",
        icon: "database",
        items: [
          "Includes ETDR PC Vision™ for analysis and professional reporting.",
          "On-board storage for 32 traces with timestamps for field documentation.",
          "64 pre-loaded broadcast cable types with custom library support.",
        ],
      },
      {
        title: "Rugged Field Design",
        icon: "shield",
        items: [
          "MIL-STD 810G drop tested for durability in harsh environments.",
          "Splash and dust resistant for reliable field use.",
          "Belt-friendly size at only 2.1 lbs with batteries.",
        ],
      },
      {
        title: "Ease of Use",
        icon: "monitor",
        items: [
          "Setup Wizard provides step-by-step guidance for new users.",
          "Context-sensitive help system offers on-the-spot assistance.",
          "Large, backlit display with clear fonts for all lighting conditions.",
        ],
      },
      {
        title: "Industry Trust",
        icon: "award",
        items: [
          "Trusted by broadcast professionals worldwide for transmission line testing.",
          "Designed and manufactured in the USA under ISO 9001 standards.",
          "Backed by 30+ years of RF testing expertise and support.",
        ],
      },
    ],
    softwareInfo: {
      name: "ETDR PC Vision™",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities.",
      screenshotUrl: "/images/software/etdr-pc-vision.png",
      features: [
        "Professional graphical waveform display",
        "Automated test report generation",
        "Cable list management and customization",
        "Trace comparison and overlay analysis",
        "Data export to multiple formats",
      ],
    },
  },

  {
    slug: "e20-20-avionics",
    name: "Avionics TDR Kit",
    tagline: "Boeing-Approved Cable Testing for Aviation Professionals",
    shortDescription:
      "Complete testing solution with rugged case and additional test leads. The Avionics TDR Kit is specifically configured for aviation applications with comprehensive test accessories.",
    category: "tdr",
    badges: [
      { text: "Made in USA", variant: "green" },
      { text: "Boeing Approved", variant: "blue" },
    ],
    modelImages: {
      0: [
        "/images/products/avionics/full-kit.png",
        "/images/products/avionics/kit-open.png",
        "/images/products/avionics/soft-case.png",
        "/images/products/avionics/hard-case.jpeg",
      ],
    },
    keyFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with up to 64 avionics cable types",
      "BNC and RJ45 connectors standard",
      "Setup Wizard – step-by-step start up assistance",
      "Context sensitive help",
      "Cell phone style alpha-numeric entry pad",
      "Keypad LED indicators for active function",
      "Cable toning – coax, pairs, or single-wires",
      "Stores 32 traces with name, date & time",
      "Rechargeable NiMH AA cells (included)",
      "ETDR PC Vision software (included)",
      "Kit Case is ATA rated and MIL-STD tested",
      "RF shielded with cable Noise Detection and Filtering",
    ],
    displayFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with up to 64 avionics cable types",
      "ETDR PC Vision software (included)",
      "RF shielded with cable Noise Detection and Filtering",
    ],
    specifications: {
      performance: [
        { parameter: "Max Ranges", value: "20Kft (5Km) @ .99c or 14Kft (3300m) @ .66c" },
        { parameter: "Min Range", value: "0-10ft (0-2m)" },
        { parameter: "Range Scales", value: "11 selectable ranges" },
        { parameter: "Range Accuracy", value: "<0.2% ±1 inch (2.5cm) + VF uncertainty" },
        { parameter: "Z Accuracy", value: "<2% (Cable Z=45 to 125 Ohms)" },
        {
          parameter: "Resolution",
          value: "0.5 inch on 10ft range scale or 10ft Zoom (8mm on 2m range scale or 2m Zoom)",
        },
        { parameter: "Dead Zone", value: "Zero on any range setting" },
        { parameter: "Z Ranges", value: "20, 50, 100, 200, 500, & 1,000 Ohms" },
        { parameter: "Cursors", value: "2 independent and differential readings" },
        {
          parameter: "Memory",
          value: "32 traces with 1920 data points (feet), 2000 data points (meters), name, date, and time",
        },
      ],
      advanced: [
        { parameter: "Advanced Features", value: "Test Lead Null, Micro Fault Locating" },
        { parameter: "Setup Wizard", value: "Step-by-step setup instructions" },
        { parameter: "Help System", value: "Context Sensitive Help" },
        {
          parameter: "Cable List",
          value: "64 Cable types with their Z and VF. PC upload or download custom cable lists",
        },
        { parameter: "Tones", value: "900/1100Hz warble, 977.5, 850, 577Hz steady or pulsed & Pocket Toner enable" },
      ],
      hardware: [
        { parameter: "Display", value: "Quarter VGA transflective & backlit" },
        { parameter: "Communications", value: "USB-2/serial" },
        { parameter: "Internal Power", value: "8 AA NiMH cells (installed) ~7.3 hours continuous operation" },
        { parameter: "Alternate Cells", value: "8 AA alkaline, ~ 7 hours continuous operation" },
        { parameter: "External Power", value: "90-240VAC 50/60Hz adapter to 15VDC" },
      ],
      physical: [
        { parameter: "TDR Size", value: "8.5 x 4.3 x 2.25 inches (216 x 109 x 57mm)" },
        { parameter: "TDR Weight", value: "2.2 lbs (1Kg) with batteries and belt case" },
        { parameter: "Environmental", value: "Splash and dust resistant" },
        {
          parameter: "Ruggedness",
          value: "MIL-STD 810G Transient Drop tested, 48 inches (122cm) to hard surface, 26 drops",
        },
      ],
      kitCase: [
        { parameter: "FOD Protection", value: "Custom foam for item securing and lid label for item ID and locating" },
        { parameter: "Transport Rating", value: "ATA 300 Category 1 rated" },
        { parameter: "Kit Case Size", value: "18.1 x 13.7 x 6.9 inches (48 x 35 x 18 cm)" },
        { parameter: "Kit Weight Full", value: "11.5lbs (5.2Kg) with TDR and all accessories" },
        { parameter: "Environment", value: "MIL-STD-810F impact damage, UV, solvents, and fungus resistance" },
        { parameter: "Waterproof", value: "MIL-STD-648C waterproof & dust tight" },
        { parameter: "Pressure", value: "MIL-STD-648C ambient pressure equalization" },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "Boeing Approved", description: "Kit model approved by Boeing" },
      { name: "ISO 9001", description: "Registered to ISO 9001 quality standards" },
    ],
    models: [
      {
        name: "Avionics TDR Kit",
        partNumber: "6021-5154",
        type: "Complete Kit - Boeing Approved",
        description: "Complete testing solution with rugged case and additional test leads",
        includes: [
          "Avionics TDR, EMI shielded with BNC and RJ-45 connectors and aviation cable list",
          "Hard carrying case with anti-FOD/easy accessory access layout",
          "Belt case, AC power adapter",
          "8AA NiMH cells (installed), USB Cable",
          "BNC(m)-to-BNC(f) 6ft (2m) 50 Ohm cable",
          "BNC-to-alligator clips",
          "BNC-to-pins, sizes 12, 16, 20, and 22",
          "BNC-to-sockets, sizes 12, 16, 20, and 22",
          "RJ-45-to-RJ-45 6ft (2m) Cat 5 (ISO class D) cable",
          "Basic Guide, Quick Start Guide, CD-ROM with ETDR PC Vision software",
          "Operation Manual, Training Presentation, Application Notes",
          "Calibration Certificate with data",
        ],
        popular: true,
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Lightweight protective case for field work",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "DC Vehicle Power Adapter",
        partNumber: "6025-0250",
        description: "Power from vehicle DC outlet for field use",
        image: "/images/design-mode/Avionics-TDR-and-TDR-Kit-Datasheet.pdf-image-015.png",
        iconType: "power",
      },
      {
        name: "Certificate of Calibration Level 1",
        partNumber: "6000-0402",
        description: "Official calibration certificate with standards",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "/datasheets/Avionics_TDR_Kit.pdf",
    resources: [
      {
        type: "video",
        title: "Aircraft Wire Testing",
        description:
          "Shows how to test single-wires in aircraft wiring harnesses using AEA Technology's Avionics step TDR.",
        url: "https://www.youtube.com/watch?v=HN__xjMtXl0",
        thumbnailUrl: "https://img.youtube.com/vi/HN__xjMtXl0/hqdefault.jpg",
        duration: "9:45",
      },
      {
        type: "video",
        title: "Introduction to AEA Technology's E20/20 Step TDRs",
        description:
          "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
        url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
        thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
        duration: "4:13",
      },
      {
        type: "video",
        title: "How TDRs Work",
        description:
          "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
        url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
        thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
        duration: "3:58",
      },
      {
        type: "video",
        title: "The Advantages of Using Step TDR Technology",
        description:
          "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
        url: "https://www.youtube.com/watch?v=gFivwDvYSXs",
        thumbnailUrl: "https://img.youtube.com/vi/gFivwDvYSXs/hqdefault.jpg",
        duration: "4:38",
      },
      {
        type: "video",
        title: "ETDR PC Vision Software",
        description:
          "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
        url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
        thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
        duration: "8:30",
      },
      {
        type: "manual",
        title: "E20/20 and Avionics TDR Operator Manual",
        description: "Complete operator manual for E20/20 and Avionics TDR (May 2025 with LHT Note)",
        url: "/documents/avioinics manuals/E2020_and_Avionics_TDR_Operator_Manual-05 2025 with LHT Note.pdf",
        fileSize: "12.4 MB",
      },
      {
        type: "guide",
        title: "E20/20 and Avionics TDR Quick Start Guide",
        description: "Quick start guide for E20/20 and Avionics TDR (Rev May 2016)",
        url: "/documents/avioinics manuals/6021-3010 E2020 and Avionics TDR QSG Rev May 2016 WEB.pdf",
        fileSize: "3.2 MB",
      },
      {
        type: "guide",
        title: "E20/20 Avionics TDR Basic Guide",
        description: "Basic guide for E20/20 Avionics TDR (August 2022)",
        url: "/documents/avioinics manuals/E2020_Avionics_TDR_Basic_Guide_ Aug 2022.pdf",
        fileSize: "4.8 MB",
      },
      {
        type: "guide",
        title: "Avionics Kit & Avionics TDR Training",
        description: "Training presentation for Avionics Kit and Avionics TDR",
        url: "/documents/avioinics manuals/Avionics Kit & Avionics TDR Training.ppt",
        fileSize: "8.5 MB",
      },
      {
        type: "guide",
        title: "Introduction to Avionics TDR",
        description: "Introduction presentation to Avionics TDR",
        url: "/documents/avioinics manuals/Intoduction to Avionics TDR.ppsx",
        fileSize: "6.2 MB",
      },
    ],
    overviewDescription:
      "The Avionics TDR Kit is a complete cable testing solution specifically designed for aviation professionals. Boeing-approved and featuring comprehensive test accessories, this kit provides everything needed for aircraft wire testing and maintenance.",
    applications: [
      "Aircraft wire harness testing",
      "Avionics system troubleshooting",
      "Aviation cable fault location",
      "MRO facility testing",
      "Flight line maintenance",
      "Wire bundle analysis",
      "Single wire testing in harnesses",
      "Coaxial cable verification",
    ],
    capabilityCards: [
      {
        title: "Aviation Grade",
        icon: "shield",
        items: [
          "Boeing-approved for aircraft maintenance operations.",
          "RF shielded design for use near sensitive avionics.",
          "ATA 300 rated hard case prevents FOD contamination.",
        ],
      },
      {
        title: "Complete Kit",
        icon: "package",
        items: [
          "Comprehensive test lead set for all wire sizes.",
          "BNC-to-pin adapters for sizes 12, 16, 20, and 22.",
          "RJ-45 cable included for data wire testing.",
        ],
      },
      {
        title: "Precision Testing",
        icon: "zap",
        items: [
          "Sub-inch accuracy for precise fault location.",
          "Zero dead zone on any range setting.",
          "MicroFault detection for subtle cable damage.",
        ],
      },
      {
        title: "Field Ready",
        icon: "truck",
        items: [
          "MIL-STD tested rugged case survives harsh conditions.",
          "7+ hours battery life for extended operations.",
          "Compact, lightweight design for flight line use.",
        ],
      },
      {
        title: "Data Management",
        icon: "database",
        items: [
          "Store 32 traces with timestamps for documentation.",
          "ETDR PC Vision software for analysis and reporting.",
          "Custom cable library support for fleet-specific cables.",
        ],
      },
      {
        title: "Compliance",
        icon: "award",
        items: [
          "CE certified for international use.",
          "Meets EMC and safety standards.",
          "ISO 9001 manufactured quality assurance.",
        ],
      },
    ],
    softwareInfo: {
      name: "ETDR PC Vision™",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities.",
      features: [
        "Professional graphical waveform display",
        "Automated test report generation",
        "Cable list management and customization",
        "Trace comparison and overlay analysis",
        "Data export to multiple formats",
      ],
    },
  },

  {
    slug: "e20-20b",
    name: "E20/20B Network TDR",
    tagline: "Ultimate in Hand-held Step TDR Technology for VDV/RF Networks",
    shortDescription:
      "The enhanced version of the 20/20 Step TDR is ideal for troubleshooting all types of coax, OSP cables, twisted pairs Cat2 to Cat6A and single wires in bundle/harness. Perfect for VDV/RF network testing and maintenance.",
    category: "tdr",
    badges: [
      { text: "Made in USA", variant: "green" },
      { text: "Network Grade", variant: "blue" },
    ],
    modelImages: {
      0: ["/images/featured/e20-20-tdr.png", "/images/design-mode/image-0052.png"],
    },
    keyFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with 64 VDV/RF cable types",
      "ETDR PC Vision software (included)",
      "MicroFault locating for small coax kinks and crushes",
    ],
    displayFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with 64 VDV/RF cable types",
      "ETDR PC Vision software (included)",
      "MicroFault locating for small coax kinks and crushes",
    ],
    specifications: {
      performance: [
        { parameter: "Max Ranges", value: "20Kft (5Km) @ .99c or 14Kft (4.3Km) @ .66c" },
        { parameter: "Min Range", value: "0-10ft (0-2m)" },
        { parameter: "Range Scales", value: "11 selectable ranges" },
        { parameter: "Range Accuracy", value: "<0.2% ±1 inch (2cm) + VF uncertainty" },
        { parameter: "Z Accuracy", value: "<2% (Cable Z=45 to 125 Ohms)" },
        { parameter: "Resolution", value: "0.5 inch on 10ft range scale or 10ft Zoom" },
        { parameter: "Dead Zone", value: "Zero on any range setting" },
        { parameter: "Z Ranges", value: "20, 50, 100, 200, 500, & 1,000 Ohms" },
        { parameter: "Cursors", value: "2 independent and differential readings" },
        {
          parameter: "Memory",
          value: "32 traces with 1920 data points (feet), 2000 data points (meters), name, date, and time",
        },
      ],
      advanced: [
        { parameter: "Advanced Features", value: "Test Lead Null, MicroFault Locating" },
        { parameter: "Setup Wizard", value: "Step-by-step setup instructions" },
        { parameter: "Help System", value: "Context Sensitive Help" },
        {
          parameter: "Cable List",
          value: "64 Cable types with their Z and VF. PC upload or download custom cable lists",
        },
        { parameter: "Tones", value: "900/1100Hz warble, 977.5, 850, 577Hz steady or pulsed" },
      ],
      hardware: [
        { parameter: "Display", value: "Quarter VGA transflective & backlit" },
        { parameter: "Communications", value: "USB-2/serial" },
        { parameter: "Internal Power", value: "8 AA NiMH cells (installed) ~5.5 hours continuous operation" },
        { parameter: "Alternate Cells", value: "8 AA alkaline, ~ 7 hours continuous operation" },
        { parameter: "External Power", value: "90-240VAC 50/60Hz adapter to 12VDC, 12VDC Vehicle adapter included" },
      ],
      physical: [
        { parameter: "TDR Size", value: "8.5 x 4.3 x 2.25 inches (216 x 109 x 57mm)" },
        { parameter: "TDR Weight", value: "2.1 lbs (923 grams) with batteries and belt case" },
        { parameter: "Environmental", value: "Splash and dust resistant" },
        {
          parameter: "Ruggedness",
          value: "MIL-STD 810G Transient Drop tested, 48 inches (1.2m) to concrete, 27 drops",
        },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "Made in USA", description: "Designed and manufactured in the United States" },
      { name: "ISO 9001", description: "Registered to ISO 9001 quality standards" },
    ],
    models: [
      {
        name: "E20/20B Network TDR",
        partNumber: "6021-5053",
        type: "VDV/RF Network Testing",
        description: "Professional VDV/RF TDR with BNC and RJ45 connectors and VDV/RF cable library",
        includes: [
          "E20/20B TDR with BNC and RJ45 connectors and VDV/RF cable list",
          "Belt case, AC power adapter",
          "8AA NiMH cells (installed), USB Cable",
          "BNC-to-alligator clips test leads",
          "RJ45-to-RJ45 Cat 5E 6ft (2m) Test Lead",
          "Basic Guide, Quick Start Guide",
          "CD-ROM with ETDR PC Vision software",
          "Operation Manual, Training Presentation, Application Notes",
          "Calibration Certificate with data",
        ],
        popular: true,
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Large padded soft case with custom protective foam interior and shoulder strap.",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "Test Lead Coax",
        partNumber: "0070-1500",
        description: "BNC(m)-to-BNC(f) 50 Ohm Coax cable 6 ft (2m) for extended reach testing.",
        iconType: "cable",
      },
      {
        name: "DC Vehicle Power Adapter",
        partNumber: "6025-0250",
        description: "12 VDC Vehicle Adapter with fuse, 6' (2m) cord & DC plug for mobile use.",
        iconType: "power",
      },
      {
        name: "Certificate of Calibration",
        partNumber: "6000-0402",
        description: "Factory calibration certificate with test data and traceability documentation.",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "https://drive.google.com/file/d/18flXvH6TDY_82YEu4Dp8ZwD0Uol1etO5/view",
    resources: [
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
        description:
          "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
        url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
        thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
        duration: "4:13",
      },
      {
        type: "video",
        title: "How TDRs Work",
        description:
          "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
        url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
        thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
        duration: "3:58",
      },
      {
        type: "video",
        title: "The Advantages of Using Step TDR Technology",
        description:
          "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
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
        description:
          "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
        url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
        thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
        duration: "8:30",
      },
      {
        type: "datasheet",
        title: "E20/20B Network TDR Datasheet",
        url: "/docs/datasheets/e20-20b-datasheet.pdf",
        fileSize: "1.5 MB",
      },
      {
        type: "manual",
        title: "E20/20B Network TDR User Manual",
        url: "/docs/manuals/e20-20b-manual.pdf",
        fileSize: "3.8 MB",
      },
    ],
    overviewDescription:
      "The E20/20B Network TDR is specifically configured for VDV (Voice, Data, Video) and RF network testing. With BNC and RJ45 connectors and a comprehensive VDV/RF cable library, it's the ideal tool for network infrastructure professionals.",
    applications: [
      "VDV network cable testing",
      "RF system troubleshooting",
      "Coaxial cable fault location",
      "Twisted pair testing (Cat2 to Cat6A)",
      "Network infrastructure maintenance",
      "Data center cable verification",
      "Telecommunications testing",
      "Cable plant documentation",
    ],
    capabilityCards: [
      {
        title: "Network Ready",
        icon: "zap",
        items: [
          "Dual BNC and RJ45 connectors for versatile testing.",
          "64 pre-loaded VDV/RF cable types.",
          "Cat2 to Cat6A twisted pair support.",
        ],
      },
      {
        title: "Precision Testing",
        icon: "settings",
        items: [
          "Sub-inch accuracy for fault location.",
          "Zero dead zone on any range.",
          "MicroFault detection for cable damage.",
        ],
      },
      {
        title: "Software & Data",
        icon: "database",
        items: [
          "ETDR PC Vision software included.",
          "32 trace storage with timestamps.",
          "Custom cable library support.",
        ],
      },
      {
        title: "Field Rugged",
        icon: "shield",
        items: ["MIL-STD 810G drop tested.", "Splash and dust resistant.", "5.5+ hours battery operation."],
      },
      {
        title: "Easy Operation",
        icon: "monitor",
        items: ["Setup Wizard for quick start.", "Context-sensitive help.", "Backlit display for any conditions."],
      },
      {
        title: "Quality Assured",
        icon: "award",
        items: ["Made in USA.", "ISO 9001 manufactured.", "2-year warranty."],
      },
    ],
    softwareInfo: {
      name: "ETDR PC Vision™",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities.",
      features: [
        "Professional graphical waveform display",
        "Automated test report generation",
        "Cable list management and customization",
        "Trace comparison and overlay analysis",
        "Data export to multiple formats",
      ],
    },
  },

  {
    slug: "e20-20f-catv",
    name: "E20/20F CATV Network TDR",
    tagline: "Ultimate in Hand-held Step TDR Technology for CATV",
    shortDescription:
      "The enhanced version of the 20/20 Step TDR is ideal for troubleshooting all types of coax, OSP cables, twisted pairs Cat2 to Cat6A and single wires in bundle/harness. Perfect for CATV network maintenance and analysis.",
    category: "tdr",
    badges: [
      { text: "Made in USA", variant: "green" },
      { text: "CATV Grade", variant: "blue" },
    ],
    modelImages: {
      0: ["/images/featured/e20-20-tdr.png", "/images/design-mode/image-0052.png"],
    },
    keyFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with 64 CATV cable types",
      "F-type and RJ45 connectors",
      "Setup Wizard – step-by-step start up assistance",
      "Context sensitive help",
      "Cell phone style alpha-numeric entry pad",
      "Keypad LED indicators for active function",
      "Cable toning – coax or twisted pair",
      "Stores 32 traces with name, date & time",
      "Rechargeable NiMH AA cells (included)",
      "ETDR PC Vision software (included)",
      "MicroFault locating for small coax kinks and crushes",
      "Noise detection and noise filter",
    ],
    displayFeatures: [
      "Ranges: from 0-10ft (0-2m) to 20,000 ft (5Km)",
      "No dead zone on any range setting",
      "Range Zoom on Cursor & Impedance zoom using Z Scale",
      "Cable List with 64 CATV cable types",
      "ETDR PC Vision software (included)",
      "MicroFault locating for small coax kinks and crushes",
    ],
    specifications: {
      performance: [
        { parameter: "Max Ranges", value: "20Kft (5Km) @ .99c or 14Kft (4.3Km) @ .66c" },
        { parameter: "Min Range", value: "0-10ft (0-2m)" },
        { parameter: "Range Scales", value: "11 selectable ranges" },
        { parameter: "Range Accuracy", value: "<0.2% ±1 inch (2cm) + VF uncertainty" },
        { parameter: "Z Accuracy", value: "<2% (Cable Z=45 to 125 Ohms)" },
        { parameter: "Resolution", value: "0.5 inch on 10ft range scale or 10ft Zoom" },
        { parameter: "Dead Zone", value: "Zero on any range setting" },
        { parameter: "Z Ranges", value: "20, 50, 100, 200, 500, & 1,000 Ohms" },
        { parameter: "Cursors", value: "2 independent and differential readings" },
        {
          parameter: "Memory",
          value: "32 traces with 1920 data points (feet), 2000 data points (meters), name, date, and time",
        },
      ],
      advanced: [
        { parameter: "Advanced Features", value: "Test Lead Null, MicroFault Locating" },
        { parameter: "Setup Wizard", value: "Step-by-step setup instructions" },
        { parameter: "Help System", value: "Context Sensitive Help" },
        {
          parameter: "Cable List",
          value: "64 Cable types with their Z and VF. PC upload or download custom cable lists",
        },
        { parameter: "Tones", value: "900/1100Hz warble, 977.5, 850, 577Hz steady or pulsed" },
      ],
      hardware: [
        { parameter: "Display", value: "Quarter VGA transflective & backlit" },
        { parameter: "Communications", value: "USB-2/serial" },
        { parameter: "Internal Power", value: "8 AA NiMH cells (installed) ~5.5 hours continuous operation" },
        { parameter: "Alternate Cells", value: "8 AA alkaline, ~ 7 hours continuous operation" },
        { parameter: "External Power", value: "90-240VAC 50/60Hz adapter to 12VDC, 12VDC Vehicle adapter included" },
      ],
      physical: [
        { parameter: "TDR Size", value: "8.5 x 4.3 x 2.25 inches (216 x 109 x 57mm)" },
        { parameter: "TDR Weight", value: "2.1 lbs (923 grams) with batteries and belt case" },
        { parameter: "Environmental", value: "Splash and dust resistant" },
        {
          parameter: "Ruggedness",
          value: "MIL-STD 810G Transient Drop tested, 48 inches (1.2m) to concrete, 27 drops",
        },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "Made in USA", description: "Designed and manufactured in the United States" },
      { name: "ISO 9001", description: "Registered to ISO 9001 quality standards" },
    ],
    models: [
      {
        name: "E20/20F CATV Network TDR",
        partNumber: "6021-5041",
        type: "CATV Network Testing",
        description: "Professional CATV TDR with F-type and RJ45 connectors and CATV cable library",
        includes: [
          "E20/20F TDR with F-type and RJ45 connectors and CATV cable list",
          "Belt case, AC power adapter",
          "8AA NiMH cells (installed), USB Cable",
          "F-to-alligator clips test leads",
          "RJ45-to-RJ45 Cat 5E 6ft (2m) Test Lead",
          "Basic Guide, Quick Start Guide",
          "CD-ROM with ETDR PC Vision software",
          "Operation Manual, Training Presentation, Application Notes",
          "Calibration Certificate with data",
        ],
        popular: true,
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Large padded soft case with custom protective foam interior and shoulder strap.",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "Test Lead Coax F-type",
        partNumber: "0070-1502",
        description: "F(m)-to-F(f) 75 Ohm Coax cable 6 ft (2m) for CATV applications.",
        iconType: "cable",
      },
      {
        name: "DC Vehicle Power Adapter",
        partNumber: "6025-0250",
        description: "12 VDC Vehicle Adapter with fuse, 6' (2m) cord & DC plug for mobile use.",
        iconType: "power",
      },
      {
        name: "Certificate of Calibration",
        partNumber: "6000-0402",
        description: "Factory calibration certificate with test data and traceability documentation.",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "https://drive.google.com/file/d/18flXvH6TDY_82YEu4Dp8ZwD0Uol1etO5/view",
    resources: [
      {
        type: "video",
        title: "Coaxial Cable Testing",
        description:
          "Describes various setups and testing examples on coax cables. Also shows some common coax cable faults.",
        url: "https://www.youtube.com/watch?v=cOyJnAZ--WM",
        thumbnailUrl: "https://img.youtube.com/vi/cOyJnAZ--WM/hqdefault.jpg",
        duration: "10:15",
      },
      {
        type: "video",
        title: "Introduction to AEA Technology's E20/20 Step TDRs",
        description:
          "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
        url: "https://www.youtube.com/watch?v=eQcXZeccYAs",
        thumbnailUrl: "https://img.youtube.com/vi/eQcXZeccYAs/hqdefault.jpg",
        duration: "4:13",
      },
      {
        type: "video",
        title: "How TDRs Work",
        description:
          "A basic description about TDR technology and how TDRs display distance to end-of-cable and cable faults.",
        url: "https://www.youtube.com/watch?v=hn7YO3Xfgd0",
        thumbnailUrl: "https://img.youtube.com/vi/hn7YO3Xfgd0/hqdefault.jpg",
        duration: "3:58",
      },
      {
        type: "video",
        title: "The Advantages of Using Step TDR Technology",
        description:
          "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information.",
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
        description:
          "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
        url: "https://www.youtube.com/watch?v=rjZidAO3a2k",
        thumbnailUrl: "https://img.youtube.com/vi/rjZidAO3a2k/hqdefault.jpg",
        duration: "8:30",
      },
      {
        type: "datasheet",
        title: "E20/20F CATV Network TDR Datasheet",
        url: "/docs/datasheets/e20-20f-catv-datasheet.pdf",
        fileSize: "1.6 MB",
      },
      {
        type: "manual",
        title: "E20/20F CATV Network TDR User Manual",
        url: "/docs/manuals/e20-20f-manual.pdf",
        fileSize: "4.0 MB",
      },
      {
        type: "application-note",
        title: "Troubleshooting CATV Networks with TDR",
        description: "Tips and techniques for CATV technicians",
        url: "/docs/app-notes/catv-tdr-troubleshooting.pdf",
        fileSize: "1.1 MB",
      },
    ],
    overviewDescription:
      "The E20/20F CATV Network TDR is specifically configured for cable television and broadband network testing. With F-type and RJ45 connectors and a comprehensive CATV cable library, it's the ideal tool for CATV technicians and installers.",
    applications: [
      "CATV network testing",
      "Broadband cable troubleshooting",
      "Drop cable verification",
      "Trunk line fault location",
      "MSO plant maintenance",
      "Subscriber premise testing",
      "Return path analysis",
      "Cable system documentation",
    ],
    capabilityCards: [
      {
        title: "CATV Optimized",
        icon: "zap",
        items: [
          "F-type connector for direct CATV cable connection.",
          "64 pre-loaded CATV cable types.",
          "75 Ohm optimized measurements.",
        ],
      },
      {
        title: "Precision Testing",
        icon: "settings",
        items: [
          "Sub-inch accuracy for fault location.",
          "Zero dead zone on any range.",
          "MicroFault detection for cable damage.",
        ],
      },
      {
        title: "Software & Data",
        icon: "database",
        items: [
          "ETDR PC Vision software included.",
          "32 trace storage with timestamps.",
          "Custom cable library support.",
        ],
      },
      {
        title: "Field Rugged",
        icon: "shield",
        items: ["MIL-STD 810G drop tested.", "Splash and dust resistant.", "5.5+ hours battery operation."],
      },
      {
        title: "Easy Operation",
        icon: "monitor",
        items: ["Setup Wizard for quick start.", "Context-sensitive help.", "Backlit display for any conditions."],
      },
      {
        title: "Quality Assured",
        icon: "award",
        items: ["Made in USA.", "ISO 9001 manufactured.", "2-year warranty."],
      },
    ],
    softwareInfo: {
      name: "ETDR PC Vision™",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities.",
      features: [
        "Professional graphical waveform display",
        "Automated test report generation",
        "Cable list management and customization",
        "Trace comparison and overlay analysis",
        "Data export to multiple formats",
      ],
    },
  },

  // ===== VNA & SWR PRODUCTS =====
  {
    slug: "swr-site-analyzer",
    name: "SWR Site Analyzer",
    tagline: "Three Instruments in One Hand-held Rugged Package",
    shortDescription:
      "Single port unit with easy to use FDR (Frequency Domain Reflectometer), SWR and Return loss measurements. Featuring full color back-lit display with excellent daylight readability.",
    category: "vna-swr",
    badges: [
      { text: "Made in USA", variant: "green" },
      { text: "Professional Grade", variant: "blue" },
    ],
    modelImages: {
      0: ["/images/featured/swr-analyzer.png", "/images/swr-with-case.png"],
    },
    keyFeatures: [
      "Frequency Range: 100KHz – 1500MHz",
      "FDR Range: 0 to >5000ft (0 to >1524m)",
      "User selectable limit lines for at-a-glance tuning",
      "One button Auto-tune in SWR/Return loss",
      "Site Analyzer PC Vision™ software included",
      "Full color back-lit display with excellent daylight readability",
      "Field replaceable AA NiMH batteries",
      "Easy to navigate menus with user selectable color settings",
      "USB-2 communications (cable included)",
      "Cable Null option to compensate for test lead or feed line",
      "Fully rechargeable NIMH batteries are COTS replaceable",
    ],
    displayFeatures: [
      "Frequency Range: 100KHz – 1500MHz",
      "FDR Range: 0 to >5000ft (0 to >1524m)",
      "User selectable limit lines for at-a-glance tuning",
      "One button Auto-tune in SWR/Return loss",
      "Site Analyzer PC Vision™ software included",
      "Full color back-lit display with excellent daylight readability",
    ],
    specifications: {
      performance: [
        { parameter: "Frequency Range", value: "100KHz – 1500MHz" },
        { parameter: "Tuning/Display Resolution", value: "1 KHz" },
        { parameter: "Refresh Rate", value: "2.5 times/second" },
        { parameter: "Frequency Display", value: "250 points" },
        { parameter: "Measurement Speed", value: "5ms / data point" },
        { parameter: "FDR Measurements", value: "DTF, end of cable and Antenna RL" },
        { parameter: "FDR Range", value: "0 to >5000ft (0 to >1524m)" },
        { parameter: "Min Resolution", value: "0.5% of Scale" },
        { parameter: "FDR Accuracy", value: "0.5% of Scale" },
        { parameter: "Output Power", value: "~ 0 dBm @ 50 Ohms" },
      ],
      hardware: [
        { parameter: "RF Connectors", value: '"N" Type' },
        { parameter: "Power Requirements", value: "12-18 VDC @ 800 mA min. 8 AA NiMH, or Alkaline" },
        { parameter: "Size", value: '8.5" x 4.3" x 2.25" (216 x 109 x 57 mm)' },
        { parameter: "Weight", value: "2.2 lbs (1 Kilogram) with belt case and batteries" },
        { parameter: "Warranty", value: "2 years" },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "ISO 9001", description: "Registered to ISO 9001 quality standards" },
      { name: "Made in USA", description: "Made in USA with US and global parts" },
    ],
    models: [
      {
        name: "SWR Site Analyzer",
        partNumber: "6050-5000",
        type: "Complete Package",
        description: "Complete testing solution with all accessories",
        includes: [
          "SWR Site Analyzer",
          "Terminators (short & 50 Ohm)",
          "8AA NiMH cells (installed)",
          "Belt Case with removable shoulder strap",
          "USB Cable",
          "AC adapter",
          "Quick Start Guide",
          "Basic Guide",
          "CD with Operating Manual, Training PPT and Site Analyzer PC Vision software",
        ],
        popular: true,
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Large padded soft case with custom protective foam interior and shoulder strap.",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "DC Vehicle Power Adapter",
        partNumber: "6025-0250",
        description: "12 VDC Vehicle Adapter with fuse, 6' cord & DC plug for mobile operations.",
        iconType: "power",
      },
      {
        name: "Certificate of Calibration",
        partNumber: "6050-0700",
        description: "Factory calibration certificate with test data and traceability documentation.",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "https://drive.google.com/file/d/1h7ZKAEOBRJxpd4buLqw3LBec1JMSTjXl/view",
    resources: [
      {
        type: "video",
        title: "AEA Liberator Spectrum Analyzer Operation",
        description: "Setting up and Using the Spectrum Analyzer Function In Liberator Series VNA Site Analyzer.",
        url: "https://www.youtube.com/watch?v=eHVRupI0Z60",
        thumbnailUrl: "https://img.youtube.com/vi/eHVRupI0Z60/hqdefault.jpg",
        duration: "12:30",
      },
      {
        type: "datasheet",
        title: "SWR Site Analyzer Datasheet",
        url: "/docs/datasheets/swr-site-analyzer-datasheet.pdf",
        fileSize: "1.9 MB",
      },
      {
        type: "manual",
        title: "SWR Site Analyzer User Manual",
        url: "/docs/manuals/swr-site-analyzer-manual.pdf",
        fileSize: "3.5 MB",
      },
      {
        type: "software",
        title: "Site Analyzer PC Vision Software",
        description: "Software for instrument control and data analysis",
        url: "/software/site-analyzer-pc-vision-setup.exe",
        fileSize: "22 MB",
      },
    ],
    overviewDescription:
      "The SWR Site Analyzer combines three essential RF testing instruments in one handheld package: SWR meter, Return Loss measurement, and Frequency Domain Reflectometer. The full-color display provides excellent visibility in all lighting conditions.",
    applications: [
      "Antenna system testing",
      "Transmission line analysis",
      "Tower site maintenance",
      "Cable fault location with FDR",
      "SWR and return loss verification",
      "RF system commissioning",
      "Broadcast facility testing",
      "Two-way radio system maintenance",
    ],
    capabilityCards: [
      {
        title: "Three-in-One",
        icon: "zap",
        items: [
          "SWR measurement for antenna matching.",
          "Return loss for system performance.",
          "FDR mode for cable fault location.",
        ],
      },
      {
        title: "Wide Frequency Range",
        icon: "settings",
        items: ["100KHz to 1500MHz coverage.", "1KHz tuning resolution.", "250-point frequency display."],
      },
      {
        title: "Advanced Features",
        icon: "database",
        items: ["One-button Auto-tune function.", "User selectable limit lines.", "Cable Null compensation option."],
      },
      {
        title: "Field Ready",
        icon: "shield",
        items: ["Full color daylight-readable display.", "Field replaceable AA batteries.", "Rugged handheld design."],
      },
      {
        title: "Software Included",
        icon: "monitor",
        items: [
          "Site Analyzer PC Vision software.",
          "USB connectivity for data transfer.",
          "Report generation capability.",
        ],
      },
      {
        title: "Quality Assured",
        icon: "award",
        items: ["Made in USA.", "ISO 9001 manufactured.", "2-year warranty."],
      },
    ],
    softwareInfo: {
      name: "Site Analyzer PC Vision™",
      description: "Analysis software for SWR, VNA and site analyzer instruments with comprehensive reporting.",
      features: [
        "Real-time instrument control",
        "Data logging and trending",
        "Professional report generation",
        "Measurement overlay comparison",
        "Pass/fail limit testing",
      ],
    },
  },

  {
    slug: "via-bravo-ex2",
    name: "VIA Bravo Ex2",
    tagline: "Network Analyzer for Precision Impedance and SWR Measurements",
    shortDescription:
      "Network Analyzer and Antenna Analyzer with comprehensive RF testing capabilities including SWR and VNA measurements.",
    category: "vna-swr",
    badges: [{ text: "Made in USA", variant: "green" }],
    modelImages: {
      0: [
        "/images/products/bravo-ex2/device-with-stand.png",
        "/images/products/bravo-ex2/device-in-case.png",
        "/images/products/bravo-ex2/soft-case.png",
        "/images/products/bravo-ex2/kit-open.png",
        "/images/products/bravo-ex2/screen-swr.png",
        "/images/products/bravo-ex2/screen-vna.png",
      ],
    },
    keyFeatures: [
      "Comprehensive RF testing with SWR and VNA capabilities",
      "Accurate measurements for antenna systems, transmission lines, and RF components",
      "Intuitive interface with graphical display",
      "Frequency range: 100KHz to 525MHz",
      "Impedance range: 0 to 2000 Ohms",
      "Measures SWR, Return Loss, Resistance, Impedance Angle, X",
      "Simultaneous dual parameter graphical display",
      "Quarter VGA back-lit color display with customizable colors",
      "One-button Auto-tune for best SWR or Return Loss",
      "Large numeric format readout in CW mode",
      "Cable Null option to eliminate test lead effects",
      "Internal memory holds 100's of plots and setups",
      "Ultra Low-Magnetic signature",
      "Site Analyzer PC Vision™ software included",
      "USB-2 cable for PC connectivity",
    ],
    displayFeatures: [
      "Comprehensive RF testing with SWR and VNA capabilities",
      "Accurate measurements for antenna systems, transmission lines, and RF components",
      "Intuitive interface with graphical display",
      "One-button Auto-tune for best SWR or Return Loss",
      "Site Analyzer PC Vision™ software included",
      "Ultra Low-Magnetic signature",
    ],
    specifications: {
      performance: [
        { parameter: "Frequency Range", value: "100KHz – 525MHz" },
        { parameter: "Tuning/Display Resolution", value: "1Hz (100 KHz - 150MHz), 200Hz > 150MHz" },
        { parameter: "Refresh Rate", value: "2.5 times/second" },
        { parameter: "Frequency Display", value: "251 points" },
        { parameter: "Measurement Speed", value: "5ms / data point" },
        { parameter: "Output Power", value: "-5 dBm @ 50 Ohms" },
        { parameter: "Impedance Range", value: "0 to 2000 Ohms" },
        {
          parameter: "Measurements",
          value: "SWR, Return Loss, Resistance, Z, Z Angle, X, Equivalent Inductance and Capacitance",
        },
      ],
      hardware: [
        { parameter: "Display", value: "Quarter VGA back-lit color display (user selectable color scheme)" },
        { parameter: "RF Connectors", value: '"N" Type' },
        { parameter: "Power Requirements", value: "12-VDC @ 650mA min. 8 AA NiMH, or Alkaline" },
        { parameter: "Size", value: '8.5" x 4.3" x 2.25" (216 x 109 x 57 mm)' },
        { parameter: "Weight", value: "2.2 lbs (1.0 Kilogram) with belt case and batteries" },
        { parameter: "Warranty", value: "2 years" },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "Made in USA", description: "With US and global parts" },
      { name: "ISO 9001", description: "Registered to ISO 9001 quality standards" },
    ],
    models: [
      {
        name: "VIA Bravo Ex2 Analyzer",
        partNumber: "6053-5000-VIA",
        type: "Dual Port Network Analyzer",
        description: "Complete network analyzer solution for resonant device testing and tuning",
        includes: [
          "VIA Bravo Ex2 Analyzer",
          "Terminators N Type (short & 50 Ohm)",
          "Padded carrying case",
          "6 ft USB Cable",
          "AC adapter",
          "CD with Operating Manual, Training PPT and Site Analyzer PC Vision™ application",
        ],
        popular: true,
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Large reinforced soft sided carrying case",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "Certificate of Calibration",
        partNumber: "6000-0402",
        description: "Factory calibration certificate with test data and traceability documentation.",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "/datasheets/Bravo_Ex_2_Analyzer.pdf",
    resources: [
      {
        type: "video",
        title: "AEA Liberator Spectrum Analyzer Operation",
        description: "Setting up and Using the Spectrum Analyzer Function In Liberator Series VNA Site Analyzer.",
        url: "https://www.youtube.com/watch?v=eHVRupI0Z60",
        thumbnailUrl: "https://img.youtube.com/vi/eHVRupI0Z60/hqdefault.jpg",
        duration: "12:30",
      },
      {
        type: "datasheet",
        title: "VIA Bravo Ex2 Datasheet",
        url: "/datasheets/Bravo_Ex_2_Analyzer.pdf",
        fileSize: "2.1 MB",
      },
      {
        type: "manual",
        title: "VIA Bravo Ex2 User Manual",
        url: "/docs/manuals/via-bravo-ex2-manual.pdf",
        fileSize: "4.5 MB",
      },
      {
        type: "guide",
        title: "Antenna Tuning Guide",
        description: "Using the Bravo Ex2 for optimal antenna performance",
        url: "/docs/guides/antenna-tuning-guide.pdf",
        fileSize: "1.2 MB",
      },
    ],
    overviewDescription:
      "The VIA Bravo Ex2 is a handheld Vector Impedance Analyzer for measuring antennas, networks, and resonant devices. It provides comprehensive SWR and VNA measurements in a compact, field-ready package.",
    applications: [
      "Antenna tuning and analysis",
      "Network impedance measurement",
      "Resonant device testing",
      "Transmission line analysis",
      "RF component characterization",
      "Amateur radio applications",
      "Two-way radio maintenance",
      "Educational RF training",
    ],
    capabilityCards: [
      {
        title: "VNA Capabilities",
        icon: "zap",
        items: ["Full vector impedance analysis.", "0 to 2000 Ohm impedance range.", "SWR, Return Loss, Z, and more."],
      },
      {
        title: "Wide Frequency",
        icon: "settings",
        items: ["100KHz to 525MHz coverage.", "1Hz tuning resolution.", "251-point frequency display."],
      },
      {
        title: "Advanced Display",
        icon: "monitor",
        items: [
          "Dual parameter graphical display.",
          "User selectable color schemes.",
          "Large numeric CW mode readout.",
        ],
      },
      {
        title: "Special Features",
        icon: "shield",
        items: ["Ultra Low-Magnetic signature.", "One-button Auto-tune.", "Cable Null compensation."],
      },
      {
        title: "Data Management",
        icon: "database",
        items: ["100+ plot storage capacity.", "Site Analyzer PC Vision software.", "USB-2 PC connectivity."],
      },
      {
        title: "Quality",
        icon: "award",
        items: ["Made in USA.", "ISO 9001 certified.", "2-year warranty."],
      },
    ],
    softwareInfo: {
      name: "Site Analyzer PC Vision™",
      description: "Analysis software for VNA and site analyzer instruments with comprehensive reporting.",
      features: [
        "Real-time instrument control",
        "Smith Chart display",
        "Data logging and trending",
        "Professional report generation",
        "Measurement comparison tools",
      ],
    },
  },

  {
    slug: "via-bravo-mri-3000",
    name: "Bravo MRI-3000 Analyzer",
    tagline: "Network Analyzer for MRI System Alignment",
    shortDescription:
      "The Bravo MRI-3000 Analyzer is a Network Analyzer that accurately measures Impedances from 0 to 2000 Ohms, Resistance, Impedance Angle, X, Q, Return Loss, and SWR. Designed specifically for MRI System Alignment with its ultra low-magnetic signature.",
    category: "vna-swr",
    badges: [{ text: "Made in USA", variant: "green" }],
    modelImages: {
      0: ["/images/featured/bravo-mri.jpg", "/images/bravo-mri-in-case.png"],
      1: ["/images/featured/bravo-mri.jpg", "/images/bravo-mri-in-case.png"],
    },
    keyFeatures: [
      "Ultra Low-Magnetic signature for MRI environments",
      "Frequency Range: 100KHz – 450MHz (0.1 to 10 Tesla)",
      "One-button Auto-tune for optimal coil performance",
      "Large Format readout for easy viewing from distance",
      "MRI PC Vision™ software included",
      "Output Power: -20 dBm @ 50 Ohms (MRI safe)",
    ],
    displayFeatures: [
      "Ultra Low-Magnetic signature for MRI environments",
      "Frequency Range: 100KHz – 450MHz (0.1 to 10 Tesla)",
      "One-button Auto-tune for optimal coil performance",
      "Large Format readout for easy viewing from distance",
      "MRI PC Vision™ software included",
      "Output Power: -20 dBm @ 50 Ohms (MRI safe)",
    ],
    specifications: {
      performance: [
        {
          parameter: "Measurements",
          value: "SWR, Return Loss, Resistance, Z, Z Angle, X, Q, Equivalent Inductance and Capacitance",
        },
        { parameter: "Frequency Range", value: "100KHz – 450MHz (0.1 to 10 Tesla)" },
        { parameter: "Tuning/Display Resolution", value: "1Hz (100 KHz - 150MHz), 200Hz > 150MHz" },
        { parameter: "Refresh Rate", value: "2.5 times/second" },
        { parameter: "Frequency Display", value: "210 points (Large Format), 150 points (Small Format)" },
        { parameter: "Measurement Speed", value: "5ms / data point" },
        { parameter: "Output Power", value: "-20 dBm @ 50 Ohms" },
      ],
      hardware: [
        { parameter: "Display", value: "Quarter VGA back-lit color display (user selectable color scheme)" },
        { parameter: "RF Connectors", value: '"N" Type' },
        { parameter: "Communications", value: "USB-2" },
        { parameter: "Power requirements", value: "12-18 VDC @ 650mA min. or 8 AA Batteries" },
      ],
      physical: [
        { parameter: "Size", value: '8.5" x 4.3" x 2.25" (216 x 109 x 57 mm)' },
        { parameter: "Weight", value: "1.6 lbs (0.75 Kilogram) with belt case" },
        { parameter: "Warranty", value: "2 years" },
        { parameter: "Magnetic Signature", value: "Ultra Low - suitable for MRI environments" },
      ],
    },
    certifications: [
      { name: "CE Certified", description: "European Conformity marking" },
      { name: "EMC Compliance", description: "EN/IEC 61326-1:2013/2020" },
      { name: "Safety Certified", description: "EN/IEC 61010-1:2010 +A1:2016 + C1:2019" },
      { name: "ISO 9001", description: "Manufactured to ISO 9001 quality standards" },
      { name: "MRI Compatible", description: "Ultra low-magnetic signature for MRI environments" },
    ],
    models: [
      {
        name: "Bravo MRI-3000 (Single Port)",
        partNumber: "6055-5000",
        type: "Single Port Unit",
        description: "Standard single port analyzer for MRI coil testing and tuning",
        includes: [
          "Bravo MRI-3000 Analyzer",
          '"N" to BNC Adapter',
          "Terminators BNC (short & 50 Ohm)",
          "6 ft USB Cable and 15 ft extension",
          "AC adapter",
          "Quick Start Guide",
          "CD with Operating Manual, Training PPT and MRI PC Vision™ software",
        ],
        popular: true,
      },
      {
        name: "Bravo MRI-3000 (Dual Port)",
        partNumber: "6055-5100",
        type: "Dual Port Unit",
        description: "Dual port analyzer for coil-to-coil loss/separation measurements",
        includes: [
          "Bravo MRI-3000 Analyzer (Dual Port)",
          '"N" to BNC Adapter',
          "Terminators BNC (short & 50 Ohm)",
          "6 ft USB Cable and 15 ft extension",
          "AC adapter",
          "Quick Start Guide",
          "CD with Operating Manual, Training PPT and MRI PC Vision™ software",
          "S11 & S21 measurement capability",
        ],
      },
    ],
    accessories: [
      {
        name: "Soft Equipment Case",
        partNumber: "6015-1002",
        description: "Large padded soft case with custom protective foam interior and shoulder strap.",
        image: "/images/soft-equipment-case.png",
        iconType: "case",
      },
      {
        name: "Certificate of Calibration",
        partNumber: "6000-0402",
        description: "Factory calibration certificate with test data and traceability documentation.",
        iconType: "certificate",
      },
    ],
    datasheetUrl: "/datasheets/Bravo_MRI_3000_Analyzer.pdf",
    resources: [
      {
        type: "datasheet",
        title: "Bravo MRI-3000 Analyzer Datasheet",
        url: "/datasheets/Bravo_MRI_3000_Analyzer.pdf",
        fileSize: "1.7 MB",
      },
      {
        type: "manual",
        title: "Bravo MRI-3000 Analyzer User Manual",
        url: "/docs/manuals/bravo-mri-3000-manual.pdf",
        fileSize: "4.0 MB",
      },
      {
        type: "software",
        title: "MRI PC Vision Software",
        description: "Specialized software for MRI coil analysis",
        url: "/software/mri-pc-vision-setup.exe",
        fileSize: "18 MB",
      },
      {
        type: "application-note",
        title: "MRI RF Coil Tuning Best Practices",
        description: "Guidelines for optimal MRI coil alignment and testing",
        url: "/docs/app-notes/mri-coil-tuning.pdf",
        fileSize: "2.1 MB",
      },
    ],
    overviewDescription:
      "The Bravo MRI-3000 Analyzer is specifically designed for MRI system alignment and RF coil testing. Its ultra low-magnetic signature allows safe operation in MRI environments while providing precise impedance and SWR measurements.",
    applications: [
      "MRI RF coil tuning",
      "MRI system alignment",
      "Coil-to-coil coupling analysis",
      "MRI component testing",
      "Medical imaging facility maintenance",
      "RF coil development",
      "Quality assurance testing",
      "Service and repair operations",
    ],
    capabilityCards: [
      {
        title: "MRI Safe",
        icon: "shield",
        items: ["Ultra low-magnetic signature.", "-20 dBm output (safe for MRI).", "Designed for MRI room operation."],
      },
      {
        title: "Precision Measurements",
        icon: "zap",
        items: ["0 to 2000 Ohm impedance range.", "Q factor measurement.", "SWR and Return Loss."],
      },
      {
        title: "MRI Frequency Range",
        icon: "settings",
        items: ["100KHz to 450MHz coverage.", "0.1 to 10 Tesla field support.", "1Hz tuning resolution."],
      },
      {
        title: "Ease of Use",
        icon: "monitor",
        items: ["Large format distant readout.", "One-button Auto-tune.", "User selectable colors."],
      },
      {
        title: "Dual Port Option",
        icon: "database",
        items: ["S11 and S21 measurements.", "Coil-to-coil loss analysis.", "Isolation measurements."],
      },
      {
        title: "Software",
        icon: "award",
        items: ["MRI PC Vision™ included.", "15 ft USB extension cable.", "Data logging capability."],
      },
    ],
    softwareInfo: {
      name: "MRI PC Vision™",
      description: "Specialized software for MRI coil analysis and tuning with remote operation capability.",
      features: [
        "Remote instrument control",
        "Real-time measurement display",
        "Coil characterization tools",
        "Data logging and trending",
        "Professional report generation",
      ],
    },
  },
]

// Helper functions for data access
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: "tdr" | "vna-swr"): Product[] {
  return allProducts.filter((p) => p.category === category)
}

export function getAllProductSlugs(): string[] {
  return allProducts.map((p) => p.slug)
}
