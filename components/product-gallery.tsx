"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div className="relative group">
        <div className="aspect-square bg-card rounded-lg overflow-hidden border border-border">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative cursor-zoom-in h-full">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`${productName} - View ${selectedImage + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn className="h-5 w-5 text-foreground" />
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <div className="relative aspect-square">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`${productName} - Zoomed View ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
