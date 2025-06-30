"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const carouselItems = [
  {
    id: 1,
    title: "Find Your Dream Home",
    description: "Explore thousands of properties across FCT",
    image: "/placeholder.svg?height=600&width=1600",
    link: "/properties/buy",
    buttonText: "Explore Now",
    color: "from-blue-500/80 to-blue-700/80",
  },
  {
    id: 2,
    title: "Premium Rentals Available",
    description: "Luxury apartments and houses for rent",
    image: "/placeholder.svg?height=600&width=1600",
    link: "/properties/rent",
    buttonText: "View Rentals",
    color: "from-green-500/80 to-green-700/80",
  },
  {
    id: 3,
    title: "New Developments",
    description: "Be the first to own in these exclusive new developments",
    image: "/placeholder.svg?height=600&width=1600",
    link: "/properties/new-developments",
    buttonText: "Discover More",
    color: "from-purple-500/80 to-purple-700/80",
  },
  {
    id: 4,
    title: "Commercial Properties",
    description: "Find the perfect space for your business",
    image: "/placeholder.svg?height=600&width=1600",
    link: "/properties/commercial",
    buttonText: "Browse Commercial",
    color: "from-orange-500/80 to-orange-700/80",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide()
    }, 6000)

    return () => clearTimeout(timer)
  }, [currentIndex])

  // Reset animation state after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <div className="relative h-full w-full">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color}`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">{item.title}</h1>
              <p className="text-lg md:text-xl mb-6 max-w-2xl">{item.description}</p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href={item.link}>{item.buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-4" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
