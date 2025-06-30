"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AreaChart, Building, CreditCard, Home, MessageSquare, Settings, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: Building,
    children: [
      {
        title: "My Properties",
        href: "/dashboard/properties",
      },
      {
        title: "Add Property",
        href: "/dashboard/properties/add",
      },
      {
        title: "Favorites",
        href: "/dashboard/properties/favorites",
      },
    ],
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: AreaChart,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
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
