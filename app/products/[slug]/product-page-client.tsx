"use client"

import type React from "react"
import { SupportCTA } from "@/components/support-cta"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  FileText,
  Star,
  CheckCircle,
  ArrowRight,
  Monitor,
  Zap,
  Shield,
  Award,
  Truck,
  Phone,
  Mail,
  Settings,
  Database,
  Cable,
  Package,
  Battery,
  Play,
  BookOpen,
  FileCode,
  HelpCircle,
  Cpu,
  ExternalLink,
  Clock,
  GraduationCap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import type { Product } from "@/data/all-products"
import { getProductResources, type ProductResourceItem } from "@/data/product-resources"

// Icon mapping for capability cards
const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  settings: Settings,
  database: Database,
  shield: Shield,
  monitor: Monitor,
  award: Award,
  package: Package,
  truck: Truck,
}

// Icon mapping for accessories
const accessoryIconMap: Record<string, React.ElementType> = {
  case: Package,
  cable: Cable,
  power: Zap,
  certificate: Award,
  battery: Battery,
}

function getResourceIcon(type: string) {
  switch (type) {
    case "video":
      return <Play className="w-5 h-5 text-red-600" />
    case "manual":
      return <BookOpen className="w-5 h-5 text-blue-600" />
    case "datasheet":
      return <FileText className="w-5 h-5 text-red-600" />
    case "application-note":
      return <FileCode className="w-5 h-5 text-purple-600" />
    case "firmware":
      return <Cpu className="w-5 h-5 text-orange-600" />
    case "software":
      return <Download className="w-5 h-5 text-green-600" />
    case "guide":
      return <BookOpen className="w-5 h-5 text-teal-600" />
    case "training":
      return <GraduationCap className="w-5 h-5 text-indigo-600" />
    case "faq":
      return <HelpCircle className="w-5 h-5 text-yellow-600" />
    default:
      return <FileText className="w-5 h-5 text-gray-600" />
  }
}

function getResourceIconBg(type: string) {
  switch (type) {
    case "video":
      return "bg-red-100"
    case "manual":
      return "bg-blue-100"
    case "datasheet":
      return "bg-red-100"
    case "application-note":
      return "bg-purple-100"
    case "firmware":
      return "bg-orange-100"
    case "software":
      return "bg-green-100"
    case "guide":
      return "bg-teal-100"
    case "training":
      return "bg-indigo-100"
    case "faq":
      return "bg-yellow-100"
    default:
      return "bg-gray-100"
  }
}

function getResourceTypeLabel(type: string) {
  switch (type) {
    case "video":
      return "Video"
    case "manual":
      return "Manual"
    case "datasheet":
      return "Datasheet"
    case "application-note":
      return "App Note"
    case "firmware":
      return "Firmware"
    case "software":
      return "Software"
    case "guide":
      return "Quick Start Guide"
    case "training":
      return "Training Material"
    case "faq":
      return "FAQ"
    default:
      return "Resource"
  }
}

// Helper to get download URL from resource (supports localPath or url)
function getResourceDownloadUrl(resource: ProductResourceItem): string {
  return resource.localPath || resource.url || "#"
}

interface ProductPageClientProps {
  product: Product
}

function ProductVideoCard({ video }: { video: ProductResourceItem }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Extract video ID from YouTube URL
  const getVideoId = (url: string | undefined) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)
    return match ? match[1] : null
  }

  const videoId = getVideoId(video.url)

  if (!videoId) {
    return null
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      {/* Video embed area - Fixed aspect ratio container prevents CLS */}
      <div className="relative aspect-video bg-gray-100">
        {!isVideoLoaded ? (
          <div className="absolute inset-0 cursor-pointer group/video" onClick={() => setIsVideoLoaded(true)}>
            <Image
              src={video.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={`${video.title} - video thumbnail`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/video:bg-black/40 transition-colors">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover/video:bg-primary/90 transition-colors shadow-lg">
                <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            {/* Duration badge */}
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            )}
          </div>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Title and description below video */}
      <CardContent className="p-4">
        <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h4>
        {video.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{video.description}</p>}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Watch on YouTube
        </a>
      </CardContent>
    </Card>
  )
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Get current images based on first model (since both look the same)
  const currentImages = product.modelImages[0] || []

  // Get resources from centralized data file (CMS-ready structure)
  const productResources = useMemo(() => getProductResources(product.slug), [product.slug])

  // Get the datasheet from resources (prefer this over product.datasheetUrl)
  const datasheet = useMemo(
    () => productResources.find((r) => r.type === "datasheet"),
    [productResources]
  )

  // Get datasheet URL (prefer from resources, fallback to product.datasheetUrl)
  const datasheetUrl = useMemo(() => {
    if (datasheet) {
      return datasheet.localPath || datasheet.url || product.datasheetUrl
    }
    return product.datasheetUrl
  }, [datasheet, product.datasheetUrl])

  // Separate videos from other resources
  const videos = useMemo(
    () => productResources.filter((r) => r.type === "video"),
    [productResources]
  )

  // Documents exclude videos AND datasheets (datasheet has its own button in the hero)
  const documents = useMemo(
    () => productResources.filter((r) => r.type !== "video" && r.type !== "datasheet"),
    [productResources]
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Product Header */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 pt-20 sm:pt-24">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-12">
          {/* Left Column - Product Images - Sticky wrapper */}
          <div className="lg:w-1/2 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Badges - Above Gallery */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:gap-3 sm:mb-4 pt-4">
                {product.badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      badge.variant === "green"
                        ? "bg-gradient-to-r from-green-600 to-green-700"
                        : "bg-gradient-to-r from-blue-600 to-blue-700"
                    } text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg`}
                  >
                    {badge.variant === "green" ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    <span className="font-semibold text-xs sm:text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Main Product Image - Fixed height container to prevent CLS */}
              <div className="relative bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 h-64 sm:h-80 lg:h-96 overflow-hidden">
                <Image
                  src={currentImages[selectedImage] || currentImages[0] || "/placeholder.svg"}
                  alt={`AEA Technology ${product.name} - ${product.category === "tdr" ? "Time Domain Reflectometer" : "Vector Network Analyzer"}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Mini Gallery - Fixed size thumbnails to prevent CLS */}
              {currentImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto min-h-[48px] sm:min-h-[64px]">
                  {currentImages.map((image, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={() => setSelectedImage(imageIndex)}
                      className={`w-12 h-12 sm:w-16 sm:h-16 border-2 rounded-lg overflow-hidden transition-all flex-shrink-0 cursor-pointer ${
                        selectedImage === imageIndex
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - view ${imageIndex + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/2 space-y-4 sm:space-y-6">
            {/* Product Title and Rating */}
            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              <p className="text-base sm:text-lg text-gray-600">{product.tagline}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  {product.category === "tdr" ? "Professional TDR Equipment" : "Professional RF Testing Equipment"}
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Key Features</h3>
              <ul className="space-y-2">
                {product.displayFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-green-500" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Model Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Available Models</h3>
              <div className="space-y-2">
                {product.models.map((model, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 bg-gray-50/50 rounded-lg p-4 relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    <div className="flex-1 min-w-0 pl-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{model.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                      <Badge variant="outline" className="text-xs">
                        Part #{model.partNumber.replace(/\s*VIA$/i, "")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatible Accessories & Options Section */}
            {product.accessories.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Compatible Accessories & Options
                </h3>
                <div className="space-y-3">
                  {product.accessories.map((accessory, index) => {
                    const IconComponent = accessory.iconType ? accessoryIconMap[accessory.iconType] || Package : Package
                    return (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex gap-3">
                          <div className="w-[60px] h-[60px] flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
                            {accessory.image ? (
                              <Image
                                src={accessory.image || "/placeholder.svg"}
                                alt={`${accessory.name} - accessory for ${product.name}`}
                                width={60}
                                height={60}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <IconComponent className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base text-gray-900 mb-1">{accessory.name}</h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{accessory.description}</p>
                            <Badge variant="outline" className="text-xs">
                              Part #{accessory.partNumber}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <Separator />

            {/* Pricing and CTA */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">Contact for Pricing</div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Professional equipment pricing available upon request
                </p>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Expert Support</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-3 sm:py-4 min-h-[48px]"
                  asChild
                >
                  <Link href={`/contact?product=${product.slug}`} onClick={() => window.scrollTo(0, 0)}>
                    <Phone className="mr-2 w-4 h-4" />
                    Request Quote
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 text-sm sm:text-base font-semibold py-2.5 sm:py-3 bg-transparent"
                  asChild
                >
                  <a href={datasheetUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 w-4 h-4" />
                    Download Datasheet
                  </a>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900">Need Help Choosing?</h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Call: 1-(800) 258-7805</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email: sales@aeatechnology.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex flex-wrap justify-start sm:justify-center gap-1 h-auto mb-6 sm:mb-8 bg-gray-100 p-1 rounded-lg w-full overflow-x-auto">
              <TabsTrigger
                value="overview"
                className="cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 sm:py-2.5 whitespace-nowrap rounded-md transition-all duration-200 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-shrink-0 min-w-[70px]"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 sm:py-2.5 whitespace-nowrap rounded-md transition-all duration-200 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-shrink-0 min-w-[70px]"
              >
                Specs
              </TabsTrigger>
              <TabsTrigger
                value="software"
                className="cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 sm:py-2.5 whitespace-nowrap rounded-md transition-all duration-200 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-shrink-0 min-w-[70px]"
              >
                Software
              </TabsTrigger>
              <TabsTrigger
                value="whats-included"
                className="cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 sm:py-2.5 whitespace-nowrap rounded-md transition-all duration-200 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-shrink-0 min-w-[70px]"
              >
                Included
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 sm:py-2.5 whitespace-nowrap rounded-md transition-all duration-200 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-shrink-0 min-w-[70px]"
              >
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 sm:space-y-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Product Overview</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  {product.overviewDescription}
                </p>

                {/* Capability Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {product.capabilityCards.map((card, index) => {
                    const IconComponent = iconMap[card.icon] || Zap
                    return (
                      <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-base sm:text-lg">{card.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {card.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Applications */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Typical Applications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {product.applications.map((app, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specifications" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Technical Specifications</h2>

                {/* Performance Specifications */}
                {product.specifications.performance && (
                  <Card className="mb-4 sm:mb-6">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {product.specifications.performance.map((spec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 gap-1">
                            <span className="font-medium text-gray-900 text-sm">{spec.parameter}</span>
                            <span className="text-gray-600 text-sm sm:text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Advanced Features */}
                {product.specifications.advanced && (
                  <Card className="mb-4 sm:mb-6">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        Advanced Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {product.specifications.advanced.map((spec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 gap-1">
                            <span className="font-medium text-gray-900 text-sm">{spec.parameter}</span>
                            <span className="text-gray-600 text-sm sm:text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Hardware */}
                {product.specifications.hardware && (
                  <Card className="mb-4 sm:mb-6">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        Hardware
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {product.specifications.hardware.map((spec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 gap-1">
                            <span className="font-medium text-gray-900 text-sm">{spec.parameter}</span>
                            <span className="text-gray-600 text-sm sm:text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Physical */}
                {product.specifications.physical && (
                  <Card className="mb-4 sm:mb-6">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        Physical
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {product.specifications.physical.map((spec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 gap-1">
                            <span className="font-medium text-gray-900 text-sm">{spec.parameter}</span>
                            <span className="text-gray-600 text-sm sm:text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Kit Case (for Avionics) */}
                {product.specifications.kitCase && (
                  <Card className="mb-4 sm:mb-6">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Kit Case Specifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 divide-y divide-gray-100">
                        {product.specifications.kitCase.map((spec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 gap-1">
                            <span className="font-medium text-gray-900 text-sm">{spec.parameter}</span>
                            <span className="text-gray-600 text-sm sm:text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Certifications & Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {product.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-900 text-sm">{cert.name}</span>
                            <p className="text-xs text-gray-600">{cert.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Software Tab - Added software screenshot image back */}
            <TabsContent value="software" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Included Software</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">{product.softwareInfo.description}</p>

                {/* Software Package */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Software Package */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-blue-600" />
                        {product.softwareInfo.name}
                      </CardTitle>
                      <CardDescription>Included with every unit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {product.softwareInfo.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Key Software Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Software Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                          <Database className="w-8 h-8 text-blue-600 mb-2" />
                          <span className="text-sm font-medium">Data Storage</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                          <FileText className="w-8 h-8 text-blue-600 mb-2" />
                          <span className="text-sm font-medium">Report Generation</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                          <Settings className="w-8 h-8 text-blue-600 mb-2" />
                          <span className="text-sm font-medium">Configuration</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                          <Monitor className="w-8 h-8 text-blue-600 mb-2" />
                          <span className="text-sm font-medium">Visualization</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-blue-600" />
                      Software Interface
                    </CardTitle>
                    <CardDescription>Professional analysis and data visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <div className="aspect-[4/3] sm:aspect-video relative">
                        <Image
                          src={product.softwareInfo.screenshotUrl || "/images/8.png"}
                          alt={`${product.softwareInfo.name} - Software Interface Screenshot showing real-time measurement analysis`}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-contain p-2 sm:p-4"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      {product.softwareInfo.name} - Real-time measurement display and analysis
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* What's Included Tab - Added product image back */}
            <TabsContent value="whats-included" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What's Included</h2>

                {product.models.map((model, modelIndex) => (
                  <Card key={modelIndex} className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        {model.name}
                      </CardTitle>
                      <CardDescription>Part #{model.partNumber.replace(/\s*VIA$/i, "")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Product Image - Fixed aspect ratio to prevent CLS */}
                        {(model.includedImage ||
                          (product.modelImages[modelIndex] && product.modelImages[modelIndex][0])) && (
                          <div className="lg:w-1/3 flex-shrink-0">
                            <div className="relative aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                              <Image
                                src={
                                  model.includedImage ||
                                  product.modelImages[modelIndex]?.[0] ||
                                  product.modelImages[0]?.[0] ||
                                  "/placeholder.svg"
                                }
                                alt={`${model.name} - kit contents and included accessories`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-contain p-4"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}

                        {/* Included Items List */}
                        <div className="flex-1">
                          <ul className="grid grid-cols-1 gap-2 sm:gap-3">
                            {model.includes.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Resources & Downloads</h2>

                {/* Documents & Downloads above Videos & Demos */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Documents & Downloads
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Dynamic resources (non-video) from centralized data */}
                    {documents.map((resource, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-10 h-10 rounded-lg ${getResourceIconBg(resource.type)} flex items-center justify-center`}
                            >
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">{resource.title}</h4>
                              <p className="text-xs text-gray-500">
                                {getResourceTypeLabel(resource.type)}
                                {resource.fileSize && ` • ${resource.fileSize}`}
                              </p>
                            </div>
                          </div>
                          {resource.description && (
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                          )}
                          <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                            <a href={getResourceDownloadUrl(resource)} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Show datasheet card if no other documents */}
                    {documents.length === 0 && (
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {datasheet?.title || "Datasheet"}
                              </h4>
                              <p className="text-xs text-gray-500">
                                PDF Download{datasheet?.fileSize ? ` • ${datasheet.fileSize}` : ""}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                            <a href={datasheetUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {videos.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Play className="w-5 h-5 text-primary" />
                      Videos & Demos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <ProductVideoCard key={index} video={video} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Need More Help?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* More Resources Link */}
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Database className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Resource Library</h4>
                            <p className="text-xs text-gray-500">Browse all manuals, videos & FAQs</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                          <Link href="/resources" onClick={() => window.scrollTo(0, 0)}>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            View All Resources
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Contact Support */}
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Technical Support</h4>
                            <p className="text-xs text-gray-500">Get expert help from our team</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                          <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Contact Us
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <SupportCTA />
      </div>
    </div>
  )
}
