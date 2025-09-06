"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"

interface ProductDetailsProps {
  product: any
  selectedVariants: any
  onVariantChange: (variants: any) => void
  onAddToCart: (product: any, quantity: number) => void
}

export function ProductDetails({ product, selectedVariants, onVariantChange, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleVariantChange = (type: string, value: string) => {
    onVariantChange({
      ...selectedVariants,
      [type]: value,
    })
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Best Seller
          </Badge>
          {product.stockCount < 10 && (
            <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
              Only {product.stockCount} left
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">${product.price}</span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
            <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
              {discountPercentage}% OFF
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Variants */}
      <div className="space-y-4">
        {/* Color Selection */}
        <div>
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex gap-2">
            {product.variants.color.map((color: any) => (
              <button
                key={color.value}
                onClick={() => handleVariantChange("color", color.value)}
                disabled={!color.available}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  selectedVariants.color === color.value
                    ? "border-primary bg-primary/10 text-primary"
                    : color.available
                      ? "border-border hover:border-primary/50 text-foreground"
                      : "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex gap-2">
            {product.variants.size.map((size: any) => (
              <button
                key={size.value}
                onClick={() => handleVariantChange("size", size.value)}
                disabled={!size.available}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  selectedVariants.size === size.value
                    ? "border-primary bg-primary/10 text-primary"
                    : size.available
                      ? "border-border hover:border-primary/50 text-foreground"
                      : "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3">Quantity</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-muted transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-border">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => onAddToCart(product, quantity)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={isWishlisted ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
          <Truck className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-sm">Free Shipping</p>
            <p className="text-xs text-muted-foreground">Orders over $50</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-sm">2 Year Warranty</p>
            <p className="text-xs text-muted-foreground">Full coverage</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
          <RotateCcw className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-sm">30-Day Returns</p>
            <p className="text-xs text-muted-foreground">No questions asked</p>
          </div>
        </div>
      </div>
    </div>
  )
}
