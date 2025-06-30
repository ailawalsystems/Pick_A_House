import { AI_CONFIG, AGENT_ROLES } from "./config"

interface Agent {
  id: string
  role: string
  goal: string
  backstory: string
  tools: string[]
  llm: string
}

interface Task {
  id: string
  description: string
  agent: string
  expected_output: string
}

class CrewAIManager {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = AI_CONFIG.crewai.apiKey
    this.baseUrl = AI_CONFIG.crewai.baseUrl
  }

  private agents: Agent[] = [
    {
      id: AGENT_ROLES.PROPERTY_RECOMMENDER,
      role: "Property Recommendation Specialist",
      goal: "Analyze user preferences and recommend the most suitable properties",
      backstory:
        "You are an expert real estate advisor with deep knowledge of the Abuja property market. You understand buyer preferences and can match them with perfect properties.",
      tools: ["property_search", "user_preference_analyzer", "market_data"],
      llm: "gemini-pro",
    },
    {
      id: AGENT_ROLES.PRICE_ESTIMATOR,
      role: "Property Valuation Expert",
      goal: "Provide accurate property price estimates based on market data",
      backstory:
        "You are a certified property appraiser with extensive experience in the Nigerian real estate market. You use comparative market analysis and local trends to estimate property values.",
      tools: ["market_analysis", "comparable_properties", "price_calculator"],
      llm: "gemini-pro",
    },
    {
      id: AGENT_ROLES.MARKET_ANALYZER,
      role: "Real Estate Market Analyst",
      goal: "Analyze market trends and provide investment insights",
      backstory:
        "You are a real estate market researcher who tracks property trends, price movements, and investment opportunities in the FCT area.",
      tools: ["market_trends", "investment_calculator", "area_analysis"],
      llm: "gemini-pro",
    },
    {
      id: AGENT_ROLES.LOAN_CALCULATOR,
      role: "Mortgage and Finance Advisor",
      goal: "Calculate loan options and provide financing advice",
      backstory:
        "You are a mortgage specialist who helps buyers understand their financing options and calculate affordable loan amounts.",
      tools: ["loan_calculator", "interest_rates", "affordability_checker"],
      llm: "gemini-pro",
    },
    {
      id: AGENT_ROLES.CHAT_ASSISTANT,
      role: "Real Estate Chat Assistant",
      goal: "Provide helpful and accurate responses to user queries about properties and real estate",
      backstory:
        "You are a friendly and knowledgeable real estate assistant who helps users navigate the property search process.",
      tools: ["general_knowledge", "property_database", "user_assistance"],
      llm: "grok-beta",
    },
  ]

  async createCrew(agentIds: string[]): Promise<string> {
    try {
      const selectedAgents = this.agents.filter((agent) => agentIds.includes(agent.id))

      const response = await fetch(`${this.baseUrl}/crews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agents: selectedAgents,
          process: "sequential",
        }),
      })

      if (!response.ok) {
        throw new Error(`CrewAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.crew_id
    } catch (error) {
      console.error("CrewAI crew creation error:", error)
      throw new Error("Failed to create AI crew")
    }
  }

  async executeTask(crewId: string, task: Task): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/crews/${crewId}/execute`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      })

      if (!response.ok) {
        throw new Error(`CrewAI execution error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("CrewAI task execution error:", error)
      throw new Error("Failed to execute AI task")
    }
  }

  async recommendProperties(userPreferences: any): Promise<any> {
    const crewId = await this.createCrew([AGENT_ROLES.PROPERTY_RECOMMENDER])

    const task: Task = {
      id: "property_recommendation",
      description: `Analyze user preferences and recommend suitable properties: ${JSON.stringify(userPreferences)}`,
      agent: AGENT_ROLES.PROPERTY_RECOMMENDER,
      expected_output:
        "A list of recommended properties with explanations for why each property matches the user preferences",
    }

    return await this.executeTask(crewId, task)
  }

  async estimatePropertyPrice(propertyData: any): Promise<any> {
    const crewId = await this.createCrew([AGENT_ROLES.PRICE_ESTIMATOR])

    const task: Task = {
      id: "price_estimation",
      description: `Estimate the market value of this property: ${JSON.stringify(propertyData)}`,
      agent: AGENT_ROLES.PRICE_ESTIMATOR,
      expected_output: "A detailed price estimate with market analysis and comparable properties",
    }

    return await this.executeTask(crewId, task)
  }
}

export const crewAIManager = new CrewAIManager()
