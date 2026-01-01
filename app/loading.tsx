// Global loading component for improved perceived performance
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20 pb-8 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 min-h-[85vh] sm:min-h-[90vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start max-w-7xl mx-auto animate-pulse">
            {/* Left content skeleton */}
            <div className="lg:w-1/2 space-y-6">
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-white/10 rounded-lg" />
                <div className="h-8 w-32 bg-white/10 rounded-lg" />
              </div>
              <div className="space-y-4">
                <div className="h-12 w-3/4 bg-white/10 rounded-lg" />
                <div className="h-12 w-1/2 bg-white/20 rounded-lg" />
                <div className="h-12 w-2/3 bg-white/10 rounded-lg" />
              </div>
              <div className="h-6 w-full max-w-md bg-white/5 rounded-lg" />
              <div className="h-14 w-full max-w-2xl bg-white/10 rounded-xl" />
            </div>
            {/* Right image skeleton */}
            <div className="lg:w-1/2 w-full">
              <div className="rounded-2xl bg-white/10 aspect-[4/3] w-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured products skeleton */}
      <div className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-10 w-64 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-6 w-96 max-w-full bg-muted/50 rounded-lg mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-muted aspect-[3/4]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
