"use client"

import type React from "react"
import { SupportCTA } from "@/components/support-cta"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Flag, Shield, Users, Zap, Quote, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { AboutPageData } from "@/data/about"

// Icon mapping for dynamic rendering from CMS
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Flag,
  Shield,
  Award,
  Users,
  Zap,
}

interface AboutPageClientProps {
  data: AboutPageData
}

export default function AboutPageClient({ data }: AboutPageClientProps) {
  const { leadership, companyStory, coreValues, industries, certifications, cta } = data

  return (
    <div className="min-h-screen">
      {/* CEO Leadership Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 mt-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Leadership & Vision</h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Meet the visionary leader who has built AEA Technology into America's premier RF testing equipment
                manufacturer
              </p>
            </div>

            <Card className="overflow-hidden shadow-xl border-0 my-0">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 sm:h-80 lg:h-auto">
                  <Image
                    src={leadership.image || "/placeholder.svg"}
                    alt={`${leadership.name}, ${leadership.title} of AEA Technology`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 mb-6 sm:mb-8 leading-relaxed">
                    "{leadership.quote}"
                  </blockquote>
                  <div className="mb-6 sm:mb-8">
                    <div className="text-xl sm:text-2xl font-bold text-slate-900">{leadership.name}</div>
                    <div className="text-lg sm:text-xl text-blue-600 font-medium">{leadership.title}</div>
                    <div className="text-base sm:text-lg text-slate-600">{leadership.subtitle}</div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                    {leadership.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    <p className="font-medium text-blue-600 text-base sm:text-lg">{leadership.tagline}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-lg sm:text-xl text-slate-600">From humble beginnings to industry leadership</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
              <Card className="border-l-4 border-l-blue-600 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Award className="w-8 h-8 text-blue-600" />
                    {companyStory.mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-lg">{companyStory.mission.content}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Zap className="w-8 h-8 text-green-600" />
                    {companyStory.vision.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-lg">{companyStory.vision.content}</p>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-base sm:prose-lg prose-slate max-w-none">
              {companyStory.history.map((paragraph, index) => (
                <p key={index} className="text-slate-700 leading-relaxed mb-6 sm:mb-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">What Sets Us Apart</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Our core values drive everything we do, from product design to customer relationships
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {coreValues.map((value) => {
              const IconComponent = iconMap[value.icon] || Flag
              return (
                <Card
                  key={value.id}
                  className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:shadow-blue-100/50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 group-hover:shadow-lg transition-all duration-500">
                        <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-500" />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-3 bg-green-600">{value.highlight}</Badge>
                        <CardTitle className="text-xl text-slate-900">{value.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Trusted by professionals across critical industries worldwide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {industries.map((industry) => (
              <Card
                key={industry.id}
                className="group hover:shadow-lg transition-all duration-500 border hover:border-blue-300 hover:bg-blue-50/30"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="text-3xl">{industry.icon}</span>
                    <div>
                      <div className="text-slate-900">{industry.name}</div>
                      <div className="text-sm text-slate-500 font-normal">{industry.customers}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{certifications.headline}</h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto px-4">{certifications.description}</p>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-6 sm:mb-8 px-4">
              Every AEA Technology product undergoes rigorous testing and quality assurance procedures. We maintain the
              highest industry standards through our certifications and accreditations, ensuring your investment
              delivers reliable performance for years to come.
            </p>
          </div>

          {/* Certification Logos */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12 px-4">
            {certifications.items.map((cert) =>
              cert.link ? (
                <a
                  key={cert.id}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
                >
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.name}
                    width={cert.width}
                    height={cert.height}
                    className="h-24 w-auto"
                  />
                </a>
              ) : (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
                >
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.name}
                    width={cert.width}
                    height={cert.height}
                    className="h-16 w-auto"
                    priority
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 px-4">
              {cta.headline}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed px-4">{cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px]">
                <Link href={cta.primaryButton.href} onClick={() => window.scrollTo(0, 0)}>
                  {cta.primaryButton.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-transparent min-h-[48px]"
              >
                <Link href={cta.secondaryButton.href} onClick={() => window.scrollTo(0, 0)}>
                  {cta.secondaryButton.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SupportCTA Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SupportCTA />
        </div>
      </section>
    </div>
  )
}
