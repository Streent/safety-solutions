import type React from "react"
import { MainNav } from "@/components/main-nav"
import { QuickActionButton } from "@/components/quick-action-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1">{children}</div>
      <QuickActionButton />
    </div>
  )
}
