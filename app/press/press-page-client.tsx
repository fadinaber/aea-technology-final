"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Mail } from "lucide-react"
import Image from "next/image"
import { pressPageData } from "@/data/press"
import type { SanityPressRelease } from "./page"

interface PressPageClientProps {
  pressReleases: SanityPressRelease[]
}

export default function PressPageClient({ pressReleases }: PressPageClientProps) {
  // Use Sanity data if available, otherwise fall back to static data
  const releases =
    pressReleases.length > 0
      ? pressReleases.map((r) => ({
          id: r._id,
          title: r.title,
          date: r.displayDate || r.date,
          description: r.description,
          featured: r.featured || false,
          image: r.imageUrl,
        }))
      : pressPageData.pressReleases.filter((release) => release.id !== "new-website-launch")

  const { headline, subheadline, mediaContact } = pressPageData

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 bg-zinc-50 min-h-screen">
      <div className="text-center mb-8 sm:mb-12 mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-4">{headline}</h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">{subheadline}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {releases.map((release) => (
          <Card
            key={release.id}
            className={`p-0 overflow-hidden transition-all duration-300 hover:shadow-lg ${
              release.featured ? "ring-1 ring-blue-200" : ""
            }`}
          >
            <div className={`flex flex-col ${release.image ? "md:flex-row" : ""}`}>
              {release.image && (
                <div className="relative w-full md:w-[320px] lg:w-[360px] flex-shrink-0 bg-slate-100">
                  {/* Mobile: fixed aspect ratio */}
                  <div className="block md:hidden aspect-[2/1]">
                    <Image
                      src={release.image || "/placeholder.svg"}
                      alt={release.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  {/* Desktop: image fills container height set by content */}
                  <div className="hidden md:block absolute inset-0 h-full">
                    <Image
                      src={release.image || "/placeholder.svg"}
                      alt={release.title}
                      fill
                      className="object-cover"
                      sizes="360px"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{release.date}</span>
                  {release.featured && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full ml-2">
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 leading-tight">{release.title}</h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{release.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 sm:mt-16 bg-blue-50 rounded-xl p-6 sm:p-8 text-center border border-blue-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Press Inquiries</h2>
        <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-2xl mx-auto">
          For press inquiries, product reviews, interview requests, or media information, please contact us directly.
        </p>
        <a
          href={`mailto:${mediaContact.email}`}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Mail className="w-4 h-4 mr-2" />
          Contact Us
        </a>
      </div>
    </div>
  )
}
