import { Metadata } from 'next'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CreditCard,
  Filter,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Bookinger - Admin Panel',
  description: 'Oversikt over alle bookinger',
}

// Mock data - replace with real API calls
const bookings = [
  {
    id: '1',
    appointmentNumber: 'BR-2025-001',
    customerName: 'Anna Larsen',
    customerEmail: 'anna@example.com',
    customerPhone: '+47 123 45 678',
    service: 'Brudekjole prøvetime',
    date: '2025-09-05',
    time: '10:00',
    duration: 90,
    price: 2500,
    deposit: 500,
    status: 'bekreftet' as const,
    staff: 'Kristin Hansen',
    notes: 'Første prøvetime, interessert i A-linjer kjoler',
    createdAt: '2025-09-01T10:30:00Z',
    paymentStatus: 'betalt' as const,
  },
  {
    id: '2',
    appointmentNumber: 'BR-2025-002',
    customerName: 'Sara Nielsen',
    customerEmail: 'sara@example.com',
    customerPhone: '+47 987 65 432',
    service: 'Tilpasning og endring',
    date: '2025-09-05',
    time: '12:00',
    duration: 45,
    price: 800,
    deposit: 200,
    status: 'venter' as const,
    staff: 'Emma Larsen',
    notes: 'Kjole som trengs sying av ermene',
    createdAt: '2025-09-02T14:15:00Z',
    paymentStatus: 'venter' as const,
  },
  {
    id: '3',
    appointmentNumber: 'BR-2025-003',
    customerName: 'Emma Johansen',
    customerEmail: 'emma@example.com',
    customerPhone: '+47 456 78 901',
    service: 'Selskapskjole prøvetime',
    date: '2025-09-05',
    time: '14:30',
    duration: 60,
    price: 1500,
    deposit: 300,
    status: 'bekreftet' as const,
    staff: 'Kristin Hansen',
    notes: 'Bal i oktober, ønsker elegant kjole i mørk farge',
    createdAt: '2025-09-03T09:45:00Z',
    paymentStatus: 'betalt' as const,
  },
  {
    id: '4',
    appointmentNumber: 'BR-2025-004',
    customerName: 'Lise Andersen',
    customerEmail: 'lise@example.com',
    customerPhone: '+47 234 56 789',
    service: 'Brudepike prøvetime',
    date: '2025-09-06',
    time: '11:00',
    duration: 75,
    price: 1800,
    deposit: 350,
    status: 'avlyst' as const,
    staff: 'Emma Larsen',
    notes: 'Gruppebooking for 4 brudepiker, avlyst pga. familienotfall',
    createdAt: '2025-08-28T16:20:00Z',
    paymentStatus: 'refundert' as const,
  },
]

const statusColors = {
  bekreftet: 'bg-green-100 text-green-800',
  venter: 'bg-yellow-100 text-yellow-800',
  avlyst: 'bg-red-100 text-red-800',
  fullført: 'bg-blue-100 text-blue-800',
}

const paymentStatusColors = {
  betalt: 'bg-green-100 text-green-800',
  venter: 'bg-yellow-100 text-yellow-800',
  refundert: 'bg-gray-100 text-gray-800',
  mislyktes: 'bg-red-100 text-red-800',
}

export default function AdminBookingerPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Bookinger</h1>
          <p className='text-gray-600 mt-1'>
            Oversikt over alle bookinger og avtaler
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Button variant='outline' size='sm'>
            <Filter size={16} className='mr-2' />
            Filtrer
          </Button>
          <Button>
            <Plus size={16} className='mr-2' />
            Ny booking
          </Button>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-gray-900'>15</p>
            <p className='text-sm text-gray-600'>I dag</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-blue-600'>23</p>
            <p className='text-sm text-gray-600'>Denne uken</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-green-600'>89</p>
            <p className='text-sm text-gray-600'>Denne måneden</p>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-purple-600'>456</p>
            <p className='text-sm text-gray-600'>Dette året</p>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Booking
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Kunde
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Tjeneste
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Dato & Tid
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Pris
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Betaling
                </th>
                <th className='relative px-6 py-3'>
                  <span className='sr-only'>Handlinger</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {bookings.map((booking) => (
                <tr key={booking.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>
                        {booking.appointmentNumber}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {booking.staff}
                      </div>
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                          <User size={16} className='text-gray-500' />
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {booking.customerName}
                        </div>
                        <div className='text-sm text-gray-500 flex items-center'>
                          <Mail size={12} className='mr-1' />
                          {booking.customerEmail}
                        </div>
                        <div className='text-sm text-gray-500 flex items-center'>
                          <Phone size={12} className='mr-1' />
                          {booking.customerPhone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {booking.service}
                    </div>
                    <div className='text-sm text-gray-500 flex items-center'>
                      <Clock size={12} className='mr-1' />
                      {booking.duration} min
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900 flex items-center'>
                      <Calendar size={12} className='mr-1' />
                      {new Date(booking.date).toLocaleDateString('no-NO')}
                    </div>
                    <div className='text-sm text-gray-500 flex items-center'>
                      <Clock size={12} className='mr-1' />
                      {booking.time}
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900 flex items-center'>
                      <CreditCard size={12} className='mr-1' />
                      {booking.price.toLocaleString('no-NO')} NOK
                    </div>
                    <div className='text-sm text-gray-500'>
                      Dep: {booking.deposit.toLocaleString('no-NO')} NOK
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        paymentStatusColors[booking.paymentStatus]
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button className='text-rose-600 hover:text-rose-900 mr-3'>
                      Rediger
                    </button>
                    <button className='text-gray-600 hover:text-gray-900'>
                      Detaljer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Kommende bookinger
          </h3>
          <div className='space-y-3'>
            {bookings
              .filter((b) => b.status === 'bekreftet')
              .slice(0, 3)
              .map((booking) => (
                <div
                  key={booking.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {booking.customerName}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {booking.time} - {booking.service}
                    </p>
                  </div>
                  <span className='text-xs text-gray-500'>
                    {new Date(booking.date).toLocaleDateString('no-NO')}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Ventende betalinger
          </h3>
          <div className='space-y-3'>
            {bookings
              .filter((b) => b.paymentStatus === 'venter')
              .map((booking) => (
                <div
                  key={booking.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {booking.customerName}
                    </p>
                    <p className='text-xs text-gray-500'>{booking.service}</p>
                  </div>
                  <span className='text-xs font-medium text-yellow-600'>
                    {booking.deposit} NOK
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Statistikk</h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>
                Gjennomsnittlig booking
              </span>
              <span className='text-sm font-medium'>1,650 NOK</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Avbestillingsrate</span>
              <span className='text-sm font-medium'>5.2%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>
                Mest populære tjeneste
              </span>
              <span className='text-sm font-medium'>Brudekjole</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
