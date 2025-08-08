import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, style, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
    
    const variants = {
      primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg focus:ring-orange-500 border border-orange-500",
      secondary: "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg focus:ring-blue-500 border border-blue-500",
      outline: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50 focus:ring-orange-500 bg-white",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 bg-transparent",
      destructive: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg focus:ring-red-500 border border-red-500"
    }
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl"
    }

    // Fallback inline styles to ensure visibility
    const fallbackStyles = {
      primary: { backgroundColor: '#ef7c44', color: 'white', border: '1px solid #ef7c44' },
      secondary: { backgroundColor: '#0ea5e9', color: 'white', border: '1px solid #0ea5e9' },
      outline: { backgroundColor: 'white', color: '#ef7c44', border: '2px solid #ef7c44' },
      ghost: { backgroundColor: 'transparent', color: '#374151' },
      destructive: { backgroundColor: '#ef4444', color: 'white', border: '1px solid #ef4444' }
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        style={{
          ...fallbackStyles[variant],
          ...style
        }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
