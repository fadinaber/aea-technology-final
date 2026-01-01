export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://aeatechnology.com/#localbusiness",
    name: "AEA Technology, Inc.",
    alternateName: "AEA Technology",
    url: "https://aeatechnology.com",
    logo: "https://aeatechnology.com/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png",
    image: "https://aeatechnology.com/images/design-mode/5fecf0649903fbea970aeb38_AEA-Logo-4c.png",
    description:
      "Leading manufacturer of Time Domain Reflectometers (TDRs), Vector Network Analyzers (VNAs), and SWR meters. Professional RF and cable testing equipment designed and manufactured in the USA since 1990.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5933 Sea Lion Place, Ste 112",
      addressLocality: "Carlsbad",
      addressRegion: "CA",
      postalCode: "92010",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "33.1581",
      longitude: "-117.3506",
    },
    telephone: "+1-760-931-8979",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "16:30",
        timeZone: "America/Los_Angeles",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    sameAs: [
      "https://www.facebook.com/AEA-Technology-470945793068820",
      "https://www.linkedin.com/company/aea-technology-inc.",
      "https://twitter.com/aeatech",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

