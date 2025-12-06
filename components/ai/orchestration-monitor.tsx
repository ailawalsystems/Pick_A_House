"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react"

/**
 * Real-time orchestration monitoring component
 */

interface OrchestrationMetrics {
  total_tasks: number
  completed_tasks: number
  failed_tasks: number
  total_time: number
  average_task_time: number
}

interface TaskSchedule {
  task_id: string
  agent: string
  status: string
  duration: number
}

interface OrchestrationStatus {
  orchestration_id: string
  status: string
  execution_summary: {
    total_tasks: number
    completed: number
    failed: number
    total_time: number
    metrics: OrchestrationMetrics
  }
  bottlenecks: string[]
  task_schedules: TaskSchedule[]
}

export function OrchestrationMonitor() {
  const [status, setStatus] = useState<OrchestrationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const executeOrchestration = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crew_type: "property_recommendation_crew",
          tasks: [
            { id: "t1", type: "search", priority: 9, dependencies: [] },
            { id: "t2", type: "analysis", priority: 8, dependencies: ["t1"] },
            { id: "t3", type: "estimation", priority: 8, dependencies: ["t1"] },
            { id: "t4", type: "recommendation", priority: 10, dependencies: ["t2", "t3"] },
          ],
          coordination_strategy: "hybrid",
          max_parallelism: 3,
        }),
      })

      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Orchestration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={executeOrchestration}
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        {isLoading ? "Orchestrating..." : "Start Orchestration"}
      </button>

      {status && (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{status.execution_summary.total_tasks}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{status.execution_summary.completed}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Failed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{status.execution_summary.failed}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(status.execution_summary.total_time)}ms</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Execution Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={(status.execution_summary.completed / status.execution_summary.total_tasks) * 100} />
              <p className="text-sm text-muted-foreground">
                {status.execution_summary.completed} of {status.execution_summary.total_tasks} tasks completed
              </p>
            </CardContent>
          </Card>

          {/* Bottlenecks */}
          {status.bottlenecks.length > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Bottlenecks detected:</strong> {status.bottlenecks.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          {/* Task Schedules */}
          <Card>
            <CardHeader>
              <CardTitle>Task Schedules</CardTitle>
              <CardDescription>Agent assignments and execution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {status.task_schedules.map((schedule) => (
                  <div key={schedule.task_id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{schedule.task_id}</p>
                        <p className="text-xs text-muted-foreground">{schedule.agent}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium">{schedule.duration}ms</span>
                      {schedule.status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      <Badge variant="outline" className="text-xs">
                        {schedule.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
