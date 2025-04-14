import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="bg-yellow-500 text-white font-bold p-2 rounded">
        <span className="text-lg">SS</span>
      </div>
      <span className="ml-2 font-bold text-lg">Safety Solutions</span>
    </div>
  )
}
