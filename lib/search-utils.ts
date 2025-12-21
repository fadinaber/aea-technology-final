import { getAllManuals, productDisplayNames } from "@/data/product-resources"

export interface SearchItem {
  id: string
  name: string
  description: string
  category: string
  type: "product" | "software" | "manual" | "video" | "faq" | "applicationNotes"
  url: string
  keywords: string[]
}

// Unified content database for all search functionality
export const getAllSearchContent = (): SearchItem[] => {
  // Products data
  const products: SearchItem[] = [
    {
      id: "e20-20-avionics",
      name: "E20/20 Avionics TDR Kit",
      description: "Complete aviation cable testing solution with precision fault location capabilities",
      category: "Aviation",
      type: "product",
      url: "/products/e20-20-avionics",
      keywords: ["aviation", "tdr", "cable testing", "fault location", "boeing", "aircraft", "wiring"],
    },
    {
      id: "e20-20n",
      name: "E20/20N TDR",
      description: "Enhanced Step TDR for broadcast transmission line testing and network analysis",
      category: "Broadcast",
      type: "product",
      url: "/products/e20-20n",
      keywords: ["broadcast", "tdr", "transmission", "network", "coax", "rf"],
    },
    {
      id: "e20-20f-catv",
      name: "E20/20F CATV Network TDR",
      description: "Cable TV network analysis and fault location",
      category: "CATV",
      type: "product",
      url: "/products/e20-20f-catv",
      keywords: ["catv", "cable tv", "network", "tdr", "fault location"],
    },
    {
      id: "e20-20b",
      name: "E20/20B Network TDR",
      description: "Professional VDV/RF network testing with precision fault location",
      category: "General RF",
      type: "product",
      url: "/products/e20-20b",
      keywords: ["vdv", "rf", "network", "testing", "fault location"],
    },
    {
      id: "via-bravo-mri-3000",
      name: "Bravo MRI-3000 Analyzer",
      description: "Specialized RF testing for medical environments and MRI facility compliance",
      category: "Medical",
      type: "product",
      url: "/products/via-bravo-mri-3000",
      keywords: ["mri", "medical", "rf", "analyzer", "compliance", "hospital", "bravo"],
    },
    {
      id: "via-bravo-ex2",
      name: "VIA Bravo EX2",
      description: "Extended range vector network analysis",
      category: "Extended Range",
      type: "product",
      url: "/products/via-bravo-ex2",
      keywords: ["vna", "vector", "network", "analyzer", "extended", "range"],
    },
    {
      id: "swr-site-analyzer",
      name: "SWR Site Analyzer",
      description: "Standing wave ratio analysis for land mobile radio",
      category: "Land Mobile Radio",
      type: "product",
      url: "/products/swr-site-analyzer",
      keywords: ["swr", "site", "analyzer", "radio", "mobile", "standing wave"],
    },
  ]

  // Software data
  const software: SearchItem[] = [
    {
      id: "tdr-analysis-suite",
      name: "AEA TDR Analysis Suite",
      description: "Comprehensive analysis software for TDR measurements and reporting",
      category: "Analysis Software",
      type: "software",
      url: "/resources?tab=software",
      keywords: ["tdr", "analysis", "software", "measurements", "reporting", "pc vision"],
    },
    {
      id: "vna-calibration",
      name: "VNA Calibration Utility",
      description: "Calibration and setup utility for Vector Network Analyzers",
      category: "Calibration",
      type: "software",
      url: "/resources?tab=software",
      keywords: ["vna", "calibration", "utility", "setup", "vector", "network"],
    },
  ]

  // Manuals data - dynamically loaded from product-resources.ts
  const allManualsData = getAllManuals()
  const manuals: SearchItem[] = allManualsData.map((manual) => {
    const productName = productDisplayNames[manual.productSlug] || manual.productSlug
    const category = manual.type === "training" ? "Training" : manual.type === "guide" ? "Quick Reference" : "User Manual"
    
    // Generate keywords from title, description, product name, and type
    const titleWords = manual.title.toLowerCase().split(/\s+/)
    const descWords = (manual.description || "").toLowerCase().split(/\s+/)
    const keywords = [
      ...titleWords.filter(w => w.length > 2),
      ...descWords.filter(w => w.length > 2),
      productName.toLowerCase(),
      manual.type,
      category.toLowerCase(),
    ].filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
    
    return {
      id: manual.localPath || manual.url || manual.title.toLowerCase().replace(/\s+/g, "-"),
      name: manual.title,
      description: manual.description || "",
      category,
      type: "manual" as const,
      url: manual.localPath || manual.url || "/resources?tab=manuals",
      keywords,
    }
  })

  // Videos data
  const videos: SearchItem[] = [
    {
      id: "e20-20-overview",
      name: "E20/20 Series TDR Overview",
      description: "Complete overview of features and basic operation",
      category: "Product Overview",
      type: "video",
      url: "/resources?tab=videos",
      keywords: ["e20/20", "tdr", "overview", "features", "operation", "tutorial"],
    },
    {
      id: "via-bravo-calibration",
      name: "VIA Bravo Calibration Procedure",
      description: "Step-by-step calibration process for accurate measurements",
      category: "Calibration",
      type: "video",
      url: "/resources?tab=videos",
      keywords: ["via bravo", "calibration", "procedure", "measurements", "tutorial"],
    },
    {
      id: "cable-fault-location",
      name: "Cable Fault Location Techniques",
      description: "Advanced techniques for locating and identifying cable faults",
      category: "Training",
      type: "video",
      url: "/resources?tab=videos",
      keywords: ["cable", "fault location", "techniques", "advanced", "training"],
    },
    {
      id: "swr-broadcast",
      name: "SWR Analysis in Broadcast Applications",
      description: "Practical SWR analysis for broadcast transmission systems",
      category: "Application",
      type: "video",
      url: "/resources?tab=videos",
      keywords: ["swr", "analysis", "broadcast", "transmission", "systems", "practical"],
    },
    {
      id: "aircraft-wire-testing",
      name: "Aircraft Wire Testing with Avionics TDR",
      description: "Shows how to test single-wires in aircraft harnesses using AEA Technology's Avionics Step TDR",
      category: "Aviation",
      type: "video",
      url: "/resources?tab=videos",
      keywords: ["aircraft", "wire testing", "avionics", "tdr", "harnesses", "single-wires"],
    },
    {
      id: "new-video-uN6ACydNK4c",
      name: "AEA Technology Video",
      description: "Additional instructional video for AEA Technology products and applications",
      category: "Product Tutorials",
      type: "video",
      url: "/resources?tab=videos",
      keywords: ["tutorial", "product", "instructions", "aea", "technology"],
    },
  ]

  // Application Notes data
  const applicationNotes: SearchItem[] = [
    // General Application Notes
    {
      id: "an150",
      name: "AN150 - Using Batteries in AEA Technology Instruments",
      description: "Guide for battery usage and management in AEA instruments",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an150",
      keywords: ["battery", "power", "management", "general"],
    },
    {
      id: "an152",
      name: "AN152 - Troubleshooting Serial Port Operations",
      description: "Serial port troubleshooting and configuration guide",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an152",
      keywords: ["serial", "port", "troubleshooting", "communication"],
    },
    {
      id: "an153",
      name: "AN153 - Cold Weather Operations for AEA Technology Instruments",
      description: "Operating AEA instruments in cold weather environments",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an153",
      keywords: ["cold", "weather", "environmental", "operation"],
    },
    // VNA Application Notes
    {
      id: "an100",
      name: "AN100 - What SWR Does Not Show",
      description: "Understanding the limitations of SWR measurements",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an100",
      keywords: ["vna", "swr", "theory", "limitations"],
    },
    {
      id: "an101",
      name: "AN101 - When to Use Cable Null",
      description: "Cable null calibration techniques and applications",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an101",
      keywords: ["vna", "calibration", "cable", "null"],
    },
    {
      id: "an102",
      name: "AN102 - Understanding Vector Network Analysis",
      description: "Fundamentals of vector network analysis",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an102",
      keywords: ["vna", "theory", "fundamentals", "vector"],
    },
    {
      id: "an103",
      name: "AN103 - Understanding Relationships of Impedance",
      description: "Impedance relationships and measurements",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an103",
      keywords: ["vna", "impedance", "theory", "relationships"],
    },
    {
      id: "an104",
      name: "AN104 - Smith Chart 101",
      description: "Introduction to Smith Chart interpretation",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an104",
      keywords: ["vna", "smith", "chart", "analysis"],
    },
    {
      id: "an110",
      name: "AN110 - Coaxial Stub Tuning",
      description: "Techniques for coaxial stub tuning and matching",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an110",
      keywords: ["vna", "coaxial", "tuning", "stub"],
    },
    {
      id: "an111",
      name: "AN111 - Find Characteristics of an Unknown Cable",
      description: "Methods to determine unknown cable characteristics",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an111",
      keywords: ["vna", "cable", "testing", "characteristics"],
    },
    {
      id: "an112",
      name: "AN112 - Tuning an Antenna",
      description: "Antenna tuning procedures using VNA",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an112",
      keywords: ["vna", "antenna", "tuning"],
    },
    {
      id: "an113",
      name: "AN113 - Measuring Discrete Components",
      description: "Component measurement techniques with VNA",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an113",
      keywords: ["vna", "components", "measurement"],
    },
    {
      id: "an114",
      name: "AN114 - Tower Site Tips",
      description: "Best practices for tower site measurements",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an114",
      keywords: ["vna", "tower", "field", "testing"],
    },
    {
      id: "an120",
      name: "AN120 - Measuring Amplifier Gain",
      description: "Amplifier gain measurement procedures",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an120",
      keywords: ["vna", "gain", "amplifier"],
    },
    {
      id: "an121",
      name: "AN121 - Measuring Group Delay",
      description: "Group delay measurement and analysis",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an121",
      keywords: ["vna", "group", "delay", "measurement"],
    },
    {
      id: "an122",
      name: "AN122 - Measuring Gain Compression",
      description: "Gain compression measurement techniques",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an122",
      keywords: ["vna", "compression", "amplifier"],
    },
    {
      id: "an124",
      name: "AN124 - Measuring Differential Amplifiers",
      description: "Differential amplifier testing procedures",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an124",
      keywords: ["vna", "differential", "amplifier"],
    },
    {
      id: "an125",
      name: "AN125 - Measuring AM to PM Distortion",
      description: "AM to PM distortion measurement methods",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an125",
      keywords: ["vna", "distortion", "analysis"],
    },
    {
      id: "an131",
      name: "AN131 - Using the Network Analyzer as a Signal Source",
      description: "Network analyzer signal source applications",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an131",
      keywords: ["vna", "signal", "source", "application"],
    },
    {
      id: "an132",
      name: "AN132 - Using the Network Analyzer as a Grid Dip Oscillator",
      description: "Grid dip oscillator mode and applications",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an132",
      keywords: ["vna", "grid", "dip", "oscillator"],
    },
    {
      id: "white-paper-via",
      name: "White Paper - VIA Analyzer vs VIA Bravo",
      description: "Comparison of VIA Analyzer and VIA Bravo platforms",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=white-paper-via",
      keywords: ["vna", "comparison", "white", "paper"],
    },
    // TDR Application Notes
    {
      id: "an200",
      name: "AN200 - Basic Theory of TDR Operation",
      description: "Fundamental principles of TDR technology",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an200",
      keywords: ["tdr", "theory", "fundamentals"],
    },
    {
      id: "an201",
      name: "AN201 - Step vs Pulse TDR Technology",
      description: "Comparison of step and pulse TDR technologies",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an201",
      keywords: ["tdr", "step", "pulse"],
    },
    {
      id: "an203",
      name: "AN203 - Getting the Most From Your TDR",
      description: "Best practices for TDR operation and analysis",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an203",
      keywords: ["tdr", "best", "practices", "operation"],
    },
    {
      id: "an204",
      name: "AN204 - Impedance Shifts",
      description: "Understanding and identifying impedance shifts",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an204",
      keywords: ["tdr", "impedance", "analysis"],
    },
    {
      id: "an205",
      name: "AN205 - Comparison of TDR vs FDR",
      description: "Comparison of time and frequency domain reflectometry",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an205",
      keywords: ["tdr", "fdr", "comparison"],
    },
    {
      id: "an210",
      name: "AN210 - Coax Cable Resistance",
      description: "Coaxial cable resistance measurement and analysis",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an210",
      keywords: ["tdr", "coaxial", "resistance"],
    },
    {
      id: "an211",
      name: "AN211 - Poor Coax Splice",
      description: "Identifying and analyzing poor coaxial splices",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an211",
      keywords: ["tdr", "coaxial", "splice"],
    },
    {
      id: "an212",
      name: "AN212 - Crushed or Pinched Coax",
      description: "Detecting crushed or pinched coaxial cable",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an212",
      keywords: ["tdr", "coaxial", "fault"],
    },
    {
      id: "an213",
      name: "AN213 - Wet Coax Cable",
      description: "Identifying water intrusion in coaxial cable",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an213",
      keywords: ["tdr", "coaxial", "water"],
    },
    {
      id: "an214",
      name: "AN214 - Coax Cable Terminations",
      description: "Analyzing coaxial cable termination quality",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an214",
      keywords: ["tdr", "coaxial", "termination"],
    },
    {
      id: "an215",
      name: "AN215 - Mixed Cable Types",
      description: "Testing installations with mixed cable types",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an215",
      keywords: ["tdr", "mixed", "cable", "analysis"],
    },
    {
      id: "an216",
      name: "AN216 - Coax Cable Tee",
      description: "Analyzing coaxial cable tee connections",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an216",
      keywords: ["tdr", "coaxial", "tee"],
    },
    {
      id: "an217",
      name: "AN217 - Measuring Feedline on a Tower",
      description: "Tower feedline testing procedures",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an217",
      keywords: ["tdr", "tower", "feedline"],
    },
    {
      id: "an220",
      name: "AN220 - Twisted Pair Cable Resistance",
      description: "Twisted pair cable resistance measurement",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an220",
      keywords: ["tdr", "twisted", "pair", "resistance"],
    },
    {
      id: "an221",
      name: "AN221 - Poor Splice in a Twisted Pair Cable",
      description: "Identifying poor twisted pair splices",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an221",
      keywords: ["tdr", "twisted", "pair", "splice"],
    },
    {
      id: "an222",
      name: "AN222 - Telco Style Alligator Clips",
      description: "Using telco alligator clips for testing",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an222",
      keywords: ["tdr", "telco", "clips"],
    },
    {
      id: "an223",
      name: "AN223 - Wet Twisted Pair Cable",
      description: "Detecting water damage in twisted pair cable",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an223",
      keywords: ["tdr", "twisted", "pair", "water"],
    },
    {
      id: "an224",
      name: "AN224 - Twisted Pair Cable Terminations",
      description: "Analyzing twisted pair termination quality",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an224",
      keywords: ["tdr", "twisted", "pair", "termination"],
    },
    {
      id: "an225",
      name: "AN225 - Split Pairs and Re-split Pairs",
      description: "Identifying split pair wiring issues",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an225",
      keywords: ["tdr", "twisted", "pair", "split", "pairs"],
    },
    {
      id: "an226",
      name: "AN226 - Bridged Taps",
      description: "Detecting and analyzing bridged taps",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an226",
      keywords: ["tdr", "bridged", "taps", "telco"],
    },
    {
      id: "an227",
      name: "AN227 - Testing Premise Telco Pairs",
      description: "Premise telecommunications pair testing",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an227",
      keywords: ["tdr", "telco", "premise"],
    },
    {
      id: "an228",
      name: "AN228 - Testing Network Cable Shields",
      description: "Network cable shield testing procedures",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an228",
      keywords: ["tdr", "network", "shield"],
    },
    {
      id: "an250",
      name: "AN250 - Measuring a Cable from Both Ends",
      description: "Bidirectional cable testing techniques",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an250",
      keywords: ["tdr", "bidirectional", "testing"],
    },
    {
      id: "an254",
      name: "AN254 - Intermittent Cable Operations",
      description: "Diagnosing intermittent cable faults",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an254",
      keywords: ["tdr", "intermittent", "troubleshooting"],
    },
    {
      id: "an255",
      name: "AN255 - Removing Test Lead Lengths",
      description: "Compensating for test lead lengths",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an255",
      keywords: ["tdr", "test", "leads", "calibration"],
    },
    {
      id: "an256",
      name: "AN256 - Sampling a Cable's Velocity",
      description: "Cable velocity factor determination",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an256",
      keywords: ["tdr", "velocity", "calibration"],
    },
    {
      id: "an257",
      name: "AN257 - TDR's Soft Reset and Battery Charging",
      description: "Soft reset procedures and battery charging",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an257",
      keywords: ["tdr", "reset", "battery"],
    },
    {
      id: "an258",
      name: "AN258 - USB-to-Serial Communications",
      description: "USB to serial adapter setup and troubleshooting",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an258",
      keywords: ["tdr", "usb", "serial"],
    },
    {
      id: "an259",
      name: "AN259 - Testing Single Wires In A Harness",
      description: "Individual wire testing in harness bundles",
      category: "Application Notes",
      type: "applicationNotes",
      url: "/resources?tab=application-notes&noteId=an259",
      keywords: ["tdr", "harness", "single", "wire"],
    },
  ]

  return [...products, ...software, ...manuals, ...videos, ...applicationNotes]
}

// Unified search function
export const performUnifiedSearch = (searchQuery: string, limit = 8): SearchItem[] => {
  if (!searchQuery.trim()) {
    return []
  }

  const allContent = getAllSearchContent()
  const searchTerms = searchQuery.toLowerCase().split(" ")

  const filtered = allContent.filter((item) => {
    const searchableText = [item.name, item.description, item.category, ...item.keywords].join(" ").toLowerCase()

    return searchTerms.every((term) => searchableText.includes(term))
  })

  // Sort by relevance (exact matches first, then partial matches)
  const sorted = filtered.sort((a, b) => {
    const aExact = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0
    const bExact = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0
    return bExact - aExact
  })

  return sorted.slice(0, limit)
}
