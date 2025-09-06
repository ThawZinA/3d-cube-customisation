"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"

interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

// Sample search results and suggestions
const searchSuggestions = [
  "wireless headphones",
  "bluetooth speakers",
  "gaming headsets",
  "noise cancelling",
  "earbuds",
]

const trendingSearches = ["AirPods Pro", "Sony WH-1000XM5", "Gaming keyboards", "Webcams"]

const searchResults = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/premium-black-wireless-headphones-main-view.jpg",
    category: "Audio",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Bluetooth Gaming Headset",
    price: 199.99,
    image: "/gaming-headset.png",
    category: "Gaming",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Noise Cancelling Earbuds",
    price: 149.99,
    image: "/wireless-earbuds.png",
    category: "Audio",
    rating: 4.7,
  },
]

export function SearchHeader({ searchQuery, onSearchChange }: SearchHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setRecentSearches((prev) => {
        const updated = [query, ...prev.filter((item) => item !== query)].slice(0, 5)
        return updated
      })
      onSearchChange(query)
      setIsSearchOpen(false)
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  const filteredResults = searchResults.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          className="pl-10 pr-10 w-64 bg-background"
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange("")
              setIsSearchOpen(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {searchQuery ? (
              /* Search Results */
              <div>
                {filteredResults.length > 0 ? (
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-3">Search Results</h3>
                    <div className="space-y-2">
                      {filteredResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                          onClick={() => handleSearch(product.name)}
                        >
                          <div className="relative w-12 h-12 bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">${product.price}</span>
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            ) : (
              /* Search Suggestions */
              <div className="p-4 space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Searches
                      </h3>
                      <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="text-xs">
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="block w-full text-left p-2 hover:bg-muted rounded-lg transition-colors text-sm"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </h3>
                  <div className="space-y-1">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="block w-full text-left p-2 hover:bg-muted rounded-lg transition-colors text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Suggestions */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Suggestions</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleSearch(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
