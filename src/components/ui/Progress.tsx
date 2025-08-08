import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Progress({ value, max = 100, className, size = 'md' }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  return (
    <div className={cn("w-full bg-neutral-200 rounded-full overflow-hidden", sizeClasses[size], className)}>
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
