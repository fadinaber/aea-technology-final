"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Menu,
  Phone,
  X,
  ArrowRight,
  Search,
  FileText,
  Download,
  Play,
  Package,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { performUnifiedSearch, type SearchItem } from "@/lib/search-utils"

const TYPE_ICONS = {
  product: Package,
  software: Download,
  manual: FileText,
  video: Play,
  faq: HelpCircle,
  applicationNotes: FileText,
} as const

const TYPE_COLORS = {
  product: "bg-blue-50 text-blue-700 border-blue-200",
  software: "bg-emerald-50 text-emerald-700 border-emerald-200",
  manual: "bg-purple-50 text-purple-700 border-purple-200",
  video: "bg-red-50 text-red-700 border-red-200",
  faq: "bg-amber-50 text-amber-700 border-amber-200",
  applicationNotes: "bg-teal-50 text-teal-700 border-teal-200",
} as const

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [mobileSearchResults, setMobileSearchResults] = useState<SearchItem[]>([])
  const [isMobileSearchLoading, setIsMobileSearchLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const searchRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aea-recent-searches")
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error)
    }
  }, [])

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return

    try {
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem("aea-recent-searches", JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save recent search:", error)
    }
  }

  const clearRecentSearches = () => {
    try {
      setRecentSearches([])
      localStorage.removeItem("aea-recent-searches")
    } catch (error) {
      console.error("Failed to clear recent searches:", error)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setShowProductsDropdown(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setShowResourcesDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearchLoading(true)
    const timeoutId = setTimeout(() => {
      const results = performUnifiedSearch(searchQuery, 6)
      setSearchResults(results)
      setIsSearchLoading(false)
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleMobileSearch = (query: string) => {
    if (!query.trim()) {
      setMobileSearchResults([])
      return
    }

    setIsMobileSearchLoading(true)
    setTimeout(() => {
      const results = performUnifiedSearch(query, 8)
      setMobileSearchResults(results)
      setIsMobileSearchLoading(false)
    }, 150)
  }

  useEffect(() => {
    handleMobileSearch(mobileSearchQuery)
  }, [mobileSearchQuery])

  useEffect(() => {
    if (showMobileSearch) {
      // Prevent body scroll when mobile search is open
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${window.scrollY}px`

      // Focus input after modal opens
      setTimeout(() => {
        mobileSearchInputRef.current?.focus()
      }, 100)
    } else {
      // Restore scroll position when closing
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
    }
  }, [showMobileSearch])

  useEffect(() => {
    if (showMobileSearch && mobileSearchInputRef.current) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus()
      }, 100)
    }
  }, [showMobileSearch])

  const handleProductsMouseEnter = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current)
    }
    setShowProductsDropdown(true)
  }

  const handleProductsMouseLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setShowProductsDropdown(false)
    }, 150)
  }

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current)
    }
    setShowResourcesDropdown(true)
  }

  const handleResourcesMouseLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setShowResourcesDropdown(false)
    }, 150)
  }

  const isActivePath = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const handleLinkClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  const handleMobileResultClick = (url: string) => {
    if (mobileSearchQuery.trim()) {
      saveRecentSearch(mobileSearchQuery)
    }
    setShowMobileSearch(false)
    setMobileSearchQuery("")
    setMobileSearchResults([])
    router.push(url)
  }

  const handleRecentSearchClick = (query: string) => {
    setMobileSearchQuery(query)
  }

  const popularSearches = ["TDR", "VNA", "Avionics", "Broadcast", "Cable Testing", "MRI"]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl shadow-md border-b border-border" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo - Fixed dimensions to prevent CLS */}
          <Link href="/" className="flex-shrink-0 cursor-pointer" onClick={handleLinkClick}>
            <Image
              src="/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png"
              alt="AEA Technology - Professional RF Test Equipment"
              width={140}
              height={40}
              className="h-8 w-[112px] lg:h-10 lg:w-[140px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink min-w-0">
            {/* Home */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActivePath("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={handleLinkClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActivePath("/about")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              About
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              ref={productsRef}
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <Link
                href="/products"
                onClick={handleLinkClick}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  isActivePath("/products") || showProductsDropdown
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showProductsDropdown ? "rotate-180" : ""}`}
                />
              </Link>

              {showProductsDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="w-[900px] bg-popover rounded-2xl shadow-2xl border border-border/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-start justify-between p-8 pb-6 border-b border-border bg-muted/40">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">Professional RF Testing Equipment</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Precision instruments for critical applications across aviation, medical, and
                            telecommunications
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/products"
                        onClick={() => {
                          handleLinkClick()
                          setShowProductsDropdown(false)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary hover:text-primary/90 bg-background hover:bg-accent border border-border hover:border-primary/30 rounded-lg transition-all hover:gap-3 whitespace-nowrap group cursor-pointer"
                      >
                        View All Products
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-0 divide-x divide-border p-8">
                      {/* Time Domain Reflectometers */}
                      <div className="pr-6 group/section hover:bg-accent/30 -m-8 p-8 mr-0">
                        <Link
                          href="/products"
                          className="flex items-start gap-2 mb-4 cursor-pointer"
                          onClick={() => {
                            handleLinkClick()
                            setShowProductsDropdown(false)
                          }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                          <div>
                            <h4 className="text-base font-bold text-foreground mb-1.5 transition-colors group-hover/section:text-primary">
                              Time Domain Reflectometers
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Precision cable testing and fault location for critical infrastructure
                            </p>
                          </div>
                        </Link>
                        <div className="space-y-1.5 ml-3.5">
                          <Link
                            href="/products/e20-20-avionics"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                E20/20 Avionics TDR Kit
                              </div>
                              <p className="text-xs text-muted-foreground">Aviation-grade cable testing</p>
                            </div>
                          </Link>
                          <Link
                            href="/products/e20-20n"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                E20/20N TDR
                              </div>
                              <p className="text-xs text-muted-foreground">Broadcast network analysis</p>
                            </div>
                          </Link>
                          <Link
                            href="/products/e20-20f-catv"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                E20/20F CATV Network TDR
                              </div>
                              <p className="text-xs text-muted-foreground">Cable TV infrastructure</p>
                            </div>
                          </Link>
                          <Link
                            href="/products/e20-20b"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                E20/20B Network TDR
                              </div>
                              <p className="text-xs text-muted-foreground">VDV/RF network testing</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Network Analyzers & SWR Meters */}
                      <div className="pl-6 group/section hover:bg-accent/30 -m-8 p-8 ml-0">
                        <Link
                          href="/products"
                          className="flex items-start gap-2 mb-4 cursor-pointer"
                          onClick={() => {
                            handleLinkClick()
                            setShowProductsDropdown(false)
                          }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                          <div>
                            <h4 className="text-base font-bold text-foreground mb-1.5 transition-colors group-hover/section:text-primary">
                              Network Analyzers (VNAs) & SWR Meters
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Impedance and network analysis for RF systems
                            </p>
                          </div>
                        </Link>
                        <div className="space-y-1.5 ml-3.5">
                          <Link
                            href="/products/via-bravo-mri-3000"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                Bravo MRI-3000 Analyzer
                              </div>
                              <p className="text-xs text-muted-foreground">Medical RF environment testing</p>
                            </div>
                          </Link>
                          <Link
                            href="/products/via-bravo-ex2"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                Bravo EX² Analyzer
                              </div>
                              <p className="text-xs text-muted-foreground">Extended range analysis</p>
                            </div>
                          </Link>
                          <Link
                            href="/products/swr-site-analyzer"
                            className="flex items-start gap-2 p-3 rounded-lg transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm cursor-pointer group"
                            onClick={() => {
                              handleLinkClick()
                              setShowProductsDropdown(false)
                            }}
                          >
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover:text-primary mb-0.5 transition-colors">
                                SWR Site Analyzer
                              </div>
                              <p className="text-xs text-muted-foreground">Land mobile radio analysis</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-5 border-t border-border bg-muted/40">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold">Need technical guidance?</span> Our engineers are here to help
                        you select the right equipment.{" "}
                        <Link
                          href="/contact"
                          onClick={handleLinkClick}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-primary hover:text-primary/90 bg-background hover:bg-accent border border-border hover:border-primary/30 rounded-lg font-semibold transition-all hover:gap-2 group cursor-pointer"
                        >
                          Contact Engineering{" "}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              ref={resourcesRef}
              onMouseEnter={handleResourcesMouseEnter}
              onMouseLeave={handleResourcesMouseLeave}
            >
              <Link
                href="/resources?tab=software"
                onClick={handleLinkClick}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  isActivePath("/resources") || showResourcesDropdown
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Resources
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showResourcesDropdown ? "rotate-180" : ""}`}
                />
              </Link>

              {showResourcesDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="w-[1000px] bg-popover rounded-2xl shadow-2xl border border-border/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-start justify-between p-8 pb-6 border-b border-border bg-muted/40">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">Support Resources</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Comprehensive documentation, software, and training materials
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/resources"
                        onClick={handleLinkClick}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary hover:text-primary/90 bg-background hover:bg-accent border border-border hover:border-primary/30 rounded-lg transition-all hover:gap-3 whitespace-nowrap group cursor-pointer"
                      >
                        Browse All Resources
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-5 gap-4 p-8">
                      {/* Software */}
                      <Link
                        href="/resources?tab=software"
                        onClick={handleLinkClick}
                        className="group p-5 rounded-xl bg-accent/30 hover:bg-accent/50 border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-blue-200">
                            <Download className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            Software
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            Latest software updates and utilities
                          </p>
                          <div className="space-y-1.5 w-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>TDR Analysis Suite</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>VNA Calibration Tool</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* User Manuals */}
                      <Link
                        href="/resources?tab=manuals"
                        onClick={handleLinkClick}
                        className="group p-5 rounded-xl bg-accent/30 hover:bg-accent/50 border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-blue-200">
                            <BookOpen className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            User Manuals
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            User guides and specifications
                          </p>
                          <div className="space-y-1.5 w-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>User Manuals</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Quick Start Guides</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Technical Specs</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Training Videos */}
                      <Link
                        href="/resources?tab=videos"
                        onClick={handleLinkClick}
                        className="group p-5 rounded-xl bg-accent/30 hover:bg-accent/50 border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-blue-200">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            Training Videos
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Step-by-step tutorials</p>
                          <div className="space-y-1.5 w-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Product Overviews</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Setup Tutorials</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Best Practices</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Support & FAQs */}
                      <Link
                        href="/resources?tab=faqs"
                        onClick={handleLinkClick}
                        className="group p-5 rounded-xl bg-accent/30 hover:bg-accent/50 border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-blue-200">
                            <HelpCircle className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            Support & FAQs
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            Common questions and support
                          </p>
                          <div className="space-y-1.5 w-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Troubleshooting</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>Technical Support</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>FAQ Database</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Application Notes */}
                      <Link
                        href="/resources?tab=application-notes"
                        onClick={handleLinkClick}
                        className="group p-5 rounded-xl bg-accent/30 hover:bg-accent/50 border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-blue-200">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            Application Notes
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            Technical application guides
                          </p>
                          <div className="space-y-1.5 w-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>TDR Applications</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                              <span>VNA Applications</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActivePath("/contact")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right side - Search and Actions */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center gap-3" ref={searchRef}>
              {/* Search - Integrated button inside input */}
              <div className="relative">
                {showSearch ? (
                  <div className="relative">
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="text"
                        placeholder="Search products, software, manuals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-72 h-9 pl-9 pr-9 text-sm"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowSearch(false)
                          setSearchQuery("")
                        }}
                        className="absolute right-1 h-7 w-7 p-0 cursor-pointer hover:bg-accent"
                        aria-label="Close search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    {searchResults.length > 0 && (
                      <Card className="absolute top-full mt-2 w-72 bg-popover shadow-xl border z-50">
                        <CardContent className="p-0 max-h-80 overflow-y-auto">
                          {searchResults.map((result) => {
                            const Icon = TYPE_ICONS[result.type as keyof typeof TYPE_ICONS] || Search
                            const colorClass = TYPE_COLORS[result.type as keyof typeof TYPE_COLORS]

                            return (
                              <button
                                key={result.id}
                                onClick={() => {
                                  router.push(result.url)
                                  setShowSearch(false)
                                  setSearchQuery("")
                                }}
                                className="w-full p-3 text-left hover:bg-accent border-b last:border-b-0 cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-medium text-sm text-foreground">{result.name}</h3>
                                      <Badge className={`text-xs ${colorClass}`}>{result.type}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{result.description}</p>
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSearch(true)}
                    className="h-9 w-9 cursor-pointer"
                    aria-label="Open search"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* CTA Button */}
              <Button asChild className="bg-primary hover:bg-primary/90 h-10 cursor-pointer text-primary-foreground">
                <Link href="/contact" onClick={handleLinkClick}>
                  <Phone className="w-4 h-4 mr-2" />
                  Get Quote
                </Link>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="h-10 w-10 cursor-pointer"
                aria-label={showMobileSearch ? "Close search" : "Open search"}
              >
                {showMobileSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {showMobileSearch && (
                <div className="fixed inset-0 bg-background z-[100] overflow-auto">
                  <div className="flex flex-col h-full">
                    {/* Search Header - Fixed */}
                    <div className="flex-shrink-0 p-3 sm:p-4 border-b border-border bg-background">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setShowMobileSearch(false)
                            setMobileSearchQuery("")
                            setMobileSearchResults([])
                          }}
                          className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 cursor-pointer"
                          aria-label="Close search"
                        >
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
                        </Button>

                        <div className="relative flex-1">
                          <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
                          <Input
                            ref={mobileSearchInputRef}
                            type="text"
                            placeholder="Search products, software..."
                            value={mobileSearchQuery}
                            onChange={(e) => setMobileSearchQuery(e.target.value)}
                            className="w-full pl-9 sm:pl-11 pr-9 sm:pr-10 py-5 sm:py-6 text-sm sm:text-base text-foreground placeholder:text-muted-foreground bg-muted/50 border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary"
                          />
                          {mobileSearchQuery && (
                            <button
                              onClick={() => {
                                setMobileSearchQuery("")
                                setMobileSearchResults([])
                                mobileSearchInputRef.current?.focus()
                              }}
                              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-full hover:bg-muted"
                              aria-label="Clear search"
                            >
                              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Search Content - Scrollable */}
                    <ScrollArea className="flex-1 touch-auto">
                      {isMobileSearchLoading ? (
                        <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3 sm:mb-4"></div>
                          <p className="text-muted-foreground text-sm sm:text-base font-medium">Searching...</p>
                        </div>
                      ) : mobileSearchResults.length > 0 ? (
                        <div className="px-3 sm:px-4 py-3 sm:py-4">
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
                              {mobileSearchResults.length} {mobileSearchResults.length === 1 ? "result" : "results"}{" "}
                              found
                            </p>
                          </div>
                          <div className="space-y-2">
                            {mobileSearchResults.map((result, index) => {
                              const Icon = TYPE_ICONS[result.type as keyof typeof TYPE_ICONS] || Package
                              return (
                                <Card
                                  key={index}
                                  className="cursor-pointer transition-all hover:shadow-md active:scale-[0.98] border border-border overflow-hidden"
                                  onClick={() => handleMobileResultClick(result.url)}
                                >
                                  <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                      <div
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${TYPE_COLORS[result.type as keyof typeof TYPE_COLORS]}`}
                                      >
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1 line-clamp-2">
                                          {result.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-1.5 sm:mb-2">
                                          {result.description}
                                        </p>
                                        <Badge variant="outline" className="text-[10px] sm:text-xs">
                                          {result.category}
                                        </Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      ) : mobileSearchQuery.trim() ? (
                        <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-3 sm:mb-4">
                            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                          </div>
                          <p className="text-base sm:text-lg font-medium text-foreground mb-1.5 sm:mb-2">
                            No results found
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-[280px] sm:max-w-none">
                            Try adjusting your search or browse our categories
                          </p>
                        </div>
                      ) : (
                        <div className="px-3 sm:px-4 py-4 sm:py-6">
                          {/* Recent Searches */}
                          {recentSearches.length > 0 && (
                            <div className="mb-5 sm:mb-6">
                              <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">Recent Searches</h3>
                                </div>
                                <button
                                  onClick={clearRecentSearches}
                                  className="text-[10px] sm:text-xs text-primary hover:text-primary/80 font-medium"
                                >
                                  Clear All
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {recentSearches.map((search, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleRecentSearchClick(search)}
                                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs sm:text-sm text-foreground transition-colors"
                                  >
                                    {search}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Popular Searches */}
                          <div className="mb-5 sm:mb-6">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                              <h3 className="text-xs sm:text-sm font-semibold text-foreground">Popular Searches</h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {popularSearches.map((search, index) => (
                                <button
                                  key={index}
                                  onClick={() => setMobileSearchQuery(search)}
                                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-xs sm:text-sm text-primary font-medium transition-colors"
                                >
                                  {search}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Quick Links */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
                              Quick Links
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                              {[
                                { icon: Package, label: "All Products", url: "/products" },
                                { icon: Download, label: "Software", url: "/resources?filter=software" },
                                { icon: FileText, label: "Manuals", url: "/resources?filter=manuals" },
                                { icon: HelpCircle, label: "FAQs", url: "/resources?filter=faq" },
                              ].map((link, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    setShowMobileSearch(false)
                                    router.push(link.url)
                                  }}
                                  className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-muted hover:bg-muted/80 rounded-xl transition-colors min-h-[80px] sm:min-h-[88px]"
                                >
                                  <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                  <span className="text-[10px] sm:text-xs font-medium text-foreground text-center leading-tight">
                                    {link.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 cursor-pointer">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <div className="mb-6 h-8">
                      <Image
                        src="/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png"
                        alt="AEA Technology - Professional RF Test Equipment"
                        width={120}
                        height={32}
                        className="h-8 w-[120px]"
                      />
                    </div>

                    <nav className="flex flex-col space-y-2">
                      <Link
                        href="/"
                        className={`px-4 py-3 text-lg font-medium rounded-lg cursor-pointer ${
                          isActivePath("/") ? "bg-accent text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          handleLinkClick()
                          setIsOpen(false)
                        }}
                      >
                        Home
                      </Link>
                      <Link
                        href="/about"
                        className={`px-4 py-3 text-lg font-medium rounded-lg cursor-pointer ${
                          isActivePath("/about") ? "bg-accent text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          handleLinkClick()
                          setIsOpen(false)
                        }}
                      >
                        About
                      </Link>
                      <Link
                        href="/products"
                        className={`px-4 py-3 text-lg font-medium rounded-lg cursor-pointer ${
                          isActivePath("/products") ? "bg-accent text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          handleLinkClick()
                          setIsOpen(false)
                        }}
                      >
                        Products
                      </Link>
                      <Link
                        href="/resources"
                        className={`px-4 py-3 text-lg font-medium rounded-lg cursor-pointer ${
                          isActivePath("/resources") ? "bg-accent text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          handleLinkClick()
                          setIsOpen(false)
                        }}
                      >
                        Resources
                      </Link>
                      <Link
                        href="/contact"
                        className={`px-4 py-3 text-lg font-medium rounded-lg cursor-pointer ${
                          isActivePath("/contact") ? "bg-accent text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          handleLinkClick()
                          setIsOpen(false)
                        }}
                      >
                        Contact
                      </Link>

                      <div className="pt-6">
                        <Button
                          asChild
                          className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground"
                        >
                          <Link
                            href="/contact"
                            onClick={() => {
                              handleLinkClick()
                              setIsOpen(false)
                            }}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Request Quote
                          </Link>
                        </Button>
                      </div>
                    </nav>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
