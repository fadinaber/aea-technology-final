import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getSectionById, type ResourcesTeaserSection } from "@/data/homepage"

const iconMap = {
  Download,
  FileText,
  Play,
}

interface ResourcesTeaserProps {
  data?: ResourcesTeaserSection["data"]
}

export default function ResourcesTeaser({ data: overrideData }: ResourcesTeaserProps) {
  // Get section data from homepage.ts
  const section = getSectionById<ResourcesTeaserSection>("resources-teaser")

  const data = overrideData ?? section?.data
  if (!data) return null

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {data.headline}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {data.resourceTypes.map((type, index) => {
            const Icon = iconMap[type.icon as keyof typeof iconMap] ?? Download
            return (
              <Card
                key={index}
                className="flex flex-col items-start gap-3 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{type.title}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {type.description}
                </CardDescription>
                <div className="mt-auto text-xs sm:text-sm font-medium text-primary">
                  {type.count}
                </div>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="inline-flex items-center gap-2">
            <Link href={data.cta.href}>
              {data.cta.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
