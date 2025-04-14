"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabTransitionProps {
  children: React.ReactNode
  active: boolean
  className?: string
}

export function TabTransition({ children, active, className }: TabTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
