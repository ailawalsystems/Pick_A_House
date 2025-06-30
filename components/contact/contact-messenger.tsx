"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Facebook, MessageCircle, PhoneIcon, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface Message {
  id: number
  sender: "user" | "agent"
  text: string
  timestamp: Date
  status?: "sending" | "sent" | "delivered" | "read"
}

interface Contact {
  id: number
  name: string
  role: string
  avatar: string
  lastMessage?: string
  lastMessageTime?: Date
  unread?: number
  online?: boolean
}

export function ContactMessenger() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      text: "👋 Hello! How can I help you with your property search today?",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
    },
  ])
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Property Agent",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hello! How can I help you with your property search today?",
      lastMessageTime: new Date(Date.now() - 3600000),
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Mortgage Advisor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I can help you with financing options for your new home.",
      lastMessageTime: new Date(Date.now() - 86400000),
      unread: 2,
      online: false,
    },
    {
      id: 3,
      name: "Robert Johnson",
      role: "Property Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The property you inquired about is still available.",
      lastMessageTime: new Date(Date.now() - 172800000),
      unread: 0,
      online: true,
    },
  ])
  const [activeContact, setActiveContact] = useState<Contact>(contacts[0])
  const [isTyping, setIsTyping] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])
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

      const responses = [
        "Thank you for your message! I'll check the available properties matching your criteria.",
        "Great! I can help you with that. Would you like to schedule a viewing?",
        "I understand what you're looking for. Let me find some options for you.",
        "Thanks for reaching out! I'll get back to you with more details shortly.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const agentMessage: Message = {
        id: Date.now() + 1,
        sender: "agent",
        text: randomResponse,
        timestamp: new Date(),
        status: "read",
      }

      setMessages((prev) => [...prev, agentMessage])

      // Update contact's last message
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === activeContact.id
            ? {
                ...contact,
                lastMessage: randomResponse,
                lastMessageTime: new Date(),
              }
            : contact,
        ),
      )
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return formatTime(date)
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div>
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
            <span className="sr-only">Contact us</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 h-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader className="px-4 py-2 border-b flex-shrink-0">
            <DialogTitle className="text-lg">Messages</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
              <TabsTrigger value="chat" className="rounded-none">
                Chat
              </TabsTrigger>
              <TabsTrigger value="contacts" className="rounded-none">
                Contacts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
              <div className="border-b p-3 flex items-center gap-3 flex-shrink-0">
                <Avatar>
                  <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                  <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium flex items-center gap-2">
                    {activeContact.name}
                    {activeContact.online && <span className="h-2 w-2 rounded-full bg-green-500"></span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{activeContact.role}</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <PhoneIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex gap-2 max-w-[85%]", msg.sender === "user" ? "ml-auto flex-row-reverse" : "")}
                  >
                    {msg.sender === "agent" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                        <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
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
                      <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                      <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
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

              <div className="p-3 border-t flex gap-2 flex-shrink-0">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="flex-1 overflow-y-auto p-0 m-0 data-[state=inactive]:hidden">
              <div className="p-3">
                <Input placeholder="Search contacts..." className="mb-3" />

                <div className="space-y-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted transition-colors",
                        activeContact.id === contact.id && "bg-muted",
                      )}
                      onClick={() => {
                        setActiveContact(contact)
                        setActiveTab("chat")

                        // Clear unread count
                        if (contact.unread) {
                          setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)))
                        }
                      }}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{contact.name}</p>
                          {contact.lastMessageTime && (
                            <span className="text-xs text-muted-foreground">{formatDate(contact.lastMessageTime)}</span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && (
                            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 mt-4 border-t">
                <h3 className="font-medium mb-2">Connect with us</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    <span>Facebook</span>
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <PhoneIcon className="h-4 w-4 text-green-600" />
                    <span>WhatsApp</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
