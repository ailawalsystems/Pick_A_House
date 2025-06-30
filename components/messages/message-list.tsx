"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/format"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  property?: {
    id: string
    title: string
    image: string
  }
  lastMessage: string
  date: Date
  unread: boolean
}

const sampleMessages: Message[] = [
  {
    id: "1",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop-1",
      title: "Luxury Villa with Swimming Pool",
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "I'm interested in scheduling a viewing for this property. Is it available this weekend?",
    date: new Date("2023-06-01T10:30:00"),
    unread: true,
  },
  {
    id: "2",
    sender: {
      id: "user-2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop-2",
      title: "Modern Apartment in City Center",
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Thank you for the information. I will review it and get back to you soon.",
    date: new Date("2023-05-28T15:45:00"),
    unread: false,
  },
  {
    id: "3",
    sender: {
      id: "user-3",
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop-3",
      title: "Family Home with Garden",
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Is the property still available? I would like to make an offer.",
    date: new Date("2023-05-27T09:15:00"),
    unread: true,
  },
  {
    id: "4",
    sender: {
      id: "user-4",
      name: "Lisa Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: {
      id: "prop-4",
      title: "Penthouse with City View",
      image: "/placeholder.svg?height=60&width=60",
    },
    lastMessage: "Can you provide more information about the neighborhood?",
    date: new Date("2023-05-25T14:20:00"),
    unread: false,
  },
  {
    id: "5",
    sender: {
      id: "user-5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "I have a general question about property valuations in the area.",
    date: new Date("2023-05-24T11:10:00"),
    unread: false,
  },
]

export function MessageList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>(sampleMessages)

  const filteredMessages = messages.filter(
    (message) =>
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.property?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const markAsRead = (id: string) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, unread: false } : message)))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Manage your conversations with users</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {messages.filter((m) => m.unread).length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-4">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <Link
                    key={message.id}
                    href={`/dashboard/messages/${message.id}`}
                    onClick={() => markAsRead(message.id)}
                  >
                    <div
                      className={`rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                        message.unread ? "border-primary/50 bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex gap-4">
                        <Image
                          src={message.sender.avatar || "/placeholder.svg"}
                          alt={message.sender.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {message.sender.name}
                              {message.unread && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary" />}
                            </h4>
                            <span className="text-xs text-muted-foreground">{formatDate(message.date)}</span>
                          </div>
                          {message.property && (
                            <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                              <Image
                                src={message.property.image || "/placeholder.svg"}
                                alt={message.property.title}
                                width={30}
                                height={30}
                                className="rounded-sm object-cover"
                              />
                              <span className="text-xs">{message.property.title}</span>
                            </div>
                          )}
                          <p className="line-clamp-1 text-sm text-muted-foreground">{message.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">No messages found</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="unread">
            <div className="space-y-4">
              {filteredMessages.filter((m) => m.unread).length > 0 ? (
                filteredMessages
                  .filter((m) => m.unread)
                  .map((message) => (
                    <Link
                      key={message.id}
                      href={`/dashboard/messages/${message.id}`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div className="rounded-lg border border-primary/50 bg-primary/5 p-4 transition-colors hover:bg-muted/50">
                        <div className="flex gap-4">
                          <Image
                            src={message.sender.avatar || "/placeholder.svg"}
                            alt={message.sender.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                {message.sender.name}
                                <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                              </h4>
                              <span className="text-xs text-muted-foreground">{formatDate(message.date)}</span>
                            </div>
                            {message.property && (
                              <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                                <Image
                                  src={message.property.image || "/placeholder.svg"}
                                  alt={message.property.title}
                                  width={30}
                                  height={30}
                                  className="rounded-sm object-cover"
                                />
                                <span className="text-xs">{message.property.title}</span>
                              </div>
                            )}
                            <p className="line-clamp-1 text-sm text-muted-foreground">{message.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">No unread messages</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="property">
            <div className="space-y-4">
              {filteredMessages.filter((m) => m.property).length > 0 ? (
                filteredMessages
                  .filter((m) => m.property)
                  .map((message) => (
                    <Link
                      key={message.id}
                      href={`/dashboard/messages/${message.id}`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div
                        className={`rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                          message.unread ? "border-primary/50 bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex gap-4">
                          <Image
                            src={message.sender.avatar || "/placeholder.svg"}
                            alt={message.sender.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                {message.sender.name}
                                {message.unread && (
                                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                                )}
                              </h4>
                              <span className="text-xs text-muted-foreground">{formatDate(message.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                              <Image
                                src={message.property!.image || "/placeholder.svg"}
                                alt={message.property!.title}
                                width={30}
                                height={30}
                                className="rounded-sm object-cover"
                              />
                              <span className="text-xs">{message.property!.title}</span>
                            </div>
                            <p className="line-clamp-1 text-sm text-muted-foreground">{message.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">No property-related messages</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="general">
            <div className="space-y-4">
              {filteredMessages.filter((m) => !m.property).length > 0 ? (
                filteredMessages
                  .filter((m) => !m.property)
                  .map((message) => (
                    <Link
                      key={message.id}
                      href={`/dashboard/messages/${message.id}`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div
                        className={`rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                          message.unread ? "border-primary/50 bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex gap-4">
                          <Image
                            src={message.sender.avatar || "/placeholder.svg"}
                            alt={message.sender.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                {message.sender.name}
                                {message.unread && (
                                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                                )}
                              </h4>
                              <span className="text-xs text-muted-foreground">{formatDate(message.date)}</span>
                            </div>
                            <p className="line-clamp-1 text-sm text-muted-foreground">{message.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">No general messages</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
