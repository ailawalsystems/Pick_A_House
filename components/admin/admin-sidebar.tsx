import type React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Logo } from "../branding/logo"
import { AdminNav } from "./admin-nav"

interface AdminSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className, ...props }: AdminSidebarProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Logo />
          <span>Admin - Pick Your House FCT</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <AdminNav />
      </div>
    </div>
  )
}
