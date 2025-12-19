"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type ProductListItem = {
  _id?: string
  slug?: { current?: string } | null
  name?: string
  tagline?: string
  shortDescription?: string
  category?: string
  imageUrl?: string
}

interface ProductsPageClientProps {
  products: ProductListItem[]
}

const categoryLabels: Record<string, string> = {
  tdr: "Time Domain Reflectometers (TDRs)",
  "vna-swr": "Network Analyzers (VNAs) & SWR Meters",
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const grouped = useMemo(() => {
    const groups: Record<string, ProductListItem[]> = {}
    for (const p of products) {
      const key = (p.category || "other").toLowerCase()
      if (!groups[key]) groups[key] = []
      groups[key].push(p)
    }
    return groups
  }, [products])

  const handleProductClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-emerald-400/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(6,182,212,0.1),transparent_25%)]" />

        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-lg border border-white/50 rounded-full px-4 py-2 shadow-lg">
              <Badge className="bg-blue-600 text-white shadow">Product Catalog</Badge>
              <span className="text-sm text-slate-600">Professional RF & Cable Testing Equipment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-6 leading-tight">
              Discover High-Performance Testing Instruments
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mt-4 leading-relaxed">
              Time Domain Reflectometers, Vector Network Analyzers, and SWR meters engineered for aviation, broadcast,
              telecommunications, and medical applications. Made in the USA for uncompromising reliability.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20 space-y-12 sm:space-y-16">
        {Object.entries(grouped).map(([key, list]) => {
          if (!list.length) return null
          const heading = categoryLabels[key] || "Products"
          const description =
            key === "tdr"
              ? "Pinpoint faults and verify cable integrity across complex networks with sub-meter accuracy."
              : "Characterize RF performance, measure return loss, and validate site health with confidence."

          return (
            <section key={key} id={heading.toLowerCase().replace(/\s+/g, "-")}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-100">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {heading}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                    {heading.includes("TDR") ? "Step TDR Solutions" : "Network Analysis & SWR Meters"}
                  </h2>
                  <p className="text-slate-600 mt-2 max-w-2xl">{description}</p>
                </div>
                <Button asChild size="lg" variant="outline" className="border-2 border-blue-200 hover:border-blue-400">
                  <Link href="/contact">
                    Talk to Sales
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {list.map((product) => {
                  const slug = product.slug?.current || product._id || ""
                  return (
                    <Card
                      key={slug}
                      className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col bg-white border-2 border-slate-100 hover:border-blue-200 overflow-hidden"
                    >
                      <CardHeader className="p-0 relative">
                        <Link href={`/products/${slug}`} onClick={handleProductClick} className="cursor-pointer">
                          <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50">
                            <div className="h-48 sm:h-56 lg:h-64 flex items-center justify-center p-4 sm:p-6">
                              <Image
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name || "Product"}
                                width={400}
                                height={300}
                                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                priority
                                quality={85}
                              />
                            </div>
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                              <Badge className="bg-blue-600 text-white shadow-lg text-xs sm:text-sm">
                                {product.category || "Product"}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </Link>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                        <Link href={`/products/${slug}`} onClick={handleProductClick} className="cursor-pointer">
                          <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 text-slate-900">
                            {product.name}
                          </CardTitle>
                        </Link>
                        <CardDescription className="text-slate-600 mb-3 line-clamp-3 text-sm leading-relaxed flex-1">
                          {product.tagline || product.shortDescription}
                        </CardDescription>

                        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                          <Button
                            asChild
                            size="sm"
                            className="flex-1 min-h-[44px] text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap px-3 sm:px-4"
                          >
                            <Link href={`/products/${slug}`} onClick={handleProductClick}>
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="min-h-[44px] text-sm sm:text-base bg-transparent border-2 border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 text-slate-900"
                          >
                            <Link href="/contact">Quote</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
