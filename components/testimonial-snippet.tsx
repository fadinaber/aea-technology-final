import { Users } from "lucide-react"
import { TestimonialCarousel } from "./testimonials/testimonial-carousel"

export default function TestimonialSnippet() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 backdrop-blur-sm">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
            <span className="text-xs sm:text-sm font-bold text-blue-200 uppercase tracking-wide">
              Customer Success Stories
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.2]">
            Trusted by
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-[1.2]">
              Industry Leaders
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
            See how professionals worldwide rely on AEA Technology for their most critical RF testing needs
          </p>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  )
}
