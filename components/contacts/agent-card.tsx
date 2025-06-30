"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, MapPin, Star } from "lucide-react"

interface AgentCardProps {
  agent: any
  onClick: () => void
  isSelected: boolean
}

export function AgentCard({ agent, onClick, isSelected }: AgentCardProps) {
  return (
    <Card
      className={cn(
        "p-3 cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-primary ring-1 ring-primary" : "",
      )}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={agent.image} alt={agent.name} />
          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-medium truncate">{agent.name}</h3>
            {agent.verified && <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />}
          </div>

          <p className="text-sm text-muted-foreground truncate">{agent.title}</p>

          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{agent.location}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span className="text-xs ml-1">{agent.rating}</span>
            </div>

            <div className="text-xs text-muted-foreground">{agent.properties} properties</div>

            {agent.featured && (
              <Badge variant="outline" className="text-[10px] h-4 bg-amber-50 text-amber-700 border-amber-200">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
