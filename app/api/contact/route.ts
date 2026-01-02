import { Resend } from "resend"
import { NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

// Simple in-memory rate limit (dev / single-instance)
// For production multi-instance, use a shared store (Upstash/Redis/Vercel KV).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 min
const RATE_LIMIT_MAX = 5 // 5 requests per window per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Single main email address for all contact form submissions
const MAIN_EMAIL = "TECHSUPPORT@AEATECHNOLOGY.COM"

// Backup email - will always receive copies
const BACKUP_EMAIL = "fadiwnaber@gmail.com"

type FormType = "quote" | "contact" | "support"

interface ContactFormData {
  formType: FormType
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  country: string
  message: string
  selectedProducts?: string[]
  supportProduct?: string
}

export async function POST(request: Request) {
  try {
    // Accept either server-only key (preferred) or a mistakenly-added NEXT_PUBLIC key (dev fallback).
    // NOTE: Do NOT rely on NEXT_PUBLIC_* in production for secrets.
    const resendApiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json(
        {
          error:
            "Error: Email service not configured. Please contact support.",
        },
        { status: 500 }
      )
    }

    // (intentionally no telemetry / external logging here)

    // Rate limit by IP
    const ip = getClientIp(request) || "unknown"
    const now = Date.now()
    const entry = rateLimitMap.get(ip)
    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    } else {
      entry.count += 1
      if (entry.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many requests. Please wait and try again." },
          { status: 429 }
        )
      }
      rateLimitMap.set(ip, entry)
    }

    const resend = new Resend(resendApiKey)

    const body: ContactFormData = await request.json()

    const { formType, firstName, lastName, company, email, phone, country, message, selectedProducts, supportProduct } =
      body

    // Validate required fields
    if (!firstName || !lastName || !company || !email || !phone || !country || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Basic email sanity check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Build email subject based on form type
    const subjects = {
      quote: `[QUOTE REQUEST] New Quote Request from ${firstName} ${lastName} - ${company}`,
      contact: `[CONTACT] New Contact Inquiry from ${firstName} ${lastName} - ${company}`,
      support: `[SUPPORT] Technical Support Request from ${firstName} ${lastName} - ${company}`,
    }

    // Build email body
    let emailBody = `
      <h2>${formType === "quote" ? "Quote Request" : formType === "support" ? "Technical Support Request" : "Contact Inquiry"}</h2>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Country:</strong> ${country}</p>
    `

    if (formType === "quote" && selectedProducts && selectedProducts.length > 0) {
      emailBody += `
        <h3>Products of Interest</h3>
        <ul>
          ${selectedProducts.map((product) => `<li>${product}</li>`).join("")}
        </ul>
      `
    }

    if (formType === "support" && supportProduct) {
      emailBody += `
        <h3>Product</h3>
        <p>${supportProduct}</p>
      `
    }

    emailBody += `
      <h3>Message</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `

    // Send email to both - both are primary recipients so you'll always get it
    let { data, error } = await resend.emails.send({
      from: "AEA Technology Contact Form <contact@aeatechnology.com>",
      to: [MAIN_EMAIL, BACKUP_EMAIL],
      replyTo: email,
      subject: subjects[formType],
      html: emailBody,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { 
          error: "Failed to send email",
          details: (error as any)?.message 
        }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getEmailDomain(email: string): string | null {
  const at = email.indexOf("@")
  if (at <= 0) return null
  return email.slice(at + 1).trim().toLowerCase() || null
}

function fileHasEnvKey(filename: string, key: string): boolean | null {
  try {
    const p = path.join(process.cwd(), filename)
    if (!fs.existsSync(p)) return false
    const content = fs.readFileSync(p, "utf8")
    const re = new RegExp(`^\\s*${key.replace(/[-/\\^$*+?.()|[\\]{}]/g, "\\$&")}\\s*=`, "m")
    return re.test(content)
  } catch {
    return null
  }
}

function getClientIp(request: Request): string | null {
  // Common proxy headers (Vercel/Cloudflare/NGINX)
  const xff = request.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0]?.trim() || null
  const xrip = request.headers.get("x-real-ip")
  if (xrip) return xrip.trim()
  const cfip = request.headers.get("cf-connecting-ip")
  if (cfip) return cfip.trim()
  return null
}
