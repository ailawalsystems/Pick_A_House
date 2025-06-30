"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Bath, Bed, Heart, MessageCircle, Share, Square } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Badge } from "../ui/badge"

interface PropertyCardProps {
  property: any
  index: number
  isCarousel?: boolean
}

export function PropertyCard({ property, index, isCarousel = false }: PropertyCardProps) {
  const [mounted, setMounted] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Stagger the animation based on the index
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, index * 100)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <TooltipProvider>
      <Link href={`/properties/${property.id}`}>
        <Card
          className={cn(
            "group overflow-hidden transition-all duration-500 hover:shadow-xl border-transparent",
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            property.color || "bg-card",
            isCarousel ? "h-full" : "",
            "card-shadow card-shadow-hover",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] relative w-full overflow-hidden">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                fill
                className={cn("object-cover transition-transform duration-700", isHovered ? "scale-110" : "scale-100")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute right-2 top-2 flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        setFavorite(!favorite)
                      }}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4 transition-colors duration-300",
                          favorite ? "fill-red-500 text-red-500" : "",
                        )}
                      />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{favorite ? "Remove from favorites" : "Add to favorites"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        // Share functionality
                      }}
                    >
                      <Share className="h-4 w-4" />
                      <span className="sr-only">Share property</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share property</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="absolute bottom-2 right-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.preventDefault()
                        // Message functionality
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="sr-only">Message owner</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Message owner</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
              {property.type === "sale" ? "For Sale" : "For Rent"}
            </Badge>
          </div>
          <CardContent className="p-4 pb-2">
            <h3 className="font-bold line-clamp-1 text-lg group-hover:text-primary transition-colors duration-300">
              {property.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{property.location}</p>
            <p className="mt-2 text-xl font-bold text-primary">
              {property.currency}
              {formatCurrency(property.price)}
              {property.type === "rent" && <span className="text-sm font-normal">/month</span>}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.area} m²</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </TooltipProvider>
  )
}
