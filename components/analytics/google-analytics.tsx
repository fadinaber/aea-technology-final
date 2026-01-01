"use client"

import Script from "next/script"

/**
 * Google Analytics component
 * 
 * To use:
 * 1. Get your Google Analytics Measurement ID (format: G-XXXXXXXXXX)
 * 2. Add it to your .env.local file: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 * 3. This component will automatically load Google Analytics
 * 
 * For production, add the env var to Vercel:
 * - Go to your Vercel project settings
 * - Add NEXT_PUBLIC_GA_ID as an environment variable
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) {
    // Don't render anything if GA ID is not set
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

