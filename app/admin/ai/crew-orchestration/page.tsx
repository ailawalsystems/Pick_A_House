"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader, CheckCircle, AlertCircle, Play, BarChart3 } from "lucide-react"

/**
 * New admin page for managing crew orchestration
 */

interface CrewExecution {
  id: string
  crew_type: string
  status: "pending" | "running" | "completed" | "failed"
  agents: string[]
  start_time: Date
  duration?: number
  progress: number
}

export default function CrewOrchestrationPage() {
  const [executions, setExecutions] = useState<CrewExecution[]>([
    {
      id: "crew_1",
      crew_type: "property_recommendation_crew",
      status: "running",
      agents: ["PropertyRecommenderAgent", "MarketAnalyzerAgent", "PriceEstimatorAgent"],
      start_time: new Date(),
      progress: 65,
    },
  ])
  const [selectedCrew, setSelectedCrew] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const crewTypes = [
    {
      id: "property_recommendation_crew",
      name: "Property Recommendation",
      description: "Find and recommend properties matching user preferences",
      agents: 3,
      estimated_time: 25,
    },
    {
      id: "market_analysis_crew",
      name: "Market Analysis",
      description: "Analyze market trends and provide insights",
      agents: 1,
      estimated_time: 15,
    },
    {
      id: "financing_crew",
      name: "Financing Analysis",
      description: "Calculate loans and compare financing options",
      agents: 1,
      estimated_time: 20,
    },
  ]

  const executeCrewType = async (crewType: string) => {
    setIsExecuting(true)
    setSelectedCrew(crewType)

    try {
      const response = await fetch("/api/ai/crew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crew_type: crewType,
          params: {
            budget: 100000000,
            bedrooms: 3,
            location: "Lekki",
            property_type: "Apartment",
          },
        }),
      })

      const data = await response.json()

      // Add execution to list
      setExecutions((prev) => [
        {
          id: data.execution_id,
          crew_type: crewType,
          status: "completed",
          agents: data.agents_used,
          start_time: new Date(),
          duration: data.execution_time,
          progress: 100,
        },
        ...prev,
      ])
    } catch (error) {
      console.error("Error executing crew:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader heading="Crew Orchestration" text="Manage multi-agent AI system and monitor executions" />

      <Tabs defaultValue="crews" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="crews">Available Crews</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>

        {/* Available Crews Tab */}
        <TabsContent value="crews" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {crewTypes.map((crew) => (
              <Card key={crew.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {crew.name}
                  </CardTitle>
                  <CardDescription>{crew.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Agents:</span>
                      <Badge>{crew.agents}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Time:</span>
                      <span className="font-medium">{crew.estimated_time}s</span>
                    </div>
                  </div>
                  <Button onClick={() => executeCrewType(crew.id)} disabled={isExecuting} className="w-full">
                    {isExecuting && selectedCrew === crew.id ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Execute
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Executions Tab */}
        <TabsContent value="executions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>Monitor crew executions and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executions.map((exec) => (
                  <div key={exec.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {exec.status === "running" && <Loader className="h-5 w-5 text-blue-500 animate-spin" />}
                        {exec.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {exec.status === "failed" && <AlertCircle className="h-5 w-5 text-red-500" />}
                        <div>
                          <h4 className="font-medium">{exec.crew_type}</h4>
                          <p className="text-sm text-muted-foreground">ID: {exec.id}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          exec.status === "completed"
                            ? "default"
                            : exec.status === "running"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {exec.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Agents:</span>
                        <p className="font-medium">{exec.agents.length}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{exec.duration ? `${exec.duration}ms` : "Running..."}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <p className="font-medium">{exec.progress}%</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${exec.progress}%` }}
                      />
                    </div>

                    <div className="mt-3 flex gap-2 flex-wrap">
                      {exec.agents.map((agent) => (
                        <Badge key={agent} variant="outline" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              6 specialized agents available for crew orchestration. Each agent has specific expertise and tools.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Property Recommender",
                role: "Recommendation Specialist",
                tools: 6,
                status: "active",
              },
              { name: "Market Analyzer", role: "Intelligence Specialist", tools: 6, status: "active" },
              { name: "Price Estimator", role: "Valuation Expert", tools: 6, status: "active" },
              { name: "Document Parser", role: "Processing Specialist", tools: 6, status: "active" },
              { name: "Loan Calculator", role: "Financial Advisor", tools: 6, status: "active" },
              { name: "Chat Assistant", role: "Support Specialist", tools: 5, status: "active" },
            ].map((agent) => (
              <Card key={agent.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    {agent.name}
                  </CardTitle>
                  <CardDescription>{agent.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tools Available:</span>
                    <Badge variant="secondary">{agent.tools}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
