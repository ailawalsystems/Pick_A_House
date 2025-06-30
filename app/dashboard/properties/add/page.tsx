import { AddPropertyForm } from "@/components/property/add-property-form"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function AddPropertyPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="Add Property" text="Add a new property listing to your portfolio" />
      <AddPropertyForm />
    </div>
  )
}
