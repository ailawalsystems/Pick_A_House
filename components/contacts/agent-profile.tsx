import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/format"
import { CheckCircle2, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface AgentProfileProps {
  agent: any
}

export function AgentProfile({ agent }: AgentProfileProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Cover Image and Profile */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute bottom-0 left-0 w-full p-4 flex items-end">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src={agent.image} alt={agent.name} />
            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{agent.name}</h2>
              {agent.verified && <CheckCircle2 className="h-5 w-5 text-blue-200" />}
            </div>
            <p className="text-blue-100">
              {agent.title} at {agent.company}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="p-4 flex flex-wrap gap-3 border-b">
        <Button className="gap-2">
          <Phone className="h-4 w-4" />
          <span>Call</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>Message</span>
        </Button>

        <div className="ml-auto flex items-center gap-2">
          {agent.social.facebook && (
            <Link href={agent.social.facebook} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
          )}

          {agent.social.linkedin && (
            <Link href={agent.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5 text-blue-700" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          )}

          {agent.social.instagram && (
            <Link href={agent.social.instagram} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5 text-pink-600" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Agent Details */}
      <Tabs defaultValue="about" className="p-4">
        <TabsList className="mb-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">About {agent.name}</h3>
            <p className="text-muted-foreground">{agent.about}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.expertise.map((exp: string) => (
                    <Badge key={exp} variant="secondary">
                      {exp}
                    </Badge>
                  ))}
                </div>

                <h4 className="font-medium mt-4 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((lang: string) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Professional Certifications</h4>
              <div className="space-y-2">
                {agent.certifications.map((cert: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span className="font-medium text-lg">{agent.rating}</span>
              <span className="text-muted-foreground">({agent.reviews} reviews)</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{agent.properties}</div>
                <div className="text-xs text-muted-foreground">Active Listings</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="properties">
          <h3 className="text-lg font-medium mb-4">Properties Listed by {agent.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agent.featuredProperties.map((property: any) => (
              <Link key={property.id} href={`/properties/${property.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  <div className="relative h-48">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium group-hover:text-primary transition-colors">{property.title}</h4>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                    <p className="text-primary font-bold mt-1">
                      {property.currency}
                      {formatCurrency(property.price)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline">View All Properties</Button>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <h3 className="text-lg font-medium mb-2">Client Reviews</h3>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span className="font-medium text-lg">{agent.rating}</span>
            <span className="text-muted-foreground">({agent.reviews} reviews)</span>
          </div>

          <Separator className="my-4" />

          {/* Sample reviews */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Michael Johnson</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= 5 ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">1 month ago</span>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-1">
                {agent.name} was extremely professional and knowledgeable. They helped me find my dream home in a very
                competitive market. I highly recommend their services!
              </p>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>SL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Sarah Lee</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= 4 ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">3 months ago</span>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-1">
                Great experience working with {agent.name}. They were responsive, attentive to my needs, and made the
                whole process smooth. Would definitely work with them again.
              </p>
            </div>

            <div className="text-center mt-6">
              <Button variant="outline">View All Reviews</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
