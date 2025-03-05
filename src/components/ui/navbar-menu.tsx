"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type MenuProps = {
  children: React.ReactNode
  setActive: (active: string | null) => void
  className?: string
}

export function Menu({ children, setActive, className }: MenuProps) {
  return (
    <nav
      className={cn(
        "relative rounded-full border border-white/10 bg-white bg-opacity-5 backdrop-blur-sm p-1.5 flex justify-between items-center",
        className,
      )}
    >
      {children}
    </nav>
  )
}

export function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (active: string | null) => void
  active: string | null
  item: string
  children?: React.ReactNode
}) {
  return (
    <div
      onClick={() => {
        setActive(item === active ? null : item)
      }}
      className="relative px-3 py-1.5 text-sm font-medium text-white transition-colors cursor-pointer"
    >
      {item === active && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-white/10 rounded-full"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </div>
  )
}

