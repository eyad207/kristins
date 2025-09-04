import { Metadata } from 'next'
import { User, Mail, Phone, Calendar, Star, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Kunder - Admin Panel',
  description: 'Oversikt over alle kunder',
}

// Mock customer data
const customers = [
  {
    id: '1',
    name: 'Anna Larsen',
    email: 'anna@example.com',
    phone: '+47 123 45 678',
    totalBookings: 3,
    totalSpent: 7500,
    lastBooking: '2025-09-05',
    status: 'aktiv' as const,
    rating: 5,
    registeredDate: '2024-05-15',
    notes: 'Stamkunde, foretrekker Kristin som stylist',
    preferences: ['A-linje kjoler', 'Vintage stil', 'Ivory farger'],
  },
  {
    id: '2',
    name: 'Sara Nielsen',
    email: 'sara@example.com',
    phone: '+47 987 65 432',
    totalBookings: 1,
    totalSpent: 800,
    lastBooking: '2025-09-05',
    status: 'ny' as const,
    rating: 4,
    registeredDate: '2025-09-02',
    notes: 'Første gang kunde, trenger ekstra veiledning',
    preferences: ['Moderne design', 'Slim fit'],
  },
  {
    id: '3',
    name: 'Emma Johansen',
    email: 'emma@example.com',
    phone: '+47 456 78 901',
    totalBookings: 2,
    totalSpent: 3000,
    lastBooking: '2025-09-05',
    status: 'aktiv' as const,
    rating: 5,
    registeredDate: '2024-12-08',
    notes: 'Kommer ofte for selskapskjoler, liker høy kvalitet',
    preferences: ['Elegante kjoler', 'Mørke farger', 'Minimalistisk stil'],
  },
  {
    id: '4',
    name: 'Lise Andersen',
    email: 'lise@example.com',
    phone: '+47 234 56 789',
    totalBookings: 0,
    totalSpent: 0,
    lastBooking: null,
    status: 'inaktiv' as const,
    rating: 0,
    registeredDate: '2025-08-28',
    notes: 'Avbestilte booking, potensielt interessert i fremtiden',
    preferences: [],
  },
]

const statusColors = {
  aktiv: 'bg-green-100 text-green-800',
  ny: 'bg-blue-100 text-blue-800',
  inaktiv: 'bg-gray-100 text-gray-800',
}

export default function AdminKunderPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Kunder</h1>
          <p className='text-gray-600 mt-1'>
            Oversikt over alle kunder og deres historikk
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='Søk kunder...'
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 w-80'
            />
          </div>
          <Button>
            <Plus size={16} className='mr-2' />
            Ny kunde
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-gray-900'>156</p>
            <p className='text-sm text-gray-600'>Totale kunder</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-green-600'>89</p>
            <p className='text-sm text-gray-600'>Aktive kunder</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-blue-600'>23</p>
            <p className='text-sm text-gray-600'>Nye denne måneden</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-purple-600'>4.8</p>
            <p className='text-sm text-gray-600'>Gjennomsnittlig rating</p>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {customers.map((customer) => (
          <div
            key={customer.id}
            className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
          >
            <div className='p-6'>
              {/* Customer Header */}
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                  <div className='h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center'>
                    <User size={20} className='text-rose-600' />
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      {customer.name}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[customer.status]
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>
                </div>
                {customer.rating > 0 && (
                  <div className='flex items-center'>
                    <Star size={16} className='text-yellow-400 fill-current' />
                    <span className='text-sm text-gray-600 ml-1'>
                      {customer.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className='space-y-2 mb-4'>
                <div className='flex items-center text-sm text-gray-600'>
                  <Mail size={14} className='mr-2' />
                  {customer.email}
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                  <Phone size={14} className='mr-2' />
                  {customer.phone}
                </div>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='text-center'>
                  <p className='text-lg font-bold text-gray-900'>
                    {customer.totalBookings}
                  </p>
                  <p className='text-xs text-gray-500'>Bookinger</p>
                </div>
                <div className='text-center'>
                  <p className='text-lg font-bold text-green-600'>
                    {customer.totalSpent.toLocaleString('no-NO')} NOK
                  </p>
                  <p className='text-xs text-gray-500'>Brukt totalt</p>
                </div>
              </div>

              {/* Last Booking */}
              {customer.lastBooking && (
                <div className='flex items-center text-sm text-gray-600 mb-4'>
                  <Calendar size={14} className='mr-2' />
                  Siste booking:{' '}
                  {new Date(customer.lastBooking).toLocaleDateString('no-NO')}
                </div>
              )}

              {/* Preferences */}
              {customer.preferences.length > 0 && (
                <div className='mb-4'>
                  <p className='text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide'>
                    Preferanser
                  </p>
                  <div className='flex flex-wrap gap-1'>
                    {customer.preferences.slice(0, 2).map((pref, index) => (
                      <span
                        key={index}
                        className='px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded'
                      >
                        {pref}
                      </span>
                    ))}
                    {customer.preferences.length > 2 && (
                      <span className='px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded'>
                        +{customer.preferences.length - 2} flere
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {customer.notes && (
                <div className='mb-4'>
                  <p className='text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide'>
                    Notater
                  </p>
                  <p className='text-sm text-gray-600 line-clamp-2'>
                    {customer.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className='flex space-x-2'>
                <Button variant='outline' size='sm' className='flex-1'>
                  <Calendar size={14} className='mr-1' />
                  Book
                </Button>
                <Button variant='outline' size='sm' className='flex-1'>
                  <Mail size={14} className='mr-1' />
                  Kontakt
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Top kunder</h3>
          <div className='space-y-3'>
            {customers
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 3)
              .map((customer) => (
                <div
                  key={customer.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {customer.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {customer.totalBookings} bookinger
                    </p>
                  </div>
                  <span className='text-sm font-medium text-green-600'>
                    {customer.totalSpent.toLocaleString('no-NO')} NOK
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Nye kunder</h3>
          <div className='space-y-3'>
            {customers
              .filter((c) => c.status === 'ny')
              .map((customer) => (
                <div
                  key={customer.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {customer.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      Registrert{' '}
                      {new Date(customer.registeredDate).toLocaleDateString(
                        'no-NO'
                      )}
                    </p>
                  </div>
                  <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                    Ny
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Kundestatistikk
          </h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>
                Gjennomsnittlig ordre
              </span>
              <span className='text-sm font-medium'>1,876 NOK</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Tilbakekjøpsrate</span>
              <span className='text-sm font-medium'>68%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Kundeavlytelse</span>
              <span className='text-sm font-medium'>2.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
