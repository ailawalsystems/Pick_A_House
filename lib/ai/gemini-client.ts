import { GoogleGenerativeAI } from "@google/generative-ai"
import { AI_CONFIG } from "./config"

class GeminiClient {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    this.genAI = new GoogleGenerativeAI(AI_CONFIG.gemini.apiKey)
    this.model = this.genAI.getGenerativeModel({ model: AI_CONFIG.gemini.model })
  }

  async generateText(prompt: string, context?: any): Promise<string> {
    try {
      const enhancedPrompt = context ? `Context: ${JSON.stringify(context)}\n\nUser Query: ${prompt}` : prompt

      const result = await this.model.generateContent(enhancedPrompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Gemini API error:", error)
      throw new Error("Failed to generate response")
    }
  }

  async analyzeProperty(propertyData: any): Promise<any> {
    const prompt = `
      Analyze this property and provide insights:
      ${JSON.stringify(propertyData)}
      
      Please provide:
      1. Market value assessment
      2. Investment potential
      3. Comparable properties analysis
      4. Recommendations for buyers/investors
    `

    const response = await this.generateText(prompt)
    return this.parseAnalysisResponse(response)
  }

  private parseAnalysisResponse(response: string): any {
    // Parse the AI response into structured data
    try {
      // This would contain logic to extract structured data from the response
      return {
        marketValue: "Competitive",
        investmentPotential: "High",
        comparables: [],
        recommendations: response,
      }
    } catch (error) {
      return { recommendations: response }
    }
  }
}

export const geminiClient = new GeminiClient()
