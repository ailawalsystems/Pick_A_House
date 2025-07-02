"use client"

import type * as React from "react"
import { AdminSearchForm } from "./admin-search-form"
import { Logo } from "../branding/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  AreaChart,
  Bot,
  Building,
  CreditCard,
  Database,
  Layers,
  MessageSquare,
  Shield,
  Users,
  Settings,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Enhanced navigation data with better organization
const data = {
  navMain: [
    {
      title: "Overview",
      url: "/admin",
      icon: Layers,
      isActive: true,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/admin/users",
        },
        {
          title: "User Roles",
          url: "/admin/users/roles",
        },
        {
          title: "User Activity",
          url: "/admin/users/activity",
        },
      ],
    },
    {
      title: "Property Management",
      url: "/admin/properties",
      icon: Building,
      items: [
        {
          title: "All Properties",
          url: "/admin/properties",
        },
        {
          title: "Property Categories",
          url: "/admin/properties/categories",
        },
        {
          title: "Featured Properties",
          url: "/admin/properties/featured",
        },
        {
          title: "Property Analytics",
          url: "/admin/properties/analytics",
        },
      ],
    },
    {
      title: "Communication",
      url: "/admin/messages",
      icon: MessageSquare,
      items: [
        {
          title: "Messages",
          url: "/admin/messages",
        },
        {
          title: "Notifications",
          url: "/admin/notifications",
        },
        {
          title: "Email Templates",
          url: "/admin/email-templates",
        },
      ],
    },
    {
      title: "AI & Intelligence",
      url: "/admin/ai",
      icon: Bot,
      items: [
        {
          title: "LLM Configuration",
          url: "/admin/ai/llm-config",
        },
        {
          title: "AI Agents",
          url: "/admin/ai/agents",
        },
        {
          title: "Search Integration",
          url: "/admin/ai/search",
        },
        {
          title: "Conversation Logs",
          url: "/admin/ai/conversations",
        },
      ],
    },
    {
      title: "Analytics & Reports",
      url: "/admin/analytics",
      icon: AreaChart,
      items: [
        {
          title: "Platform Analytics",
          url: "/admin/analytics",
        },
        {
          title: "User Behavior",
          url: "/admin/analytics/users",
        },
        {
          title: "Property Performance",
          url: "/admin/analytics/properties",
        },
        {
          title: "Revenue Reports",
          url: "/admin/analytics/revenue",
        },
      ],
    },
    {
      title: "Financial Management",
      url: "/admin/payments",
      icon: CreditCard,
      items: [
        {
          title: "Payments",
          url: "/admin/payments",
        },
        {
          title: "Subscriptions",
          url: "/admin/subscriptions",
        },
        {
          title: "Billing Settings",
          url: "/admin/billing-settings",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "System Configuration",
      url: "/admin/system",
      icon: Database,
      items: [
        {
          title: "Database",
          url: "/admin/system/database",
        },
        {
          title: "API Settings",
          url: "/admin/system/api",
        },
        {
          title: "Performance",
          url: "/admin/system/performance",
        },
      ],
    },
    {
      title: "Security & Privacy",
      url: "/admin/security",
      icon: Shield,
      items: [
        {
          title: "Access Control",
          url: "/admin/security/access",
        },
        {
          title: "Audit Logs",
          url: "/admin/security/logs",
        },
        {
          title: "Privacy Settings",
          url: "/admin/security/privacy",
        },
      ],
    },
    {
      title: "Platform Settings",
      url: "/admin/settings",
      icon: Settings,
      items: [
        {
          title: "General Settings",
          url: "/admin/settings/general",
        },
        {
          title: "Appearance",
          url: "/admin/settings/appearance",
        },
        {
          title: "Integrations",
          url: "/admin/settings/integrations",
        },
      ],
    },
  ],
}

export function AdminAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Logo />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Pick Your House FCT</span>
            <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
        <AdminSearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items && isActive && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System & Configuration */}
        <SidebarGroup>
          <SidebarGroupLabel>System & Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items && isActive && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Home />
                <span>Back to Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
