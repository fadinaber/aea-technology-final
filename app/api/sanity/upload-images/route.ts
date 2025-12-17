/**
 * Sanity Image Upload API Route
 * 
 * This route uploads local images to Sanity's CDN
 * Access at: POST /api/sanity/upload-images
 */

import { NextRequest, NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import fs from "fs"
import path from "path"

// Image mappings - maps product slugs to their image files
const productImageMappings: Record<string, string[]> = {
  "e20-20-avionics": [
    "/images/products/avionics/full-kit.png",
    "/images/products/avionics/kit-open.png",
    "/images/products/avionics/screen-cursor.png",
    "/images/products/avionics/screen-rg6.png",
    "/images/products/avionics/software-screen.png",
  ],
  "via-bravo-ex2": [
    "/images/products/bravo-ex2/device-with-stand.png",
    "/images/products/bravo-ex2/device-in-case.png",
    "/images/products/bravo-ex2/kit-open.png",
    "/images/products/bravo-ex2/screen-swr.png",
    "/images/products/bravo-ex2/screen-vna.png",
  ],
  "via-bravo-mri-3000": [
    "/images/bravo-mri-in-case.png",
  ],
  "swr-site-analyzer": [
    "/images/swr-with-case.png",
    "/images/featured/swr-analyzer.png",
  ],
  "e20-20n": [
    "/images/featured/e20-20-tdr.png",
  ],
}

const featuredProductImages: Record<string, string> = {
  "e20-20-avionics": "/images/avionics-tdr-kit.png",
  "via-bravo-mri-3000": "/images/featured/bravo-mri.jpg",
  "e20-20n": "/images/featured/e20-20-tdr.png",
  "swr-site-analyzer": "/images/featured/swr-analyzer.png",
}

export async function POST(request: NextRequest) {
  try {
    const { type = "all", productSlug } = await request.json()
    
    const results: any[] = []
    
    if (type === "product" && productSlug) {
      // Upload images for a specific product
      const images = productImageMappings[productSlug]
      if (images) {
        for (const imagePath of images) {
          const result = await uploadImage(imagePath)
          results.push(result)
        }
      }
    } else if (type === "featured") {
      // Upload featured product images
      for (const [slug, imagePath] of Object.entries(featuredProductImages)) {
        const result = await uploadImage(imagePath, `Featured: ${slug}`)
        results.push(result)
      }
    } else if (type === "all") {
      // Upload all product images
      for (const [slug, images] of Object.entries(productImageMappings)) {
        for (const imagePath of images) {
          const result = await uploadImage(imagePath, `Product: ${slug}`)
          results.push(result)
        }
      }
    } else if (type === "allPublic") {
      // Upload ALL images under /public/images (can be a lot)
      const all = listFilesRecursive(path.join(process.cwd(), "public", "images"))
        .filter((p) => /\.(png|jpe?g|webp|gif)$/i.test(p))
        .map((abs) => abs.replace(path.join(process.cwd(), "public"), "").replace(/\\/g, "/"))

      for (const rel of all) {
        const result = await uploadImage(rel, "public/images scan")
        results.push(result)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Processed ${results.length} images`,
      results,
    })
  } catch (error: any) {
    console.error("Image upload error:", error)
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    )
  }
}

async function uploadImage(relativePath: string, label?: string) {
  try {
    const publicDir = path.join(process.cwd(), "public")
    const cleaned = relativePath.startsWith("/") ? relativePath : `/${relativePath}`
    const fullPath = path.join(publicDir, cleaned)
    
    if (!fs.existsSync(fullPath)) {
      return { path: cleaned, error: "File not found", label }
    }
    
    const fileBuffer = fs.readFileSync(fullPath)
    const filename = path.basename(cleaned)
    
    // Upload to Sanity
    const asset = await writeClient.assets.upload("image", fileBuffer, {
      filename,
    })
    
    return {
      path: cleaned,
      assetId: asset._id,
      url: asset.url,
      label,
      success: true,
    }
  } catch (error: any) {
    return {
      path: relativePath,
      error: error.message,
      label,
    }
  }
}

function listFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listFilesRecursive(full))
    else out.push(full)
  }
  return out
}

// GET endpoint to list available images
export async function GET() {
  return NextResponse.json({
    productImages: productImageMappings,
    featuredImages: featuredProductImages,
    instructions: "POST with { type: 'all' | 'featured' | 'product' | 'allPublic', productSlug?: string }",
  })
}

