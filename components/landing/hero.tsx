import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import Link from "next/link"

export function LandingHero() {
  return (
    <div className="relative">
      <Header />
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1600')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative flex min-h-[500px] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Perfect Home
          </h1>
          <p className="mt-4 max-w-[600px] text-lg text-white md:text-xl">
            Browse thousands of properties for sale and rent in FCT with our advanced AI-powered search
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/properties/buy">Buy</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/properties/rent">Rent</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
