export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AEA Technology",
    alternateName: ["AEA Tech", "AEA Technology Inc"],
    url: "https://aeatechnology.com",
    description:
      "Leading manufacturer of Time Domain Reflectometers (TDRs), Vector Network Analyzers (VNAs), and SWR meters. Professional RF and cable testing equipment made in USA.",
    publisher: {
      "@type": "Organization",
      name: "AEA Technology, Inc.",
      url: "https://aeatechnology.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://aeatechnology.com/products?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
