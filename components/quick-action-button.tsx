"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, FileText, ClipboardList, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function QuickActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={toggleOpen}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-16 right-0"
            >
              <Button asChild variant="default" size="lg" className="mb-2 w-48 justify-start shadow-lg">
                <Link href="/reports/new">
                  <FileText className="mr-2 h-5 w-5" />
                  Novo Relatório
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0"
            >
              <Button asChild variant="default" size="lg" className="mb-16 w-48 justify-start shadow-lg">
                <Link href="/inspections/new">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Nova Inspeção
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleOpen}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-200",
          isOpen && "bg-red-500 hover:bg-red-600",
        )}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </Button>
    </div>
  )
}
