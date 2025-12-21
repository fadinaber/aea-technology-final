"use client"

import { Card } from "@/components/ui/card"
import { Award, Flag, Check, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { mainFeature, featureCards, certifications } from "@/data/why-choose-us"
import { FeatureCard } from "./why-choose-us/feature-card"

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-muted via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-zinc-50 mb-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wide">
              Why Choose AEA Technology
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-black text-foreground mb-4 sm:mb-6 leading-[1.2]">
            The Standard for
            <span className="block bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-[1.2]">
              RF Testing Excellence
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Three decades of innovation, precision, and unwavering commitment to quality have made us the trusted choice
            for professionals worldwide.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Made in USA - Hero Feature */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-background via-muted to-background border border-border p-0">
              <div className="grid lg:grid-cols-2">
                {/* Mobile: Image on top with aspect ratio */}
                <div className="relative w-full aspect-[2/1] lg:hidden overflow-hidden">
                  <Image
                    src={mainFeature.image || "/placeholder.svg"}
                    alt="AEA Technology - Made in USA Manufacturing facility in Carlsbad, California"
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    quality={85}
                  />
                </div>

                {/* Content Section with padding */}
                <div className="p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-background via-red-50/30 to-blue-50/30 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-primary rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Flag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-2">{mainFeature.title}</h3>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        {mainFeature.badge}
                      </div>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    {mainFeature.description}
                  </p>
                </div>

                {/* Desktop: Image fills right side completely */}
                <div className="hidden lg:block relative h-full min-h-[400px] overflow-hidden aspect-[2/1]">
                  <Image
                    src={mainFeature.image || "/placeholder.svg"}
                    alt="AEA Technology - Made in USA Manufacturing facility in Carlsbad, California"
                    fill
                    sizes="50vw"
                    className="object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    quality={85}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Three Column Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {featureCards.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>

          {/* Certification Section */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-border">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">Industry Certifications</h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                Recognized by leading industry standards and accreditation bodies
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
              {certifications.map((cert, index) => {
                // Non-clickable badge (SCB)
                if (!cert.link) {
                  return (
                    <div
                      key={index}
                      className="bg-muted/50 rounded-xl p-6 shadow-sm flex justify-center items-center h-32 w-44"
                    >
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={`${cert.name} certification badge`}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain"
                        loading="lazy"
                        decoding="async"
                        quality={75}
                      />
                    </div>
                  )
                }

                if (cert.isDownload) {
                  return (
                    <a
                      key={index}
                      href={cert.link}
                      download
                      className="bg-muted/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex flex-col justify-center items-center h-32 w-44 cursor-pointer group"
                      title="Download ISO 9001 Certificate"
                    >
                      <div className="text-blue-600 font-bold text-lg mb-2">ISO 9001</div>
                      <div className="flex items-center gap-1.5 text-blue-500 group-hover:text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium">Certificate</span>
                      </div>
                    </a>
                  )
                }

                // Regular clickable badge
                return (
                  <a
                    key={index}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex justify-center items-center h-32 w-44"
                  >
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={`${cert.name} certification badge`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                      loading="lazy"
                    />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <Link
              href="/press"
              scroll={true}
              onClick={() => window.scrollTo(0, 0)}
              className="group block bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg border border-sky-200 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">From the USA to Antarctica</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Discover how AEA Technology instruments support research at the South Pole
                    </p>
                  </div>
                </div>
                <div className="text-sky-600 group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
