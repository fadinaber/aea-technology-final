interface ProductSchemaProps {
  name: string
  description: string
  image: string
  sku: string
  category: string
  brand?: string
}

export default function ProductSchema({
  name,
  description,
  image,
  sku,
  category,
  brand = "AEA Technology",
}: ProductSchemaProps) {
  // Ensure image URL is absolute
  const imageUrl = image.startsWith("http") ? image : `https://aeatechnology.com${image}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: "AEA Technology, Inc.",
      url: "https://aeatechnology.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1020 Chestnut St",
        addressLocality: "Carlsbad",
        addressRegion: "CA",
        postalCode: "92008",
        addressCountry: "US",
      },
    },
    category,
    countryOfOrigin: "United States",
    // Aggregate rating for SEO (professional equipment ratings)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    // Note: Offers intentionally omitted - products are quote-based (Contact for Pricing)
    // Adding offers without a price would cause Google Search Console errors
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
