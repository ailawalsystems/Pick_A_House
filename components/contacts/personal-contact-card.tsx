"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Heart, Mail, MoreHorizontal, Phone, Trash } from "lucide-react"
import { useState } from "react"

interface PersonalContactCardProps {
  contact: any
}

export function PersonalContactCard({ contact }: PersonalContactCardProps) {
  const [favorite, setFavorite] = useState(contact.favorite)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorite(!favorite)
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(contact.email)
  }

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(contact.phone)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, this would call an API to delete the contact
    alert(`Contact ${contact.name} would be deleted`)
  }

  return (
    <Card className="p-3 hover:shadow-md transition-all">
      <div className="flex gap-3">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={contact.image} alt={contact.name} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">{contact.name}</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
              <Heart className={`h-4 w-4 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">{favorite ? "Remove from favorites" : "Add to favorites"}</span>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground truncate">{contact.relationship}</p>

          <div className="flex items-center gap-3 mt-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Phone className="h-3 w-3" />
              <span>Call</span>
            </Button>

            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Mail className="h-3 w-3" />
              <span>Email</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyPhone}>
                  <Copy className="h-4 w-4 mr-2" />
                  <span>Copy Phone</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyEmail}>
                  <Copy className="h-4 w-4 mr-2" />
                  <span>Copy Email</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleToggleFavorite} className={favorite ? "text-red-500" : ""}>
                  <Heart className={`h-4 w-4 mr-2 ${favorite ? "fill-red-500" : ""}`} />
                  <span>{favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                  <Trash className="h-4 w-4 mr-2" />
                  <span>Delete Contact</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {contact.notes && (
        <div className="mt-2 text-xs text-muted-foreground bg-muted p-2 rounded-md">{contact.notes}</div>
      )}
    </Card>
  )
}
