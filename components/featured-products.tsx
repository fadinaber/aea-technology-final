"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getSectionById, type FeaturedProductsSection } from "@/data/homepage"

interface FeaturedProductsProps {
  data?: FeaturedProductsSection["data"]
}

export default function FeaturedProducts({ data: overrideData }: FeaturedProductsProps) {
  // Get section data from homepage.ts
  const section = getSectionById<FeaturedProductsSection>("featured-products")

  const data = overrideData ?? section?.data
  if (!data) return null

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{data.headline}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {data.products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col bg-card border-2 border-border hover:border-primary/50 overflow-hidden"
            >
              <CardHeader className="p-0 relative">
                <Link href={`/products/${product.id}`} className="cursor-pointer">
                  <div className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50">
                    <div className="h-48 sm:h-56 lg:h-64 flex items-center justify-center p-4 sm:p-6">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <Badge className="bg-primary text-primary-foreground shadow-lg text-xs sm:text-sm">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                <Link href={`/products/${product.id}`} className="cursor-pointer">
                  <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                    {product.name}
                  </CardTitle>
                </Link>
                <CardDescription className="text-muted-foreground mb-3 line-clamp-3 text-sm leading-relaxed flex-1">
                  {product.description}
                </CardDescription>

                <ul className="space-y-1.5 mb-3 sm:mb-4">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 min-h-[44px] text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap px-3 sm:px-4"
                  >
                    <Link href={`/products/${product.id}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="min-h-[44px] text-sm sm:text-base bg-transparent border-2 border-border hover:bg-accent hover:border-primary/50 transition-all duration-300 text-foreground"
                  >
                    <Link href="/contact">Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-border hover:bg-accent hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent text-foreground"
          >
            <Link href={data.cta.href}>
              {data.cta.text}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
