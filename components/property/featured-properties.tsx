"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Bath, Bed, ChevronRight, Heart, MapPin, Square } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// Sample featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Luxury Villa with Swimming Pool",
    description: "This stunning villa features a spacious living area, modern kitchen, and a private swimming pool.",
    location: "Maitama, Abuja",
    price: 350000000,
    currency: "₦",
    type: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    image: "/placeholder.svg?height=600&width=800",
    color: "bg-gradient-card-blue",
    size: "large",
  },
  {
    id: "2",
    title: "Modern Apartment with Garden View",
    description: "Beautiful apartment with modern amenities and a stunning garden view.",
    location: "Asokoro, Abuja",
    price: 180000000,
    currency: "₦",
    type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "/placeholder.svg?height=600&width=800",
    color: "bg-gradient-card-green",
    size: "medium",
  },
  {
    id: "3",
    title: "Penthouse with City View",
    description: "Luxurious penthouse offering panoramic views of the city skyline.",
    location: "Central Business District, Abuja",
    price: 280000000,
    currency: "₦",
    type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    image: "/placeholder.svg?height=600&width=800",
    color: "bg-gradient-card-purple",
    size: "medium",
  },
  {
    id: "4",
    title: "Serviced Apartment",
    description: "Fully serviced apartment with 24/7 security and amenities.",
    location: "Wuse, Abuja",
    price: 2500000,
    currency: "₦",
    type: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    image: "/placeholder.svg?height=600&width=800",
    color: "bg-gradient-card-orange",
    size: "small",
  },
  {
    id: "5",
    title: "Family Home with Garden",
    description: "Spacious family home with a beautiful garden and play area.",
    location: "Gwarinpa, Abuja",
    price: 150000000,
    currency: "₦",
    type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    image: "/placeholder.svg?height=600&width=800",
    color: "bg-gradient-card-pink",
    size: "small",
  },
  {
    id: "6",
    title: "Office Space",
    description: "Prime office space in a commercial hub with modern facilities.",
    location: "Garki, Abuja",
    price: 4500000,
    currency: "₦",
    type: "rent",
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    image: "/placeholder.svg?height=600&width=800",
    color: "bg-gradient-card-teal",
    size: "small",
  },
]

export function FeaturedProperties() {
  const [properties, setProperties] = useState(featuredProperties)
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
          <p className="text-muted-foreground mt-1">Handpicked premium properties for you</p>
        </div>
        <Button asChild variant="outline" className="gap-1">
          <Link href="/properties/featured">
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Featured Property */}
        {properties
          .filter((p) => p.size === "large")
          .map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="md:col-span-3 group">
              <div
                className={cn(
                  "relative h-[400px] rounded-2xl overflow-hidden card-shadow card-shadow-hover",
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  "transition-all duration-700 ease-out",
                )}
              >
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
                    onClick={(e) => toggleFavorite(property.id, e)}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        favorites.includes(property.id) ? "fill-red-500 text-red-500" : "",
                      )}
                    />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{property.title}</h3>
                  <p className="text-white/80 mb-4 line-clamp-2">{property.description}</p>

                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-white">
                      {property.currency}
                      {formatCurrency(property.price)}
                      {property.type === "rent" && <span className="text-sm font-normal">/month</span>}
                    </p>
                    <div className="flex gap-4 text-white">
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
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {/* Medium Featured Properties */}
        {properties
          .filter((p) => p.size === "medium")
          .map((property, index) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="md:col-span-1 lg:col-span-1 group">
              <div
                className={cn(
                  "relative h-[300px] rounded-xl overflow-hidden card-shadow card-shadow-hover",
                  property.color,
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  "transition-all duration-700 ease-out",
                  `transition-delay-${(index + 1) * 100}`,
                )}
              >
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
                    onClick={(e) => toggleFavorite(property.id, e)}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors",
                        favorites.includes(property.id) ? "fill-red-500 text-red-500" : "",
                      )}
                    />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center gap-1 text-white/80 mb-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{property.title}</h3>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-white">
                      {property.currency}
                      {formatCurrency(property.price)}
                      {property.type === "rent" && <span className="text-xs font-normal">/month</span>}
                    </p>
                    <div className="flex gap-2 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3 w-3" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3 w-3" />
                        <span>{property.bathrooms}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {/* Small Featured Properties */}
        {properties
          .filter((p) => p.size === "small")
          .map((property, index) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="group">
              <div
                className={cn(
                  "flex h-32 rounded-lg overflow-hidden card-shadow card-shadow-hover",
                  property.color,
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  "transition-all duration-700 ease-out",
                  `transition-delay-${(index + 3) * 100}`,
                )}
              >
                <div className="relative w-1/3 overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 p-3 relative">
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full bg-black/10 text-muted-foreground hover:bg-black/20"
                      onClick={(e) => toggleFavorite(property.id, e)}
                    >
                      <Heart
                        className={cn(
                          "h-3 w-3 transition-colors",
                          favorites.includes(property.id) ? "fill-red-500 text-red-500" : "",
                        )}
                      />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground mb-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{property.title}</h3>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-bold">
                      {property.currency}
                      {formatCurrency(property.price)}
                      {property.type === "rent" && <span className="text-xs font-normal">/mo</span>}
                    </p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>{property.bedrooms} bd</span>
                      <span>{property.bathrooms} ba</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
