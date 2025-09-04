import { LucideIcon } from 'lucide-react'

interface AdminMetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'yellow'
}

export function AdminMetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: AdminMetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  }

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600'>{title}</p>
          <p className='text-3xl font-bold text-gray-900 mt-2'>{value}</p>
          <p className={`text-sm mt-2 ${trendColors[trend]}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
