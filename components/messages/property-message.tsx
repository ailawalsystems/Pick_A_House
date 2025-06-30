"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ChevronDown, Facebook, MessageCircle, Send, Smartphone, PhoneIcon as WhatsApp } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface PropertyMessageProps {
  property: any
  className?: string
}

export function PropertyMessage({ property, className }: PropertyMessageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("direct")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: "agent",
      text: "Hello! I'm the agent for this property. How can I help you?",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date(),
      status: "sending",
    }

    setMessages([...messages, userMessage])
    setMessage("")

    // Update status to sent after a delay
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))
    }, 500)

    // Update status to delivered after a delay
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    // Show typing indicator
    setTimeout(() => {
      setIsTyping(true)
    }, 1500)

    // Simulate agent response after a delay
    setTimeout(() => {
      setIsTyping(false)

      const agentMessage = {
        id: Date.now() + 1,
        sender: "agent",
        text: "Thank you for your interest! I'll get back to you with more details about this property shortly.",
        timestamp: new Date(),
        status: "read",
      }

      setMessages((prev) => [...prev, agentMessage])
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={cn(
              "fixed bottom-6 right-6 z-50 rounded-full shadow-lg h-14 w-14 p-0",
              hasNewMessage && "animate-pulse-slow",
            )}
            onClick={() => setHasNewMessage(false)}
          >
            <MessageCircle className="h-6 w-6" />
            {hasNewMessage && <span className="notification-badge">1</span>}
            <span className="sr-only">Contact about this property</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0">
          <DialogHeader className="px-4 py-2 border-b">
            <DialogTitle className="text-lg">Contact about this property</DialogTitle>
            <DialogDescription className="text-sm">
              Get in touch with the agent about {property.title}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="direct" value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3 px-4">
              <TabsTrigger value="direct" className="rounded-full">
                Direct
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="rounded-full">
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="social" className="rounded-full">
                Social
              </TabsTrigger>
            </TabsList>

            <TabsContent value="direct" className="space-y-4 p-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar>
                  <AvatarImage src={property.agent.image} alt={property.agent.name} />
                  <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{property.agent.name}</p>
                  <p className="text-xs text-muted-foreground">{property.agent.company}</p>
                </div>
              </div>

              <div className="h-[300px] border rounded-md p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn("flex gap-2 max-w-[85%]", msg.sender === "user" ? "ml-auto flex-row-reverse" : "")}
                    >
                      {msg.sender === "agent" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={property.agent.image} alt={property.agent.name} />
                          <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className={cn(msg.sender === "user" ? "message-bubble-user" : "message-bubble-other")}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>{formatTime(msg.timestamp)}</span>
                          {msg.sender === "user" && msg.status && (
                            <span className="ml-1">
                              {msg.status === "sending" && "• Sending..."}
                              {msg.status === "sent" && "• Sent"}
                              {msg.status === "delivered" && "• Delivered"}
                              {msg.status === "read" && "• Read"}
                            </span>
                          )}
                        </div>
                      </div>
                      {msg.sender === "user" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2 max-w-[85%]">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={property.agent.image} alt={property.agent.name} />
                        <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="message-bubble-other py-3">
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="whatsapp" className="space-y-4 p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                  <WhatsApp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp the Agent</h3>
                  <p className="text-sm text-muted-foreground">Send a message directly to the agent's WhatsApp</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <p className="text-sm mb-4">
                  You'll be redirected to WhatsApp to chat with {property.agent.name} about {property.title}
                </p>

                <Textarea
                  placeholder="Your message (optional)"
                  className="mb-4"
                  rows={3}
                  defaultValue={`Hi, I'm interested in the property "${property.title}" listed for ${property.currency}${property.price}. Can you provide more information?`}
                />

                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <WhatsApp className="h-4 w-4" />
                  <span>Open WhatsApp</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4 p-4">
              <div className="grid gap-4">
                <Button variant="outline" className="justify-start gap-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span>Message on Facebook</span>
                </Button>

                <Button variant="outline" className="justify-start gap-2">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <span>Message on Telegram</span>
                </Button>

                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>You can also call the agent directly:</p>
                  <p className="font-medium mt-1">{property.agent.phone}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <span>Share Property</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Facebook className="h-4 w-4 mr-2" />
                  <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <WhatsApp className="h-4 w-4 mr-2" />
                  <span>WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span>SMS</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="w-full sm:w-auto" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
