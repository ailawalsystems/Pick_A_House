import { grokClient } from "./grok-client"
import { geminiClient } from "./gemini-client"
import { crewAIManager } from "./crew-agents"
import { createClient } from "../supabase/client"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  metadata?: any
}

interface ChatSession {
  id: string
  userId: string
  messages: ChatMessage[]
  context: any
}

class RealEstateChatbot {
  private supabase = createClient()

  async createSession(userId: string): Promise<string> {
    const { data, error } = await this.supabase
      .from("ai_chat_sessions")
      .insert({
        user_id: userId,
        session_name: `Chat ${new Date().toLocaleDateString()}`,
        context: {},
      })
      .select("id")
      .single()

    if (error) throw error
    return data.id
  }

  async sendMessage(sessionId: string, message: string): Promise<string> {
    try {
      // Save user message
      await this.saveMessage(sessionId, "user", message)

      // Get session context
      const session = await this.getSession(sessionId)

      // Determine intent and route to appropriate AI service
      const intent = await this.analyzeIntent(message)
      let response: string

      switch (intent.type) {
        case "property_search":
          response = await this.handlePropertySearch(message, session.context)
          break
        case "price_inquiry":
          response = await this.handlePriceInquiry(message, session.context)
          break
        case "general_question":
          response = await grokClient.answerPropertyQuestion(message, session.context)
          break
        default:
          response = await this.handleGeneralChat(message, session.messages)
      }

      // Save assistant response
      await this.saveMessage(sessionId, "assistant", response)

      return response
    } catch (error) {
      console.error("Chatbot error:", error)
      return "I'm sorry, I encountered an error. Please try again."
    }
  }

  private async analyzeIntent(message: string): Promise<{ type: string; confidence: number }> {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("value")) {
      return { type: "price_inquiry", confidence: 0.8 }
    }

    if (lowerMessage.includes("property") || lowerMessage.includes("house") || lowerMessage.includes("apartment")) {
      return { type: "property_search", confidence: 0.9 }
    }

    return { type: "general_question", confidence: 0.6 }
  }

  private async handlePropertySearch(message: string, context: any): Promise<string> {
    // Use CrewAI for complex property recommendations
    const preferences = await this.extractPreferences(message)
    const recommendations = await crewAIManager.recommendProperties(preferences)
    return this.formatPropertyRecommendations(recommendations)
  }

  private async handlePriceInquiry(message: string, context: any): Promise<string> {
    // Use Gemini for price analysis
    const analysis = await geminiClient.analyzeProperty(context.currentProperty || {})
    return this.formatPriceAnalysis(analysis)
  }

  private async handleGeneralChat(message: string, history: ChatMessage[]): Promise<string> {
    const messages = history.slice(-5).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    messages.push({ role: "user", content: message })

    return await grokClient.chat(messages)
  }

  private async extractPreferences(message: string): Promise<any> {
    // Use Gemini to extract structured preferences from natural language
    const prompt = `Extract property search preferences from this message: "${message}". Return as JSON with fields: location, propertyType, priceRange, bedrooms, bathrooms, features.`
    const response = await geminiClient.generateText(prompt)

    try {
      return JSON.parse(response)
    } catch {
      return { query: message }
    }
  }

  private formatPropertyRecommendations(recommendations: any): string {
    // Format AI recommendations into user-friendly text
    return `Based on your preferences, I found some great properties for you. Here are my top recommendations:\n\n${recommendations.summary || "Let me search for properties that match your criteria."}`
  }

  private formatPriceAnalysis(analysis: any): string {
    return `Based on current market data:\n\n• Market Value: ${analysis.marketValue}\n• Investment Potential: ${analysis.investmentPotential}\n\n${analysis.recommendations}`
  }

  private async saveMessage(sessionId: string, role: string, content: string): Promise<void> {
    await this.supabase.from("ai_chat_messages").insert({
      session_id: sessionId,
      role,
      content,
      metadata: {},
    })
  }

  private async getSession(sessionId: string): Promise<ChatSession> {
    const { data: session } = await this.supabase.from("ai_chat_sessions").select("*").eq("id", sessionId).single()

    const { data: messages } = await this.supabase
      .from("ai_chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })

    return {
      id: session.id,
      userId: session.user_id,
      messages: messages || [],
      context: session.context || {},
    }
  }
}

export const chatbot = new RealEstateChatbot()
