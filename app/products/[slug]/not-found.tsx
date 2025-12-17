import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion, ArrowLeft, Home } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the product you're looking for. It may have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Products
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
