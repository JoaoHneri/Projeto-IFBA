import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = (variant) => {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-slate-900 border-slate-300",
  }
  
  return `${base} ${variants[variant] || variants.default}`
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <div className={cn(badgeVariants(variant), className)} {...props} />
  )
}

export { Badge, badgeVariants }