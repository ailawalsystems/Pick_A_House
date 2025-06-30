"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { InfoIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const llmConfigSchema = z.object({
  model: z.string(),
  apiKey: z.string().min(1, { message: "API key is required" }),
  temperature: z.coerce.number().min(0).max(2),
  maxTokens: z.coerce.number().min(1).max(8192),
  topP: z.coerce.number().min(0).max(1),
  frequencyPenalty: z.coerce.number().min(0).max(2),
  presencePenalty: z.coerce.number().min(0).max(2),
  systemPrompt: z.string().optional(),
  streaming: z.boolean(),
  cache: z.boolean(),
})

export function LlmConfigManager() {
  const form = useForm<z.infer<typeof llmConfigSchema>>({
    resolver: zodResolver(llmConfigSchema),
    defaultValues: {
      model: "gpt-4o",
      apiKey: "sk-...",
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
      systemPrompt: "",
      streaming: true,
      cache: true,
    },
  })

  function onSubmit(values: z.infer<typeof llmConfigSchema>) {
    // In a real app, you would send this to your API
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LLM Configuration</CardTitle>
          <CardDescription>Configure the Language Model settings for the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="openai" className="space-y-4">
            <TabsList>
              <TabsTrigger value="openai">OpenAI</TabsTrigger>
              <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
              <TabsTrigger value="local">Local Model</TabsTrigger>
            </TabsList>
            <TabsContent value="openai">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                              <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Select the AI model to use</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="sk-..." {...field} />
                          </FormControl>
                          <FormDescription>Your OpenAI API key</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature: {field.value}</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={2}
                            step={0.01}
                            defaultValue={[field.value]}
                            onValueChange={(values) => field.onChange(values[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Controls randomness: Higher values produce more diverse outputs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Tokens: {field.value}</FormLabel>
                        <FormControl>
                          <Slider
                            min={1}
                            max={8192}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(values) => field.onChange(values[0])}
                          />
                        </FormControl>
                        <FormDescription>Maximum number of tokens to generate</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="topP"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Top P: {field.value}</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={1}
                              step={0.01}
                              defaultValue={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormDescription>Alternative to temperature for nucleus sampling</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="frequencyPenalty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency Penalty: {field.value}</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={2}
                              step={0.01}
                              defaultValue={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormDescription>Reduces repetition of token sequences</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="presencePenalty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Presence Penalty: {field.value}</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={2}
                              step={0.01}
                              defaultValue={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormDescription>Increases likelihood of discussing new topics</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="systemPrompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Prompt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a system prompt to guide the AI's behavior..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Instructions to set the behavior of the AI assistant</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="streaming"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Streaming</FormLabel>
                            <FormDescription>Stream responses token by token</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cache"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Cache</FormLabel>
                            <FormDescription>Cache identical requests for faster responses</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save Configuration</Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="anthropic">
              <div className="rounded-md border p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-lg font-medium">
                  <InfoIcon className="h-5 w-5 text-blue-500" />
                  <span>Anthropic Configuration</span>
                </div>
                <p className="mt-2 text-muted-foreground">Configure settings for Claude models by Anthropic</p>
              </div>
            </TabsContent>
            <TabsContent value="local">
              <div className="rounded-md border p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-lg font-medium">
                  <InfoIcon className="h-5 w-5 text-green-500" />
                  <span>Local Model Configuration</span>
                </div>
                <p className="mt-2 text-muted-foreground">Configure settings for self-hosted local models</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save All Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
