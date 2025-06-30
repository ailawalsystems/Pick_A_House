"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const locations = [
  {
    id: "1",
    name: "Maitama",
    image: "/placeholder.svg?height=200&width=300",
    propertyCount: 156,
    color: "from-blue-500/70 to-blue-700/70",
  },
  {
    id: "2",
    name: "Asokoro",
    image: "/placeholder.svg?height=200&width=300",
    propertyCount: 124,
    color: "from-green-500/70 to-green-700/70",
  },
  {
    id: "3",
    name: "Wuse",
    image: "/placeholder.svg?height=200&width=300",
    propertyCount: 210,
    color: "from-purple-500/70 to-purple-700/70",
  },
  {
    id: "4",
    name: "Gwarinpa",
    image: "/placeholder.svg?height=200&width=300",
    propertyCount: 185,
    color: "from-orange-500/70 to-orange-700/70",
  },
]

export function BrowseByLocation() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMounted(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Browse by Location</h2>
          <p className="text-muted-foreground mt-1">Explore properties in popular areas</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/locations">View all locations</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {locations.map((location, index) => (
          <Link key={location.id} href={`/location/${location.name.toLowerCase()}`}>
            <Card
              className={`overflow-hidden transition-all duration-500 hover:shadow-xl border-transparent card-shadow card-shadow-hover ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${location.color}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-2xl font-bold mb-2 text-shadow">{location.name}</h3>
                  <div className="flex items-center text-sm bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location.propertyCount} properties</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
