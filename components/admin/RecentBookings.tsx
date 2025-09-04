import { Clock, Calendar } from 'lucide-react'

interface Booking {
  id: string
  customerName: string
  service: string
  time: string
  date: string
  status: 'bekreftet' | 'venter' | 'avlyst'
  duration: number
}

interface RecentBookingsProps {
  bookings: Booking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Kommende bookinger
          </h2>
          <Calendar size={20} className='text-gray-400' />
        </div>
      </div>

      <div className='p-6'>
        <div className='space-y-4'>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className='flex flex-col items-center text-center'>
                  <Clock size={16} className='text-gray-400 mb-1' />
                  <span className='text-sm font-medium text-gray-900'>
                    {booking.time}
                  </span>
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>
                    {booking.customerName}
                  </h3>
                  <p className='text-sm text-gray-600'>{booking.service}</p>
                  <p className='text-xs text-gray-500'>
                    {booking.duration} minutter
                  </p>
                </div>
              </div>

              <div className='text-right'>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    booking.status === 'bekreftet'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'venter'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-6 text-center'>
          <button className='text-sm text-rose-600 hover:text-rose-700 font-medium'>
            Se alle bookinger →
          </button>
        </div>
      </div>
    </div>
  )
}
