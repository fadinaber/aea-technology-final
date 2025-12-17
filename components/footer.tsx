 "use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/data/site-config"

export default function Footer() {
  const { contact, footer, logo } = siteConfig
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="bg-slate-950 text-white">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center bg-white rounded-lg p-3 w-fit">
              <Image
                src={logo.light || "/placeholder.svg"}
                alt={logo.alt}
                width={160}
                height={48}
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <Badge className="bg-green-600 hover:bg-green-700 text-white">Made in USA</Badge>
            <p className="text-slate-300 text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          {/* Dynamic Footer Sections */}
          {footer.sections.map((section, index) => (
            <div key={index} className="sm:col-span-1">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors block py-1"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact - Uses siteConfig.contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300">
                  <div>Local: {contact.phone.local}</div>
                  <div>Toll Free: {contact.phone.tollFree}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 space-y-2">
                  <div>
                    <div className="text-xs text-slate-400">Sales</div>
                    <div className="break-all">{contact.emails.sales}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Tech Support</div>
                    <div className="break-all">{contact.emails.support}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                  <br />
                  {contact.address.country}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <div className="font-medium">Open {contact.hours.days}</div>
                  <div>
                    {contact.hours.time} ({contact.hours.timezone})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400 text-center sm:text-left">{footer.copyright}</div>
          <div className="flex space-x-4 sm:space-x-6">
            {mounted
              ? footer.legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
