"use client"
import React from "react"
import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Play, Filter, BookOpen, HelpCircle, Package, ArrowRight, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/components/search-bar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import FAQSchema from "@/components/seo/faq-schema"
import { SupportCTA } from "@/components/support-cta"

// Type mappings for icons and colors
const typeConfig = {
  software: { icon: Download, color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  manual: { icon: BookOpen, color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  video: { icon: Play, color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  faq: { icon: HelpCircle, color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-700" },
}

const ResourceCard = React.memo(({ resource }: { resource: any }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const resourceType = resource.type as keyof typeof typeConfig
  const config = typeConfig[resourceType] || typeConfig.software
  const Icon = config.icon

  const handleVideoClick = useCallback(() => {
    setIsVideoLoaded(true)
  }, [])

  if (resource.type === "faq") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300 h-full flex flex-col !gap-3 !py-4">
        <CardHeader className="!gap-1 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${config.textColor}`} />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <CardTitle className="text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                {resource.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`${config.bgColor} ${config.textColor} border-${config.color}-200 text-xs`}>
                  {resource.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1">
          <div className="flex-1 mb-3">
            <div className="p-3 bg-gray-50 rounded-lg h-full">
              <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">{resource.content}</p>
            </div>
          </div>

          {/* Tags - fixed at bottom */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {resource.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300 h-full flex flex-col !gap-2 !py-4">
      <CardHeader className="!gap-1 flex-shrink-0 !pb-1">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.textColor}`} />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <CardTitle className="text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
              {resource.title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${config.bgColor} ${config.textColor} border-${config.color}-200 text-xs`}>
                {resource.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 !pt-1">
        {/* Lazy-loaded YouTube embed for video resources */}
        {resource.type === "video" && resource.videoId && (
          <div className="mb-4">
            <div className="relative w-full rounded-lg overflow-hidden aspect-video">
              {!isVideoLoaded ? (
                <div
                  className="absolute top-0 left-0 w-full h-full cursor-pointer group/video"
                  onClick={handleVideoClick}
                >
                  <img
                    src={`https://img.youtube.com/vi/${resource.videoId}/hqdefault.jpg`}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/video:bg-black/40 transition-colors">
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center group-hover/video:bg-blue-700 transition-colors">
                      <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${resource.videoId}?autoplay=1`}
                  title={resource.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <CardDescription className="text-[13px] text-gray-600 leading-relaxed mb-4">
          {resource.description}
        </CardDescription>

        {/* Resource metadata */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            {(resource.size || resource.duration) && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                {resource.size && (
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    <span>{resource.size}</span>
                  </div>
                )}
                {resource.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.duration}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Button always at bottom */}
          <div className="mt-auto">
            {resource.type === "video" ? (
              <Button className="w-full min-h-[44px] text-sm cursor-pointer" asChild>
                <a
                  href={`https://www.youtube.com/watch?v=${resource.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch on YouTube
                </a>
              </Button>
            ) : (
              <Button className="w-full min-h-[44px] text-sm cursor-pointer" asChild>
                <Link href={resource.downloadUrl || "#"}>
                  Download
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

interface ResourcesPageProps {
  initialData?: {
    software: any[]
    manuals: any[]
    videos: any[]
    faqs: any[]
    "application-notes": any[]
  }
}

// FAQ data for structured data
const faqs = [
  {
    question: "What is a Time Domain Reflectometer (TDR)?",
    answer:
      "A Time Domain Reflectometer (TDR) is a precision electronic instrument used to detect and locate faults in cables. It works by sending an electrical pulse down the cable and analyzing the reflections to identify opens, shorts, water damage, and other cable faults.",
  },
  {
    question: "How do I choose between a TDR and VNA?",
    answer:
      "TDRs are ideal for cable fault location and impedance measurements on transmission lines. VNAs (Vector Network Analyzers) are better suited for antenna testing, tuning, and frequency-domain measurements like SWR and return loss.",
  },
  {
    question: "Are AEA Technology products made in the USA?",
    answer:
      "Yes, all AEA Technology products are designed, manufactured, and assembled in the United States at our facility in Carlsbad, California.",
  },
  {
    question: "What industries use AEA Technology equipment?",
    answer:
      "Our equipment is trusted by professionals in aviation, military/defense, telecommunications, broadcast, CATV, and research & development sectors worldwide.",
  },
]

export default function ResourcesClient({ initialData }: ResourcesPageProps) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const noteIdParam = searchParams.get("noteId") // Added for deep linking

  const [activeTab, setActiveTab] = useState("software")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const noteRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Default data if no initialData is provided
  const defaultData = {
    software: [
      {
        id: "etdr-pc-vision",
        title: "ETDR PC Vision™ Software",
        description:
          "Complete analysis software for TDR measurements with graphical display and reporting capabilities",
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
      // ADDED NEW VIDEO
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
      {
        id: "an217",
        title: "AN217 - Measuring Feedline on a Tower",
        description: "Tower feedline testing procedures",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Tower", "Feedline"],
        downloadUrl: "#",
      },
      {
        id: "an220",
        title: "AN220 - Twisted Pair Cable Resistance",
        description: "Twisted pair cable resistance measurement",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Twisted Pair", "Resistance"],
        downloadUrl: "#",
      },
      {
        id: "an221",
        title: "AN221 - Poor Splice in a Twisted Pair Cable",
        description: "Identifying poor twisted pair splices",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Twisted Pair", "Splice"],
        downloadUrl: "#",
      },
      {
        id: "an222",
        title: "AN222 - Telco Style Alligator Clips",
        description: "Using telco alligator clips for testing",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Telco", "Clips"],
        downloadUrl: "#",
      },
      {
        id: "an223",
        title: "AN223 - Wet Twisted Pair Cable",
        description: "Detecting water damage in twisted pair cable",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Twisted Pair", "Water"],
        downloadUrl: "#",
      },
      {
        id: "an224",
        title: "AN224 - Twisted Pair Cable Terminations",
        description: "Analyzing twisted pair termination quality",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Twisted Pair", "Termination"],
        downloadUrl: "#",
      },
      {
        id: "an225",
        title: "AN225 - Split Pairs and Re-split Pairs",
        description: "Identifying split pair wiring issues",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Twisted Pair", "Split Pairs"],
        downloadUrl: "#",
      },
      {
        id: "an226",
        title: "AN226 - Bridged Taps",
        description: "Detecting and analyzing bridged taps",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Bridged Taps", "Telco"],
        downloadUrl: "#",
      },
      {
        id: "an227",
        title: "AN227 - Testing Premise Telco Pairs",
        description: "Premise telecommunications pair testing",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Telco", "Premise"],
        downloadUrl: "#",
      },
      {
        id: "an228",
        title: "AN228 - Testing Network Cable Shields",
        description: "Network cable shield testing procedures",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Network", "Shield"],
        downloadUrl: "#",
      },
      {
        id: "an250",
        title: "AN250 - Measuring a Cable from Both Ends",
        description: "Bidirectional cable testing techniques",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Bidirectional", "Testing"],
        downloadUrl: "#",
      },
      {
        id: "an254",
        title: "AN254 - Intermittent Cable Operations",
        description: "Diagnosing intermittent cable faults",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Intermittent", "Troubleshooting"],
        downloadUrl: "#",
      },
      {
        id: "an255",
        title: "AN255 - Removing Test Lead Lengths",
        description: "Compensating for test lead lengths",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Test Leads", "Calibration"],
        downloadUrl: "#",
      },
      {
        id: "an256",
        title: "AN256 - Sampling a Cable's Velocity",
        description: "Cable velocity factor determination",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Velocity", "Calibration"],
        downloadUrl: "#",
      },
      {
        id: "an257",
        title: "AN257 - TDR's Soft Reset and Battery Charging",
        description: "Soft reset procedures and battery charging",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Reset", "Battery"],
        downloadUrl: "#",
      },
      {
        id: "an258",
        title: "AN258 - USB-to-Serial Communications",
        description: "USB to serial adapter setup and troubleshooting",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "USB", "Serial"],
        downloadUrl: "#",
      },
      {
        id: "an259",
        title: "AN259 - Testing Single Wires In A Harness",
        description: "Individual wire testing in harness bundles",
        category: "TDR Application Notes",
        type: "manual",
        tags: ["TDR", "Harness", "Single Wire"],
        downloadUrl: "#",
      },
    ],
  }

  const resourcesData = initialData || defaultData

  const currentResources = useMemo(() => {
    const tab = activeTab as keyof typeof resourcesData
    return resourcesData[tab] || []
  }, [activeTab, resourcesData])

  const categories = useMemo(() => {
    const cats = [...new Set(currentResources.map((item) => item.category))]
    return ["all", ...cats]
  }, [currentResources])

  const filteredResources = useMemo(() => {
    let filtered = currentResources

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.title.localeCompare(b.title)
    })

    return filtered
  }, [currentResources, selectedCategory])

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
    setSelectedCategory("all")
    setExpandedSections([]) // Reset expanded sections when tab changes

    // Update URL without page reload
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?tab=${tab}`
      window.history.pushState({ tab }, "", newUrl)
    }
  }, [])

  useEffect(() => {
    if (tabParam && ["software", "manuals", "videos", "faqs", "application-notes"].includes(tabParam)) {
      setActiveTab(tabParam)
      setSelectedCategory("all")
      setExpandedSections([]) // Reset expanded sections when tab changes
    }
  }, [tabParam])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const tab = params.get("tab")
      const noteId = params.get("noteId") // Added for deep linking
      if (tab && ["software", "manuals", "videos", "faqs", "application-notes"].includes(tab)) {
        setActiveTab(tab)
        setSelectedCategory("all")
        if (tab === "application-notes" && noteId) {
          // Handle deep linking when navigating back
          const resource = resourcesData["application-notes"].find((r) => r.id === noteId)
          if (resource) {
            const sectionMap: { [key: string]: string } = {
              "General Application Notes": "general",
              "VNA Application Notes": "vna",
              "TDR Application Notes": "tdr",
            }
            const sectionValue = sectionMap[resource.category]
            if (sectionValue) {
              setExpandedSections([sectionValue])
            }
          }
        } else {
          setExpandedSections([]) // Reset expanded sections if not application-notes or no noteId
        }
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, []) // Removed resourcesData dependency

  useEffect(() => {
    if (tabParam === "application-notes" && noteIdParam) {
      // Determine which section to expand based on note ID
      const resource = resourcesData["application-notes"].find((r) => r.id === noteIdParam)
      if (resource) {
        const sectionMap: { [key: string]: string } = {
          "General Application Notes": "general",
          "VNA Application Notes": "vna",
          "TDR Application Notes": "tdr",
        }
        const sectionValue = sectionMap[resource.category]
        if (sectionValue) {
          setExpandedSections([sectionValue])
          // Wait for accordion to expand, then scroll
          setTimeout(() => {
            const element = noteRefs.current[noteIdParam]
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }, 300) // A small delay to allow the accordion to open
        }
      }
    }
  }, [tabParam, noteIdParam]) // Removed resourcesData dependency

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-zinc-50">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 mt-20">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 lg:text-4xl">Resource Hub</h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto sm:text-xl">
            Access comprehensive documentation, software, training materials, and support resources for all AEA
            Technology products.
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <SearchBar />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto mb-8 sm:mb-10 bg-gradient-to-r from-slate-50 to-slate-100 p-1 rounded-xl shadow-sm border border-slate-200">
            <TabsTrigger
              value="software"
              className="cursor-pointer text-xs sm:text-sm font-medium px-2 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-200 data-[state=active]:text-blue-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 text-center flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Software
            </TabsTrigger>
            <TabsTrigger
              value="manuals"
              className="cursor-pointer text-xs sm:text-sm font-medium px-2 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-200 data-[state=active]:text-blue-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 text-center flex items-center justify-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Manuals
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="cursor-pointer text-xs sm:text-sm font-medium px-2 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-200 data-[state=active]:text-blue-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 text-center flex items-center justify-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="cursor-pointer text-xs sm:text-sm font-medium px-2 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-200 data-[state=active]:text-blue-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 text-center flex items-center justify-center"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger
              value="application-notes"
              className="cursor-pointer text-xs sm:text-sm font-medium px-2 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-200 data-[state=active]:text-blue-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 text-center flex items-center justify-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Application Notes
            </TabsTrigger>
          </TabsList>

          {["software", "manuals", "videos", "faqs", "application-notes"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              {tab === "application-notes" ? (
                <div className="space-y-6 mb-16">
                  <Accordion
                    type="multiple"
                    className="w-full space-y-4"
                    value={expandedSections}
                    onValueChange={setExpandedSections}
                  >
                    {/* General Application Notes */}
                    <AccordionItem value="general" className="border rounded-lg px-6 bg-white">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 cursor-pointer">
                        General Application Notes
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-4">
                          {filteredResources
                            .filter((r) => r.category === "General Application Notes")
                            .map((resource) => (
                              // Added ref to each card for scrolling
                              <div key={resource.id} ref={(el) => (noteRefs.current[resource.id] = el)}>
                                <ResourceCard resource={resource} />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* VNA Application Notes */}
                    <AccordionItem value="vna" className="border rounded-lg px-6 bg-white">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 cursor-pointer">
                        VNA Application Notes
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-4">
                          {filteredResources
                            .filter((r) => r.category === "VNA Application Notes")
                            .map((resource) => (
                              <div key={resource.id} ref={(el) => (noteRefs.current[resource.id] = el)}>
                                <ResourceCard resource={resource} />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* TDR Application Notes */}
                    <AccordionItem value="tdr" className="border rounded-lg px-6 bg-white">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 cursor-pointer">
                        TDR Application Notes
                      </AccordionTrigger>
                      <AccordionContent className="pb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-4">
                          {filteredResources
                            .filter((r) => r.category === "TDR Application Notes")
                            .map((resource) => (
                              <div key={resource.id} ref={(el) => (noteRefs.current[resource.id] = el)}>
                                <ResourceCard resource={resource} />
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ) : filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("all")
                    }}
                    className="min-h-[44px]"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Contact Support Section - Mobile Optimized */}
        <SupportCTA />
      </div>
    </>
  )
}
