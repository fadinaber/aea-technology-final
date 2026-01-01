"use client"

import ObfuscatedEmail from "./obfuscated-email"

/**
 * Server-safe wrapper for ObfuscatedEmail
 * Use this in server components that need to render obfuscated emails
 */
export default function ObfuscatedEmailServer({ email, displayText, className }: { email: string; displayText?: string; className?: string }) {
  return <ObfuscatedEmail email={email} displayText={displayText} className={className} />
}

