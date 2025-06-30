"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"

interface ContactFiltersProps {
  filters: {
    location: string
    expertise: string[]
    rating: number
    verified: boolean
    featured: boolean
  }
  setFilters: (filters: any) => void
  onClose: () => void
}

export function ContactFilters({ filters, setFilters, onClose }: ContactFiltersProps) {
  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        expertise: [...filters.expertise, expertise],
      })
    } else {
      setFilters({
        ...filters,
        expertise: filters.expertise.filter((exp) => exp !== expertise),
      })
    }
  }

  const handleReset = () => {
    setFilters({
      location: "",
      expertise: [],
      rating: 0,
      verified: false,
      featured: false,
    })
  }

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>Filter Agents</SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Maitama">Maitama</SelectItem>
              <SelectItem value="Asokoro">Asokoro</SelectItem>
              <SelectItem value="Wuse">Wuse</SelectItem>
              <SelectItem value="Gwarinpa">Gwarinpa</SelectItem>
              <SelectItem value="Central Business District">Central Business District</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label className="mb-2 block">Expertise</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="luxury"
                checked={filters.expertise.includes("Luxury")}
                onCheckedChange={(checked) => handleExpertiseChange("Luxury", checked as boolean)}
              />
              <Label htmlFor="luxury">Luxury Properties</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commercial"
                checked={filters.expertise.includes("Commercial")}
                onCheckedChange={(checked) => handleExpertiseChange("Commercial", checked as boolean)}
              />
              <Label htmlFor="commercial">Commercial Properties</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="residential"
                checked={filters.expertise.includes("Residential")}
                onCheckedChange={(checked) => handleExpertiseChange("Residential", checked as boolean)}
              />
              <Label htmlFor="residential">Residential Properties</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="investment"
                checked={filters.expertise.includes("Investment")}
                onCheckedChange={(checked) => handleExpertiseChange("Investment", checked as boolean)}
              />
              <Label htmlFor="investment">Investment Properties</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-developments"
                checked={filters.expertise.includes("New Developments")}
                onCheckedChange={(checked) => handleExpertiseChange("New Developments", checked as boolean)}
              />
              <Label htmlFor="new-developments">New Developments</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Minimum Rating</Label>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
              <span>{filters.rating || "Any"}</span>
            </div>
          </div>
          <Slider
            defaultValue={[filters.rating]}
            max={5}
            step={1}
            onValueChange={(value) => setFilters({ ...filters, rating: value[0] })}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) => setFilters({ ...filters, verified: checked as boolean })}
            />
            <Label htmlFor="verified">Verified Agents Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={(checked) => setFilters({ ...filters, featured: checked as boolean })}
            />
            <Label htmlFor="featured">Featured Agents Only</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={onClose}>Apply Filters</Button>
      </div>
    </div>
  )
}
