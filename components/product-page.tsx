"use client"

import { useState } from "react"
import { ProductGallery } from "./product-gallery"
import { ProductDetails } from "./product-details"
import { ProductReviews } from "./product-reviews"
import { ShoppingCart } from "./shopping-cart"
import { SearchHeader } from "./search-header"
import { RelatedProducts } from "./related-products"

// Sample product data
const productData = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 299.99,
  originalPrice: 399.99,
  rating: 4.8,
  reviewCount: 1247,
  description:
    "Experience exceptional sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium leather ear cups",
    "Bluetooth 5.0 connectivity",
    "Quick charge: 15 min = 3 hours playback",
  ],
  images: [
    "/premium-black-wireless-headphones-main-view.jpg",
    "/premium-black-wireless-headphones-side-view.jpg",
    "/premium-black-wireless-headphones-folded-view.jpg",
    "/premium-black-wireless-headphones-case-view.jpg",
  ],
  variants: {
    color: [
      { name: "Midnight Black", value: "black", available: true },
      { name: "Silver", value: "silver", available: true },
      { name: "Rose Gold", value: "rose-gold", available: false },
    ],
    size: [
      { name: "Standard", value: "standard", available: true },
      { name: "Large", value: "large", available: true },
    ],
  },
  inStock: true,
  stockCount: 23,
}

export function ProductPage() {
  const [selectedVariants, setSelectedVariants] = useState({
    color: "black",
    size: "standard",
  })
  const [cartItems, setCartItems] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const addToCart = (product: any, quantity = 1) => {
    const cartItem = {
      ...product,
      variants: selectedVariants,
      quantity,
      id: `${product.id}-${selectedVariants.color}-${selectedVariants.size}`,
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === cartItem.id)
      if (existingItem) {
        return prev.map((item) => (item.id === cartItem.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, cartItem]
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">TechStore</h1>
            <div className="flex items-center gap-4">
              <SearchHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              <ShoppingCart items={cartItems} onUpdateCart={setCartItems} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <ProductGallery images={productData.images} productName={productData.name} />

          {/* Product Details */}
          <ProductDetails
            product={productData}
            selectedVariants={selectedVariants}
            onVariantChange={setSelectedVariants}
            onAddToCart={addToCart}
          />
        </div>

        {/* Product Reviews */}
        <div className="mt-16">
          <ProductReviews
            productId={productData.id}
            rating={productData.rating}
            reviewCount={productData.reviewCount}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={productData.id} onAddToCart={addToCart} />
        </div>
      </main>
    </div>
  )
}
