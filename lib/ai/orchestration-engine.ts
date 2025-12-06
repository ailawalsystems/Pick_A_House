/**
 * Multi-Agent Orchestration Engine
 * Manages agent coordination, task scheduling, load balancing, and conflict resolution
 */

export interface AgentWorkload {
  agent_id: string
  current_tasks: number
  max_concurrent: number
  avg_execution_time: number
  success_rate: number
  last_used: Date
}

export interface TaskSchedule {
  task_id: string
  assigned_agent: string
  priority: number
  estimated_start: Date
  estimated_duration: number
  status: "queued" | "scheduled" | "running" | "completed" | "failed"
  retry_count: number
  max_retries: number
}

export interface AgentCoordination {
  primary_agent: string
  supporting_agents: string[]
  coordination_strategy: "sequential" | "parallel" | "hybrid"
  handoff_points: string[]
  conflict_resolution: "primary" | "majority_vote" | "custom"
}

export interface OrchestrationRequest {
  request_id: string
  crew_type: string
  tasks: Array<{
    id: string
    type: string
    agent_preference?: string
    priority: number
    dependencies: string[]
  }>
  coordination_strategy?: "sequential" | "parallel" | "hybrid"
  max_parallelism?: number
  timeout?: number
}

export interface OrchestrationState {
  request_id: string
  status: "initializing" | "scheduling" | "executing" | "completed" | "failed"
  agent_workloads: Map<string, AgentWorkload>
  task_schedules: TaskSchedule[]
  execution_timeline: Array<{
    timestamp: Date
    event: string
    details: any
  }>
  metrics: {
    total_tasks: number
    completed_tasks: number
    failed_tasks: number
    total_time: number
    average_task_time: number
  }
}

// Agent capabilities registry
export const agentCapabilities: Record<
  string,
  {
    skills: string[]
    max_concurrent: number
    avg_time: number
    reliability: number
  }
> = {
  PropertyRecommenderAgent: {
    skills: ["search", "ranking", "recommendation", "personalization"],
    max_concurrent: 5,
    avg_time: 3000,
    reliability: 0.95,
  },
  MarketAnalyzerAgent: {
    skills: ["analysis", "forecasting", "reporting", "insights"],
    max_concurrent: 3,
    avg_time: 5000,
    reliability: 0.92,
  },
  PriceEstimatorAgent: {
    skills: ["valuation", "comparison", "estimation", "adjustment"],
    max_concurrent: 8,
    avg_time: 2000,
    reliability: 0.96,
  },
  DocumentParserAgent: {
    skills: ["parsing", "extraction", "validation", "processing"],
    max_concurrent: 4,
    avg_time: 4000,
    reliability: 0.93,
  },
  LoanCalculatorAgent: {
    skills: ["calculation", "comparison", "planning", "analysis"],
    max_concurrent: 6,
    avg_time: 1500,
    reliability: 0.98,
  },
  ChatAssistantAgent: {
    skills: ["routing", "support", "escalation", "guidance"],
    max_concurrent: 10,
    avg_time: 1000,
    reliability: 0.97,
  },
}

// Orchestration engine instance
export class OrchestrationEngine {
  private state: OrchestrationState
  private agentWorkloads: Map<string, AgentWorkload> = new Map()
  private taskQueue: TaskSchedule[] = []
  private executionLog: Array<{ timestamp: Date; action: string; details: any }> = []

  constructor(request: OrchestrationRequest) {
    this.state = {
      request_id: request.request_id,
      status: "initializing",
      agent_workloads: new Map(),
      task_schedules: [],
      execution_timeline: [],
      metrics: {
        total_tasks: request.tasks.length,
        completed_tasks: 0,
        failed_tasks: 0,
        total_time: 0,
        average_task_time: 0,
      },
    }

    // Initialize agent workloads
    this.initializeAgentWorkloads()
  }

  private initializeAgentWorkloads(): void {
    for (const [agentId, capabilities] of Object.entries(agentCapabilities)) {
      this.agentWorkloads.set(agentId, {
        agent_id: agentId,
        current_tasks: 0,
        max_concurrent: capabilities.max_concurrent,
        avg_execution_time: capabilities.avg_time,
        success_rate: capabilities.reliability,
        last_used: new Date(),
      })
    }
    this.state.agent_workloads = this.agentWorkloads
  }

  // Schedule tasks based on dependencies and agent availability
  async scheduleTasks(request: OrchestrationRequest): Promise<TaskSchedule[]> {
    this.state.status = "scheduling"
    this.log("Scheduling tasks", { total: request.tasks.length })

    const scheduledTasks: TaskSchedule[] = []
    const taskMap = new Map(request.tasks.map((t) => [t.id, t]))

    // Topological sort for dependency resolution
    const sortedTasks = this.topologicalSort(request.tasks)

    for (const task of sortedTasks) {
      // Find best agent for task
      const agentId = this.selectBestAgent(task, request.tasks)

      if (!agentId) {
        this.log("No suitable agent found", { task_id: task.id })
        continue
      }

      // Create schedule
      const schedule: TaskSchedule = {
        task_id: task.id,
        assigned_agent: agentId,
        priority: task.priority,
        estimated_start: new Date(Date.now() + scheduledTasks.length * 500),
        estimated_duration: this.estimateDuration(task, agentId),
        status: "queued",
        retry_count: 0,
        max_retries: 2,
      }

      scheduledTasks.push(schedule)
      this.taskQueue.push(schedule)

      // Update agent workload
      const workload = this.agentWorkloads.get(agentId)!
      workload.current_tasks++
      this.log("Task scheduled", {
        task_id: task.id,
        agent_id: agentId,
        priority: task.priority,
      })
    }

    this.state.task_schedules = scheduledTasks
    this.state.status = "scheduled"
    return scheduledTasks
  }

  // Topological sort for task dependencies
  private topologicalSort(
    tasks: Array<{ id: string; dependencies: string[] }>,
  ): Array<{ id: string; dependencies: string[] }> {
    const visited = new Set<string>()
    const sorted: Array<{ id: string; dependencies: string[] }> = []

    const visit = (taskId: string) => {
      if (visited.has(taskId)) return
      visited.add(taskId)

      const task = tasks.find((t) => t.id === taskId)
      if (task) {
        for (const dep of task.dependencies) {
          visit(dep)
        }
        sorted.push(task)
      }
    }

    for (const task of tasks) {
      visit(task.id)
    }

    return sorted
  }

  // Select best agent based on skills, workload, and reliability
  private selectBestAgent(task: any, allTasks: any[]): string | null {
    const taskSkills = this.inferTaskSkills(task.type)
    const candidates: Array<{ agent: string; score: number }> = []

    for (const [agentId, capabilities] of Object.entries(agentCapabilities)) {
      // Check if agent has required skills
      const skillMatch = taskSkills.every((skill) => capabilities.skills.includes(skill))
      if (!skillMatch) continue

      // Calculate agent score
      const workload = this.agentWorkloads.get(agentId)!
      const capacityScore = 1 - workload.current_tasks / workload.max_concurrent
      const reliabilityScore = workload.success_rate
      const recencyScore = this.getRecencyScore(workload.last_used)

      const totalScore = capacityScore * 0.5 + reliabilityScore * 0.3 + recencyScore * 0.2

      candidates.push({ agent: agentId, score: totalScore })
    }

    if (candidates.length === 0) return null

    // Return agent with highest score
    return candidates.sort((a, b) => b.score - a.score)[0].agent
  }

  // Infer required skills from task type
  private inferTaskSkills(taskType: string): string[] {
    const skillMap: Record<string, string[]> = {
      search: ["search", "ranking"],
      analysis: ["analysis", "forecasting"],
      estimation: ["valuation", "estimation"],
      parsing: ["parsing", "extraction"],
      calculation: ["calculation", "comparison"],
      routing: ["routing", "support"],
    }

    return skillMap[taskType] || []
  }

  // Calculate recency score (prefer recently used agents for load balancing)
  private getRecencyScore(lastUsed: Date): number {
    const now = new Date()
    const diffMs = now.getTime() - lastUsed.getTime()
    const diffMin = diffMs / (1000 * 60)

    // Score decreases with recency, encouraging load distribution
    return Math.max(0, 1 - diffMin / 60)
  }

  // Estimate task duration
  private estimateDuration(task: any, agentId: string): number {
    const baseTime = agentCapabilities[agentId as keyof typeof agentCapabilities]?.avg_time || 3000
    const complexityFactor = task.priority > 5 ? 1.5 : 1.0
    return Math.round(baseTime * complexityFactor)
  }

  // Execute scheduled tasks with parallelism control
  async execute(
    maxParallelism = 3,
    timeout = 60000,
  ): Promise<{
    completed: number
    failed: number
    total_time: number
  }> {
    this.state.status = "executing"
    const startTime = Date.now()
    const results: Map<string, any> = new Map()
    const inProgress: Set<string> = new Set()

    this.log("Execution started", { parallelism: maxParallelism })

    for (const schedule of this.taskQueue) {
      // Wait if max parallelism reached
      while (inProgress.size >= maxParallelism) {
        await this.sleep(100)
      }

      inProgress.add(schedule.task_id)

      // Execute task asynchronously
      this.executeTask(schedule, inProgress, results, timeout)
    }

    // Wait for all tasks to complete
    while (inProgress.size > 0) {
      await this.sleep(100)
    }

    const totalTime = Date.now() - startTime

    this.state.metrics.completed_tasks = results.size
    this.state.metrics.failed_tasks = this.taskQueue.length - results.size
    this.state.metrics.total_time = totalTime
    this.state.metrics.average_task_time = totalTime / this.taskQueue.length

    this.state.status = "completed"

    this.log("Execution completed", {
      completed: results.size,
      failed: this.taskQueue.length - results.size,
      total_time: totalTime,
    })

    return {
      completed: results.size,
      failed: this.taskQueue.length - results.size,
      total_time: totalTime,
    }
  }

  private async executeTask(
    schedule: TaskSchedule,
    inProgress: Set<string>,
    results: Map<string, any>,
    timeout: number,
  ): Promise<void> {
    try {
      schedule.status = "running"
      this.log("Task executing", { task_id: schedule.task_id, agent: schedule.assigned_agent })

      // Simulate task execution with timeout
      const result = await Promise.race([
        this.mockTaskExecution(schedule),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout)),
      ])

      schedule.status = "completed"
      results.set(schedule.task_id, result)

      this.log("Task completed", { task_id: schedule.task_id })
    } catch (error) {
      if (schedule.retry_count < schedule.max_retries) {
        schedule.retry_count++
        schedule.status = "queued"
        this.log("Task retrying", { task_id: schedule.task_id, retry: schedule.retry_count })

        // Retry with exponential backoff
        await this.sleep(Math.pow(2, schedule.retry_count) * 500)
        await this.executeTask(schedule, inProgress, results, timeout)
      } else {
        schedule.status = "failed"
        this.log("Task failed", {
          task_id: schedule.task_id,
          error: error instanceof Error ? error.message : "Unknown",
        })
      }
    } finally {
      inProgress.delete(schedule.task_id)
    }
  }

  private async mockTaskExecution(schedule: TaskSchedule): Promise<any> {
    // Simulate task execution
    const duration = Math.random() * schedule.estimated_duration + schedule.estimated_duration * 0.5
    await this.sleep(Math.round(duration))

    return {
      task_id: schedule.task_id,
      agent: schedule.assigned_agent,
      result: `Completed by ${schedule.assigned_agent}`,
      duration,
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private log(action: string, details: any): void {
    const entry = { timestamp: new Date(), action, details }
    this.executionLog.push(entry)
    this.state.execution_timeline.push(entry)
  }

  getState(): OrchestrationState {
    return this.state
  }

  getExecutionLog(): Array<{ timestamp: Date; action: string; details: any }> {
    return this.executionLog
  }
}

// Conflict resolution strategies
export class ConflictResolver {
  static resolveByPrimaryAgent(results: Record<string, any>, primaryAgent: string): any {
    return results[primaryAgent]
  }

  static resolveByMajorityVote(results: Record<string, any>): any {
    const values = Object.values(results)
    if (values.length === 0) return null

    // Simple majority voting based on result similarity
    const similarityGroups: Map<string, number> = new Map()

    for (const value of values) {
      const key = JSON.stringify(value)
      similarityGroups.set(key, (similarityGroups.get(key) || 0) + 1)
    }

    let maxVotes = 0
    let winner: any = null

    for (const [key, votes] of similarityGroups.entries()) {
      if (votes > maxVotes) {
        maxVotes = votes
        winner = JSON.parse(key)
      }
    }

    return winner
  }

  static resolveByWeightedScore(results: Record<string, any>, weights: Record<string, number>): any {
    let bestScore = Number.NEGATIVE_INFINITY
    let bestResult: any = null

    for (const [agent, result] of Object.entries(results)) {
      const score = (weights[agent] || 0.5) * (result.confidence || 0.5)
      if (score > bestScore) {
        bestScore = score
        bestResult = result
      }
    }

    return bestResult
  }
}

// Load balancing strategies
export class LoadBalancer {
  static distributeLoad(tasks: any[], agents: AgentWorkload[]): Map<string, any[]> {
    const distribution: Map<string, any[]> = new Map()

    // Initialize distribution
    for (const agent of agents) {
      distribution.set(agent.agent_id, [])
    }

    // Distribute tasks round-robin with load awareness
    const sortedAgents = [...agents].sort((a, b) => a.current_tasks - b.current_tasks)

    for (let i = 0; i < tasks.length; i++) {
      const agent = sortedAgents[i % sortedAgents.length]
      distribution.get(agent.agent_id)!.push(tasks[i])
      agent.current_tasks++
    }

    return distribution
  }

  static predictBottlenecks(schedules: TaskSchedule[]): string[] {
    const bottlenecks: string[] = []
    const agentLoad: Map<string, number> = new Map()

    // Calculate load for each agent
    for (const schedule of schedules) {
      const current = agentLoad.get(schedule.assigned_agent) || 0
      agentLoad.set(schedule.assigned_agent, current + schedule.estimated_duration)
    }

    // Identify bottlenecks (agents with >30% more load than average)
    const avgLoad = Array.from(agentLoad.values()).reduce((a, b) => a + b, 0) / agentLoad.size
    const threshold = avgLoad * 1.3

    for (const [agent, load] of agentLoad.entries()) {
      if (load > threshold) {
        bottlenecks.push(agent)
      }
    }

    return bottlenecks
  }
}
