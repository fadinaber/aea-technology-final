import { Resend } from "resend"
import { NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

// Simple in-memory rate limit (dev / single-instance)
// For production multi-instance, use a shared store (Upstash/Redis/Vercel KV).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 min
const RATE_LIMIT_MAX = 5 // 5 requests per window per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Email addresses based on form type
const EMAIL_ADDRESSES = {
  quote: "SALES@AEATECHNOLOGY.COM",
  contact: "SALES@AEATECHNOLOGY.COM", // General contact goes to sales
  support: "TECHSUPPORT@AEATECHNOLOGY.COM",
} as const

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

    // Build professional HTML email body with proper structure for better deliverability
    const formTypeTitle = formType === "quote" ? "Quote Request" : formType === "support" ? "Technical Support Request" : "Contact Inquiry"
    
    let productsHtml = ""
    if (formType === "quote" && selectedProducts && selectedProducts.length > 0) {
      productsHtml = `
        <tr>
          <td style="padding: 20px 30px; background-color: #f8fafc;">
            <h3 style="color: #1e293b; font-size: 16px; margin: 0 0 12px 0;">Products of Interest</h3>
            <ul style="margin: 0; padding-left: 20px; color: #475569;">
              ${selectedProducts.map((product) => `<li style="margin-bottom: 4px;">${product}</li>`).join("")}
            </ul>
          </td>
        </tr>
      `
    }
    
    let supportProductHtml = ""
    if (formType === "support" && supportProduct) {
      supportProductHtml = `
        <tr>
          <td style="padding: 20px 30px; background-color: #f8fafc;">
            <h3 style="color: #1e293b; font-size: 16px; margin: 0 0 8px 0;">Product</h3>
            <p style="margin: 0; color: #475569;">${supportProduct}</p>
          </td>
        </tr>
      `
    }

    const emailBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTypeTitle}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background-color: #1e40af; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0;">AEA Technology</h1>
              <p style="color: #93c5fd; font-size: 14px; margin: 8px 0 0 0;">${formTypeTitle}</p>
            </td>
          </tr>
          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 20px 0;">Contact Information</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Company:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Country:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${country}</td>
                </tr>
              </table>
            </td>
          </tr>
          ${productsHtml}
          ${supportProductHtml}
          <!-- Message -->
          <tr>
            <td style="padding: 20px 30px; border-top: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; font-size: 16px; margin: 0 0 12px 0;">Message</h3>
              <p style="margin: 0; color: #475569; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f8fafc; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">This email was sent from the AEA Technology website contact form.</p>
              <p style="margin: 8px 0 0 0; color: #64748b; font-size: 12px;">AEA Technology | 5933 Sea Lion Place, Ste 112, Carlsbad, CA 92010</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()

    // Build plain text version for better deliverability
    const textBody = `
AEA TECHNOLOGY - ${formTypeTitle.toUpperCase()}
${"=".repeat(50)}

CONTACT INFORMATION
-------------------
Name: ${firstName} ${lastName}
Company: ${company}
Email: ${email}
Phone: ${phone}
Country: ${country}
${formType === "quote" && selectedProducts && selectedProducts.length > 0 ? `\nPRODUCTS OF INTEREST\n--------------------\n${selectedProducts.map((p) => `- ${p}`).join("\n")}` : ""}
${formType === "support" && supportProduct ? `\nPRODUCT\n-------\n${supportProduct}` : ""}

MESSAGE
-------
${message}

---
This email was sent from the AEA Technology website contact form.
AEA Technology | 5933 Sea Lion Place, Ste 112, Carlsbad, CA 92010
    `.trim()

    // Get the appropriate email address based on form type
    const mainEmail = EMAIL_ADDRESSES[formType] || EMAIL_ADDRESSES.contact

    // Generate unique ID for this email to improve deliverability
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Send email to both - both are primary recipients so you'll always get it
    // Includes spam prevention headers and tags for better deliverability
    let { data, error } = await resend.emails.send({
      from: "AEA Technology <contact@aeatechnology.com>",
      to: [mainEmail, BACKUP_EMAIL],
      replyTo: mainEmail,
      subject: subjects[formType],
      html: emailBody,
      text: textBody,
      headers: {
        "X-Entity-Ref-ID": uniqueId,
        "X-Mailer": "AEA Technology Contact Form",
      },
      tags: [
        { name: "category", value: "contact-form" },
        { name: "form_type", value: formType },
      ],
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
