"use client"
import dynamic from "next/dynamic"
import { ArrowRight, ExternalLink, Flag, Star, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getSectionById, type HeroSection } from "@/data/homepage"

// Icon map for dynamic rendering
const iconMap = {
  Flag,
  Shield,
  CheckCircle,
}

// Search bar is heavy and interactive; load it on the client only
const SearchBar = dynamic(() => import("@/components/search-bar"), {
  ssr: false,
})

interface HeroProps {
  data?: HeroSection["data"]
}

export default function Hero({ data: overrideData }: HeroProps) {
  // Get hero data from homepage.ts
  const heroSection = getSectionById<HeroSection>("hero")

  const data = overrideData ?? heroSection?.data
  if (!data) return null

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20 pb-8 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 overflow-visible min-h-[85vh] sm:min-h-[90vh] lg:min-h-[95vh] flex items-start">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.2),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.03)_50%,transparent_70%)]"></div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full"></div>
      <div className="absolute top-32 right-16 w-1.5 h-1.5 bg-emerald-400/40 rounded-full"></div>
      <div className="absolute bottom-40 left-16 w-2 h-2 bg-purple-400/25 rounded-full"></div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative w-full">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 sm:space-y-8 text-white">
            <div className="space-y-4 sm:space-y-6">
              {/* Professional trust indicators - Dynamic from data */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                {data.badges.map((badge, index) => {
                  const Icon = iconMap[badge.icon as keyof typeof iconMap]
                  const bgClass =
                    badge.variant === "primary" ? "bg-blue-600/20 border-blue-400/30" : "bg-white/10 border-white/25"
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-1.5 sm:gap-2 ${bgClass} backdrop-blur-xl border rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-white shadow-lg`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300 flex-shrink-0" />}
                      <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">{badge.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* Main heading - Dynamic */}
              <div className="space-y-3 sm:space-y-4 text-center lg:text-left px-2 sm:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                  <span className="block text-white">{data.headline.line1}</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent leading-[1.1] pb-0.5">
                    {data.headline.line2}
                  </span>
                  <span className="block text-white">{data.headline.line3}</span>
                </h1>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mx-auto lg:mx-0"></div>
              </div>

              {/* Description - Dynamic */}
              <div className="text-center lg:text-left px-3 sm:px-0">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {data.description}
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex justify-center lg:justify-start px-2 sm:px-0">
                <div className="w-full max-w-2xl">
                  <SearchBar />
                </div>
              </div>

              {/* Value propositions - Dynamic */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 py-3 sm:py-4 max-w-lg mx-auto lg:mx-0 px-3 sm:px-0">
                {data.valuePropositions.map((prop, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-200">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{prop.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:sticky lg:top-28 lg:self-start">
            <Link href={`/products/${data.featuredProduct.slug}`} className="block group cursor-pointer">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/90 shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-white/60 group-hover:border-blue-200/60 backdrop-blur-sm">
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-xs sm:text-sm">{data.featuredProduct.badge}</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 z-20 opacity-70 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-slate-800/90 text-white p-1.5 rounded-lg shadow-lg">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-8 pt-14 pb-24 sm:pb-28">
                    <div className="relative h-[240px] sm:h-[300px] lg:h-[360px] w-full" style={{ minHeight: '240px' }}>
                      <Image
                        src={data.featuredProduct.image || "/placeholder.svg"}
                        alt={`AEA Technology ${data.featuredProduct.name}`}
                        fill
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-contain group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-lg"
                        quality={90}
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent p-4 sm:p-6 text-white">
                    <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                        {data.featuredProduct.name}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 leading-relaxed">
                        {data.featuredProduct.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-300 font-semibold text-xs sm:text-sm">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
