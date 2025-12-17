import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SupportCTA() {
  return (
    <div className="border-t border-border pt-12 sm:pt-16 mt-12 sm:mt-16 pb-12 sm:pb-16">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Need Additional Support?</h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-6">
          Can't find what you're looking for? Our technical support team is here to help with any questions about AEA
          Technology products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="min-h-[48px] text-sm sm:text-base">
            <Link href="/contact">
              Contact Support
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="min-h-[48px] text-sm sm:text-base bg-transparent">
            <a href="tel:1-800-258-7805">Call: 1-(800) 258-7805</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
