"use client"
import { cn } from "@/lib/utils"
import { Building, ChevronDown, Home, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState("buy")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1200&width=1920')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Floating Property Cards */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[10%] w-64 h-48 rounded-lg overflow-hidden shadow-2xl animate-float-slow"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <Image src="/placeholder.svg?height=300&width=400" alt="Luxury Property" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <p className="text-sm font-medium">Luxury Villa</p>
            <p className="text-xs opacity-80">Maitama, Abuja</p>
          </div>
        </div>

        <div
          className="absolute top-[30%] right-[15%] w-72 h-56 rounded-lg overflow-hidden shadow-2xl animate-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image src="/placeholder.svg?height=300&width=400" alt="Modern Apartment" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <p className="text-sm font-medium">Modern Apartment</p>
            <p className="text-xs opacity-80">Asokoro, Abuja</p>
          </div>
        </div>

        <div
          className="absolute top-[50%] left-[20%] w-56 h-40 rounded-lg overflow-hidden shadow-2xl animate-float-fast"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        >
          <Image src="/placeholder.svg?height=300&width=400" alt="Family Home" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <p className="text-sm font-medium">Family Home</p>
            <p className="text-xs opacity-80">Gwarinpa, Abuja</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white text-shadow-lg max-w-4xl">
          Find Your Perfect Home in FCT Abuja
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
          Discover thousands of properties for sale and rent with our advanced AI-powered search
        </p>

        {/* Property Type Tabs */}
        <div className="mt-10 bg-white/10 backdrop-blur-sm p-1 rounded-full flex">
          <button
            className={cn(
              "px-6 py-2 rounded-full text-white font-medium transition-colors",
              activeTab === "buy" ? "bg-primary text-primary-foreground" : "hover:bg-white/10",
            )}
            onClick={() => setActiveTab("buy")}
          >
            <Building className="inline-block h-4 w-4 mr-2" />
            Buy
          </button>
          <button
            className={cn(
              "px-6 py-2 rounded-full text-white font-medium transition-colors",
              activeTab === "rent" ? "bg-primary text-primary-foreground" : "hover:bg-white/10",
            )}
            onClick={() => setActiveTab("rent")}
          >
            <Home className="inline-block h-4 w-4 mr-2" />
            Rent
          </button>
        </div>

        {/* Popular Locations */}
        <div className="mt-10">
          <p className="text-white/80 mb-3 flex items-center justify-center">
            <MapPin className="h-4 w-4 mr-1" />
            Popular Locations
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Maitama", "Asokoro", "Wuse", "Gwarinpa", "Jabi"].map((location) => (
              <Link
                key={location}
                href={`/location/${location.toLowerCase()}`}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm transition-colors"
              >
                {location}
              </Link>
            ))}
            <Link
              href="/locations"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm transition-colors flex items-center"
            >
              More
              <ChevronDown className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
