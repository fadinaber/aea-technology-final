"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type SanityProduct = {
  _id: string
  slug: { current: string } | null
  name: string
  tagline?: string
  shortDescription?: string
  category?: string
  badges?: Array<{ text: string; variant?: string }>
  imageUrl?: string
}

// Fallback static data if Sanity is empty
const fallbackProductCategories = [
  {
    name: "Time Domain Reflectometers (TDRs)",
    products: [
      {
        id: "e20-20-avionics",
        name: "E20/20 Avionics TDR Kit",
        tagline: "Aviation Cable Testing",
        image: "/images/products/avionics/full-kit.png",
        category: "Aviation",
      },
      {
        id: "e20-20n",
        name: "E20/20N TDR",
        tagline: "Broadcast Network Testing",
        image: "/images/featured/e20-20-tdr.png",
        category: "Broadcast",
      },
      {
        id: "e20-20f-catv",
        name: "E20/20F CATV Network TDR",
        tagline: "Cable TV Network Analysis",
        image: "/images/featured/e20-20-tdr.png",
        category: "CATV",
      },
      {
        id: "e20-20b",
        name: "E20/20B Network TDR",
        tagline: "VDV/RF Network Testing",
        image: "/images/featured/e20-20-tdr.png",
        category: "General RF",
      },
    ],
  },
  {
    name: "Network Analyzers (VNAs) & SWR Meters",
    products: [
      {
        id: "via-bravo-mri-3000",
        name: "Bravo MRI-3000 Analyzer",
        tagline: "Medical RF Environment Testing",
        image: "/images/featured/bravo-mri.jpg",
        category: "Medical",
      },
      {
        id: "via-bravo-ex2",
        name: "Bravo Ex² Analyzer",
        tagline: "Extended Range Analysis",
        image: "/images/products/bravo-ex2/device-with-stand.png",
        category: "Extended Range",
      },
      {
        id: "swr-site-analyzer",
        name: "SWR Site Analyzer",
        tagline: "Standing Wave Ratio Analysis",
        image: "/images/featured/swr-analyzer.png",
        category: "Land Mobile Radio",
      },
    ],
  },
]

interface ProductsPageClientProps {
  products?: SanityProduct[]
}

export default function ProductsPageClient({ products = [] }: ProductsPageClientProps) {
  // Transform Sanity products into category structure, or use fallback
  const productCategories = useMemo(() => {
    if (products.length === 0) {
      return fallbackProductCategories
    }

    // Group products by category
    const tdrProducts = products
      .filter((p) => p.category === "tdr")
      .map((p) => {
        // Try to find matching fallback product by ID first, then by name
        const productSlug = p.slug?.current || p._id
        let fallbackProduct = fallbackProductCategories[0]?.products.find(
          (fp) => fp.id === productSlug
        )
        // If not found by ID, try matching by name
        if (!fallbackProduct) {
          fallbackProduct = fallbackProductCategories[0]?.products.find(
            (fp) => p.name.toLowerCase().includes(fp.name.toLowerCase()) || fp.name.toLowerCase().includes(p.name.toLowerCase())
          )
        }
        return {
          id: productSlug,
          name: p.name,
          tagline: p.tagline || p.shortDescription || "",
          image: p.imageUrl || fallbackProduct?.image || "/placeholder.svg",
          category: fallbackProduct?.category || p.badges?.[0]?.text || "Product",
        }
      })

    const vnaProducts = products
      .filter((p) => p.category === "vna-swr")
      .map((p) => {
        // Try to find matching fallback product by ID first, then by name
        const productSlug = p.slug?.current || p._id
        let fallbackProduct = fallbackProductCategories[1]?.products.find(
          (fp) => fp.id === productSlug
        )
        // If not found by ID, try matching by name
        if (!fallbackProduct) {
          fallbackProduct = fallbackProductCategories[1]?.products.find(
            (fp) => p.name.toLowerCase().includes(fp.name.toLowerCase()) || fp.name.toLowerCase().includes(p.name.toLowerCase())
          )
        }
        return {
          id: productSlug,
          name: p.name,
          tagline: p.tagline || p.shortDescription || "",
          image: p.imageUrl || fallbackProduct?.image || "/placeholder.svg",
          category: fallbackProduct?.category || p.badges?.[0]?.text || "Product",
        }
      })

    return [
      {
        name: "Time Domain Reflectometers (TDRs)",
        products: tdrProducts,
      },
      {
        name: "Network Analyzers (VNAs) & SWR Meters",
        products: vnaProducts,
      },
    ].filter((cat) => cat.products.length > 0) // Only show categories with products
  }, [products])
  const handleProductClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 bg-zinc-50">
      <div className="text-center mb-8 sm:mb-12 mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-4">
          Professional RF & Cable Testing Equipment
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">
          Discover our comprehensive range of precision testing instruments, designed for
          professionals who demand reliability and accuracy.
        </p>
      </div>

      {productCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} id={categoryIndex === 0 ? "tdrs" : "vnas-swr"} className="mb-12 sm:mb-16 scroll-mt-24">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8 border-b-2 border-blue-600 pb-2">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {category.products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col bg-white border-2 border-slate-200 hover:border-blue-300 overflow-hidden"
              >
                <CardHeader className="p-0 relative">
                  <Link href={`/products/${product.id}`} onClick={handleProductClick} className="cursor-pointer">
                    <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50">
                      <div className="h-48 sm:h-56 lg:h-64 flex items-center justify-center p-4 sm:p-6">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          priority
                          quality={85}
                        />
                      </div>
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                        <Badge className="bg-primary text-primary-foreground shadow-lg text-xs sm:text-sm">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                  <Link href={`/products/${product.id}`} onClick={handleProductClick} className="cursor-pointer">
                    <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </CardTitle>
                  </Link>
                  <CardDescription className="text-slate-600 mb-4 text-sm leading-relaxed flex-1">
                    {product.tagline}
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 min-h-[44px] text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/products/${product.id}`} onClick={handleProductClick}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="min-h-[44px] text-sm sm:text-base bg-transparent border-2 border-slate-300 hover:bg-slate-50 hover:border-blue-300 transition-all duration-300"
                    >
                      <Link href="/contact" onClick={handleProductClick}>
                        Quote
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 bg-slate-50 rounded-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4">
          Need Help Choosing the Right Equipment?
        </h3>
        <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
          Our technical experts are here to help you find the perfect testing solution for your specific requirements.
        </p>
        <Button size="lg" asChild className="min-h-[48px]">
          <Link href="/contact" onClick={handleProductClick}>
            Contact Our Experts
          </Link>
        </Button>
      </div>
    </div>
  )
}
