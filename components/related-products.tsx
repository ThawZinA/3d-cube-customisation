"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface RelatedProductsProps {
  currentProductId: number
  onAddToCart: (product: any, quantity: number) => void
}

// Sample related products data
const relatedProducts = [
  {
    id: 2,
    name: "Bluetooth Gaming Headset",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviewCount: 892,
    image: "/gaming-headset-black.jpg",
    category: "Gaming",
    brand: "TechPro",
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Noise Cancelling Earbuds",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 1456,
    image: "/wireless-earbuds-white.jpg",
    category: "Audio",
    brand: "SoundMax",
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Wireless Speaker",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.4,
    reviewCount: 634,
    image: "/bluetooth-speaker-portable.jpg",
    category: "Audio",
    brand: "AudioTech",
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 5,
    name: "Studio Monitor Headphones",
    price: 399.99,
    originalPrice: 499.99,
    rating: 4.9,
    reviewCount: 287,
    image: "/studio-monitor-headphones-professional.jpg",
    category: "Professional",
    brand: "ProAudio",
    inStock: false,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.3,
    reviewCount: 1823,
    image: "/wireless-charging-pad-modern.jpg",
    category: "Accessories",
    brand: "ChargeTech",
    inStock: true,
    isNew: true,
    isBestSeller: true,
  },
]

export function RelatedProducts({ currentProductId, onAddToCart }: RelatedProductsProps) {
  const [sortBy, setSortBy] = useState("relevance")
  const [filterBy, setFilterBy] = useState("all")
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // Filter products
  let filteredProducts = relatedProducts.filter((product) => {
    if (filterBy === "all") return true
    if (filterBy === "in-stock") return product.inStock
    if (filterBy === "on-sale") return product.originalPrice > product.price
    if (filterBy === "new") return product.isNew
    if (filterBy === "best-seller") return product.isBestSeller
    return product.category.toLowerCase() === filterBy.toLowerCase()
  })

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviewCount - a.reviewCount
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Related Products</h2>

        {/* Filters and Sort */}
        <div className="flex items-center gap-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="on-sale">On Sale</SelectItem>
              <SelectItem value="new">New Arrivals</SelectItem>
              <SelectItem value="best-seller">Best Sellers</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative aspect-square bg-muted overflow-hidden rounded-t-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.isNew && <Badge className="bg-green-500 text-white border-green-500">New</Badge>}
                  {product.isBestSeller && (
                    <Badge className="bg-orange-500 text-white border-orange-500">Best Seller</Badge>
                  )}
                  {product.originalPrice > product.price && (
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </button>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => onAddToCart(product, 1)}
                    disabled={!product.inStock}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {product.brand}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <h3 className="font-semibold text-sm line-clamp-2 text-balance">{product.name}</h3>

                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-foreground">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your filters.</p>
          <Button variant="outline" onClick={() => setFilterBy("all")} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
