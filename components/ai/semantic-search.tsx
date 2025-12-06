"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader, Search, Zap, TrendingUp } from "lucide-react"

/**
 * Semantic search interface component
 */

interface SearchResult {
  id: string
  content: string
  similarity: number
  metadata: Record<string, any>
  relevance_score: number
}

export function SemanticSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState<"dense" | "hybrid" | "sparse">("hybrid")
  const [stats, setStats] = useState<any>(null)

  const performSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/ai/search?q=${encodeURIComponent(query)}&type=${searchType}&limit=10`)
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createEmbeddings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "embed",
          items: [
            {
              id: "prop_1",
              content: "Beautiful 3-bedroom apartment in Lekki with pool and gym",
              metadata: { type: "apartment", location: "Lekki" },
            },
            {
              id: "prop_2",
              content: "Luxury 4-bed villa in Victoria Island with security and parking",
              metadata: { type: "villa", location: "VI" },
            },
          ],
        }),
      })

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Embedding error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="search" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Semantic Search</TabsTrigger>
          <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Semantic Property Search
              </CardTitle>
              <CardDescription>Find properties using natural language queries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Query</label>
                <Input
                  placeholder="e.g., Find me a luxury apartment with a pool in Lekki..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") performSearch()
                  }}
                  className="flex-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(["dense", "hybrid", "sparse"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={searchType === type ? "default" : "outline"}
                    onClick={() => setSearchType(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>

              <Button onClick={performSearch} disabled={isLoading || !query.trim()} className="w-full">
                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                {isLoading ? "Searching..." : "Search"}
              </Button>

              {/* Results */}
              {results.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-semibold">Results ({results.length})</h3>
                  {results.map((result) => (
                    <div key={result.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{result.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">ID: {result.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Zap className="h-3 w-3 text-amber-500" />
                            <span className="text-xs font-medium">{(result.similarity * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs font-medium">{(result.relevance_score * 100).toFixed(0)}</span>
                          </div>
                        </div>
                      </div>

                      {Object.keys(result.metadata).length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {Object.entries(result.metadata).map(([key, value]) => (
                            <Badge key={key} variant="secondary" className="text-xs">
                              {key}: {String(value)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="embeddings">
          <Card>
            <CardHeader>
              <CardTitle>Embedding Management</CardTitle>
              <CardDescription>Create and manage text embeddings for properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={createEmbeddings} disabled={isLoading} className="w-full">
                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                {isLoading ? "Creating..." : "Create Sample Embeddings"}
              </Button>

              {stats && (
                <div className="grid gap-2 mt-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Created Embeddings</p>
                    <p className="text-2xl font-bold">{stats.created}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Embedding Model</p>
                    <p className="text-sm font-mono">{stats.embeddings[0]?.model}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
