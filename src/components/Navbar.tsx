"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, MenuIcon, X } from "lucide-react"

export function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-main py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image src="/assets/images/logo.jpg" alt="Logo" fill className="object-cover" priority />
            </div>
            <span className={cn("font-bold text-lg transition-colors", scrolled ? "text-main" : "text-white")}>
              LayandDent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                active={active === item.href}
                scrolled={scrolled}
                setActive={setActive}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? "text-main" : "text-white"} />
            ) : (
              <MenuIcon className={scrolled ? "text-main" : "text-white"} />
            )}
          </button>

          {/* Mobile Menu */}
          <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} setActive={setActive} active={active} />
        </div>
      </div>
    </header>
  )
}

// Navigation Item Component
function NavItem({
  item,
  active,
  scrolled,
  setActive,
}: {
  item: NavItemType
  active: boolean
  scrolled: boolean
  setActive: (href: string | null) => void
}) {
  if (item.children) {
    return (
      <div className="relative group">
        <button
          className={cn(
            "flex items-center gap-1 py-2 font-medium transition-colors",
            scrolled ? "text-gray-800 hover:text-main" : "text-white/90 hover:text-white",
            active && (scrolled ? "text-main" : "text-white"),
          )}
          onClick={() => setActive(active ? null : item.href)}
        >
          {item.label}
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>

        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-[200px] p-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-main rounded-md"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "relative py-2 font-medium transition-colors",
        scrolled ? "text-gray-800 hover:text-main" : "text-white/90 hover:text-white",
        active && (scrolled ? "text-main" : "text-white"),
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300",
        scrolled ? "after:bg-main" : "after:bg-white",
      )}
      onClick={() => setActive(item.href)}
    >
      {item.label}
    </Link>
  )
}

// Mobile Menu Component
function MobileMenu({
  isOpen,
  setIsOpen,
  active,
  setActive,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  active: string | null
  setActive: (href: string | null) => void
}) {
  return (
    <motion.div
      className={cn("fixed inset-0 bg-white z-40 flex flex-col p-6 pt-24", isOpen ? "block" : "hidden")}
      initial={{ opacity: 0, x: "100%" }}
      animate={{
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : "100%",
        transitionEnd: {
          display: isOpen ? "flex" : "none",
        },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <div key={item.href}>
            {item.children ? (
              <div className="flex flex-col">
                <button
                  className="flex items-center justify-between py-3 border-b border-gray-100 text-gray-800 font-medium"
                  onClick={() => setActive(active === item.href ? null : item.href)}
                >
                  {item.label}
                  <ChevronDown className={cn("h-5 w-5 transition-transform", active === item.href && "rotate-180")} />
                </button>

                {active === item.href && (
                  <div className="pl-4 py-2 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-gray-600 hover:text-main"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className="py-3 border-b border-gray-100 text-gray-800 font-medium hover:text-main block"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <Link
          href="https://layandent.com/"
          target="_blank"
          className="flex items-center justify-center w-full py-3 px-4 bg-main text-white rounded-lg font-medium hover:bg-main/90 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Visit Our Store
        </Link>
      </div>
    </motion.div>
  )
}

// Navigation Item Type
type NavItemType = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

// Navigation Items
const navItems: NavItemType[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/category" },
  { label: "Salla", href: "/https://layandent.com/" },

]

