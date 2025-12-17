"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const importTypes = [
  { id: "siteSettings", label: "Site Settings", description: "Global site configuration" },
  { id: "products", label: "Products", description: "All product data (import before homepage)" },
  { id: "homepage", label: "Homepage", description: "Homepage content and sections" },
  { id: "press", label: "Press Releases", description: "News and announcements" },
  { id: "teamMembers", label: "Team Members", description: "About page team profiles" },
  { id: "resources", label: "Resources & FAQs", description: "Software, manuals, videos, FAQs" },
  { id: "distributors", label: "Distributors", description: "US and international distributors" },
]

const imageTypes = [
  { id: "all", label: "All Product Images", description: "Upload all product images to Sanity CDN" },
  { id: "featured", label: "Featured Images", description: "Homepage featured product images" },
]

export default function SanityImportPage() {
  const [importing, setImporting] = useState<string | null>(null)
  const [uploadingImages, setUploadingImages] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, any>>({})
  const [imageResults, setImageResults] = useState<Record<string, any>>({})

  const handleImport = async (type: string, dryRun = false) => {
    setImporting(type)
    try {
      const response = await fetch("/api/sanity/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, dryRun }),
      })

      const data = await response.json()
      setResults((prev) => ({ ...prev, [type]: data }))
    } catch (error: any) {
      setResults((prev) => ({
        ...prev,
        [type]: { error: error.message },
      }))
    } finally {
      setImporting(null)
    }
  }

  const handleImageUpload = async (type: string) => {
    setUploadingImages(type)
    try {
      const response = await fetch("/api/sanity/upload-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })

      const data = await response.json()
      setImageResults((prev) => ({ ...prev, [type]: data }))
    } catch (error: any) {
      setImageResults((prev) => ({
        ...prev,
        [type]: { error: error.message },
      }))
    } finally {
      setUploadingImages(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sanity CMS Data Import</h1>
        <p className="text-muted-foreground">
          Import your existing TypeScript data files into Sanity CMS
        </p>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="font-semibold mb-2">⚠️ Important Notes:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-900">
          <li>Use "Test Import" first to preview what will be imported</li>
          <li>After importing data, use "Upload Images" to upload product images</li>
          <li>Datasheets and other PDFs need to be uploaded manually in Sanity Studio</li>
        </ul>
      </div>

      {/* Data Import Section */}
      <h2 className="text-xl font-semibold mb-4">📦 Data Import</h2>
      <div className="space-y-4 mb-8">
        {importTypes.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleImport(item.id, true)}
                  disabled={importing === item.id}
                >
                  {importing === item.id ? "Testing..." : "Test Import"}
                </Button>
                <Button
                  onClick={() => handleImport(item.id, false)}
                  disabled={importing === item.id}
                >
                  {importing === item.id ? "Importing..." : "Import Now"}
                </Button>
              </div>

              {results[item.id] && (
                <div className="mt-4 p-3 bg-muted rounded text-sm">
                  <pre className="whitespace-pre-wrap text-xs max-h-60 overflow-auto">
                    {JSON.stringify(results[item.id], null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Upload Section */}
      <h2 className="text-xl font-semibold mb-4">🖼️ Image Upload</h2>
      <div className="space-y-4 mb-8">
        {imageTypes.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleImageUpload(item.id)}
                  disabled={uploadingImages === item.id}
                  variant="secondary"
                >
                  {uploadingImages === item.id ? "Uploading..." : "Upload Images"}
                </Button>
              </div>

              {imageResults[item.id] && (
                <div className="mt-4 p-3 bg-muted rounded text-sm">
                  <pre className="whitespace-pre-wrap text-xs max-h-60 overflow-auto">
                    {JSON.stringify(imageResults[item.id], null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-semibold mb-2">📝 Recommended Order:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Site Settings (singleton)</li>
          <li>Products (needed before homepage)</li>
          <li>Homepage (singleton)</li>
          <li>Upload Images (after importing products)</li>
          <li>Distributors</li>
          <li>Press Releases</li>
          <li>Team Members</li>
          <li>Resources & FAQs</li>
        </ol>
      </div>

      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="font-semibold mb-2">✅ After Import:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-green-900">
          <li>Open Sanity Studio at <a href="http://localhost:3333/studio" className="underline">http://localhost:3333/studio</a></li>
          <li>Navigate to Products → select a product → Media tab → add uploaded images</li>
          <li>Upload datasheets via the "Datasheet File" field in each product</li>
        </ul>
      </div>
    </div>
  )
}
