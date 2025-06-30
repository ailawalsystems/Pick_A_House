import { PropertyActions } from "@/components/property/property-actions"
import { PropertyDetails } from "@/components/property/property-details"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyMap } from "@/components/property/property-map"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PropertyMessage } from "@/components/messages/property-message"
import { PropertyCarousel } from "@/components/property/property-carousel"
import { Separator } from "@/components/ui/separator"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params

  // In a real app, fetch property data from an API using the ID
  const property = {
    id,
    title: "Luxury Villa with Swimming Pool",
    description:
      "This stunning villa features a spacious living area, modern kitchen, and a private swimming pool. Perfect for families looking for comfort and luxury.",
    location: "Asokoro, Abuja",
    price: 250000000,
    currency: "₦",
    type: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    features: ["Swimming Pool", "Garden", "Security System", "Air Conditioning", "Parking Space", "Furnished"],
    images: Array(5).fill("/placeholder.svg?height=600&width=800"),
    agent: {
      name: "John Doe",
      company: "Premium Realty",
      phone: "+234 123 456 7890",
      email: "john.doe@example.com",
      image: "/placeholder.svg?height=100&width=100",
    },
    coordinates: {
      lat: 9.0579,
      lng: 7.4951,
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-mesh-gradient bg-noise">
        <div className="bg-white py-6 md:py-8">
          <div className="container">
            <PropertyGallery images={property.images} title={property.title} />
          </div>
        </div>

        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <PropertyDetails property={property} />

              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold">Location</h2>
                <PropertyMap coordinates={property.coordinates} />
              </div>
            </div>
            <div>
              <PropertyActions property={property} />
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="mb-4 text-2xl font-bold">Similar Properties</h2>
            <PropertyCarousel
              title="You might also like"
              propertyType="recommendation"
              viewAllLink="/properties/recommended"
            />
          </div>
        </div>
      </main>
      <Footer />

      {/* Floating Message Button */}
      <PropertyMessage property={property} />
    </div>
  )
}
