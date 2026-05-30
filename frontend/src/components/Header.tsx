import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: '首页', path: '/' },
  { label: '产品中心', path: '/products' },
  { label: '关于我们', path: '/about' },
  { label: '联系我们', path: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className={cn(
              'text-xl font-bold transition-colors',
              scrolled ? 'text-gray-900' : 'text-white'
            )}>
              科技先锋
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative py-2',
                  scrolled ? 'text-gray-700' : 'text-white/90',
                  location.pathname === link.path && 'text-primary'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300',
                    location.pathname === link.path ? 'w-full' : 'w-0'
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div
              className={cn(
                'flex items-center transition-all duration-300 rounded-full overflow-hidden',
                searchFocused
                  ? 'w-64 bg-gray-100'
                  : 'w-10 bg-white/20 hover:bg-white/30'
              )}
            >
              <Search className={cn(
                'w-4 h-4 flex-shrink-0 transition-colors',
                searchFocused ? 'ml-3 text-gray-500' : 'ml-0 mx-auto',
                scrolled ? 'text-gray-500' : 'text-white'
              )} />
              <input
                type="text"
                placeholder="搜索产品..."
                className={cn(
                  'bg-transparent border-none outline-none text-sm transition-all duration-300',
                  searchFocused ? 'w-48 pl-2 pr-3 py-2 text-gray-700' : 'w-0 py-0'
                )}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              <User className="w-4 h-4" />
              登录
            </button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn('w-6 h-6', scrolled ? 'text-gray-900' : 'text-white')} />
            ) : (
              <Menu className={cn('w-6 h-6', scrolled ? 'text-gray-900' : 'text-white')} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                <User className="w-4 h-4" />
                登录
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
