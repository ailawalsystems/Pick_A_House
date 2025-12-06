import { type NextRequest, NextResponse } from "next/server"
import { agentRegistry } from "@/lib/ai/agents"

/**
 * New endpoint to list available agents and their capabilities
 */

export async function GET(request: NextRequest) {
  try {
    const agents = Object.entries(agentRegistry).map(([name, config]) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: config.name,
      role: config.role,
      status: config.status,
      capabilities: config.capabilities.map((c) => ({
        name: c.name,
        description: c.description,
      })),
      toolCount: config.tools.length,
    }))

    return NextResponse.json({
      agents,
      total: agents.length,
      status: "ok",
    })
  } catch (error) {
    console.error("[v0] Agents API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
