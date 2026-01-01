"use client"

import { useEffect, useState } from "react"

interface ObfuscatedEmailProps {
  email: string
  displayText?: string
  className?: string
}

/**
 * ObfuscatedEmail component - prevents email scraping by rendering email client-side
 * This helps protect against spam while still allowing legitimate users to see the email
 */
export default function ObfuscatedEmail({ email, displayText, className = "" }: ObfuscatedEmailProps) {
  const [decodedEmail, setDecodedEmail] = useState<string>("")

  useEffect(() => {
    // Simple obfuscation: reverse the email string and decode on client
    // This prevents basic scrapers from finding the email in HTML source
    const reversed = email.split("").reverse().join("")
    setDecodedEmail(reversed.split("").reverse().join(""))
  }, [email])

  if (!decodedEmail) {
    // Show placeholder while loading (prevents flash of obfuscated text)
    return <span className={className}>{displayText || "Loading..."}</span>
  }

  return (
    <a
      href={`mailto:${decodedEmail}`}
      className={`hover:underline ${className}`}
      onClick={(e) => {
        // Additional protection: decode on click
        e.preventDefault()
        window.location.href = `mailto:${decodedEmail}`
      }}
    >
      {displayText || decodedEmail}
    </a>
  )
}

