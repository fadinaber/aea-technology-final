import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

// Map Sanity document types to the Next.js paths that display them
const pathsForType: Record<string, string[]> = {
  product: ["/", "/products", "/products/[slug]"],
  pressRelease: ["/press"],
  resource: ["/resources"],
  faq: ["/resources"],
  distributor: ["/"],
  teamMember: ["/about"],
  siteSettings: ["/"],
  homepage: ["/"],
  aboutPage: ["/about"],
  page: ["/"],
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret")

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const docType: string = body?._type ?? ""
    const paths = pathsForType[docType] ?? ["/"]

    for (const path of paths) {
      revalidatePath(path, "page")
    }
    // Always revalidate the layout so shared elements (header, footer) update too
    revalidatePath("/", "layout")

    return NextResponse.json({ revalidated: true, paths, docType })
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
