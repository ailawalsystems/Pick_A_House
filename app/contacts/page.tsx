import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactsDirectory } from "@/components/contacts/contacts-directory"

export default function ContactsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-mesh-gradient bg-noise">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Contacts Directory</h1>
            <p className="text-muted-foreground">
              Connect with verified estate agents and manage your personal contacts
            </p>
          </div>

          <ContactsDirectory />
        </div>
      </main>
      <Footer />
    </div>
  )
}
