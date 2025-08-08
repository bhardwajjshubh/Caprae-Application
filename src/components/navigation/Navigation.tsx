import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { 
  Home,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Brain,
  Bell,
  Search,
  Menu,
  X,
  Heart,
  TrendingUp,
  User
} from "lucide-react"

interface NavigationProps {
  userRole: 'buyer' | 'seller'
  notifications?: number
}

export function Navigation({ userRole, notifications = 0 }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const buyerNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/browse", label: "Browse Businesses", icon: Search },
    { href: "/matches", label: "Matches", icon: Heart },
    { href: "/conversations", label: "Messages", icon: MessageSquare },
    { href: "/deals", label: "Active Deals", icon: FileText },
    { href: "/ai-tools", label: "AI Tools", icon: Brain },
  ]

  const sellerNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/profile", label: "Business Profile", icon: TrendingUp },
    { href: "/matches", label: "Potential Buyers", icon: Users },
    { href: "/conversations", label: "Messages", icon: MessageSquare },
    { href: "/deals", label: "Active Deals", icon: FileText },
    { href: "/ai-tools", label: "AI Tools", icon: Brain },
  ]

  const navItems = userRole === 'buyer' ? buyerNavItems : sellerNavItems

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">Caprae</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-xl text-sm font-medium text-neutral-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* User role badge */}
            <Badge variant={userRole === 'buyer' ? 'default' : 'secondary'}>
              {userRole === 'buyer' ? 'Buyer' : 'Seller'}
            </Badge>

            {/* Notifications */}
            <button className="relative p-2 text-neutral-600 hover:text-neutral-800 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-md">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>

            {/* Settings */}
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="p-2 text-neutral-600 hover:text-neutral-800">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>

            {/* Profile */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="p-2 text-neutral-600 hover:text-neutral-800">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-neutral-500"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-xl text-base font-medium text-neutral-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
