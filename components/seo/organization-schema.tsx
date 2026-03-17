export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AEA Technology, Inc.",
    alternateName: "AEA Technology",
    url: "https://aeatechnology.com",
    logo: "https://aeatechnology.com/images/aea-logo.png",
    sameAs: [
      "https://www.facebook.com/AEA-Technology-470945793068820",
      "https://www.linkedin.com/company/aea-technology-inc.",
      "https://twitter.com/aeatech",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-800-258-7805",
        contactType: "sales",
        areaServed: "US",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-760-931-8979",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "2880 Scott St. Ste 105",
      addressLocality: "Vista",
      addressRegion: "CA",
      postalCode: "92081",
      addressCountry: "US",
    },
    description:
      "AEA Technology is a leading manufacturer of RF and cable test equipment including Time Domain Reflectometers (TDRs), Vector Network Analyzers (VNAs), and SWR meters. Made in USA since 1990.",
    foundingDate: "1990",
    founders: [
      {
        "@type": "Person",
        name: "George Naber",
      },
    ],
    slogan: "Testing Made Simple!",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    naics: "334515",
    isicV4: "2651",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
