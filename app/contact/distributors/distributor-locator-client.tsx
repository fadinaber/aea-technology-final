"use client"

import { CardContent } from "@/components/ui/card"
import { SupportCTA } from "@/components/support-cta"
import type React from "react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { MapPin, Phone, Mail, Globe, Search, Headset, X, Printer } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { SanityDistributor } from "./page"

// Fallback data imports for when Sanity is empty
import {
  usDistributors as staticUSDistributors,
  flattenedDistributors as staticInternationalDistributors,
  contactFactoryCountries,
  allCountriesLower,
  type USDistributor,
  type FlattenedDistributor,
} from "@/data/distributors"

function DistributorCard({
  category,
  name,
  address,
  phone,
  phoneTollFree,
  fax,
  faxTollFree,
  email,
  website,
}: {
  category: string
  name: string
  address?: string
  phone?: string
  phoneTollFree?: string
  fax?: string
  faxTollFree?: string
  email: string
  website?: string
}) {
  const displayUrl = website ? website.replace(/^https?:\/\//, "").replace(/\/$/, "") : null

  return (
    <Card className="group h-full overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 bg-card">
      <div className="p-6 flex flex-col h-full gap-4">
        <div className="pb-4 border-b border-border">
          <div className="inline-block px-2.5 py-1 bg-primary/10 rounded-md mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">{category}</p>
          </div>
          <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        <div className="flex-1 space-y-3.5">
          {address && (
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{address}</p>
            </div>
          )}

          {(phone || phoneTollFree) && (
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm leading-relaxed space-y-1">
                {phoneTollFree && (
                  <div>
                    <a
                      href={`tel:${phoneTollFree.replace(/\s/g, "")}`}
                      className="text-foreground hover:text-primary font-medium transition-colors"
                    >
                      {phoneTollFree}
                    </a>
                    <span className="text-muted-foreground text-xs ml-1.5">(Toll Free)</span>
                  </div>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-sm text-foreground hover:text-primary font-medium transition-colors block"
                  >
                    {phone}
                  </a>
                )}
              </div>
            </div>
          )}

          {(fax || faxTollFree) && (
            <div className="flex gap-3">
              <Printer className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                {faxTollFree && (
                  <div>
                    <span className="font-medium">{faxTollFree}</span>
                    <span className="text-xs ml-1.5">(Toll Free)</span>
                  </div>
                )}
                {fax && <div className="font-medium">{fax}</div>}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
            <a
              href={`mailto:${email}`}
              className="text-sm text-primary hover:underline font-medium break-all leading-relaxed"
            >
              {email}
            </a>
          </div>

          {website && displayUrl && (
            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline font-medium break-all leading-relaxed inline-flex items-center gap-1"
              >
                {displayUrl}
                <svg
                  className="w-3.5 h-3.5 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function BuyDirectCard() {
  return (
    <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-slate-50 max-w-md w-full">
      <CardContent className="pt-6 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Headset className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Buy Direct from Factory</h3>
        <p className="text-sm text-slate-600 mb-4">
          We don't have a distributor in this region yet. Contact our sales team directly for assistance.
        </p>
        <div className="space-y-2">
          <a
            href="mailto:sales@aeatechnology.com"
            className="flex items-center justify-center gap-2 text-blue-600 hover:underline text-sm"
          >
            <Mail className="w-4 h-4" />
            sales@aeatechnology.com
          </a>
          <a
            href="tel:+1-800-258-7805"
            className="flex items-center justify-center gap-2 text-blue-600 hover:underline text-sm"
          >
            <Phone className="w-4 h-4" />
            +1-800-258-7805
          </a>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href="/contact">Contact Sales Team</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

interface DistributorLocatorClientProps {
  distributors: SanityDistributor[]
}

export default function DistributorLocatorClient({ distributors }: DistributorLocatorClientProps) {
  const [activeTab, setActiveTab] = useState<"us" | "international">("us")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Use Sanity data if available, otherwise fall back to static data
  const usDistributors = useMemo(() => {
    const sanityUS = distributors.filter((d) => d.region === "us")
    if (sanityUS.length > 0) return sanityUS
    // Fallback to static data
    return staticUSDistributors.map((d) => ({
      _id: `static-us-${d.id}`,
      name: d.name,
      category: d.category,
      region: "us" as const,
      country: "United States",
      address: d.address,
      phone: d.phone,
      phoneTollFree: d.phoneTollFree,
      fax: d.fax,
      faxTollFree: d.faxTollFree,
      email: d.email,
      website: d.website,
    }))
  }, [distributors])

  const internationalDistributors = useMemo(() => {
    const sanityIntl = distributors
      .filter((d) => d.region === "international" && !d.name.toLowerCase().includes("test"))
      .sort((a, b) => {
        const countryCompare = (a.country || "").localeCompare(b.country || "")
        if (countryCompare !== 0) return countryCompare
        return a.name.localeCompare(b.name)
      })
    if (sanityIntl.length > 0) return sanityIntl
    // Fallback to static data (already filtered and sorted in data/distributors.ts)
    return staticInternationalDistributors.map((item) => ({
      _id: `static-intl-${item.country}-${item.distributor.id}`,
      name: item.distributor.name,
      category: item.country,
      region: "international" as const,
      country: item.country,
      address: item.distributor.address,
      phone: item.distributor.phone,
      fax: item.distributor.fax,
      email: item.distributor.email,
      website: item.distributor.website,
    }))
  }, [distributors])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  const filteredInternational = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return internationalDistributors

    return internationalDistributors.filter(
      (d) =>
        d.country?.toLowerCase().includes(query) ||
        d.name.toLowerCase().includes(query)
    )
  }, [searchQuery, internationalDistributors])

  const showBuyDirectFallback = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return false

    if (filteredInternational.length === 0) {
      for (const country of contactFactoryCountries) {
        if (country.includes(query)) return true
      }
      let matchesAnyCountry = false
      for (const country of allCountriesLower) {
        if (country.includes(query)) {
          matchesAnyCountry = true
          break
        }
      }
      return !matchesAnyCountry || true
    }

    return false
  }, [searchQuery, filteredInternational.length])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 pt-24 sm:pt-28">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Find a Distributor</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Locate authorized AEA Technology distributors in your region for sales, support, and service.
          </p>
        </header>

        <nav className="flex justify-center mb-8" aria-label="Distributor region">
          <div className="inline-flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("us")}
              aria-pressed={activeTab === "us"}
              className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === "us"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              US Distributors
            </button>
            <button
              onClick={() => setActiveTab("international")}
              aria-pressed={activeTab === "international"}
              className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === "international"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              International Distributors
            </button>
          </div>
        </nav>

        {activeTab === "us" && (
          <section aria-label="US Distributors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {usDistributors.map((distributor) => (
                <DistributorCard
                  key={distributor._id}
                  category={distributor.category || "US Distributor"}
                  name={distributor.name}
                  address={distributor.address}
                  phone={distributor.phone}
                  phoneTollFree={distributor.phoneTollFree}
                  fax={distributor.fax}
                  faxTollFree={distributor.faxTollFree}
                  email={distributor.email}
                  website={distributor.website}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === "international" && (
          <section aria-label="International Distributors" className="max-w-6xl mx-auto">
            <div className="mb-8 max-w-lg mx-auto">
              <label className="block text-sm font-medium text-slate-700 mb-2 text-center">
                Search for your country or distributor
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder="e.g. Germany, Japan, Australia..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-12 pr-12 py-6 text-base border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm bg-white placeholder:text-slate-400"
                  aria-label="Search distributors"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-700 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {showBuyDirectFallback ? (
              <div className="flex justify-center">
                <BuyDirectCard />
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-500 mb-6 text-center" aria-live="polite">
                  {searchQuery
                    ? `Showing ${filteredInternational.length} result${filteredInternational.length !== 1 ? "s" : ""}`
                    : `${internationalDistributors.length} distributors worldwide`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInternational.map((distributor) => (
                    <DistributorCard
                      key={distributor._id}
                      category={distributor.country || "International"}
                      name={distributor.name}
                      address={distributor.address}
                      phone={distributor.phone}
                      fax={distributor.fax}
                      email={distributor.email}
                      website={distributor.website}
                    />
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Headset className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Can't find your country?</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      If we don't have a distributor in your region, you can buy directly from our factory. Contact our
                      sales team for assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                      <a
                        href="mailto:sales@aeatechnology.com"
                        className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        sales@aeatechnology.com
                      </a>
                      <span className="hidden sm:inline text-slate-300">|</span>
                      <a
                        href="tel:+1-800-258-7805"
                        className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        +1-800-258-7805
                      </a>
                    </div>
                    <Button asChild size="sm">
                      <Link href="/contact">Contact Sales Team</Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/contact">Back to Contact Page</Link>
          </Button>
        </div>

        <SupportCTA />
      </div>
    </div>
  )
}

