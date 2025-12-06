import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { data: property, error } = await supabase
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
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error("[v0] Error fetching property:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { data: property, error } = await supabase
      .from("properties")
      .update(propertyData)
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (features) {
      // Delete old features
      await supabase.from("property_features").delete().eq("property_id", params.id)

      // Add new features
      if (features.length > 0) {
        const featuresToAdd = features.map((feature: string) => ({
          property_id: params.id,
          feature,
        }))

        await supabase.from("property_features").insert(featuresToAdd)
      }
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error("[v0] Error updating property:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("properties").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting property:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
