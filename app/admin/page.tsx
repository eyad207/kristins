import { Metadata } from 'next'
import { Calendar, Users, DollarSign, Clock, Star } from 'lucide-react'
import { RecentBookings } from '@/components/admin/RecentBookings'
import { RevenueChart } from '@/components/admin/RevenueChart'
import { AdminMetricCard } from '@/components/admin/AdminMetricCard'

export const metadata: Metadata = {
  title: 'Dashboard - Admin Panel',
  description: 'Oversikt over bookinger, kunder og inntekter',
}

// Mock data - replace with real API calls
const metrics: {
  title: string
  value: string
  change: string
  trend: 'up'
  icon: typeof Calendar | typeof DollarSign | typeof Users | typeof Star
  color: 'blue' | 'green' | 'purple' | 'yellow'
}[] = [
  {
    title: 'Dagens bookinger',
    value: '8',
    change: '+2 fra i går',
    trend: 'up',
    icon: Calendar,
    color: 'blue',
  },
  {
    title: 'Denne måneds inntekt',
    value: '125,000 NOK',
    change: '+12% fra forrige måned',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Nye kunder',
    value: '24',
    change: '+8 denne uken',
    trend: 'up',
    icon: Users,
    color: 'purple',
  },
  {
    title: 'Gjennomsnittlig rating',
    value: '4.9',
    change: '12 nye anmeldelser',
    trend: 'up',
    icon: Star,
    color: 'yellow',
  },
]

const upcomingBookings = [
  {
    id: '1',
    customerName: 'Anna Larsen',
    service: 'Brudekjole prøvetime',
    time: '10:00',
    date: '2025-09-05',
    status: 'bekreftet' as const,
    duration: 90,
  },
  {
    id: '2',
    customerName: 'Sara Nielsen',
    service: 'Tilpasning',
    time: '12:00',
    date: '2025-09-05',
    status: 'venter' as const,
    duration: 45,
  },
  {
    id: '3',
    customerName: 'Emma Johansen',
    service: 'Selskapskjole prøvetime',
    time: '14:30',
    date: '2025-09-05',
    status: 'bekreftet' as const,
    duration: 60,
  },
]

export default function AdminDashboard() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600 mt-1'>
          Velkommen tilbake, Kristin! Her er dagens oversikt.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {metrics.map((metric, index) => (
          <AdminMetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Revenue Chart */}
        <div className='lg:col-span-1'>
          <RevenueChart />
        </div>

        {/* Recent Bookings */}
        <div className='lg:col-span-1'>
          <RecentBookings bookings={upcomingBookings} />
        </div>
      </div>

      {/* Today&apos;s Schedule */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Dagens timeplan
            </h2>
            <span className='text-sm text-gray-500'>
              Torsdag 5. september 2025
            </span>
          </div>
        </div>

        <div className='p-6'>
          <div className='space-y-4'>
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
              >
                <div className='flex items-center space-x-4'>
                  <div className='flex flex-col items-center'>
                    <Clock size={16} className='text-gray-400 mb-1' />
                    <span className='text-sm font-medium'>{booking.time}</span>
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>
                      {booking.customerName}
                    </h3>
                    <p className='text-sm text-gray-600'>{booking.service}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <span className='text-sm text-gray-500'>
                    {booking.duration} min
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'bekreftet'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Hurtighandlinger
          </h3>
          <div className='space-y-3'>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'>
              📅 Book ny time
            </button>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'>
              👤 Legg til kunde
            </button>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'>
              💰 Registrer betaling
            </button>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Dagens statistikk
          </h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Bookinger fullført</span>
              <span className='text-sm font-medium'>5 av 8</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Inntekt så langt</span>
              <span className='text-sm font-medium'>15,500 NOK</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Gjenstående timer</span>
              <span className='text-sm font-medium'>3</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Varsler</h3>
          <div className='space-y-3'>
            <div className='p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
              <p className='text-sm text-yellow-800'>
                Sara Nielsen har ikke bekreftet sin time i morgen
              </p>
            </div>
            <div className='p-3 bg-green-50 border border-green-200 rounded-lg'>
              <p className='text-sm text-green-800'>
                2 nye positive anmeldelser
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
