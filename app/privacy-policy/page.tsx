import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for AEA Technology.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-24 sm:pt-32 pb-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        This page is provided to support our site transition. Please replace this text with your finalized
        privacy policy.
      </p>
    </main>
  )
}


