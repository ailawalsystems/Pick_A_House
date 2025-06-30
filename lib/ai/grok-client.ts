import { AI_CONFIG } from "./config"

class GrokClient {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = AI_CONFIG.grok.apiKey
    this.baseUrl = AI_CONFIG.grok.baseUrl
  }

  async chat(messages: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "grok-beta",
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("Grok API error:", error)
      throw new Error("Failed to get chat response")
    }
  }

  async generatePropertyDescription(propertyData: any): Promise<string> {
    const messages = [
      {
        role: "system",
        content:
          "You are a professional real estate copywriter. Create engaging property descriptions that highlight key features and appeal to potential buyers.",
      },
      {
        role: "user",
        content: `Create a compelling property description for: ${JSON.stringify(propertyData)}`,
      },
    ]

    return await this.chat(messages)
  }

  async answerPropertyQuestion(question: string, propertyContext: any): Promise<string> {
    const messages = [
      {
        role: "system",
        content:
          "You are a knowledgeable real estate assistant. Answer questions about properties accurately and helpfully.",
      },
      {
        role: "user",
        content: `Property Context: ${JSON.stringify(propertyContext)}\n\nQuestion: ${question}`,
      },
    ]

    return await this.chat(messages)
  }
}

export const grokClient = new GrokClient()
