import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full font-medium transition-colors"
  
  const variants = {
    default: "bg-orange-100 text-orange-800",
    secondary: "bg-blue-100 text-blue-800",
    outline: "border border-neutral-300 text-neutral-600",
    destructive: "bg-red-100 text-red-800"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
  }

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
