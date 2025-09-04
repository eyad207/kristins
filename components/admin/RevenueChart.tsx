'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Mock data - replace with real API data
const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'Mai', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 58000 },
  { month: 'Aug', revenue: 62000 },
  { month: 'Sep', revenue: 125000 }, // Current month (partial)
]

export function RevenueChart() {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
      <div className='p-6 border-b border-gray-200'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Inntektsutvikling
        </h2>
        <p className='text-sm text-gray-600 mt-1'>
          Månedlig inntekt de siste 9 månedene
        </p>
      </div>

      <div className='p-6'>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis
                tickFormatter={(value: number) =>
                  `${(value / 1000).toFixed(0)}k`
                }
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString('no-NO')} NOK`,
                  'Inntekt',
                ]}
              />
              <Bar dataKey='revenue' fill='#f43f5e' />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='mt-4 grid grid-cols-3 gap-4 text-center'>
          <div>
            <p className='text-2xl font-bold text-gray-900'>125,000</p>
            <p className='text-sm text-gray-600'>Denne måneden</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-900'>580,000</p>
            <p className='text-sm text-gray-600'>Dette året</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-green-600'>+12%</p>
            <p className='text-sm text-gray-600'>Fra forrige måned</p>
          </div>
        </div>
      </div>
    </div>
  )
}
