"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronDown, Search, Sparkles } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AiSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AiSearch({ className, ...props }: AiSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("All")

  const categories = ["All", "For Sale", "For Rent", "New Developments", "Commercial", "Agents"]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Here you would integrate with your AI search functionality
    try {
      // Mock delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Searching for:", searchQuery, "in category:", category)
      // Redirect to search results page with the query
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <form onSubmit={handleSearch} className="flex rounded-md overflow-hidden shadow-lg">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-none border-r bg-gray-100 hover:bg-gray-200 text-black px-4 flex-shrink-0"
            >
              {category}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs hidden sm:inline">AI-Powered</span>
          </div>
          <Input
            placeholder="Search properties by location, features, or describe your dream home..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 h-12 pl-16 pr-4 focus-visible:ring-0 rounded-none"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="rounded-none h-12 px-6 bg-orange-400 hover:bg-orange-500">
          <Search className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </form>
    </div>
  )
}
