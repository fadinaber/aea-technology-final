"use client"

import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style jsx global>{`
        /* Fixed header height to prevent CLS */
        :root {
          --header-height: 4rem;
          --touch-target: 44px;
        }
        
        @media (min-width: 1024px) {
          :root {
            --header-height: 5rem;
            --touch-target: 40px;
          }
        }
        
        /* Prevent iOS zoom on input focus */
        @media (max-width: 768px) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }
        
        /* Reserve space for fixed header to prevent CLS */
        .header-spacer {
          height: var(--header-height);
        }
      `}</style>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
