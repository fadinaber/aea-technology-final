// Global loading component - neutral skeleton for all pages
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Neutral page skeleton - works for all pages */}
      <div className="w-full bg-zinc-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Header skeleton */}
          <div className="text-center mb-8 sm:mb-12 mt-20 animate-pulse">
            <div className="h-8 sm:h-10 lg:h-12 w-64 sm:w-80 lg:w-96 bg-slate-200 rounded-lg mx-auto mb-4" />
            <div className="h-4 sm:h-6 w-full max-w-2xl bg-slate-200/60 rounded-lg mx-auto" />
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl bg-white border border-slate-200 p-4">
                  <div className="h-48 bg-slate-200 rounded-lg mb-4" />
                  <div className="h-6 w-3/4 bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-full bg-slate-200/60 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-slate-200/60 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
