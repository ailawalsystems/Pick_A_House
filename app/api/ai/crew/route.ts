import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { executeCrewAI, monitorCrewExecution, crewTasks } from "@/lib/ai/crewai-integration"

/**
 * CrewAI endpoint for executing multi-agent crews
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
    const { crew_type, params } = body

    // Validate crew type
    if (!crew_type || !(crew_type in crewTasks)) {
      return NextResponse.json(
        { error: `Invalid crew type. Available: ${Object.keys(crewTasks).join(", ")}` },
        { status: 400 },
      )
    }

    // Execute crew
    const result = await executeCrewAI(`${crew_type}_${user.id}`, crew_type, params)

    // Store execution result in database
    await supabase.from("crew_executions").insert({
      user_id: user.id,
      crew_type,
      execution_id: result.execution_id,
      status: result.success ? "completed" : "failed",
      results: result,
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: result.success,
      execution_id: result.execution_id,
      final_output: result.final_output,
      agents_used: result.agents_used,
      tasks_completed: result.tasks_completed,
      total_tasks: result.total_tasks,
      execution_time: result.execution_time,
      insights: result.insights,
    })
  } catch (error) {
    console.error("[v0] Crew API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const executionId = searchParams.get("execution_id")

    if (!executionId) {
      return NextResponse.json({ error: "execution_id required" }, { status: 400 })
    }

    // Monitor crew execution
    const status = await monitorCrewExecution(executionId)

    return NextResponse.json(status)
  } catch (error) {
    console.error("[v0] Crew monitor error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
