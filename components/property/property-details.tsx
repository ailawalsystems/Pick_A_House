import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/format"
import { Bath, Bed, Check, Square } from "lucide-react"
import { Separator } from "../ui/separator"

interface PropertyDetailsProps {
  property: any
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="mt-1 text-muted-foreground">{property.location}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <p className="text-2xl font-bold text-primary">
            {property.currency}
            {formatCurrency(property.price)}
            {property.type === "rent" && <span className="text-sm font-normal">/month</span>}
          </p>
          <Badge variant="outline" className="text-sm">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Bed className="h-5 w-5" />
          <span>{property.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="h-5 w-5" />
          <span>{property.bathrooms} Bathrooms</span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="h-5 w-5" />
          <span>{property.area} m²</span>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-2 text-muted-foreground">{property.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Features</h2>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {property.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
