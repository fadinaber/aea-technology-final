// Resources content data file - CMS-ready structure
// Extracted from app/resources/page.tsx for headless CMS preparation

export interface SoftwareResource {
  id: string
  title: string
  description: string
  category: string
  type: "software"
  version?: string
  size?: string
  downloads?: number
  rating?: number
  featured?: boolean
  tags: string[]
  downloadUrl: string
}

export interface ManualResource {
  id: string
  title: string
  description: string
  category: string
  type: "manual"
  pages?: number
  size?: string
  downloads?: number
  rating?: number
  featured?: boolean
  tags: string[]
  downloadUrl: string
}

export interface VideoResource {
  id: string
  title: string
  description: string
  category: string
  type: "video"
  duration?: string
  videoId: string
  tags: string[]
}

export interface FaqResource {
  id: string
  title: string
  description: string
  category: string
  type: "faq"
  difficulty?: string
  views?: number
  rating?: number
  featured?: boolean
  tags: string[]
  content: string
}

export interface ApplicationNoteResource {
  id: string
  title: string
  description: string
  category: string
  type: "manual"
  tags: string[]
  downloadUrl: string
}

export interface ResourcesData {
  software: SoftwareResource[]
  manuals: ManualResource[]
  videos: VideoResource[]
  faqs: FaqResource[]
  "application-notes": ApplicationNoteResource[]
}

export const resourcesContent: ResourcesData = {
  software: [
    {
      id: "etdr-pc-vision",
      title: "ETDR PC Vision™ Software",
      description: "Complete analysis software for TDR measurements with graphical display and reporting capabilities",
      category: "Analysis Software",
      type: "software",
      version: "v3.2.1",
      size: "85 MB",
      downloads: 2847,
      rating: 4.8,
      featured: true,
      tags: ["TDR", "Analysis", "Reporting", "Windows"],
      downloadUrl: "#",
    },
    {
      id: "site-analyzer-pc-vision",
      title: "Site Analyzer PC Vision",
      description: "Analysis software for SWR, VNA and EX2 instruments.",
      category: "Analysis Software",
      type: "software",
      version: "v2.8.0",
      size: "72 MB",
      downloads: 1534,
      rating: 4.7,
      featured: true,
      tags: ["SWR", "VNA", "EX2", "Analysis"],
      downloadUrl: "#",
    },
    {
      id: "mri-vision",
      title: "MRI Vision",
      description: "Remote application software for Bravo MRI 3000",
      category: "Analysis Software",
      type: "software",
      version: "v1.5.2",
      size: "63 MB",
      downloads: 892,
      rating: 4.6,
      featured: true,
      tags: ["MRI", "Analysis"],
      downloadUrl: "#",
    },
  ],
  manuals: [
    {
      id: "avionics-tdr-manual",
      title: "Avionics TDR User Manual",
      description: "Complete operation manual for E20/20 Avionics TDR with setup guides and troubleshooting",
      category: "User Manuals",
      type: "manual",
      pages: 156,
      size: "12.4 MB",
      downloads: 4521,
      rating: 4.7,
      featured: true,
      tags: ["Avionics", "TDR", "Operation", "Setup"],
      downloadUrl: "/datasheets/Avionics_TDR_Kit.pdf",
    },
    {
      id: "via-bravo-manual",
      title: "Bravo MRI-3000 Analyzer Manual",
      description: "Comprehensive manual for Bravo MRI 3000",
      category: "User Manuals",
      type: "manual",
      pages: 203,
      size: "18.7 MB",
      downloads: 2156,
      rating: 4.8,
      tags: ["VNA", "MRI", "Medical", "Safety"],
      downloadUrl: "/datasheets/Bravo_MRI_3000_Analyzer.pdf",
    },
    {
      id: "swr-analyzer-manual",
      title: "SWR Site Analyzer Manual",
      description: "Operation manual for SWR Site Analyzer",
      category: "User Manuals",
      type: "manual",
      pages: 89,
      size: "8.2 MB",
      downloads: 1834,
      rating: 4.5,
      tags: ["SWR", "Field Testing", "Maintenance"],
      downloadUrl: "/datasheets/SWR_Site_Analyzer.pdf",
    },
    {
      id: "bravo-ex2-manual",
      title: "Bravo EX2 Analyzer Manual",
      description: "Comprehensive manual for Bravo EX2",
      category: "User Manuals",
      type: "manual",
      pages: 178,
      size: "15.3 MB",
      downloads: 1245,
      rating: 4.6,
      tags: ["Bravo EX2", "VNA", "Analysis", "Operation"],
      downloadUrl: "/datasheets/Bravo_Ex_2_Analyzer.pdf",
    },
    {
      id: "quick-start-guides",
      title: "Quick Start Guide Collection",
      description: "Collection of quick start guides for all AEA Technology products",
      category: "Quick Reference",
      type: "manual",
      pages: 45,
      size: "5.1 MB",
      downloads: 6789,
      rating: 4.9,
      featured: true,
      tags: ["Quick Start", "Reference", "All Products"],
      downloadUrl: "#",
    },
  ],
  videos: [
    {
      id: "e20-20-introduction",
      title: "Introduction to AEA Technology's E20/20 Step TDRs",
      description:
        "A brief description about each model's display, keypad, connectors, and cable lists for different applications.",
      category: "Product Overviews",
      type: "video",
      duration: "4:13",
      videoId: "eQcXZeccYAs",
      tags: ["E20/20", "TDR", "Overview", "Introduction"],
    },
    {
      id: "how-tdrs-work",
      title: "How TDRs Work",
      description:
        "A basic description about TDR technology and how TDRs displays distance to end-of-cable and cable faults.",
      category: "Educational",
      type: "video",
      duration: "3:58",
      videoId: "hn7YO3Xfgd0",
      tags: ["TDR", "Technology", "Education", "Basics"],
    },
    {
      id: "step-tdr-advantages",
      title: "The Advantages of Using Step TDR Technology",
      description:
        "Covers the technical differences between Step and Pulse TDRs and when Step TDRs provide more information about a cable's characteristics.",
      category: "Educational",
      type: "video",
      duration: "4:38",
      videoId: "gFivwDvYSXs",
      tags: ["Step TDR", "Technology", "Advantages", "Comparison"],
    },
    {
      id: "e20-20-menus",
      title: "E20/20 TDRs' Menus",
      description:
        "Describes the menus, menu navigation, and available testing and setup features in AEA Technology's TDRs.",
      category: "Operation Tutorials",
      type: "video",
      duration: "5:12",
      videoId: "PmCPHc6uXTc",
      tags: ["E20/20", "Menus", "Navigation", "Setup"],
    },
    {
      id: "e20-20-function-keys",
      title: "E20/20 TDRs' Function Keys",
      description: "Describes the Function Keys actions, features and uses.",
      category: "Operation Tutorials",
      type: "video",
      duration: "6:45",
      videoId: "FT0WLpiiM5k",
      tags: ["E20/20", "Function Keys", "Operation", "Features"],
    },
    {
      id: "etdr-pc-vision-software",
      title: "ETDR PC Vision Software",
      description:
        "Shows various uses including loading and saving test results, modifying cable lists, and creating/downloading instrument setups.",
      category: "Software Tutorials",
      type: "video",
      duration: "8:30",
      videoId: "rjZidAO3a2k",
      tags: ["ETDR", "PC Vision", "Software", "Tutorial"],
    },
    {
      id: "coaxial-cable-testing",
      title: "Coaxial Cable Testing",
      description:
        "Describes various setups and testing examples on coax cables. Also shows some common coax cable faults.",
      category: "Testing Procedures",
      type: "video",
      duration: "10:15",
      videoId: "cOyJnAZ--WM",
      tags: ["Coaxial", "Cable Testing", "Faults", "Examples"],
    },
    {
      id: "twisted-pair-testing",
      title: "Testing Twisted Pair Cables",
      description: "Shows how to test twisted pair cables using an AEA Technology E20/20 step TDR.",
      category: "Testing Procedures",
      type: "video",
      duration: "7:22",
      videoId: "bJoVwkob6O0",
      tags: ["Twisted Pair", "Cable Testing", "E20/20", "Network"],
    },
    {
      id: "aircraft-wire-testing",
      title: "Aircraft Wire Testing",
      description:
        "Shows how to test single-wires in aircraft wiring harnesses using AEA Technology's Avionics step TDR.",
      category: "Aviation Applications",
      type: "video",
      duration: "9:45",
      videoId: "HN__xjMtXl0",
      tags: ["Aircraft", "Avionics", "Wire Testing", "Harnesses"],
    },
    {
      id: "liberator-spectrum-analyzer",
      title: "AEA Liberator Spectrum Analyzer Operation",
      description: "Setting up and Using the Spectrum Analyzer Function In Liberator Series VNA Site Analyzer.",
      category: "Liberator Series",
      type: "video",
      duration: "12:30",
      videoId: "eHVRupI0Z60",
      tags: ["Liberator", "Spectrum Analyzer", "VNA", "Setup"],
    },
    {
      id: "new-video-uN6ACydNK4c",
      title: "AEA Technology Video",
      description: "Additional instructional video for AEA Technology products and applications.",
      category: "Product Tutorials",
      type: "video",
      duration: "TBD",
      videoId: "uN6ACydNK4c",
      tags: ["Tutorial", "Product", "Instructions", "AEA Technology"],
    },
  ],
  faqs: [
    {
      id: "tdr-range-selection",
      title: "How do I select the correct range on my TDR?",
      description: "Guidelines for selecting optimal range settings based on cable length and testing requirements",
      category: "TDR Operation",
      type: "faq",
      difficulty: "Beginner",
      views: 12456,
      rating: 4.8,
      featured: true,
      tags: ["TDR", "Range Selection", "Operation"],
      content:
        "To select the correct range on your TDR, consider the cable length you're testing. For cables under 100 feet, use the shortest range setting for maximum resolution. For longer cables, gradually increase the range until you can see the entire cable length on the display. The key is to balance resolution with the ability to see the full cable length.",
    },
    {
      id: "calibration-frequency",
      title: "How often should I calibrate my instruments?",
      description: "Recommended calibration intervals for different AEA Technology instruments and applications",
      category: "Calibration",
      type: "faq",
      difficulty: "Intermediate",
      views: 8934,
      rating: 4.7,
      tags: ["Calibration", "Maintenance", "Schedule"],
      content:
        "We recommend annual calibration for most AEA Technology instruments under normal use conditions. For critical applications or harsh environments, consider semi-annual calibration. Always calibrate after any physical damage or if measurement accuracy appears compromised.",
    },
    {
      id: "software-compatibility",
      title: "What operating systems are supported?",
      description: "System requirements and compatibility information for AEA Technology software",
      category: "Software Support",
      type: "faq",
      difficulty: "Beginner",
      views: 6789,
      rating: 4.5,
      tags: ["Software", "Compatibility", "System Requirements"],
      content:
        "Our software supports Windows 10 and Windows 11 (64-bit). Minimum requirements include 4GB RAM, 1GB free disk space, and a USB port for instrument connection. For optimal performance, we recommend 8GB RAM and an SSD drive.",
    },
    {
      id: "warranty-coverage",
      title: "What does the warranty cover?",
      description: "Comprehensive warranty coverage details for AEA Technology products",
      category: "Warranty & Support",
      type: "faq",
      difficulty: "Beginner",
      views: 5432,
      rating: 4.9,
      featured: true,
      tags: ["Warranty", "Coverage", "Support"],
      content:
        "Our standard warranty covers manufacturing defects and component failures for 2 years from purchase date. This includes free repair or replacement of defective units. The warranty does not cover damage from misuse, accidents, or normal wear and tear. Extended warranty options are available.",
    },
  ],
  "application-notes": [
    {
      id: "an150",
      title: "AN150 - Using Batteries in AEA Technology Instruments",
      description: "Guide for battery usage and management in AEA instruments",
      category: "General Application Notes",
      type: "manual",
      tags: ["Battery", "General", "Power Management"],
      downloadUrl: "#",
    },
    {
      id: "an152",
      title: "AN152 - Troubleshooting Serial Port Operations",
      description: "Serial port troubleshooting and configuration guide",
      category: "General Application Notes",
      type: "manual",
      tags: ["Serial Port", "Troubleshooting", "Communication"],
      downloadUrl: "#",
    },
    {
      id: "an153",
      title: "AN153 - Cold Weather Operations for AEA Technology Instruments",
      description: "Operating AEA instruments in cold weather environments",
      category: "General Application Notes",
      type: "manual",
      tags: ["Cold Weather", "Environmental", "Operation"],
      downloadUrl: "#",
    },
    {
      id: "an100",
      title: "AN100 - What SWR Does Not Show",
      description: "Understanding the limitations of SWR measurements",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "SWR", "Theory"],
      downloadUrl: "#",
    },
    {
      id: "an101",
      title: "AN101 - When to Use Cable Null",
      description: "Cable null calibration techniques and applications",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Calibration", "Cable Null"],
      downloadUrl: "#",
    },
    {
      id: "an102",
      title: "AN102 - Understanding Vector Network Analysis",
      description: "Fundamentals of vector network analysis",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Theory", "Fundamentals"],
      downloadUrl: "#",
    },
    {
      id: "an103",
      title: "AN103 - Understanding Relationships of Impedance",
      description: "Impedance relationships and measurements",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Impedance", "Theory"],
      downloadUrl: "#",
    },
    {
      id: "an104",
      title: "AN104 - Smith Chart 101",
      description: "Introduction to Smith Chart interpretation",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Smith Chart", "Analysis"],
      downloadUrl: "#",
    },
    {
      id: "an110",
      title: "AN110 - Coaxial Stub Tuning",
      description: "Techniques for coaxial stub tuning and matching",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Coaxial", "Tuning"],
      downloadUrl: "#",
    },
    {
      id: "an111",
      title: "AN111 - Find Characteristics of an Unknown Cable",
      description: "Methods to determine unknown cable characteristics",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Cable", "Testing"],
      downloadUrl: "#",
    },
    {
      id: "an112",
      title: "AN112 - Tuning an Antenna",
      description: "Antenna tuning procedures using VNA",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Antenna", "Tuning"],
      downloadUrl: "#",
    },
    {
      id: "an113",
      title: "AN113 - Measuring Discrete Components",
      description: "Component measurement techniques with VNA",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Components", "Measurement"],
      downloadUrl: "#",
    },
    {
      id: "an114",
      title: "AN114 - Tower Site Tips",
      description: "Best practices for tower site measurements",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Tower", "Field Testing"],
      downloadUrl: "#",
    },
    {
      id: "an120",
      title: "AN120 - Measuring Amplifier Gain",
      description: "Amplifier gain measurement procedures",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Gain", "Amplifier"],
      downloadUrl: "#",
    },
    {
      id: "an121",
      title: "AN121 - Measuring Group Delay",
      description: "Group delay measurement and analysis",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Group Delay", "Measurement"],
      downloadUrl: "#",
    },
    {
      id: "an122",
      title: "AN122 - Measuring Gain Compression",
      description: "Gain compression measurement techniques",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Compression", "Amplifier"],
      downloadUrl: "#",
    },
    {
      id: "an124",
      title: "AN124 - Measuring Differential Amplifiers",
      description: "Differential amplifier testing procedures",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Differential", "Amplifier"],
      downloadUrl: "#",
    },
    {
      id: "an125",
      title: "AN125 - Measuring AM to PM Distortion",
      description: "AM to PM distortion measurement methods",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Distortion", "Analysis"],
      downloadUrl: "#",
    },
    {
      id: "an131",
      title: "AN131 - Using the Network Analyzer as a Signal Source",
      description: "Network analyzer signal source applications",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Signal Source", "Application"],
      downloadUrl: "#",
    },
    {
      id: "an132",
      title: "AN132 - Using the Network Analyzer as a Grid Dip Oscillator",
      description: "Grid dip oscillator mode and applications",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Grid Dip", "Oscillator"],
      downloadUrl: "#",
    },
    {
      id: "white-paper-via",
      title: "White Paper - VIA Analyzer vs VIA Bravo",
      description: "Comparison of VIA Analyzer and VIA Bravo platforms",
      category: "VNA Application Notes",
      type: "manual",
      tags: ["VNA", "Comparison", "White Paper"],
      downloadUrl: "#",
    },
    {
      id: "an200",
      title: "AN200 - Basic Theory of TDR Operation",
      description: "Fundamental principles of TDR technology",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Theory", "Fundamentals"],
      downloadUrl: "#",
    },
    {
      id: "an201",
      title: "AN201 - Step vs Pulse TDR Technology",
      description: "Comparison of step and pulse TDR technologies",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Step", "Pulse"],
      downloadUrl: "#",
    },
    {
      id: "an203",
      title: "AN203 - Getting the Most From Your TDR",
      description: "Best practices for TDR operation and analysis",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Best Practices", "Operation"],
      downloadUrl: "#",
    },
    {
      id: "an204",
      title: "AN204 - Impedance Shifts",
      description: "Understanding and identifying impedance shifts",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Impedance", "Analysis"],
      downloadUrl: "#",
    },
    {
      id: "an205",
      title: "AN205 - Comparison of TDR vs FDR",
      description: "Comparison of time and frequency domain reflectometry",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "FDR", "Comparison"],
      downloadUrl: "#",
    },
    {
      id: "an210",
      title: "AN210 - Coax Cable Resistance",
      description: "Coaxial cable resistance measurement and analysis",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Coaxial", "Resistance"],
      downloadUrl: "#",
    },
    {
      id: "an211",
      title: "AN211 - Poor Coax Splice",
      description: "Identifying and analyzing poor coaxial splices",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Coaxial", "Splice"],
      downloadUrl: "#",
    },
    {
      id: "an212",
      title: "AN212 - Crushed or Pinched Coax",
      description: "Detecting crushed or pinched coaxial cable",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Coaxial", "Fault"],
      downloadUrl: "#",
    },
    {
      id: "an213",
      title: "AN213 - Wet Coax Cable",
      description: "Identifying water intrusion in coaxial cable",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Coaxial", "Water"],
      downloadUrl: "#",
    },
    {
      id: "an214",
      title: "AN214 - Coax Cable Terminations",
      description: "Analyzing coaxial cable termination quality",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Coaxial", "Termination"],
      downloadUrl: "#",
    },
    {
      id: "an215",
      title: "AN215 - Mixed Cable Types",
      description: "Testing installations with mixed cable types",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Mixed Cable", "Analysis"],
      downloadUrl: "#",
    },
    {
      id: "an216",
      title: "AN216 - Coax Cable Tee",
      description: "Analyzing coaxial cable tee connections",
      category: "TDR Application Notes",
      type: "manual",
      tags: ["TDR", "Coaxial", "Tee"],
      downloadUrl: "#",
    },
  ],
}
