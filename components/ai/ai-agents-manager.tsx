"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bot, Edit, MoreHorizontal, Play, Trash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "inactive"
  description: string
  lastUpdated: string
}

const initialAgents: Agent[] = [
  {
    id: "1",
    name: "Property Recommender",
    role: "Recommender",
    status: "active",
    description: "Analyzes user preferences to recommend suitable properties",
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    name: "Price Estimator",
    role: "Analyzer",
    status: "active",
    description: "Estimates property prices based on market data",
    lastUpdated: "1 week ago",
  },
  {
    id: "3",
    name: "Market Trend Analyzer",
    role: "Analyzer",
    status: "active",
    description: "Analyzes real estate market trends for insights",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Loan Calculator",
    role: "Calculator",
    status: "active",
    description: "Calculates loan options and mortgage rates",
    lastUpdated: "5 days ago",
  },
  {
    id: "5",
    name: "Property Document Parser",
    role: "Parser",
    status: "inactive",
    description: "Extracts information from property documents",
    lastUpdated: "2 weeks ago",
  },
  {
    id: "6",
    name: "Chat Assistant",
    role: "Assistant",
    status: "active",
    description: "Provides real-time assistance to user queries",
    lastUpdated: "1 day ago",
  },
]

export function AiAgentsManager() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)

  const toggleAgentStatus = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === "active" ? "inactive" : "active",
            }
          : agent,
      ),
    )
  }

  const deleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Agents</CardTitle>
          <CardDescription>Manage specialized AI agents powered by CrewAI</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      {agent.name}
                    </div>
                  </TableCell>
                  <TableCell>{agent.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        agent.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{agent.description}</TableCell>
                  <TableCell>{agent.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/ai/agents/${agent.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                          <Play className="mr-2 h-4 w-4" />
                          {agent.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteAgent(agent.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href="/admin/ai/agents/add">Add New Agent</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CrewAI Integration</CardTitle>
          <CardDescription>Configure how the autonomous AI agents work together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold">Agent Collaboration Framework</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This section allows you to define how the autonomous AI agents collaborate to complete complex real estate
              tasks.
            </p>
            <Button className="mt-4">Configure CrewAI Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
