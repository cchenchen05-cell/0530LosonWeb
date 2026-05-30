import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  Image,
  UserCog,
  Phone,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: '仪表盘', path: '/dashboard' },
  { icon: Package, label: '产品管理', path: '/products' },
  { icon: Layers, label: '分类管理', path: '/categories' },
  { icon: Users, label: '合作伙伴', path: '/partners' },
  { icon: Image, label: '横幅管理', path: '/banners' },
  { icon: UserCog, label: '用户管理', path: '/users' },
  { icon: Phone, label: '联系信息', path: '/contact' },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-accent">
        <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <LayoutDashboard className="h-5 w-5 text-white" />
        </div>
        {sidebarOpen && <span className="text-lg font-semibold text-sidebar-foreground">CMS 管理后台</span>}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-white'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-accent p-3">
        <div className={`flex items-center gap-3 px-3 py-2 ${!sidebarOpen && 'justify-center'}`}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-primary text-white text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.role || 'admin'}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`w-full mt-2 text-sidebar-foreground/70 hover:text-red-400 hover:bg-sidebar-accent ${
            !sidebarOpen && 'justify-center px-2'
          }`}
        >
          <LogOut className="h-4 w-4" />
          {sidebarOpen && <span className="ml-2">退出登录</span>}
        </Button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-sidebar transition-all duration-300 border-r border-sidebar-border
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'w-64' : 'w-[72px] lg:w-[72px]'}
        `}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-[72px]'}`}>
        <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 lg:px-6 bg-white dark:bg-gray-800 border-b shadow-sm">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              {new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white text-xs">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
