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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `https://aeatechnology.com${image}`,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: "AEA Technology, Inc.",
      url: "https://aeatechnology.com",
    },
    category,
    countryOfOrigin: "United States",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "AEA Technology, Inc.",
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
