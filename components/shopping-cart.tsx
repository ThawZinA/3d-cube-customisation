"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CarIcon as CartIcon, Minus, Plus, X } from "lucide-react"
import Image from "next/image"

interface ShoppingCartProps {
  items: any[]
  onUpdateCart: (items: any[]) => void
}

export function ShoppingCart({ items, onUpdateCart }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }

    const updatedItems = items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    onUpdateCart(updatedItems)
  }

  const removeItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId)
    onUpdateCart(updatedItems)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative bg-transparent">
          <CartIcon className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <CartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                      <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.variants.color} • {item.variants.size}
                        </p>
                        <p className="font-semibold text-sm mt-1">${item.price}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Checkout</Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
