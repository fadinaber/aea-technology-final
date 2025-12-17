"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  productName: string
  badges?: Array<{ label: string; color: string }>
}

export function ProductGallery({ images, productName, badges }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
      {/* Badges */}
      {badges && badges.length > 0 && (
        <div className="flex items-center justify-center gap-2 mb-3 sm:gap-3 sm:mb-4 pt-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${badge.color} text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                {badge.label.includes("USA") ? (
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                ) : (
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                )}
              </svg>
              <span className="font-semibold text-xs sm:text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Product Image */}
      <div className="relative bg-card border border-border rounded-lg p-4 sm:p-6 lg:p-8 h-64 sm:h-80 lg:h-96">
        <Image
          src={images[selectedImage] || images[0] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-contain p-4"
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>

      {/* Mini Gallery */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, imageIndex) => (
          <button
            key={imageIndex}
            onClick={() => setSelectedImage(imageIndex)}
            className={`w-12 h-12 sm:w-16 sm:h-16 border-2 rounded-lg overflow-hidden transition-all flex-shrink-0 cursor-pointer ${
              selectedImage === imageIndex
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`View ${imageIndex + 1}`}
              width={64}
              height={64}
              className="w-full h-full object-contain p-1"
              loading="lazy"
              quality={75}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
