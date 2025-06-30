"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AreaChart, Bot, Building, CreditCard, Database, Layers, MessageSquare, Shield, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Layers,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: Building,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: AreaChart,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "AI Management",
    href: "/admin/ai",
    icon: Bot,
    children: [
      {
        title: "LLM Configuration",
        href: "/admin/ai/llm-config",
      },
      {
        title: "AI Agents",
        href: "/admin/ai/agents",
      },
      {
        title: "Search Integration",
        href: "/admin/ai/search",
      },
    ],
  },
  {
    title: "System",
    href: "/admin/system",
    icon: Database,
  },
  {
    title: "Security",
    href: "/admin/security",
    icon: Shield,
  },
]

interface AdminNavProps extends React.HTMLAttributes<HTMLElement> {}

export function AdminNav({ className, ...props }: AdminNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("grid gap-2 px-2", className)} {...props}>
      {navItems.map((item, index) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <div key={index} className="grid gap-1">
            <Button asChild variant={isActive ? "secondary" : "ghost"} size="sm" className="justify-start">
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
            {item.children && isActive && (
              <div className="grid gap-1 pl-6">
                {item.children.map((child, childIndex) => {
                  const isChildActive = pathname === child.href

                  return (
                    <Button
                      key={childIndex}
                      asChild
                      variant={isChildActive ? "secondary" : "ghost"}
                      size="sm"
                      className="justify-start"
                    >
                      <Link href={child.href}>{child.title}</Link>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
