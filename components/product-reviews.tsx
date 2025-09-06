"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ThumbsUp, ThumbsDown, Search, SlidersHorizontal } from "lucide-react"

interface ProductReviewsProps {
  productId: number
  rating: number
  reviewCount: number
}

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/woman-profile.png",
    rating: 5,
    date: "2024-01-15",
    title: "Exceptional sound quality!",
    content:
      "These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. Perfect for long flights and daily commuting.",
    verified: true,
    helpful: 24,
    notHelpful: 2,
    tags: ["sound quality", "battery life", "noise cancellation"],
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar: "/man-profile.png",
    rating: 4,
    date: "2024-01-10",
    title: "Great value for money",
    content:
      "Really impressed with the build quality and comfort. The only minor issue is that they can get a bit warm during extended use, but overall fantastic headphones.",
    verified: true,
    helpful: 18,
    notHelpful: 1,
    tags: ["build quality", "comfort", "value"],
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "/woman-profile-photo-2.png",
    rating: 5,
    date: "2024-01-08",
    title: "Perfect for work from home",
    content:
      "The noise cancellation makes video calls so much clearer. My colleagues have commented on how much better my audio sounds. Highly recommend for remote work.",
    verified: true,
    helpful: 31,
    notHelpful: 0,
    tags: ["work from home", "video calls", "noise cancellation"],
  },
  {
    id: 4,
    author: "David Kim",
    avatar: "/man-profile.png",
    rating: 3,
    date: "2024-01-05",
    title: "Good but not great",
    content:
      "Sound quality is decent for the price, but I expected better bass response. The comfort is good for short sessions but gets uncomfortable after 2+ hours.",
    verified: false,
    helpful: 8,
    notHelpful: 3,
    tags: ["bass", "comfort", "price"],
  },
  {
    id: 5,
    author: "Lisa Wang",
    avatar: "/woman-profile.png",
    rating: 5,
    date: "2024-01-03",
    title: "Amazing for music production",
    content:
      "As a music producer, I need accurate sound reproduction. These headphones deliver exactly that. The frequency response is flat and detailed. Worth every penny.",
    verified: true,
    helpful: 15,
    notHelpful: 0,
    tags: ["music production", "frequency response", "professional"],
  },
]

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  const ratingDistribution = [
    { stars: 5, count: 847, percentage: 68 },
    { stars: 4, count: 312, percentage: 25 },
    { stars: 3, count: 62, percentage: 5 },
    { stars: 2, count: 19, percentage: 1.5 },
    { stars: 1, count: 7, percentage: 0.5 },
  ]

  // Filter and sort reviews
  let filteredReviews = sampleReviews.filter((review) => {
    // Rating filter
    if (selectedFilter !== "all" && review.rating !== Number.parseInt(selectedFilter)) {
      return false
    }

    // Verified filter
    if (showVerifiedOnly && !review.verified) {
      return false
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        review.title.toLowerCase().includes(query) ||
        review.content.toLowerCase().includes(query) ||
        review.author.toLowerCase().includes(query) ||
        review.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Sort reviews
  filteredReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                className={showVerifiedOnly ? "bg-primary text-primary-foreground" : ""}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Verified Only
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{rating}</div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {reviewCount.toLocaleString()} reviews</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{item.stars}★</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2 flex-wrap">
                {["all", "5", "4", "3", "2", "1"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={selectedFilter === filter ? "bg-primary text-primary-foreground" : ""}
                  >
                    {filter === "all" ? "All Reviews" : `${filter} Stars`}
                  </Button>
                ))}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Rating</SelectItem>
                  <SelectItem value="lowest">Lowest Rating</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review) => (
                <Card key={review.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                        <AvatarFallback>
                          {review.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.author}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="font-semibold">{review.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{review.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {review.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            Not helpful ({review.notHelpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No reviews found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFilter("all")
                    setSearchQuery("")
                    setShowVerifiedOnly(false)
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Show More Button */}
          {!showAllReviews && filteredReviews.length > 3 && (
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowAllReviews(true)}>
                Show All Reviews ({filteredReviews.length})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
