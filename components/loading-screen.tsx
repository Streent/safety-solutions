"use client"

import { motion } from "framer-motion"

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Carregando..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 mb-4 relative">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-200 rounded-full"></div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-4 border-t-yellow-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          ></motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-medium text-foreground"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  )
}
