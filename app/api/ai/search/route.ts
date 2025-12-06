import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getVectorStore } from "@/lib/ai/vector-store"

/**
 * Vector search API endpoint
 */

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")
    const top_k = Number.parseInt(searchParams.get("limit") || "10")
    const search_type = (searchParams.get("type") || "hybrid") as "dense" | "hybrid" | "sparse"

    if (!query) {
      return NextResponse.json({ error: "Query parameter required" }, { status: 400 })
    }

    const store = getVectorStore()

    // Perform search
    const results = await store.search({
      query,
      top_k,
      min_similarity: 0.6,
      search_type,
      filter: { user_id: user.id },
    })

    return NextResponse.json({
      query,
      results,
      total: results.length,
      search_type,
    })
  } catch (error) {
    console.error("[v0] Search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { action, query, items, ids } = body

    const store = getVectorStore()

    if (action === "embed") {
      // Create embeddings
      const embeddings = await store.batchCreateEmbeddings(
        items.map((item: any) => ({
          id: item.id,
          content: item.content,
          metadata: { user_id: user.id, ...item.metadata },
        })),
      )

      return NextResponse.json({
        action: "embed",
        created: embeddings.length,
        embeddings: embeddings.map((e) => ({ id: e.id, model: e.model })),
      })
    } else if (action === "search") {
      // Perform search
      const results = await store.search({
        query,
        top_k: 10,
        min_similarity: 0.6,
        search_type: "hybrid",
      })

      return NextResponse.json({
        action: "search",
        results,
      })
    } else if (action === "delete") {
      // Delete embeddings
      let deleted = 0
      for (const id of ids) {
        if (store.deleteEmbedding(id)) {
          deleted++
        }
      }

      return NextResponse.json({
        action: "delete",
        deleted,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Vector API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID parameter required" }, { status: 400 })
    }

    const store = getVectorStore()
    const deleted = store.deleteEmbedding(id)

    return NextResponse.json({
      deleted,
      id,
    })
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
