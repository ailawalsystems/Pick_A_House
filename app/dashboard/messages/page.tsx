import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MessageList } from "@/components/messages/message-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="Messages" text="Manage your communication with property owners and interested buyers">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </DashboardHeader>

      <MessageList />
    </div>
  )
}
