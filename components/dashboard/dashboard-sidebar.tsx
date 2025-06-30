import type React from "react"
import { cn } from "@/lib/utils"
import { Link } from "lucide-react"
import { Logo } from "../branding/logo"
import { DashboardNav } from "./dashboard-nav"

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className, ...props }: DashboardSidebarProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo />
          <span>Pick Your House FCT</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <DashboardNav />
      </div>
    </div>
  )
}
