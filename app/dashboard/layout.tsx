import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogOut, Menu, Settings } from "lucide-react"
import Link from "next/link"
import { Logo } from "../../components/branding/logo"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        {/* Sidebar for desktop */}
        <DashboardSidebar className="hidden border-r bg-muted/40 md:block" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="flex h-16 items-center border-b">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Logo />
                    <span>Pick Your House FCT</span>
                  </Link>
                </div>
                <DashboardNav className="mt-4" />
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Admin Settings</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/auth/login">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Link>
              </Button>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
