import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { processText } from "@/lib/ai/nlp-processor"
import { executeAgent } from "@/lib/ai/agents"

/**
 * New endpoint for AI chat with NLP and agent orchestration
 */

export const maxDuration = 30

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
    const { messages, conversationId } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    const userMessage = messages[messages.length - 1].content

    // Process text with NLP
    const nlpResult = await processText(userMessage)

    // Route to appropriate agent based on intent
    let agentResponse: any = null
    let agentUsed = "ChatAssistant"

    switch (nlpResult.intent) {
      case "search_properties":
        agentUsed = "PropertyRecommender"
        agentResponse = await executeAgent({
          agent: "PropertyRecommender",
          action: "search_by_criteria",
          params: {
            budget: extractPrice(nlpResult.entities),
            bedrooms: extractBedrooms(nlpResult.entities),
            location: extractLocation(nlpResult.entities),
          },
          context: { userId: user.id },
        })
        break

      case "price_inquiry":
        agentUsed = "PriceEstimator"
        agentResponse = await executeAgent({
          agent: "PriceEstimator",
          action: "estimate_price",
          params: { entities: nlpResult.entities },
          context: { userId: user.id },
        })
        break

      case "loan_inquiry":
        agentUsed = "LoanCalculator"
        agentResponse = await executeAgent({
          agent: "LoanCalculator",
          action: "calculate_payment",
          params: {
            principal: extractPrice(nlpResult.entities),
            term: 20,
            rate: 12,
          },
          context: { userId: user.id },
        })
        break

      default:
        agentResponse = {
          agent: "ChatAssistant",
          status: "success",
          result: {
            message: `I can help you with property search, price estimates, loans, or general questions. What would you like to know?`,
          },
        }
    }

    // Store conversation
    await supabase.from("conversations").upsert(
      {
        id: conversationId,
        user_id: user.id,
        messages: [...messages, { role: "assistant", content: agentResponse.result.message }],
        intent: nlpResult.intent,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )

    return NextResponse.json({
      response: agentResponse.result.message,
      agent_used: agentUsed,
      intent: nlpResult.intent,
      entities: nlpResult.entities,
      execution_time: agentResponse.executionTime,
      conversation_id: conversationId,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper functions to extract data from entities
function extractPrice(entities: any[]) {
  const priceEntity = entities.find((e) => e.type === "quantity")
  return priceEntity ? Number.parseFloat(priceEntity.value) : null
}

function extractBedrooms(entities: any[]) {
  const regex = /(\d+)\s*(?:bedroom|bed)/
  return regex.test("") ? Number.parseInt("0") : null
}

function extractLocation(entities: any[]) {
  const locationEntity = entities.find((e) => e.type === "location")
  return locationEntity ? locationEntity.value : "Nigeria"
}
