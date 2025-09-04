import { Metadata } from 'next'
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Users,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Tjenester - Admin Panel',
  description: 'Administrer alle tjenester og priser',
}

// Mock tjenester data - byttes ut med ekte API calls
const services = [
  {
    id: 'brudekjole-provetime',
    name: 'Brudekjole prøvetime',
    slug: 'brudekjole-provetime',
    description:
      'Personlig prøvetime for brudekjoler med vår erfarne stylist. Inkluderer champagne og personlig rådgivning.',
    durationMin: 90,
    bufferBefore: 15,
    bufferAfter: 15,
    price: 2500,
    deposit: 500,
    currency: 'NOK',
    category: 'prøvetime',
    isActive: true,
    features: [
      'Personlig stylist',
      'Champagne og godteri',
      'Privat prøverom',
      'Tilpasningsrådgivning',
      'Fotografi tillatt',
    ],
    requirements: [
      'Book minst 2 uker i forveien',
      'Ta med egnede underklær',
      'Maksimalt 3 følgesvenninner',
    ],
    popularityScore: 95,
    totalBookings: 156,
    averageRating: 4.9,
    createdAt: '2024-01-15',
    updatedAt: '2025-08-20',
  },
  {
    id: 'selskapskjole-provetime',
    name: 'Selskapskjole prøvetime',
    slug: 'selskapskjole-provetime',
    description:
      'Finn den perfekte kjolen til fest, bal eller andre spesielle anledninger.',
    durationMin: 60,
    bufferBefore: 10,
    bufferAfter: 10,
    price: 1500,
    deposit: 300,
    currency: 'NOK',
    category: 'prøvetime',
    isActive: true,
    features: [
      'Stor utvalg av kjoler',
      'Stilrådgivning',
      'Tilbehør inkludert',
      'Prøving av flere modeller',
    ],
    requirements: ['Oppgi anledning ved booking', 'Ta med egnede sko'],
    popularityScore: 78,
    totalBookings: 89,
    averageRating: 4.7,
    createdAt: '2024-01-15',
    updatedAt: '2025-07-10',
  },
  {
    id: 'brudepike-provetime',
    name: 'Brudepike prøvetime',
    slug: 'brudepike-provetime',
    description:
      'Koordinerte brudepikekjoler som passer perfekt til bryllupstemaet.',
    durationMin: 75,
    bufferBefore: 15,
    bufferAfter: 15,
    price: 1800,
    deposit: 350,
    currency: 'NOK',
    category: 'gruppe',
    isActive: true,
    features: [
      'Koordinert stil',
      'Gruppeavtaler mulig',
      'Fargesammenheng',
      'Tilpasning inkludert',
    ],
    requirements: ['Koordiner med bruden', 'Gruppebestilling anbefales'],
    popularityScore: 65,
    totalBookings: 42,
    averageRating: 4.8,
    createdAt: '2024-02-20',
    updatedAt: '2025-08-15',
  },
  {
    id: 'tilpasning-endring',
    name: 'Tilpasning og endring',
    slug: 'tilpasning-endring',
    description:
      'Profesjonell tilpasning av eksisterende kjole for perfekt passform.',
    durationMin: 45,
    bufferBefore: 10,
    bufferAfter: 10,
    price: 800,
    deposit: 200,
    currency: 'NOK',
    category: 'tilpasning',
    isActive: true,
    features: [
      'Profesjonell søm',
      'Perfekt passform',
      'Kvalitetsmaterialer',
      'Flere prøvinger inkludert',
    ],
    requirements: ['Ta med kjolen', 'Egnede underklær'],
    popularityScore: 85,
    totalBookings: 78,
    averageRating: 4.6,
    createdAt: '2024-01-15',
    updatedAt: '2025-06-30',
  },
  {
    id: 'stilradgivning-konsultasjon',
    name: 'Stilrådgivning konsultasjon',
    slug: 'stilradgivning-konsultasjon',
    description: 'Personlig stilrådgivning og planlegging av brudeantrekket.',
    durationMin: 60,
    bufferBefore: 10,
    bufferAfter: 10,
    price: 1200,
    deposit: 300,
    currency: 'NOK',
    category: 'prøvetime',
    isActive: false,
    features: [
      'Personlig analyse',
      'Stilguide',
      'Fargematching',
      'Tilbehørsrådgivning',
    ],
    requirements: ['Ta med inspirasjon', 'Informasjon om bryllupet'],
    popularityScore: 45,
    totalBookings: 23,
    averageRating: 4.4,
    createdAt: '2024-03-10',
    updatedAt: '2025-05-20',
  },
]

const categoryColors = {
  prøvetime: 'bg-blue-100 text-blue-800',
  tilpasning: 'bg-green-100 text-green-800',
  gruppe: 'bg-purple-100 text-purple-800',
  express: 'bg-orange-100 text-orange-800',
  'after-hours': 'bg-red-100 text-red-800',
}

export default function AdminTjenesterPage() {
  const activeServices = services.filter((s) => s.isActive)
  const inactiveServices = services.filter((s) => !s.isActive)
  const totalRevenue = services.reduce(
    (sum, service) => sum + service.totalBookings * service.price,
    0
  )
  const averageDuration = Math.round(
    services.reduce((sum, service) => sum + service.durationMin, 0) /
      services.length
  )

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Tjenester</h1>
          <p className='text-gray-600 mt-1'>
            Administrer alle tjenester, priser og tilgjengelighet
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Button variant='outline' size='sm'>
            Eksporter data
          </Button>
          <Button>
            <Plus size={16} className='mr-2' />
            Ny tjeneste
          </Button>
        </div>
      </div>

      {/* Service Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Aktive tjenester
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {activeServices.length}
              </p>
            </div>
            <Package className='h-8 w-8 text-blue-600' />
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Total inntekt</p>
              <p className='text-2xl font-bold text-green-600'>
                {totalRevenue.toLocaleString('no-NO')} NOK
              </p>
            </div>
            <DollarSign className='h-8 w-8 text-green-600' />
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Totale bookinger
              </p>
              <p className='text-2xl font-bold text-purple-600'>
                {services.reduce((sum, s) => sum + s.totalBookings, 0)}
              </p>
            </div>
            <Users className='h-8 w-8 text-purple-600' />
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>
                Gj.snitt varighet
              </p>
              <p className='text-2xl font-bold text-orange-600'>
                {averageDuration} min
              </p>
            </div>
            <Clock className='h-8 w-8 text-orange-600' />
          </div>
        </div>
      </div>

      {/* Active Services */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Aktive tjenester ({activeServices.length})
          </h2>
        </div>

        <div className='p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {activeServices.map((service) => (
              <div
                key={service.id}
                className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'
              >
                {/* Service Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-3 mb-2'>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {service.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          categoryColors[
                            service.category as keyof typeof categoryColors
                          ]
                        }`}
                      >
                        {service.category}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mb-3'>
                      {service.description}
                    </p>
                  </div>
                  <div className='flex items-center space-x-2 ml-4'>
                    <Button variant='outline' size='sm'>
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-gray-400'
                    >
                      <EyeOff size={14} />
                    </Button>
                  </div>
                </div>

                {/* Service Metrics */}
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div className='text-center p-3 bg-gray-50 rounded-lg'>
                    <p className='text-lg font-bold text-gray-900'>
                      {service.price.toLocaleString('no-NO')} {service.currency}
                    </p>
                    <p className='text-xs text-gray-500'>Pris</p>
                  </div>
                  <div className='text-center p-3 bg-gray-50 rounded-lg'>
                    <p className='text-lg font-bold text-gray-900'>
                      {service.deposit.toLocaleString('no-NO')}{' '}
                      {service.currency}
                    </p>
                    <p className='text-xs text-gray-500'>Depositum</p>
                  </div>
                  <div className='text-center p-3 bg-gray-50 rounded-lg'>
                    <p className='text-lg font-bold text-gray-900'>
                      {service.durationMin} min
                    </p>
                    <p className='text-xs text-gray-500'>Varighet</p>
                  </div>
                  <div className='text-center p-3 bg-gray-50 rounded-lg'>
                    <p className='text-lg font-bold text-gray-900'>
                      {service.totalBookings}
                    </p>
                    <p className='text-xs text-gray-500'>Bookinger</p>
                  </div>
                </div>

                {/* Service Features */}
                <div className='mb-4'>
                  <p className='text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide'>
                    Funksjoner
                  </p>
                  <div className='flex flex-wrap gap-1'>
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className='px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded'
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className='px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded'>
                        +{service.features.length - 3} flere
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Performance */}
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center space-x-4'>
                    <span className='text-gray-600'>
                      Rating:{' '}
                      <span className='font-medium'>
                        {service.averageRating}/5
                      </span>
                    </span>
                    <span className='text-gray-600'>
                      Popularitet:{' '}
                      <span className='font-medium'>
                        {service.popularityScore}%
                      </span>
                    </span>
                  </div>
                  <span className='text-xs text-gray-500'>
                    Oppdatert{' '}
                    {new Date(service.updatedAt).toLocaleDateString('no-NO')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inactive Services */}
      {inactiveServices.length > 0 && (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Inaktive tjenester ({inactiveServices.length})
            </h2>
          </div>

          <div className='p-6'>
            <div className='space-y-4'>
              {inactiveServices.map((service) => (
                <div
                  key={service.id}
                  className='flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50'
                >
                  <div className='flex-1'>
                    <div className='flex items-center space-x-3'>
                      <h3 className='text-lg font-medium text-gray-700'>
                        {service.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          categoryColors[
                            service.category as keyof typeof categoryColors
                          ]
                        }`}
                      >
                        {service.category}
                      </span>
                      <span className='px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full'>
                        Inaktiv
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>
                      {service.description}
                    </p>
                    <div className='flex items-center space-x-6 mt-2 text-sm text-gray-500'>
                      <span>
                        {service.price.toLocaleString('no-NO')}{' '}
                        {service.currency}
                      </span>
                      <span>{service.durationMin} min</span>
                      <span>{service.totalBookings} bookinger</span>
                      <span>Rating: {service.averageRating}/5</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button variant='outline' size='sm'>
                      <Eye size={14} className='mr-1' />
                      Aktiver
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-red-600 hover:text-red-700'
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Mest populære
          </h3>
          <div className='space-y-3'>
            {services
              .sort((a, b) => b.popularityScore - a.popularityScore)
              .slice(0, 3)
              .map((service) => (
                <div
                  key={service.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {service.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {service.totalBookings} bookinger
                    </p>
                  </div>
                  <span className='text-sm font-medium text-blue-600'>
                    {service.popularityScore}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Høyest inntekt
          </h3>
          <div className='space-y-3'>
            {services
              .sort(
                (a, b) => b.totalBookings * b.price - a.totalBookings * a.price
              )
              .slice(0, 3)
              .map((service) => (
                <div
                  key={service.id}
                  className='flex justify-between items-center'
                >
                  <div>
                    <p className='text-sm font-medium text-gray-900'>
                      {service.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {service.totalBookings} ×{' '}
                      {service.price.toLocaleString('no-NO')} NOK
                    </p>
                  </div>
                  <span className='text-sm font-medium text-green-600'>
                    {(service.totalBookings * service.price).toLocaleString(
                      'no-NO'
                    )}{' '}
                    NOK
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Handlinger</h3>
          <div className='space-y-3'>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'>
              📊 Eksporter tjeneste-rapport
            </button>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'>
              💰 Oppdater alle priser
            </button>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg'>
              🔄 Synkroniser med booking-system
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
