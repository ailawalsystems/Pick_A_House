import type React from "react"
import { cn } from "@/lib/utils"

interface AdminHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function AdminHeader({ heading, text, children, className }: AdminHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
