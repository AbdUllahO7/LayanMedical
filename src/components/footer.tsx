import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { Input } from "./ui/input"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-lightColor text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Layan Medical</h2>
            <p className="text-white">
              We are a company dedicated to providing excellent services and products to our customers.
            </p>
            <div className="">
                      <Image 
                        src="/assets/images/logo.jpg" 
                        alt="logo" 
                        width={100}
                        height={100}
                        className="rounded-xl"
                      />
                    </div>
                      
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-white">
              <li>123 Main Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@company.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-white mb-4">Subscribe to our newsletter for updates</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button type="submit" className="w-full bg-logoColor hover:bg-gray-400">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white">&copy; 2025 Company Name. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

