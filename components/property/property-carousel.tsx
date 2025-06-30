"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { PropertyCard } from "./property-card"

// Sample property data - in a real app, this would come from an API
const sampleProperties = {
  recommendation: [
    {
      id: "1",
      title: "Modern Apartment with Garden View",
      location: "Maitama, Abuja",
      price: 120000000,
      currency: "₦",
      type: "sale",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-blue-100",
    },
    {
      id: "2",
      title: "Luxury Villa with Swimming Pool",
      location: "Asokoro, Abuja",
      price: 250000000,
      currency: "₦",
      type: "sale",
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-green-100",
    },
    {
      id: "3",
      title: "Cozy Studio Apartment",
      location: "Wuse, Abuja",
      price: 1500000,
      currency: "₦",
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-yellow-100",
    },
    {
      id: "4",
      title: "Family Home with Large Garden",
      location: "Gwarinpa, Abuja",
      price: 180000000,
      currency: "₦",
      type: "sale",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-purple-100",
    },
    {
      id: "5",
      title: "Spacious Office Space",
      location: "Central Business District, Abuja",
      price: 5000000,
      currency: "₦",
      type: "rent",
      bedrooms: 0,
      bathrooms: 2,
      area: 300,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-pink-100",
    },
    {
      id: "6",
      title: "Penthouse with City View",
      location: "Jabi, Abuja",
      price: 220000000,
      currency: "₦",
      type: "sale",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-indigo-100",
    },
    {
      id: "7",
      title: "Charming Bungalow",
      location: "Karu, Abuja",
      price: 85000000,
      currency: "₦",
      type: "sale",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-red-100",
    },
    {
      id: "8",
      title: "Modern Office Building",
      location: "Utako, Abuja",
      price: 8000000,
      currency: "₦",
      type: "rent",
      bedrooms: 0,
      bathrooms: 4,
      area: 450,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-orange-100",
    },
  ],
  sale: [
    {
      id: "9",
      title: "Luxury Mansion with Pool",
      location: "Maitama, Abuja",
      price: 350000000,
      currency: "₦",
      type: "sale",
      bedrooms: 6,
      bathrooms: 5,
      area: 500,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-teal-100",
    },
    {
      id: "10",
      title: "Modern Duplex",
      location: "Gwarinpa, Abuja",
      price: 150000000,
      currency: "₦",
      type: "sale",
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-cyan-100",
    },
  ],
  rent: [
    {
      id: "11",
      title: "Furnished Apartment",
      location: "Wuse, Abuja",
      price: 2500000,
      currency: "₦",
      type: "rent",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-lime-100",
    },
    {
      id: "12",
      title: "Serviced Apartment",
      location: "Garki, Abuja",
      price: 3000000,
      currency: "₦",
      type: "rent",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      image: "/placeholder.svg?height=400&width=600",
      color: "bg-emerald-100",
    },
  ],
}

interface PropertyCarouselProps {
  title: string
  description?: string
  propertyType: keyof typeof sampleProperties
  viewAllLink?: string
}

export function PropertyCarousel({ title, description, propertyType, viewAllLink }: PropertyCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [properties, setProperties] = useState(sampleProperties[propertyType] || [])
  const [isLoading, setIsLoading] = useState(false)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -600, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 600, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      const handleScroll = () => checkScrollButtons()
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    checkScrollButtons()
    // In a real app, fetch properties from API
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProperties(sampleProperties[propertyType] || [])
      } catch (error) {
        console.error("Failed to fetch properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [propertyType])

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {viewAllLink && (
          <Button variant="link" asChild>
            <Link href={viewAllLink}>View all</Link>
          </Button>
        )}
      </div>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md",
            !canScrollLeft && "hidden",
          )}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-hide"
          onScroll={checkScrollButtons}
        >
          {properties.map((property, index) => (
            <div key={property.id} className="flex-shrink-0 w-[280px]">
              <PropertyCard property={property} index={index} isCarousel={true} />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md",
            !canScrollRight && "hidden",
          )}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
