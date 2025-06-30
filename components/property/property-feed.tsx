"use client"

import { useEffect, useState } from "react"
import { PropertyCard } from "./property-card"
import { Skeleton } from "@/components/ui/skeleton"

// Sample property data - in a real app, this would come from an API
const sampleProperties = [
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
  },
]

export function PropertyFeed() {
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      try {
        // In a real app, fetch from API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProperties(sampleProperties)
      } catch (error) {
        console.error("Failed to fetch properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="rounded-xl border p-0.5">
              <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  )
}
