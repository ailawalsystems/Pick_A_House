/**
 * New file for NLP text processing and analysis
 */

// Intent types
export type IntentType =
  | "search_properties"
  | "price_inquiry"
  | "market_analysis"
  | "loan_inquiry"
  | "schedule_tour"
  | "get_recommendation"
  | "document_request"
  | "complaint"
  | "general_help"

// Entity types
export interface PropertyEntity {
  type: "property"
  bedrooms?: number
  bathrooms?: number
  area?: number
  price?: { min: number; max: number }
  propertyType?: string
}

export interface LocationEntity {
  type: "location"
  city?: string
  district?: string
  landmark?: string
}

export interface TimeEntity {
  type: "time"
  date?: Date
  time?: string
  relativeTime?: string
}

export interface Entity {
  value: string
  type: "property" | "location" | "time" | "person" | "quantity"
  confidence: number
}

// Intent detection result
export interface IntentResult {
  intent: IntentType
  confidence: number
  entities: Entity[]
  tokens: string[]
}

// NLP Pipeline configuration
export const nlpConfig = {
  minConfidence: 0.7,
  maxTokens: 512,
  enableStemming: true,
  enableStopWordRemoval: true,
  languageDetection: true,
  cacheEmbeddings: true,
}

// Tokenization function
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0)
}

// Normalization function
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Stop words for English
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "was",
  "will",
  "with",
])

// Remove stop words
export function removeStopWords(tokens: string[]): string[] {
  return tokens.filter((token) => !STOP_WORDS.has(token))
}

// Intent detection keywords
const INTENT_KEYWORDS: Record<IntentType, string[]> = {
  search_properties: ["find", "search", "look", "show", "want", "looking", "need", "interested"],
  price_inquiry: ["price", "cost", "how", "much", "average", "expensive", "cheap", "affordable"],
  market_analysis: ["trend", "market", "analysis", "growth", "opportunity", "data", "statistics"],
  loan_inquiry: ["loan", "mortgage", "finance", "payment", "interest", "rate", "installment"],
  schedule_tour: ["visit", "tour", "schedule", "appointment", "see", "view", "viewing"],
  get_recommendation: ["recommend", "suggestion", "based", "like", "similar", "match", "best"],
  document_request: ["document", "paper", "certificate", "send", "download", "file", "receipt"],
  complaint: ["problem", "issue", "bad", "wrong", "complaint", "help", "concerned"],
  general_help: ["help", "how", "what", "explain", "guide", "tutorial", "information"],
}

// Entity extraction patterns
const ENTITY_PATTERNS: Record<string, RegExp> = {
  price: /(\d+\.?\d*)\s*(?:million|m|naira|₦)?/gi,
  bedrooms: /(\d+)\s*(?:bedroom|bed|br)/gi,
  bathrooms: /(\d+)\s*(?:bathroom|bath|ba)/gi,
  area: /(\d+\.?\d*)\s*(?:sqm|sq\.?m|sqft|square)/gi,
  city: /(?:lekki|victoria island|abuja|ikoyi|mainland|Lagos|FCT)/gi,
}

// Detect intent from text
export function detectIntent(text: string): IntentResult {
  const normalizedText = normalize(text)
  const tokens = tokenize(normalizedText)
  const keywords = removeStopWords(tokens)

  let bestIntent: IntentType = "general_help"
  let bestScore = 0

  // Score each intent
  for (const [intent, words] of Object.entries(INTENT_KEYWORDS)) {
    let score = 0
    for (const keyword of words) {
      if (keywords.includes(keyword)) {
        score++
      }
    }
    const normalizedScore = score / words.length
    if (normalizedScore > bestScore) {
      bestScore = normalizedScore
      bestIntent = intent as IntentType
    }
  }

  return {
    intent: bestIntent,
    confidence: Math.min(bestScore * 1.5, 1.0), // Boost confidence for better UX
    entities: extractEntities(normalizedText),
    tokens: keywords,
  }
}

// Extract entities from text
export function extractEntities(text: string): Entity[] {
  const entities: Entity[] = []

  for (const [type, pattern] of Object.entries(ENTITY_PATTERNS)) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      entities.push({
        value: match[0],
        type: (type as any) || "quantity",
        confidence: 0.85,
      })
    }
  }

  return entities
}

// Combine operations for full NLP processing
export async function processText(text: string): Promise<IntentResult> {
  if (!text || text.trim().length === 0) {
    return {
      intent: "general_help",
      confidence: 0,
      entities: [],
      tokens: [],
    }
  }

  const intentResult = detectIntent(text)

  return intentResult
}

// Similarity calculation (cosine similarity placeholder)
export function calculateSimilarity(text1: string, text2: string): number {
  const normalize = (t: string) => t.toLowerCase().split(/\s+/)
  const tokens1 = new Set(normalize(text1))
  const tokens2 = new Set(normalize(text2))

  const intersection = [...tokens1].filter((t) => tokens2.has(t)).length
  const union = tokens1.size + tokens2.size - intersection

  return union > 0 ? intersection / union : 0
}
