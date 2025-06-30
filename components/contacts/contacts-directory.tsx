"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/contacts/agent-card"
import { PersonalContactCard } from "@/components/contacts/personal-contact-card"
import { ContactFilters } from "@/components/contacts/contact-filters"
import { AgentProfile } from "@/components/contacts/agent-profile"
import { PlusCircle, Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AddContactForm } from "@/components/contacts/add-contact-form"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for estate agents
const sampleAgents = [
  {
    id: "1",
    name: "John Doe",
    title: "Senior Property Consultant",
    company: "Premium Realty",
    image: "/placeholder.svg?height=400&width=400",
    expertise: ["Luxury Homes", "Commercial Properties"],
    rating: 4.8,
    reviews: 24,
    properties: 15,
    location: "Maitama, Abuja",
    verified: true,
    featured: true,
    about:
      "With over 10 years of experience in the Abuja real estate market, I specialize in luxury properties and commercial real estate. My goal is to help clients find their perfect property match.",
    phone: "+234 123 456 7890",
    email: "john.doe@example.com",
    social: {
      facebook: "https://facebook.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
    languages: ["English", "Hausa"],
    certifications: ["Licensed Real Estate Broker", "Certified Property Manager"],
    featuredProperties: [
      {
        id: "prop1",
        title: "Luxury Villa with Pool",
        location: "Maitama, Abuja",
        price: 250000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "prop2",
        title: "Modern Office Space",
        location: "Central Business District, Abuja",
        price: 180000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "Real Estate Agent",
    company: "City Properties",
    image: "/placeholder.svg?height=400&width=400",
    expertise: ["Residential", "New Developments"],
    rating: 4.9,
    reviews: 32,
    properties: 21,
    location: "Asokoro, Abuja",
    verified: true,
    featured: false,
    about:
      "I'm passionate about helping families find their dream homes. With my extensive knowledge of the Abuja property market, I can guide you through every step of the buying or selling process.",
    phone: "+234 123 456 7891",
    email: "jane.smith@example.com",
    social: {
      facebook: "https://facebook.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
    languages: ["English", "Yoruba"],
    certifications: ["Certified Residential Specialist"],
    featuredProperties: [
      {
        id: "prop3",
        title: "Family Home with Garden",
        location: "Asokoro, Abuja",
        price: 150000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "3",
    name: "Robert Johnson",
    title: "Commercial Property Specialist",
    company: "Business Real Estate",
    image: "/placeholder.svg?height=400&width=400",
    expertise: ["Commercial", "Office Spaces", "Retail"],
    rating: 4.7,
    reviews: 18,
    properties: 12,
    location: "Central Business District, Abuja",
    verified: true,
    featured: true,
    about:
      "I specialize in commercial real estate, helping businesses find the perfect location for their operations. My expertise includes office spaces, retail properties, and industrial facilities.",
    phone: "+234 123 456 7892",
    email: "robert.johnson@example.com",
    social: {
      facebook: "https://facebook.com/robertjohnson",
      linkedin: "https://linkedin.com/in/robertjohnson",
      instagram: "https://instagram.com/robertjohnson",
    },
    languages: ["English"],
    certifications: ["Commercial Investment Member", "Business Property Expert"],
    featuredProperties: [
      {
        id: "prop4",
        title: "Prime Office Building",
        location: "Central Business District, Abuja",
        price: 350000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "prop5",
        title: "Retail Space",
        location: "Wuse, Abuja",
        price: 120000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "4",
    name: "Lisa Brown",
    title: "Luxury Property Consultant",
    company: "Elite Homes",
    image: "/placeholder.svg?height=400&width=400",
    expertise: ["Luxury Villas", "Penthouses", "High-End Properties"],
    rating: 4.9,
    reviews: 27,
    properties: 9,
    location: "Maitama, Abuja",
    verified: true,
    featured: false,
    about:
      "I cater to discerning clients looking for exceptional properties. My portfolio includes some of the most prestigious addresses in Abuja, and I provide a personalized service to meet the unique needs of high-net-worth individuals.",
    phone: "+234 123 456 7893",
    email: "lisa.brown@example.com",
    social: {
      facebook: "https://facebook.com/lisabrown",
      linkedin: "https://linkedin.com/in/lisabrown",
      instagram: "https://instagram.com/lisabrown",
    },
    languages: ["English", "French"],
    certifications: ["Luxury Home Marketing Specialist", "International Property Specialist"],
    featuredProperties: [
      {
        id: "prop6",
        title: "Exclusive Penthouse",
        location: "Maitama, Abuja",
        price: 450000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "5",
    name: "Michael Wilson",
    title: "Residential Property Expert",
    company: "Home Finders",
    image: "/placeholder.svg?height=400&width=400",
    expertise: ["Residential", "Affordable Housing", "First-Time Buyers"],
    rating: 4.6,
    reviews: 41,
    properties: 28,
    location: "Gwarinpa, Abuja",
    verified: true,
    featured: false,
    about:
      "I help families and individuals find homes that match their needs and budgets. I'm particularly focused on assisting first-time buyers navigate the property market and find affordable housing options.",
    phone: "+234 123 456 7894",
    email: "michael.wilson@example.com",
    social: {
      facebook: "https://facebook.com/michaelwilson",
      linkedin: "https://linkedin.com/in/michaelwilson",
      instagram: "https://instagram.com/michaelwilson",
    },
    languages: ["English", "Igbo"],
    certifications: ["Residential Property Specialist", "First-Time Buyer Advisor"],
    featuredProperties: [
      {
        id: "prop7",
        title: "Affordable Family Home",
        location: "Gwarinpa, Abuja",
        price: 85000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "prop8",
        title: "Starter Apartment",
        location: "Kubwa, Abuja",
        price: 45000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "6",
    name: "Sarah Johnson",
    title: "Investment Property Advisor",
    company: "Wealth Properties",
    image: "/placeholder.svg?height=400&width=400",
    expertise: ["Investment Properties", "Rental Income", "Property Portfolio"],
    rating: 4.8,
    reviews: 19,
    properties: 14,
    location: "Wuse, Abuja",
    verified: true,
    featured: true,
    about:
      "I specialize in helping investors build and manage profitable property portfolios. My expertise includes identifying high-yield properties, analyzing market trends, and maximizing rental income.",
    phone: "+234 123 456 7895",
    email: "sarah.johnson@example.com",
    social: {
      facebook: "https://facebook.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      instagram: "https://instagram.com/sarahjohnson",
    },
    languages: ["English"],
    certifications: ["Investment Property Specialist", "Financial Planning Certification"],
    featuredProperties: [
      {
        id: "prop9",
        title: "Rental Apartment Block",
        location: "Wuse, Abuja",
        price: 280000000,
        currency: "₦",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
]

// Sample data for personal contacts
const samplePersonalContacts = [
  {
    id: "p1",
    name: "David Williams",
    relationship: "Property Lawyer",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+234 987 654 3210",
    email: "david.williams@example.com",
    notes: "Handles all my property legal documentation",
    favorite: true,
  },
  {
    id: "p2",
    name: "Emily Johnson",
    relationship: "Interior Designer",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+234 987 654 3211",
    email: "emily.johnson@example.com",
    notes: "Great for modern interior designs",
    favorite: false,
  },
  {
    id: "p3",
    name: "James Smith",
    relationship: "Property Inspector",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+234 987 654 3212",
    email: "james.smith@example.com",
    notes: "Thorough inspection reports, recommended by John",
    favorite: true,
  },
]

export function ContactsDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [filteredAgents, setFilteredAgents] = useState(sampleAgents)
  const [filteredPersonalContacts, setFilteredPersonalContacts] = useState(samplePersonalContacts)
  const [activeTab, setActiveTab] = useState("agents")
  const [showFilters, setShowFilters] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    expertise: [],
    rating: 0,
    verified: false,
    featured: false,
  })

  // Filter agents based on search query and filters
  useEffect(() => {
    let results = sampleAgents

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.company.toLowerCase().includes(query) ||
          agent.location.toLowerCase().includes(query) ||
          agent.expertise.some((exp) => exp.toLowerCase().includes(query)),
      )
    }

    // Apply location filter
    if (filters.location) {
      results = results.filter((agent) => agent.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Apply expertise filter
    if (filters.expertise.length > 0) {
      results = results.filter((agent) =>
        filters.expertise.some((exp) =>
          agent.expertise.some((agentExp) => agentExp.toLowerCase().includes(exp.toLowerCase())),
        ),
      )
    }

    // Apply rating filter
    if (filters.rating > 0) {
      results = results.filter((agent) => agent.rating >= filters.rating)
    }

    // Apply verified filter
    if (filters.verified) {
      results = results.filter((agent) => agent.verified)
    }

    // Apply featured filter
    if (filters.featured) {
      results = results.filter((agent) => agent.featured)
    }

    setFilteredAgents(results)
  }, [searchQuery, filters])

  // Filter personal contacts based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const results = samplePersonalContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.relationship.toLowerCase().includes(query) ||
          (contact.notes && contact.notes.toLowerCase().includes(query)),
      )
      setFilteredPersonalContacts(results)
    } else {
      setFilteredPersonalContacts(samplePersonalContacts)
    }
  }, [searchQuery])

  const handleAddContact = (newContact: any) => {
    // In a real app, this would send data to an API
    console.log("Adding new contact:", newContact)
    setShowAddContact(false)
    // For demo purposes, we'll just show a success message
    alert("Contact added successfully!")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - Filters and Contact List */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <Tabs defaultValue="agents" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="agents">Estate Agents</TabsTrigger>
                <TabsTrigger value="personal">Personal Contacts</TabsTrigger>
              </TabsList>

              {activeTab === "personal" && (
                <Sheet open={showAddContact} onOpenChange={setShowAddContact}>
                  <SheetTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <AddContactForm onSubmit={handleAddContact} onCancel={() => setShowAddContact(false)} />
                  </SheetContent>
                </Sheet>
              )}
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === "agents" ? "agents" : "contacts"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            {activeTab === "agents" && (
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2 mb-4">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filter Agents</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <ContactFilters filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />
                </SheetContent>
              </Sheet>
            )}

            <TabsContent value="agents" className="m-0">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        onClick={() => setSelectedAgent(agent)}
                        isSelected={selectedAgent?.id === agent.id}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No agents found matching your criteria</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("")
                          setFilters({
                            location: "",
                            expertise: [],
                            rating: 0,
                            verified: false,
                            featured: false,
                          })
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="personal" className="m-0">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {filteredPersonalContacts.length > 0 ? (
                    filteredPersonalContacts.map((contact) => (
                      <PersonalContactCard key={contact.id} contact={contact} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No personal contacts found</p>
                      {searchQuery && (
                        <Button variant="link" onClick={() => setSearchQuery("")}>
                          Clear search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Column - Agent Profile or Welcome Message */}
      <div className="md:col-span-2">
        {activeTab === "agents" && selectedAgent ? (
          <AgentProfile agent={selectedAgent} />
        ) : activeTab === "agents" ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Estate Agent Directory</h2>
              <p className="text-muted-foreground mb-6">
                Select an agent from the list to view their detailed profile, expertise, and property listings.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{sampleAgents.length}</div>
                  <div className="text-sm text-muted-foreground">Verified Agents</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {sampleAgents.reduce((total, agent) => total + agent.properties, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Properties</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {sampleAgents.filter((agent) => agent.featured).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Featured Agents</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                All agents are verified professionals in the real estate industry. You can contact them directly through
                their profile page.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Personal Contacts</h2>
              <p className="text-muted-foreground mb-6">
                Manage your personal contacts related to real estate transactions. Add property lawyers, inspectors,
                interior designers, and more.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">{samplePersonalContacts.length}</div>
                  <div className="text-sm text-muted-foreground">Saved Contacts</div>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-1">
                    {samplePersonalContacts.filter((contact) => contact.favorite).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Favorites</div>
                </div>
              </div>
              <Button onClick={() => setShowAddContact(true)} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add New Contact</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
