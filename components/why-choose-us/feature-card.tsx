import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Star, Users, Check, Clock } from "lucide-react"
import Image from "next/image"
import type { FeatureCard as FeatureCardType } from "@/data/why-choose-us"

const iconMap = {
  Shield,
  Award,
  Star,
  Users,
}

const statIconMap = {
  Check,
  Clock,
  Award,
}

interface FeatureCardProps {
  feature: FeatureCardType
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon as keyof typeof iconMap] || Shield
  const StatIcon = statIconMap[feature.statIcon as keyof typeof statIconMap] || Check

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border bg-card overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={feature.image || "/placeholder.svg"}
          alt={feature.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${feature.iconColor}`} />
          </div>
          <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
        <div className={`flex items-center gap-2 ${feature.iconColor} font-semibold text-sm`}>
          <StatIcon className="w-4 h-4" />
          {feature.stat}
        </div>
      </CardContent>
    </Card>
  )
}
