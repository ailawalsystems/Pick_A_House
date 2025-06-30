import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  MessageCircle,
  Globe,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "../branding/logo"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Newsletter Section */}
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 text-primary-foreground shadow-xl">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold">Subscribe to our newsletter</h3>
            <p className="text-primary-foreground/90 mt-2">
              Get the latest property listings, market insights, and exclusive offers directly to your inbox
            </p>
          </div>
          <div className="flex w-full max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 h-12"
            />
            <Button variant="secondary" size="lg" className="gap-2">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Logo />
              <span className="font-bold text-xl">Pick Your House FCT</span>
            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              Your trusted platform for buying, selling, and renting properties in the Federal Capital Territory. We
              connect property seekers with the perfect homes and investment opportunities through our AI-powered
              platform.
            </p>
            <div className="flex items-center gap-3 text-gray-400 mb-4">
              <div className="bg-gray-800 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span>123 Main Street, Central Business District, Abuja</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 mb-4">
              <div className="bg-gray-800 p-2 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <span>+234 123 456 7890</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="bg-gray-800 p-2 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <span>info@pickyourhousefct.com</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties/buy"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/rent"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/new-developments"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  New Developments
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/commercial"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/mortgage"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Real Estate Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Locations */}
          <div>
            <h3 className="font-bold text-lg mb-6 relative">
              <span className="relative z-10">Popular Locations</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/location/maitama"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Maitama
                </Link>
              </li>
              <li>
                <Link
                  href="/location/asokoro"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Asokoro
                </Link>
              </li>
              <li>
                <Link
                  href="/location/wuse"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Wuse
                </Link>
              </li>
              <li>
                <Link
                  href="/location/gwarinpa"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Gwarinpa
                </Link>
              </li>
              <li>
                <Link
                  href="/location/jabi"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Jabi
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  View All Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: For Agents */}
          <div>
            <h3 className="font-bold text-lg mb-6 relative">
              <span className="relative z-10">For Agents</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/agents/register"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Join as an Agent
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/login"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Agent Login
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/dashboard"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Agent Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/pricing"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/resources"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Agent Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/directory"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Agent Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Featured Agents */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-6">Featured Agents</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((agent) => (
              <Link key={agent} href={`/agents/${agent}`} className="group">
                <div className="bg-gray-800 rounded-lg p-4 transition-transform hover:translate-y-[-5px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=48&width=48`}
                        alt={`Agent ${agent}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">Agent Name {agent}</p>
                      <p className="text-xs text-gray-400">Premium Realty</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>24 listings</span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Contact
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Social Media & Copyright */}
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-3">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
            <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            </Link>
            <Link href="https://pickyourhousefct.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 h-10 w-10"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Button>
            </Link>
          </div>

          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Pick Your House FCT. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
