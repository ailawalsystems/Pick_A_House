"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Phone, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const agents = [
  {
    id: "1",
    name: "John Doe",
    image: "/placeholder.svg?height=100&width=100",
    company: "Premium Realty",
    rating: 4.8,
    propertyCount: 24,
    phone: "+234 123 456 7890",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "/placeholder.svg?height=100&width=100",
    company: "Luxury Homes",
    rating: 4.9,
    propertyCount: 32,
    phone: "+234 123 456 7891",
  },
  {
    id: "3",
    name: "Robert Johnson",
    image: "/placeholder.svg?height=100&width=100",
    company: "City Properties",
    rating: 4.7,
    propertyCount: 18,
    phone: "+234 123 456 7892",
  },
  {
    id: "4",
    name: "Lisa Brown",
    image: "/placeholder.svg?height=100&width=100",
    company: "Urban Real Estate",
    rating: 4.6,
    propertyCount: 15,
    phone: "+234 123 456 7893",
  },
]

export function FeaturedAgents() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Featured Agents</h2>
          <p className="text-muted-foreground">Connect with our top real estate professionals</p>
        </div>
        <Button variant="link" asChild>
          <Link href="/agents">View all agents</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/agents/${agent.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-24 w-24 mb-4">
                    <Image
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      fill
                      className="object-cover rounded-full border-2 border-primary"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{agent.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Building className="h-3 w-3 mr-1" />
                    <span>{agent.company}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{agent.rating}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{agent.propertyCount} listings</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Phone className="h-3 w-3" />
                    <span>Contact</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
