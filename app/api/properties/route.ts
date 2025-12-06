import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: properties, error } = await supabase
      .from("properties")
      .select(
        `
        id,
        user_id,
        title,
        description,
        property_type,
        listing_type,
        price,
        bedrooms,
        bathrooms,
        area,
        address,
        city,
        state,
        created_at,
        updated_at,
        property_features (feature)
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ properties })
  } catch (error) {
    console.error("[v0] Error fetching properties:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { features, ...propertyData } = body

    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .insert([
        {
          ...propertyData,
          user_id: user.id,
        },
      ])
      .select()
      .single()

    if (propertyError) {
      return NextResponse.json({ error: propertyError.message }, { status: 400 })
    }

    if (features && features.length > 0) {
      const featuresToAdd = features.map((feature: string) => ({
        property_id: property.id,
        feature,
      }))

      const { error: featuresError } = await supabase.from("property_features").insert(featuresToAdd)

      if (featuresError) {
        console.error("[v0] Error adding features:", featuresError)
      }
    }

    return NextResponse.json({ property }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating property:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
