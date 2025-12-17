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
        @media (max-width: 768px) {
          :root {
            --header-height: 3.5rem;
            --touch-target: 44px;
          }
          
          /* Prevent iOS zoom on input focus */
          input, select, textarea {
            font-size: 16px !important;
          }
        }
        @media (min-width: 769px) {
          :root {
            --header-height: 5rem;
            --touch-target: 40px;
          }
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
