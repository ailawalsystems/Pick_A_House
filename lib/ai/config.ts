export const AI_CONFIG = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
    model: "gemini-pro",
  },
  grok: {
    apiKey: process.env.GROK_API_KEY!,
    baseUrl: "https://api.x.ai/v1",
  },
  crewai: {
    apiKey: process.env.CREWAI_API_KEY!,
    baseUrl: "https://api.crewai.com/v1",
  },
}

export const AGENT_ROLES = {
  PROPERTY_RECOMMENDER: "property_recommender",
  PRICE_ESTIMATOR: "price_estimator",
  MARKET_ANALYZER: "market_analyzer",
  LOAN_CALCULATOR: "loan_calculator",
  DOCUMENT_PARSER: "document_parser",
  CHAT_ASSISTANT: "chat_assistant",
} as const
