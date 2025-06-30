import { PropertyCarousel } from "@/components/property/property-carousel"
import { AiSearch } from "@/components/search/ai-search"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { PropertySection } from "@/components/property/property-section"
import { BrowseByLocation } from "@/components/property/browse-by-location"
import { RecentlyViewed } from "@/components/property/recently-viewed"
import { FeaturedAgents } from "@/components/agents/featured-agents"
import { ContactMessenger } from "@/components/contact/contact-messenger"
import { FeaturedProperties } from "@/components/property/featured-properties"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-mesh-gradient bg-noise">
        {/* Hero Section with Dynamic Background */}
        <HeroSection />

        {/* Search Bar */}
        <div className="container -mt-8 z-10 relative">
          <AiSearch className="mb-8 shadow-xl rounded-xl" />
        </div>

        {/* Featured Properties with Dynamic Cards */}
        <section className="py-8">
          <div className="container">
            <FeaturedProperties />
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="py-8 bg-white/80 backdrop-blur-sm">
          <div className="container">
            <PropertyCarousel
              title="Recommended for you"
              description="Based on your browsing history and preferences"
              propertyType="recommendation"
              viewAllLink="/properties/recommended"
            />
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="py-8 bg-white/80 backdrop-blur-sm mt-4">
          <div className="container">
            <RecentlyViewed />
          </div>
        </section>

        {/* Properties for Sale */}
        <section className="py-8 bg-white/80 backdrop-blur-sm mt-4">
          <div className="container">
            <PropertySection
              title="Properties for Sale"
              description="Find your dream home to buy"
              propertyType="sale"
              viewAllLink="/properties/buy"
            />
          </div>
        </section>

        {/* Properties for Rent */}
        <section className="py-8 bg-white/80 backdrop-blur-sm mt-4">
          <div className="container">
            <PropertySection
              title="Properties for Rent"
              description="Discover your perfect rental property"
              propertyType="rent"
              viewAllLink="/properties/rent"
            />
          </div>
        </section>

        {/* Browse by Location */}
        <section className="py-8 bg-white/80 backdrop-blur-sm mt-4">
          <div className="container">
            <BrowseByLocation />
          </div>
        </section>

        {/* Featured Agents */}
        <section className="py-8 bg-white/80 backdrop-blur-sm mt-4">
          <div className="container">
            <FeaturedAgents />
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Contact Messenger */}
      <ContactMessenger />
    </div>
  )
}
