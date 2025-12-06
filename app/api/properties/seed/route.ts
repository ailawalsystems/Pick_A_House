import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

/**
 * This endpoint seeds the database with sample property data
 * Run this once to populate the database with realistic property listings
 * DELETE /api/properties/seed to clear all properties
 */

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sampleProperties = [
      {
        title: "Luxurious Modern Villa with Ocean View",
        description:
          "This stunning 5-bedroom villa features floor-to-ceiling windows overlooking the Atlantic Ocean. Located in the exclusive Ikoyi neighborhood, this property boasts smart home technology, a heated infinity pool, and a world-class gym facility. The open-plan living area flows seamlessly onto a marble terrace perfect for entertaining. Each bedroom is en-suite with premium fixtures. The property comes with a state-of-the-art kitchen, home theater, and underground parking for 4 vehicles.",
        property_type: "Villa",
        listing_type: "sale",
        price: 850000000,
        bedrooms: 5,
        bathrooms: 5,
        area: 750,
        address: "15 Ikoyi Lane",
        city: "Lagos",
        state: "Lagos State",
        features: [
          "pool",
          "garden",
          "gym",
          "security",
          "ac",
          "heating",
          "furnished",
          "balcony",
          "parking",
          "fireplace",
        ],
      },
      {
        title: "Contemporary 3-Bedroom Apartment in Lekki",
        description:
          "Modern apartment in prime Lekki location with excellent road network. Features spacious living areas, equipped kitchen, and panoramic city views from the balcony. The building offers 24/7 security, CCTV surveillance, backup power generator, and a residents'' gym. Walking distance to shopping malls, restaurants, and international schools. Perfect for young professionals or small families.",
        property_type: "Apartment",
        listing_type: "sale",
        price: 120000000,
        bedrooms: 3,
        bathrooms: 3,
        area: 200,
        address: "45 Admiralty Way",
        city: "Lagos",
        state: "Lagos State",
        features: ["ac", "parking", "gym", "security", "balcony"],
      },
      {
        title: "Executive Penthouse with Smart Home Features",
        description:
          "Stunning penthouse in the heart of Victoria Island featuring cutting-edge smart home automation. The property includes a private rooftop garden, a temperature-controlled wine cellar, and a dedicated home office. The master suite spans an entire wing with a spa bathroom and walk-in closet. Floor-to-ceiling windows provide panoramic city views. Premium finishes throughout with Italian marble and imported timber flooring.",
        property_type: "Apartment",
        listing_type: "sale",
        price: 650000000,
        bedrooms: 4,
        bathrooms: 4,
        area: 500,
        address: "23 Agungi Street",
        city: "Lagos",
        state: "Lagos State",
        features: ["pool", "garden", "security", "ac", "heating", "furnished", "balcony", "parking", "gym", "elevator"],
      },
      {
        title: "Spacious Family Home in Abuja FCT",
        description:
          "Well-maintained 4-bedroom duplex in a serene, gated community in Abuja. Features a large living room, dining area, modern kitchen, and multiple visitor lounges. Beautiful landscaped garden with both front and back yards. Double carport and additional parking space. The property is located in a secure estate with 24/7 security, central water system, and standby generator.",
        property_type: "House",
        listing_type: "sale",
        price: 95000000,
        bedrooms: 4,
        bathrooms: 3,
        area: 400,
        address: "12 Gwarinpa Street",
        city: "Abuja",
        state: "FCT",
        features: ["garden", "garage", "security", "ac", "heating", "parking"],
      },
      {
        title: "Luxury 2-Bedroom Serviced Apartment - Short Term Rental",
        description:
          "Premium serviced apartment perfect for expatriates and business travelers. Includes housekeeping services, WiFi, cable TV, and fully equipped kitchen. Located in a secure complex with gym, pool, and 24-hour security. Weekly and monthly rental options available. Flexible lease terms. All utilities included in the rental price.",
        property_type: "Apartment",
        listing_type: "rent",
        price: 500000,
        bedrooms: 2,
        bathrooms: 2,
        area: 150,
        address: "78 Banana Island Road",
        city: "Lagos",
        state: "Lagos State",
        features: ["furnished", "ac", "gym", "parking"],
      },
      {
        title: "Commercial Office Space in Business District",
        description:
          "Prime office space in the heart of the business district with excellent visibility and accessibility. High ceiling, open-plan layout, and large windows. Includes dedicated parking, backup power, high-speed internet, and 24/7 security. Recently renovated with modern amenities. Suitable for corporate offices, co-working spaces, or professional services.",
        property_type: "Office",
        listing_type: "rent",
        price: 1500000,
        bedrooms: null,
        bathrooms: 1,
        area: 120,
        address: "88 Lekki-Epe Expressway",
        city: "Lagos",
        state: "Lagos State",
        features: ["ac", "parking", "security"],
      },
      {
        title: "Beachfront Property with Development Potential",
        description:
          "Rare beachfront land offering tremendous development potential in a rapidly developing area. Approximately 2 acres of prime real estate with direct beach access. Infrastructure is in place including electricity and water connections. Perfect for resort development, residential complex, or commercial venture. Title documents clear and ready.",
        property_type: "Land",
        listing_type: "sale",
        price: 450000000,
        bedrooms: null,
        bathrooms: null,
        area: 2000,
        address: "Badagry Peninsula",
        city: "Lagos",
        state: "Lagos State",
        features: ["security"],
      },
      {
        title: "Charming Old Bungalow Needing Renovation",
        description:
          "Historic 3-bedroom bungalow with character and potential. Large compound, mature trees providing natural shade. The property needs renovation but has solid foundations and good bones. Located in a stable neighborhood with growing property values. Perfect opportunity for investors looking to renovate and flip.",
        property_type: "House",
        listing_type: "sale",
        price: 45000000,
        bedrooms: 3,
        bathrooms: 2,
        area: 350,
        address: "56 Oshodi Road",
        city: "Lagos",
        state: "Lagos State",
        features: ["garden", "parking"],
      },
    ]

    // Delete existing properties
    const { error: deleteError } = await supabase.from("properties").delete().eq("user_id", user.id)

    if (deleteError) {
      console.error("[v0] Error deleting existing properties:", deleteError)
    }

    // Insert new properties
    const propertiesData = sampleProperties.map((prop) => ({
      ...prop,
      user_id: user.id,
    }))

    const { data: createdProperties, error: insertError } = await supabase
      .from("properties")
      .insert(propertiesData)
      .select()

    if (insertError) {
      console.error("[v0] Error inserting properties:", insertError)
      return NextResponse.json({ error: insertError.message }, { status: 400 })
    }

    // Add features to properties
    const featuresData: Array<{
      property_id: string
      feature: string
    }> = []

    createdProperties?.forEach((property) => {
      const sampleProp = sampleProperties.find((p) => p.title === property.title)
      if (sampleProp?.features) {
        sampleProp.features.forEach((feature) => {
          featuresData.push({
            property_id: property.id,
            feature,
          })
        })
      }
    })

    if (featuresData.length > 0) {
      const { error: featuresError } = await supabase.from("property_features").insert(featuresData)

      if (featuresError) {
        console.error("[v0] Error inserting features:", featuresError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully seeded ${createdProperties?.length || 0} properties with features`,
        properties: createdProperties,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error seeding properties:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete all properties for the current user
    const { error } = await supabase.from("properties").delete().eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "All properties deleted" })
  } catch (error) {
    console.error("[v0] Error deleting properties:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
