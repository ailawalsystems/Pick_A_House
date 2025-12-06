import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { OrchestrationEngine, LoadBalancer } from "@/lib/ai/orchestration-engine"

/**
 * Orchestration API endpoint for multi-agent coordination
 */

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { crew_type, tasks, coordination_strategy = "hybrid", max_parallelism = 3, timeout = 60000 } = body

    if (!tasks || !Array.isArray(tasks)) {
      return NextResponse.json({ error: "Tasks array required" }, { status: 400 })
    }

    const requestId = `orch_${Date.now()}`

    // Create orchestration engine
    const engine = new OrchestrationEngine({
      request_id: requestId,
      crew_type,
      tasks,
      coordination_strategy,
      max_parallelism,
      timeout,
    })

    // Schedule tasks
    const schedules = await engine.scheduleTasks({
      request_id: requestId,
      crew_type,
      tasks,
      coordination_strategy,
      max_parallelism,
      timeout,
    })

    // Check for bottlenecks
    const bottlenecks = LoadBalancer.predictBottlenecks(schedules)

    // Execute tasks
    const execution = await engine.execute(max_parallelism, timeout)

    // Get final state
    const finalState = engine.getState()

    // Store orchestration result
    await supabase.from("orchestration_executions").insert({
      user_id: user.id,
      orchestration_id: requestId,
      crew_type,
      status: finalState.status,
      metrics: finalState.metrics,
      bottlenecks,
      execution_log: engine.getExecutionLog(),
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({
      orchestration_id: requestId,
      status: "completed",
      execution_summary: {
        total_tasks: execution.completed + execution.failed,
        completed: execution.completed,
        failed: execution.failed,
        total_time: execution.total_time,
        metrics: finalState.metrics,
      },
      bottlenecks,
      task_schedules: schedules.map((s) => ({
        task_id: s.task_id,
        agent: s.assigned_agent,
        status: s.status,
        duration: s.estimated_duration,
      })),
    })
  } catch (error) {
    console.error("[v0] Orchestration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
