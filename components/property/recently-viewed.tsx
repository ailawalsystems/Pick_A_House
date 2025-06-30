"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PropertyCard } from "./property-card"

// Sample recently viewed properties - in a real app, this would come from local storage or user data
const recentlyViewedProperties = [
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
]

export function RecentlyViewed() {
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch from local storage or user data API
    const fetchRecentlyViewed = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setProperties(recentlyViewedProperties)
      } catch (error) {
        console.error("Failed to fetch recently viewed properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentlyViewed()
  }, [])

  if (properties.length === 0 && !isLoading) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recently Viewed</h2>
          <p className="text-muted-foreground">Properties you've recently viewed</p>
        </div>
        <Button variant="link" asChild>
          <Link href="/dashboard/history">View all</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </div>
  )
}
