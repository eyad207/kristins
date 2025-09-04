import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react'
import {
  ROUTES,
  CONTACT_INFO,
  BUSINESS_HOURS,
  SITE_CONFIG,
} from '@/lib/constants'

const footerNavigation = {
  tjenester: [
    { name: 'Prøvetime', href: `${ROUTES.tjenester}#provetime` },
    { name: 'Tilpasning', href: `${ROUTES.tjenester}#tilpasning` },
    { name: 'Express-time', href: `${ROUTES.tjenester}#express` },
    { name: 'After Hours', href: `${ROUTES.tjenester}#after-hours` },
  ],
  kolleksjoner: [
    { name: 'A-line', href: `${ROUTES.kolleksjoner}?silhouette=a-line` },
    { name: 'Ballgown', href: `${ROUTES.kolleksjoner}?silhouette=ballgown` },
    { name: 'Mermaid', href: `${ROUTES.kolleksjoner}?silhouette=mermaid` },
    { name: 'Alle kjoler', href: ROUTES.kolleksjoner },
  ],
  firma: [
    { name: 'Om oss', href: ROUTES.omOss },
    { name: 'Lookbook', href: ROUTES.lookbook },
    { name: 'Omtaler', href: ROUTES.omtaler },
    { name: 'Kontakt', href: ROUTES.kontakt },
  ],
  juridisk: [
    { name: 'Personvern', href: ROUTES.personvern },
    { name: 'Vilkår', href: ROUTES.vilkar },
    { name: 'Cookies', href: '/cookies' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-white' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          {/* Brand and contact info */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-2xl font-serif font-bold text-brand-gold'>
                {SITE_CONFIG.name}
              </h3>
              <p className='mt-4 text-sm leading-6 text-gray-300'>
                Norges fremste brudesalong med eksklusive kjoler og personlig
                service. Vi hjelper deg med å finne drømmekjolen til din store
                dag.
              </p>
            </div>

            {/* Contact information */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-brand-gold flex-shrink-0' />
                <span className='text-sm text-gray-300'>
                  {CONTACT_INFO.address}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-brand-gold flex-shrink-0' />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className='text-sm text-gray-300 hover:text-white transition-colors'
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-brand-gold flex-shrink-0' />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className='text-sm text-gray-300 hover:text-white transition-colors'
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Social media */}
            <div className='flex space-x-6'>
              <a
                href={`https://instagram.com/${CONTACT_INFO.instagram.replace(
                  '@',
                  ''
                )}`}
                className='text-gray-400 hover:text-brand-gold transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 group'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='sr-only'>Instagram</span>
                <Instagram className='h-6 w-6 transition-transform duration-300 group-hover:rotate-12' />
              </a>
              <a
                href={`https://facebook.com/${CONTACT_INFO.facebook}`}
                className='text-gray-400 hover:text-brand-gold transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 group'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='sr-only'>Facebook</span>
                <Facebook className='h-6 w-6 transition-transform duration-300 group-hover:rotate-12' />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Tjenester
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {footerNavigation.tjenester.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 relative group'
                      >
                        <span className='relative z-10'>{item.name}</span>
                        <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300'></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Kolleksjoner
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {footerNavigation.kolleksjoner.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 relative group'
                      >
                        <span className='relative z-10'>{item.name}</span>
                        <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300'></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Firma
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {footerNavigation.firma.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 relative group'
                      >
                        <span className='relative z-10'>{item.name}</span>
                        <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300'></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-white'>
                  Juridisk
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {footerNavigation.juridisk.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='text-sm leading-6 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 relative group'
                      >
                        <span className='relative z-10'>{item.name}</span>
                        <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300'></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Business hours */}
        <div className='mt-16 border-t border-gray-700 pt-8'>
          <div className='flex items-start gap-3'>
            <Clock className='h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5' />
            <div>
              <h3 className='text-sm font-semibold leading-6 text-white mb-4'>
                Åpningstider
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-300'>
                {BUSINESS_HOURS.map((day) => (
                  <div key={day.day} className='flex justify-between'>
                    <span className='font-medium'>{day.day}:</span>
                    <span className='ml-2'>
                      {day.closed ? 'Stengt' : `${day.open} - ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className='mt-16 border-t border-gray-700 pt-8 sm:mt-20 lg:mt-24'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <p className='text-xs leading-5 text-gray-400'>
              &copy; {currentYear} {SITE_CONFIG.name}. Alle rettigheter
              forbeholdt.
            </p>
            <div className='mt-4 sm:mt-0'>
              <Link
                href={ROUTES.booking}
                className='text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-all duration-300 hover:translate-x-2 relative group'
              >
                <span className='relative z-10'>Book prøvetime →</span>
                <span className='absolute inset-0 bg-brand-gold/10 rounded px-2 py-1 scale-0 group-hover:scale-100 transition-transform duration-200'></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
