'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES, CONTACT_INFO } from '@/lib/constants'

const navigation = [
  { name: 'Hjem', href: ROUTES.home },
  { name: 'Kolleksjoner', href: ROUTES.kolleksjoner },
  { name: 'Tjenester', href: ROUTES.tjenester },
  { name: 'Lookbook', href: ROUTES.lookbook },
  { name: 'Om oss', href: ROUTES.omOss },
  { name: 'Kontakt', href: ROUTES.kontakt },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <Link
            href={ROUTES.home}
            className='-m-1.5 p-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 rounded'
          >
            <span className='sr-only'>Kristins Brudesalong</span>
            <h1 className='text-2xl font-serif font-bold text-gray-900 flex items-baseline gap-2'>
              <span className='inline-block transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105'>
                Kristins
              </span>
              <span className='inline-block text-brand-gold transform transition-all duration-300 group-hover:translate-y-0.5'>
                Brudesalong
              </span>
            </h1>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:scale-110 active:scale-95'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Åpne hovedmeny</span>
            <Menu
              className='h-6 w-6 transition-transform duration-300 hover:rotate-180'
              aria-hidden='true'
            />
          </button>
        </div>
        {/* Desktop navigation */}
        <div className='hidden lg:flex lg:gap-x-6'>
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className='relative group overflow-hidden p-1'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className='relative z-10 font-semibold'>{item.name}</span>
              <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300 ease-out'></span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4'>
          <Link href={`tel:${CONTACT_INFO.phone}`}>
            <Button variant='outline' size='sm'>
              <Phone className='h-4 w-4 transition-transform duration-300 group-hover:rotate-12' />
              Ring oss
            </Button>
          </Link>
          <Link href={ROUTES.booking}>
            <Button size='sm'>Book prøvetime</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200'></div>
          <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 animate-in slide-in-from-right duration-300'>
            <div className='flex items-center justify-between'>
              <Link href={ROUTES.home} className='-m-1.5 p-1.5 group'>
                <span className='sr-only'>Kristins Brudesalong</span>
                <h1 className='text-xl font-serif font-bold text-gray-900 group-hover:text-brand-gold transition-colors duration-300'>
                  Kristins Brudesalong
                </h1>
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:rotate-90'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Lukk meny</span>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all duration-300 hover:translate-x-2 hover:text-brand-gold animate-in slide-in-from-right'
                      style={{ animationDelay: `${index * 100 + 100}ms` }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='py-6 space-y-4'>
                  <Link href={`tel:${CONTACT_INFO.phone}`}>
                    <Button
                      variant='outline'
                      className='w-full gap-2 transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom'
                      style={{ animationDelay: '800ms' }}
                    >
                      <Phone className='h-4 w-4 m-1' /> Ring oss
                    </Button>
                  </Link>
                  <Link href={ROUTES.booking}>
                    <Button
                      className='w-full bg-brand-gold hover:bg-brand-gold/90 text-white transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom'
                      style={{ animationDelay: '900ms' }}
                    >
                      Book prøvetime
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
