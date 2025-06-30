"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Facebook, Heart, Instagram, Mail, Phone, Twitter, PhoneIcon as Whatsapp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Separator } from "../ui/separator"

interface PropertyActionsProps {
  property: any
}

export function PropertyActions({ property }: PropertyActionsProps) {
  const [favorite, setFavorite] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send message to property owner/agent
    console.log("Message sent:", contactForm)
    // Reset form
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Agent</CardTitle>
          <CardDescription>Get in touch with the property agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src={property.agent.image || "/placeholder.svg"}
              alt={property.agent.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{property.agent.name}</h3>
              <div className="text-sm text-muted-foreground">Real Estate Agent</div>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>{property.agent.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>{property.agent.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" name="name" value={contactForm.name} onChange={handleInputChange} required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input id="phone" name="phone" value={contactForm.phone} onChange={handleInputChange} required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                placeholder="I'm interested in this property..."
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={handleSubmit}>
            Send Message
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setFavorite(!favorite)}>
              <Heart className={`mr-2 h-4 w-4 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
              {favorite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 text-sm font-medium">Share Property</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon">
                <Whatsapp className="h-4 w-4" />
                <span className="sr-only">Share on WhatsApp</span>
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Share on Instagram</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
