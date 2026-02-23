import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { Home, ChevronDown, ShoppingCart, DollarSign, LogIn, LogOut, Menu, X, BookOpen, Users, Music, Compass, Instagram, Twitter, Youtube, Mail } from 'lucide-react'
import { NotificationBell } from './NotificationBell'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/lib/trpc'

export default function NavigationNew() {
  const [isOpen, setIsOpen] = useState(false)
  const [location] = useLocation()
  const { user, isAuthenticated, loading } = useAuth()
  const [cartCount, setCartCount] = useState(0)
  
  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }
    
    updateCartCount()
    
    // Listen for cart updates
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cartUpdated', updateCartCount)
    
    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])
  
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = '/'
    },
  })

  const handleAuth = () => {
    if (isAuthenticated) {
      logoutMutation.mutate()
    } else {
      window.location.href = '/login'
    }
  }

  const isActive = (href: string) => location === href

  const socialLinks = [
    { href: 'https://instagram.com/the33rdhouse', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com/the33rdhouse', icon: Twitter, label: 'Twitter' },
    { href: 'https://youtube.com/@the33rdhouse', icon: Youtube, label: 'YouTube' },
    { href: 'mailto:daniel@the33rdhouse.com', icon: Mail, label: 'Email' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0a0412]/95 to-transparent backdrop-blur-sm border-b border-[#9333ea]/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#9333ea] to-[#d4af37] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">33</span>
                </div>
                <div className="text-[#f0e6d2] font-serif text-xl group-hover:text-[#d4af37] transition-colors">
                  The 33rd House
                </div>
              </div>
            </Link>

            {/* Main Navigation */}
            <div className="flex items-center gap-6">
              <Link href="/">
                <button className={`text-sm tracking-wider transition-colors ${isActive('/') ? 'text-[#d4af37]' : 'text-[#c4b5a0] hover:text-[#d4af37]'}`}>
                  Home
                </button>
              </Link>

              {/* Learn Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm tracking-wider text-[#c4b5a0] hover:text-[#d4af37] transition-colors flex items-center gap-1">
                  Learn <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a0a2e] border-[#9333ea]">
                  <DropdownMenuItem asChild>
                    <Link href="/system" className="cursor-pointer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      The System
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/gates" className="cursor-pointer">
                      <Compass className="w-4 h-4 mr-2" />
                      The 12 Gates
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/realms" className="cursor-pointer">
                      <Compass className="w-4 h-4 mr-2" />
                      The 144 Realms
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bigger-picture" className="cursor-pointer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      The Bigger Picture
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/knowledge" className="cursor-pointer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Deities & Archetypes
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Practice Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm tracking-wider text-[#c4b5a0] hover:text-[#d4af37] transition-colors flex items-center gap-1">
                  Practice <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a0a2e] border-[#9333ea]">
                  <DropdownMenuItem asChild>
                    <Link href="/inner-circle" className="cursor-pointer">
                      <Users className="w-4 h-4 mr-2" />
                      Inner Circle
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/meditations" className="cursor-pointer">
                      <Music className="w-4 h-4 mr-2" />
                      Meditations
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/sacred/portal" className="cursor-pointer">
                      <Compass className="w-4 h-4 mr-2" />
                      The Portal
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/library">
                <button className={`text-sm tracking-wider transition-colors ${isActive('/library') ? 'text-[#d4af37]' : 'text-[#c4b5a0] hover:text-[#d4af37]'}`}>
                  Library
                </button>
              </Link>

              <Link href="/shop">
                <button className={`text-sm tracking-wider transition-colors ${isActive('/shop') ? 'text-[#d4af37]' : 'text-[#c4b5a0] hover:text-[#d4af37]'}`}>
                  Shop
                </button>
              </Link>

              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] hover:from-[#7c2dc7] hover:to-[#9333ea]">
                  Pricing
                </Button>
              </Link>

              {isAuthenticated && (
                <Link href="/dashboard">
                  <button className={`text-sm tracking-wider transition-colors ${isActive('/dashboard') ? 'text-[#d4af37]' : 'text-[#c4b5a0] hover:text-[#d4af37]'}`}>
                    Dashboard
                  </button>
                </Link>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Cart Icon with Badge */}
              <Link href="/cart">
                <button className="relative p-2 text-[#c4b5a0] hover:text-[#d4af37] transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#9333ea] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>

              {isAuthenticated && <NotificationBell />}
              
              <Button
                onClick={handleAuth}
                variant="outline"
                size="sm"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0412]/95 backdrop-blur-sm border-b border-[#9333ea]/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#9333ea] to-[#d4af37] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">33</span>
                </div>
                <span className="text-[#f0e6d2] font-serif text-lg">The 33rd House</span>
              </div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Icon */}
              <Link href="/cart">
                <button className="relative p-2 text-[#c4b5a0]">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#9333ea] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#c4b5a0] hover:text-[#d4af37]"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#0a0412] border-b border-[#9333ea]/20 max-h-[80vh] overflow-y-auto">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="py-2 text-[#c4b5a0] hover:text-[#d4af37]">Home</div>
                </Link>
                
                {isAuthenticated && (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <div className="py-2 text-[#c4b5a0] hover:text-[#d4af37]">Dashboard</div>
                  </Link>
                )}

                <div className="border-t border-[#9333ea]/20 pt-2">
                  <div className="text-[#d4af37] text-sm font-semibold mb-2">Learn</div>
                  <Link href="/system" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">The System</div>
                  </Link>
                  <Link href="/gates" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">The 12 Gates</div>
                  </Link>
                  <Link href="/realms" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">The 144 Realms</div>
                  </Link>
                  <Link href="/bigger-picture" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">The Bigger Picture</div>
                  </Link>
                  <Link href="/knowledge" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">Deities & Archetypes</div>
                  </Link>
                </div>

                <div className="border-t border-[#9333ea]/20 pt-2">
                  <div className="text-[#d4af37] text-sm font-semibold mb-2">Practice</div>
                  <Link href="/inner-circle" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">Inner Circle</div>
                  </Link>
                  <Link href="/meditations" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">Meditations</div>
                  </Link>
                  <Link href="/sacred/portal" onClick={() => setIsOpen(false)}>
                    <div className="py-2 pl-4 text-[#c4b5a0] hover:text-[#d4af37]">The Portal</div>
                  </Link>
                </div>

                <div className="border-t border-[#9333ea]/20 pt-2">
                  <Link href="/library" onClick={() => setIsOpen(false)}>
                    <div className="py-2 text-[#c4b5a0] hover:text-[#d4af37]">Library</div>
                  </Link>
                  <Link href="/shop" onClick={() => setIsOpen(false)}>
                    <div className="py-2 text-[#c4b5a0] hover:text-[#d4af37]">Shop</div>
                  </Link>
                  <Link href="/pricing" onClick={() => setIsOpen(false)}>
                    <div className="py-2 text-[#c4b5a0] hover:text-[#d4af37]">Pricing</div>
                  </Link>
                  <Link href="/chartography" onClick={() => setIsOpen(false)}>
                    <div className="py-2 text-[#c4b5a0] hover:text-[#d4af37]">Chartography</div>
                  </Link>
                </div>

                <div className="border-t border-[#9333ea]/20 pt-4">
                  <Button
                    onClick={() => {
                      handleAuth()
                      setIsOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-[#9333ea] to-[#7c2dc7]"
                  >
                    {isAuthenticated ? 'Logout' : 'Login'}
                  </Button>
                </div>

                {/* Social Links */}
                <div className="border-t border-[#9333ea]/20 pt-4 flex justify-center gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c4b5a0] hover:text-[#d4af37] transition-colors"
                        aria-label={link.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-16" />
    </>
  )
}
