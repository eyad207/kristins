'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import NextImage from 'next/image'
import {
  CalendarDays,
  Users,
  Settings,
  BarChart3,
  Package,
  CreditCard,
  MessageSquare,
  Home,
  Menu,
  X,
} from 'lucide-react'

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/admin',
  },
  {
    label: 'Bookinger',
    icon: CalendarDays,
    href: '/admin/bookinger',
  },
  {
    label: 'Tjenester',
    icon: Package,
    href: '/admin/tjenester',
  },
  {
    label: 'Kunder',
    icon: Users,
    href: '/admin/kunder',
  },
  {
    label: 'Tjenester',
    icon: Package,
    href: '/admin/tjenester',
  },
  {
    label: 'Betalinger',
    icon: CreditCard,
    href: '/admin/betalinger',
  },
  {
    label: 'Anmeldelser',
    icon: MessageSquare,
    href: '/admin/anmeldelser',
  },
  {
    label: 'Statistikk',
    icon: BarChart3,
    href: '/admin/statistikk',
  },
  {
    label: 'Innstillinger',
    icon: Settings,
    href: '/admin/innstillinger',
  },
]

export function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md'
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        `}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='p-6 border-b border-gray-200'>
            <h1 className='text-xl font-serif font-bold text-gray-900'>
              Kristins Admin
            </h1>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 space-y-1'>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className='p-4 border-t border-gray-200'>
            <div className='flex items-center space-x-3'>
              {user?.avatar ? (
                <NextImage
                  src={user.avatar}
                  alt={user.name || 'Admin'}
                  width={32}
                  height={32}
                  className='w-8 h-8 rounded-full object-cover'
                />
              ) : (
                <div className='w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center'>
                  <span className='text-rose-600 text-sm font-medium'>
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              )}
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {user?.name || 'Admin Bruker'}
                </p>
                <p className='text-xs text-gray-500'>
                  {user?.role === 'admin' ? 'Administrator' : 'Bruker'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
