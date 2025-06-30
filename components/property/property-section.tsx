"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PropertyCard } from "./property-card"

// Sample property data - in a real app, this would come from an API
const sampleProperties = {
  sale: [
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

interface PropertySectionProps {
  title: string
  description?: string
  propertyType: keyof typeof sampleProperties
  viewAllLink?: string
}

export function PropertySection({ title, description, propertyType, viewAllLink }: PropertySectionProps) {
  const [properties, setProperties] = useState(sampleProperties[propertyType] || [])
  const [isLoading, setIsLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
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

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div>
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

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {properties.slice(0, visibleCount).map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>

      {visibleCount < properties.length && (
        <div className="mt-6 text-center">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  )
}
