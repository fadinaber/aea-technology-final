import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found | AEA Technology",
  description:
    "The page you're looking for could not be found. Browse our RF test equipment including TDRs, VNAs, and SWR meters.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 pt-24 sm:pt-32 pb-24 sm:pb-32">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <span className="text-8xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/products/e20-20-avionics" className="text-sm text-primary hover:underline">
              Avionics TDR
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/products/via-bravo-mri-3000" className="text-sm text-primary hover:underline">
              MRI Analyzer
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/resources" className="text-sm text-primary hover:underline">
              Resources
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contact" className="text-sm text-primary hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
