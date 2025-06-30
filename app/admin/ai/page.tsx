import { AdminHeader } from "@/components/admin/admin-header"
import { AiAgentsManager } from "@/components/ai/ai-agents-manager"
import { LlmConfigManager } from "@/components/ai/llm-config-manager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Settings } from "lucide-react"
import Link from "next/link"

export default function AiManagementPage() {
  return (
    <div className="flex flex-col gap-4">
      <AdminHeader heading="AI Management" text="Configure and manage AI capabilities for the platform">
        <Button asChild>
          <Link href="/admin/ai/agents/add">Add New Agent</Link>
        </Button>
      </AdminHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="llm-config">LLM Configuration</TabsTrigger>
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">LLM Configuration</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold">GPT-4o Turbo</div>
                <p className="text-sm text-muted-foreground">Current LLM model in use</p>
                <Button size="sm" className="mt-3" asChild>
                  <Link href="/admin/ai/llm-config">Configure</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active AI Agents</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold">6 Agents</div>
                <p className="text-sm text-muted-foreground">CrewAI powered agents online</p>
                <Button size="sm" className="mt-3" asChild>
                  <Link href="/admin/ai/agents">Manage</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>AI System Performance</CardTitle>
              <CardDescription>View AI system metrics and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border border-dashed flex items-center justify-center text-muted-foreground">
                AI Performance Metrics Dashboard Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="llm-config">
          <LlmConfigManager />
        </TabsContent>
        <TabsContent value="agents">
          <AiAgentsManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
