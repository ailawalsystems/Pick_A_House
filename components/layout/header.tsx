"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import {
  Bell,
  Building,
  ChevronDown,
  Compass,
  Heart,
  HelpCircle,
  Home,
  Info,
  LogIn,
  MapPin,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Logo } from "../branding/logo"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [locationDialogOpen, setLocationDialogOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Abuja FCT")
  const pathname = usePathname()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  const mainCategories = [
    { name: "Buy", href: "/properties/buy", icon: Building },
    { name: "Rent", href: "/properties/rent", icon: Home },
    { name: "New Developments", href: "/properties/new-developments", icon: Building },
    { name: "Commercial", href: "/properties/commercial", icon: ShoppingBag },
    { name: "Agents", href: "/agents", icon: User },
    { name: "Mortgage", href: "/mortgage", icon: Building },
  ]

  const locationCategories = [
    {
      name: "Maitama",
      href: "/location/maitama",
      description: "Upscale residential area with luxury homes and diplomatic presence",
      propertyCount: 156,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Asokoro",
      href: "/location/asokoro",
      description: "Prestigious district housing government officials and diplomats",
      propertyCount: 124,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Wuse",
      href: "/location/wuse",
      description: "Commercial hub with shopping centers and residential areas",
      propertyCount: 210,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Gwarinpa",
      href: "/location/gwarinpa",
      description: "Largest single housing estate in West Africa",
      propertyCount: 185,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jabi",
      href: "/location/jabi",
      description: "Modern district with shopping malls and lakeside properties",
      propertyCount: 142,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Garki",
      href: "/location/garki",
      description: "Central district with markets and commercial activities",
      propertyCount: 168,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Kubwa",
      href: "/location/kubwa",
      description: "Satellite town with affordable housing options",
      propertyCount: 203,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    setLocationDialogOpen(false)
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Navigation Bar */}
      <div className="bg-primary text-primary-foreground shadow-md">
        <div className="container flex h-16 items-center">
          {/* Logo */}
          <Link href="/" className="mr-4 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold md:inline-block">Pick Your House FCT</span>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:flex items-center mr-4">
            <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-primary-foreground flex items-center gap-1 px-2 h-9">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="font-medium">{selectedLocation}</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Select Location</DialogTitle>
                  <DialogDescription>Choose a location to browse properties in that area</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {locationCategories.map((location) => (
                    <div
                      key={location.name}
                      className="flex gap-3 p-3 rounded-lg border hover:border-primary hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => handleLocationSelect(location.name)}
                    >
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={location.image || "/placeholder.svg"}
                          alt={location.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium flex items-center">
                          {location.name}
                          {selectedLocation === location.name && (
                            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
                              Current
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{location.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="default" className="h-7 text-xs px-2">
                            View Properties ({location.propertyCount})
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2 bg-transparent">
                            Area Guide
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search properties, locations, or keywords..."
                className="w-full pr-10 bg-white text-black rounded-full border-2 border-white focus-visible:border-white"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full bg-orange-400 hover:bg-orange-500"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>

          {/* User Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button>

                <Button variant="ghost" size="icon" className="relative text-primary-foreground">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    5
                  </span>
                  <span className="sr-only">Messages</span>
                </Button>

                <Button variant="ghost" size="icon" className="relative text-primary-foreground">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                  <span className="sr-only">Saved Properties</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center p-2 gap-2 border-b">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </div>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/properties" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>My Properties</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/messages" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Messages</span>
                        <Badge className="ml-auto bg-primary text-xs">5</Badge>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/saved" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Saved Properties</span>
                        <Badge className="ml-auto bg-primary text-xs">2</Badge>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-primary-foreground">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>

                <Button variant="ghost" asChild className="text-primary-foreground">
                  <Link href="/auth/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>

                <Button variant="secondary" asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Logo />
                  <span>Pick Your House FCT</span>
                </SheetTitle>
              </SheetHeader>
              <div className="py-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3 p-3 mb-4 bg-muted rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mb-4">
                    <Button className="flex-1" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="mb-2 px-1 text-sm font-medium text-muted-foreground">LOCATION</h3>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-transparent"
                    onClick={() => setLocationDialogOpen(true)}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{selectedLocation}</span>
                    <ChevronDown className="h-3 w-3 ml-auto" />
                  </Button>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 px-1 text-sm font-medium text-muted-foreground">BROWSE PROPERTIES</h3>
                  <div className="space-y-1">
                    {mainCategories.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {isAuthenticated && (
                  <div className="mb-4">
                    <h3 className="mb-2 px-1 text-sm font-medium text-muted-foreground">MY ACCOUNT</h3>
                    <div className="space-y-1">
                      <SheetClose asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard/properties"
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                        >
                          <Building className="h-4 w-4" />
                          My Properties
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard/messages"
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Messages
                          <Badge className="ml-auto bg-primary text-xs">5</Badge>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard/saved"
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          Saved Properties
                          <Badge className="ml-auto bg-primary text-xs">2</Badge>
                        </Link>
                      </SheetClose>
                      {isAdmin && (
                        <SheetClose asChild>
                          <Link
                            href="/admin"
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-2 px-1 text-sm font-medium text-muted-foreground">MORE</h3>
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link
                        href="/help"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                      >
                        <HelpCircle className="h-4 w-4" />
                        Help & Support
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                      >
                        <Info className="h-4 w-4" />
                        About Us
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </SheetClose>
                    {isAuthenticated && (
                      <SheetClose asChild>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-500 hover:bg-muted transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </SheetClose>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container flex h-10 items-center overflow-x-auto">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {mainCategories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <Link href={category.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        pathname === category.href ? "bg-accent/50" : "",
                      )}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex md:hidden items-center gap-1 overflow-x-auto scrollbar-hide">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname === category.href ? "bg-accent/50" : "hover:bg-accent/50",
                )}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Link>
            ))}
          </div>

          <Link href="/explore" className="ml-auto">
            <Button variant="ghost" size="sm" className="gap-1">
              <Compass className="h-4 w-4" />
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
