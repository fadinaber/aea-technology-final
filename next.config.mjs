/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  compress: true,
  // Enable powered by header removal for security and smaller response
  poweredByHeader: false,
  async headers() {
    return [
      // Static assets - immutable for 1 year
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // PDF documents - long cache
      {
        source: '/documents/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      // HTML pages - short cache with stale-while-revalidate for better TTFB
      {
        source: '/((?!api|_next|documents).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Canonical host redirect (www -> apex)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aeatechnology.com" }],
        destination: "https://aeatechnology.com/:path*",
        permanent: true,
      },

      // Legacy index variants
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.htm", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },

      // Legacy PHP module routes (old site)
      {
        source: "/index.php",
        has: [{ type: "query", key: "module", value: "representatives" }],
        destination: "/contact/distributors",
        permanent: true,
      },
      {
        source: "/index.php",
        has: [{ type: "query", key: "module", value: "distributors" }],
        destination: "/contact/distributors",
        permanent: true,
      },

      // Legacy HTML pages
      { source: "/html/product.htm", destination: "/products", permanent: true },
      { source: "/html/software.htm", destination: "/resources", permanent: true },
      { source: "/html/via_analyzer.htm", destination: "/products", permanent: true },
      { source: "/VIA_Echos.html", destination: "/products/via-bravo-ex2", permanent: true },
      { source: "/Wireless_Reps.html", destination: "/contact/distributors", permanent: true },
      { source: "/Egypt.html", destination: "/contact/distributors", permanent: true },
      { source: "/Jordan.html", destination: "/contact/distributors", permanent: true },

      // Legacy "sales / reps" paths
      { source: "/sales/representatives", destination: "/contact/distributors", permanent: true },
      { source: "/sales/representatives/:path*", destination: "/contact/distributors", permanent: true },
      { source: "/sales/distributors/international", destination: "/contact/distributors", permanent: true },

      // Legacy resources paths
      { source: "/software/manuals", destination: "/resources?tab=manuals", permanent: true },
      { source: "/software/manuals/:path*", destination: "/resources?tab=manuals", permanent: true },
      { source: "/software/application-notes", destination: "/resources?tab=application-notes", permanent: true },
      { source: "/software/application-notes/:path*", destination: "/resources?tab=application-notes", permanent: true },
      { source: "/applications/:path*", destination: "/resources", permanent: true },
      { source: "/html/AN_Html/:path*", destination: "/resources?tab=application-notes", permanent: true },
      { source: "/Application_Notes/:path*", destination: "/resources?tab=application-notes", permanent: true },
      { source: "/usermanuals/:path*", destination: "/resources?tab=manuals", permanent: true },
      { source: "/uploads/application_notes/:path*", destination: "/resources?tab=application-notes", permanent: true },
      { source: "/uploads/product/:path*", destination: "/resources?tab=manuals", permanent: true },
      { source: "/140-525-Manual-Operator.pdf", destination: "/resources?tab=manuals", permanent: true },

      // Legacy product paths
      { source: "/tdr-time-domain-reflectometer", destination: "/products", permanent: true },
      { source: "/tdr-time-domain-reflectometer/", destination: "/products", permanent: true },
      { source: "/products/tdr/2020tdr", destination: "/products/e20-20n", permanent: true },
      { source: "/products/tdr/2020tdr/demo", destination: "/products/e20-20n", permanent: true },
      { source: "/products/accessories", destination: "/products", permanent: true },
      { source: "/products/preamps-and-filters", destination: "/products", permanent: true },
      { source: "/products/swr", destination: "/products", permanent: true },
      { source: "/products/swr/:path*", destination: "/products", permanent: true },
      { source: "/products/swr/via", destination: "/products/via-bravo-ex2", permanent: true },
      { source: "/products/mri/bravo", destination: "/products/via-bravo-mri-3000", permanent: true },

      // Legacy PDF deep-links that were product-marketing pages
      { source: "/Time-Domain-Reflectometers/:path*", destination: "/products", permanent: true },
      { source: "/MRI_Coil_Analyzers/:path*", destination: "/products/via-bravo-mri-3000", permanent: true },
      { source: "/VIA_Bravos/:path*", destination: "/products/via-bravo-mri-3000", permanent: true },

      // Product category redirects
      { source: "/step-tdr", destination: "/products", permanent: true },
      { source: "/vna-vector-network-analyzers", destination: "/products", permanent: true },
      { source: "/swr-meters", destination: "/products", permanent: true },
      { source: "/avionics-kits", destination: "/products/e20-20-avionics", permanent: true },
      { source: "/tdr", destination: "/products", permanent: true },
      
      // Specific product redirects
      { source: "/e2020-tdr", destination: "/products/e20-20n", permanent: true },
      { source: "/e2020-avionics-kits", destination: "/products/e20-20-avionics", permanent: true },
      { source: "/edmo-avionics-kit", destination: "/products/e20-20-avionics", permanent: true },
      { source: "/via-echo", destination: "/products/via-bravo-ex2", permanent: true },
      { source: "/mri-bravo", destination: "/products/via-bravo-mri-3000", permanent: true },
      { source: "/new-vna-and-swr-site-analyzer", destination: "/products/swr-site-analyzer", permanent: true },
      
      // About & company redirects
      { source: "/our-philosophy", destination: "/about", permanent: true },
      { source: "/press-releases", destination: "/press", permanent: true },
      
      // Support & resources redirects
      { source: "/support", destination: "/resources", permanent: true },
      { source: "/library", destination: "/resources", permanent: true },
      { source: "/application-notes", destination: "/resources?tab=application-notes", permanent: true },
      { source: "/video-library", destination: "/resources?tab=videos", permanent: true },
      { source: "/manuals", destination: "/resources?tab=manuals", permanent: true },
      { source: "/training", destination: "/resources?tab=videos", permanent: true },
      { source: "/data-sheets", destination: "/resources?tab=manuals", permanent: true },
      { source: "/software", destination: "/resources?tab=software", permanent: true },
      { source: "/case-studies", destination: "/resources", permanent: true },
      
      // Sales & contact redirects
      { source: "/sales", destination: "/contact", permanent: true },
      { source: "/get-a-quote", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/distributor-sales", destination: "/contact/distributors", permanent: true },
      { source: "/us-distributors", destination: "/contact/distributors", permanent: true },
      { source: "/international-distributors", destination: "/contact/distributors", permanent: true },
      { source: "/catv-sales-reps", destination: "/contact/distributors", permanent: true },
      { source: "/telco-sales-representatives", destination: "/contact/distributors", permanent: true },
      { source: "/wireless-sales-representatives", destination: "/contact/distributors", permanent: true },

      // Blog (Webflow) -> consolidate to relevant new sections
      {
        source: "/blog/all-you-need-to-know-about-network-analyzers",
        destination: "/press",
        permanent: true,
      },
      {
        source: "/blog/take-these-features-into-account-when-selecting-a-spectrum-analyzer",
        destination: "/press",
        permanent: true,
      },
      
      // Military & industry redirects
      { source: "/military-products", destination: "/products", permanent: true },
      { source: "/catv-support", destination: "/resources", permanent: true },
    ]
  },
}

export default nextConfig
