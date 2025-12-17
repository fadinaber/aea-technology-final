import { Star } from "lucide-react"

interface RatingDisplayProps {
  rating?: number
  className?: string
}

export function RatingDisplay({ rating = 5, className = "" }: RatingDisplayProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">Trusted Worldwide</span>
    </div>
  )
}
