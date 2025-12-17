"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Play, Package, ArrowRight, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { performUnifiedSearch, type SearchItem } from "@/lib/search-utils"

const getTypeIcon = (type: string) => {
  switch (type) {
    case "product":
      return Package
    case "software":
      return Download
    case "manual":
      return FileText
    case "video":
      return Play
    default:
      return Search
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "product":
      return "bg-blue-100 text-blue-800"
    case "software":
      return "bg-green-100 text-green-800"
    case "manual":
      return "bg-purple-100 text-purple-800"
    case "video":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate slight delay for better UX
    setTimeout(() => {
      const searchResults = performUnifiedSearch(searchQuery, 8)
      setResults(searchResults)
      setIsLoading(false)
    }, 150)
  }

  // Handle search input
  useEffect(() => {
    handleSearch(query)
  }, [query])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleResultClick = (url: string) => {
    setIsOpen(false)
    setQuery("")
    router.push(url)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-xl border-2 border-white/40 shadow-lg"></div>
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products, software, manuals, videos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-12 pr-12 py-4 text-gray-900 placeholder:text-gray-500 bg-transparent focus:ring-2 focus:ring-blue-500/50 rounded-xl text-base font-medium border border-slate-600"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || results.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 backdrop-blur-xl border border-white/25 shadow-2xl rounded-xl overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-slate-600">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {results.map((result) => {
                  const Icon = getTypeIcon(result.type)
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full p-4 text-left hover:bg-blue-50/80 transition-colors border-b border-gray-100/50 last:border-b-0 group cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100/80 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200/80 transition-colors">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                              {result.name}
                            </h3>
                            <Badge className={`text-xs ${getTypeColor(result.type)}`}>{result.type}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-1">{result.description}</p>
                          <p className="text-xs text-slate-500">{result.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : query.trim() ? (
              <div className="p-6 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium mb-1">No results found</p>
                <p className="text-sm text-slate-500">Try searching for products, software, manuals, or videos</p>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {["TDR", "VNA", "Avionics", "Broadcast", "SWR", "Cable Testing", "MRI", "Software"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term)
                        setIsOpen(true)
                      }}
                      className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
