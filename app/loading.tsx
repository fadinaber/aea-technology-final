export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-[85vh] sm:min-h-[90vh] lg:min-h-[95vh] flex items-start pt-20 pb-8 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
            {/* Left skeleton */}
            <div className="lg:w-1/2 space-y-6">
              <div className="flex gap-2">
                <div className="h-8 w-28 bg-white/10 rounded-lg" />
                <div className="h-8 w-24 bg-white/10 rounded-lg" />
                <div className="h-8 w-32 bg-white/10 rounded-lg" />
              </div>
              <div className="space-y-3">
                <div className="h-12 w-3/4 bg-white/10 rounded-lg" />
                <div className="h-12 w-1/2 bg-white/10 rounded-lg" />
                <div className="h-12 w-2/3 bg-white/10 rounded-lg" />
              </div>
              <div className="h-4 w-1/2 bg-white/10 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-5/6 bg-white/10 rounded" />
              </div>
              {/* Search bar skeleton */}
              <div className="h-14 w-full bg-white/15 rounded-xl border border-white/20" />
            </div>
            {/* Right card skeleton */}
            <div className="lg:w-1/2 w-full">
              <div className="rounded-2xl bg-white/10 border border-white/20 overflow-hidden">
                <div className="h-[300px] sm:h-[380px] lg:h-[460px] bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FeaturedProducts skeleton */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="h-6 w-24 bg-muted rounded mx-auto mb-4" />
          <div className="h-10 w-64 bg-muted rounded mx-auto mb-3" />
          <div className="h-4 w-96 bg-muted rounded mx-auto mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-muted h-64" />
            ))}
          </div>
        </div>
      </div>

      {/* WhyChooseUs skeleton */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="h-10 w-72 bg-muted rounded mx-auto mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-muted h-40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
