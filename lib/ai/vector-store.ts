export interface VectorEmbedding {
  id: string
  content: string
  embedding: number[]
  metadata: Record<string, any>
  timestamp: Date
  model: string
}

export interface SearchResult {
  id: string
  content: string
  similarity: number
  metadata: Record<string, any>
  relevance_score: number
}

export interface VectorSearchQuery {
  query: string
  top_k?: number
  filter?: Record<string, any>
  min_similarity?: number
  search_type?: "dense" | "hybrid" | "sparse"
}

// Vector store configuration
export const vectorConfig = {
  embedding_model: "text-embedding-3-small",
  embedding_dimension: 384,
  similarity_metric: "cosine",
  indexing_strategy: "ivfflat",
  batch_size: 100,
  cache_embeddings: true,
}

// In-memory vector store (production would use Supabase pgvector)
export class VectorStore {
  private embeddings: Map<string, VectorEmbedding> = new Map()
  private index: Map<string, string[]> = new Map() // Simplified index for demo
  private cache: Map<string, number[]> = new Map()

  /**
   * Create embeddings for text content
   */
  async createEmbedding(id: string, content: string, metadata: Record<string, any> = {}): Promise<VectorEmbedding> {
    // Check cache first
    const cacheKey = `${vectorConfig.embedding_model}:${content}`
    let embedding: number[]

    if (this.cache.has(cacheKey)) {
      embedding = this.cache.get(cacheKey)!
    } else {
      // Generate embedding using AI SDK
      embedding = await this.generateEmbedding(content)

      // Cache the embedding
      if (vectorConfig.cache_embeddings) {
        this.cache.set(cacheKey, embedding)
      }
    }

    const vectorEmbedding: VectorEmbedding = {
      id,
      content,
      embedding,
      metadata,
      timestamp: new Date(),
      model: vectorConfig.embedding_model,
    }

    this.embeddings.set(id, vectorEmbedding)
    this.updateIndex(id, content)

    return vectorEmbedding
  }

  /**
   * Generate embedding vector for text
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    // Mock embedding generation - in production, use OpenAI API
    // This simulates a 384-dimensional embedding
    const hash = this.hashString(text)
    const embedding: number[] = []

    // Generate deterministic pseudo-random embedding based on hash
    for (let i = 0; i < vectorConfig.embedding_dimension; i++) {
      const seed = hash * (i + 1) * 12345
      const value = Math.sin(seed) * 0.5 + 0.5 // Normalize to 0-1
      embedding.push(value)
    }

    return embedding
  }

  /**
   * Simple string hash for deterministic embedding generation
   */
  private hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash) / 2147483647 // Normalize to 0-1
  }

  /**
   * Update search index
   */
  private updateIndex(id: string, content: string): void {
    const tokens = content.toLowerCase().split(/\s+/)
    for (const token of tokens) {
      if (!this.index.has(token)) {
        this.index.set(token, [])
      }
      const items = this.index.get(token)!
      if (!items.includes(id)) {
        items.push(id)
      }
    }
  }

  /**
   * Semantic search using vector similarity
   */
  async search(query: VectorSearchQuery): Promise<SearchResult[]> {
    const queryEmbedding = await this.generateEmbedding(query.query)
    const top_k = query.top_k || 10
    const min_similarity = query.min_similarity || 0.5
    const search_type = query.search_type || "hybrid"

    let candidates: Array<{ id: string; similarity: number; embedding: VectorEmbedding }> = []

    if (search_type === "dense" || search_type === "hybrid") {
      // Dense vector search
      candidates = Array.from(this.embeddings.values())
        .map((emb) => ({
          id: emb.id,
          similarity: this.cosineSimilarity(queryEmbedding, emb.embedding),
          embedding: emb,
        }))
        .filter((c) => c.similarity >= min_similarity)
    }

    if (search_type === "sparse" || search_type === "hybrid") {
      // Sparse keyword search
      const queryTokens = query.query.toLowerCase().split(/\s+/)
      const sparseScores: Map<string, number> = new Map()

      for (const token of queryTokens) {
        const matchedIds = this.index.get(token) || []
        for (const id of matchedIds) {
          sparseScores.set(id, (sparseScores.get(id) || 0) + 1)
        }
      }

      // Combine with dense results if hybrid
      if (search_type === "hybrid") {
        for (const [id, sparseScore] of sparseScores) {
          const existing = candidates.find((c) => c.id === id)
          if (existing) {
            // Boost similarity for keyword matches
            existing.similarity = Math.min(1.0, existing.similarity + sparseScore * 0.1)
          } else if (this.embeddings.has(id)) {
            const emb = this.embeddings.get(id)!
            candidates.push({
              id,
              similarity: Math.min(1.0, (sparseScore * 0.1) / queryTokens.length),
              embedding: emb,
            })
          }
        }
      }
    }

    // Apply filters
    if (query.filter) {
      candidates = candidates.filter((c) => this.matchesFilter(c.embedding.metadata, query.filter!))
    }

    // Sort by similarity and return top k
    return candidates
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, top_k)
      .map((c) => ({
        id: c.id,
        content: c.embedding.content,
        similarity: c.similarity,
        metadata: c.embedding.metadata,
        relevance_score: this.calculateRelevanceScore(c.similarity, c.embedding.metadata),
      }))
  }

  /**
   * Cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0

    let dotProduct = 0
    let magnitudeA = 0
    let magnitudeB = 0

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i]
      magnitudeA += a[i] * a[i]
      magnitudeB += b[i] * b[i]
    }

    magnitudeA = Math.sqrt(magnitudeA)
    magnitudeB = Math.sqrt(magnitudeB)

    if (magnitudeA === 0 || magnitudeB === 0) return 0

    return dotProduct / (magnitudeA * magnitudeB)
  }

  /**
   * Check if metadata matches filters
   */
  private matchesFilter(metadata: Record<string, any>, filter: Record<string, any>): boolean {
    for (const [key, value] of Object.entries(filter)) {
      if (metadata[key] !== value) return false
    }
    return true
  }

  /**
   * Calculate relevance score based on similarity and metadata
   */
  private calculateRelevanceScore(similarity: number, metadata: Record<string, any>): number {
    let score = similarity

    // Boost for recent items
    if (metadata.timestamp) {
      const age = Date.now() - new Date(metadata.timestamp).getTime()
      const ageBoost = Math.max(0, 1 - age / (30 * 24 * 60 * 60 * 1000)) * 0.1 // Max 10% boost
      score += ageBoost
    }

    // Boost for popular items
    if (metadata.views) {
      const viewBoost = Math.min(0.1, (metadata.views / 1000) * 0.05) // Max 10% boost
      score += viewBoost
    }

    // Boost for featured items
    if (metadata.featured) {
      score += 0.15
    }

    return Math.min(1.0, score)
  }

  /**
   * Batch create embeddings
   */
  async batchCreateEmbeddings(
    items: Array<{ id: string; content: string; metadata?: Record<string, any> }>,
  ): Promise<VectorEmbedding[]> {
    const results: VectorEmbedding[] = []

    // Process in batches
    for (let i = 0; i < items.length; i += vectorConfig.batch_size) {
      const batch = items.slice(i, i + vectorConfig.batch_size)
      const promises = batch.map((item) => this.createEmbedding(item.id, item.content, item.metadata || {}))
      const batchResults = await Promise.all(promises)
      results.push(...batchResults)
    }

    return results
  }

  /**
   * Delete embedding
   */
  deleteEmbedding(id: string): boolean {
    return this.embeddings.delete(id)
  }

  /**
   * Update embedding metadata
   */
  updateMetadata(id: string, metadata: Record<string, any>): boolean {
    const embedding = this.embeddings.get(id)
    if (!embedding) return false

    embedding.metadata = { ...embedding.metadata, ...metadata }
    return true
  }

  /**
   * Get embedding by id
   */
  getEmbedding(id: string): VectorEmbedding | undefined {
    return this.embeddings.get(id)
  }

  /**
   * Get statistics
   */
  getStats(): {
    total_embeddings: number
    cache_size: number
    index_size: number
    embedding_model: string
  } {
    return {
      total_embeddings: this.embeddings.size,
      cache_size: this.cache.size,
      index_size: this.index.size,
      embedding_model: vectorConfig.embedding_model,
    }
  }

  /**
   * Clear store
   */
  clear(): void {
    this.embeddings.clear()
    this.index.clear()
    this.cache.clear()
  }
}

// Singleton instance
let vectorStoreInstance: VectorStore | null = null

export function getVectorStore(): VectorStore {
  if (!vectorStoreInstance) {
    vectorStoreInstance = new VectorStore()
  }
  return vectorStoreInstance
}

// Helper functions for common search patterns
export async function findSimilarProperties(propertyContent: string, limit = 10): Promise<SearchResult[]> {
  const store = getVectorStore()
  return store.search({
    query: propertyContent,
    top_k: limit,
    min_similarity: 0.6,
    search_type: "hybrid",
  })
}

export async function searchByPreferences(userPreferences: string, limit = 5): Promise<SearchResult[]> {
  const store = getVectorStore()
  return store.search({
    query: userPreferences,
    top_k: limit,
    min_similarity: 0.7,
    search_type: "dense",
  })
}

export async function deduplicateProperties(properties: Array<{ id: string; content: string }>): Promise<{
  duplicates: Array<[string, string]>
  unique_count: number
}> {
  const store = getVectorStore()
  const duplicates: Array<[string, string]> = []
  const seen = new Set<string>()

  for (const prop of properties) {
    if (seen.has(prop.id)) continue

    const results = await store.search({
      query: prop.content,
      top_k: 20,
      min_similarity: 0.95, // Very high threshold for duplicates
    })

    for (const result of results) {
      if (result.id !== prop.id && !seen.has(result.id)) {
        duplicates.push([prop.id, result.id])
        seen.add(result.id)
      }
    }
    seen.add(prop.id)
  }

  return {
    duplicates,
    unique_count: properties.length - seen.size,
  }
}
