import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'soft' | 'medium' | 'strong'
  hover?: boolean
}

export function Card({ 
  children, 
  className, 
  padding = 'md', 
  shadow = 'soft',
  hover = false 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const shadowClasses = {
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    strong: 'shadow-strong'
  }

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-neutral-200",
        paddingClasses[padding],
        shadowClasses[shadow],
        hover && "transition-all duration-200 hover:shadow-medium hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight text-neutral-900", className)}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-neutral-600", className)}>
      {children}
    </p>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("pt-6", className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("flex items-center pt-6", className)}>
      {children}
    </div>
  )
}
