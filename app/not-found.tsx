import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Home, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found | AEA Technology",
  description:
    "The page you're looking for could not be found. Our team is here to help - contact us for any questions about our RF test equipment.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 pt-24 sm:pt-32 pb-24 sm:pb-32 bg-gradient-to-b from-background to-muted/20">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <span className="text-8xl sm:text-9xl font-bold text-primary/20">404</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Page Not Found</h1>
        
        {/* Main CTA Section */}
        <div className="bg-card border-2 border-primary/20 rounded-xl p-8 sm:p-10 mb-8 shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
              Can't find what you're looking for? We're here to help!
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-2">
              Don't worry about navigating our website—our team is ready to assist you with any questions about our RF test equipment, 
              technical specifications, pricing, or support needs.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Just reach out and talk to us.</strong> We're friendly, knowledgeable, and here to make sure you get exactly what you need.
            </p>
          </div>
          
          <Button 
            size="lg" 
            asChild 
            className="w-full sm:w-auto min-h-[56px] text-base sm:text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 px-8"
          >
            <Link href="/contact">
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button variant="outline" asChild className="min-h-[44px]">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="min-h-[44px]">
            <Link href="/products">
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/products/e20-20-avionics" className="text-sm text-primary hover:underline font-medium">
              Avionics TDR
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/products/via-bravo-mri-3000" className="text-sm text-primary hover:underline font-medium">
              MRI Analyzer
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/resources" className="text-sm text-primary hover:underline font-medium">
              Resources
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contact" className="text-sm text-primary hover:underline font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
