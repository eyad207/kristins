'use client'

import { Bell, Search, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'

export function AdminHeader() {
  const { user, logout } = useAuth()
  return (
    <header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Left side - Search */}
          <div className='flex items-center space-x-4'>
            <div className='hidden md:block relative'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                placeholder='Søk kunder, bookinger...'
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 w-96'
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className='flex items-center space-x-4'>
            {/* Notifications */}
            <button className='relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg'>
              <Bell size={20} />
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>

            {/* Quick actions */}
            <div className='hidden md:flex items-center space-x-2'>
              <Button variant='outline' size='sm'>
                + Ny booking
              </Button>
              <Button variant='outline' size='sm'>
                + Ny kunde
              </Button>
            </div>

            {/* User menu */}
            <div className='flex items-center space-x-3'>
              <div className='text-right hidden sm:block'>
                <p className='text-sm font-medium text-gray-900'>
                  {user?.name || 'Admin Bruker'}
                </p>
                <p className='text-xs text-gray-500'>
                  {user?.role === 'admin' ? 'Administrator' : 'Bruker'}
                </p>
              </div>
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || 'Admin'}
                  width={32}
                  height={32}
                  className='h-8 w-8 rounded-full object-cover'
                />
              ) : (
                <div className='h-8 w-8 rounded-full bg-rose-600 flex items-center justify-center'>
                  <User className='h-4 w-4 text-white' />
                </div>
              )}
              <button
                onClick={logout}
                className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                title='Logg ut'
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
