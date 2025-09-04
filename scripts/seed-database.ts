import connectDB from '@/lib/database/connection'
import { Service, Staff, AvailabilityRule } from '@/lib/models'

const seedServices = [
  {
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
    category: 'brudekjole',
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
  },
  {
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
    category: 'selskapskjole',
    isActive: true,
    features: [
      'Stor utvalg av kjoler',
      'Stilrådgivning',
      'Tilbehør inkludert',
      'Prøving av flere modeller',
    ],
    requirements: ['Oppgi anledning ved booking', 'Ta med egnede sko'],
  },
  {
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
    category: 'brudepike',
    isActive: true,
    features: [
      'Koordinert stil',
      'Gruppeavtaler mulig',
      'Fargesammenheng',
      'Tilpasning inkludert',
    ],
    requirements: ['Koordiner med bruden', 'Gruppebestilling anbefales'],
  },
  {
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
  },
  {
    name: 'Stilrådgivning konsultasjon',
    slug: 'stilradgivning-konsultasjon',
    description: 'Personlig stilrådgivning og planlegging av brudeantrekket.',
    durationMin: 60,
    bufferBefore: 10,
    bufferAfter: 10,
    price: 1200,
    deposit: 300,
    currency: 'NOK',
    category: 'konsultasjon',
    isActive: true,
    features: [
      'Personlig analyse',
      'Stilguide',
      'Fargematching',
      'Tilbehørsrådgivning',
    ],
    requirements: ['Ta med inspirasjon', 'Informasjon om bryllupet'],
  },
]

const seedStaff = [
  {
    name: 'Kristin Hansen',
    email: 'kristin@kristins-brudesalong.no',
    phone: '+47 123 45 678',
    role: 'admin',
    specialties: ['brudekjole', 'selskapskjole', 'stilrådgivning'],
    bio: 'Grunnlegger og hovedstylist med over 15 års erfaring.',
    image: '/images/PROFILEIMG.avif',
    isActive: true,
    workingHours: {
      monday: { start: '10:00', end: '18:00', available: true },
      tuesday: { start: '10:00', end: '18:00', available: true },
      wednesday: { start: '10:00', end: '18:00', available: true },
      thursday: { start: '10:00', end: '19:00', available: true },
      friday: { start: '10:00', end: '17:00', available: true },
      saturday: { start: '10:00', end: '16:00', available: true },
      sunday: { start: '12:00', end: '16:00', available: false },
    },
  },
  {
    name: 'Emma Larsen',
    email: 'emma@kristins-brudesalong.no',
    phone: '+47 987 65 432',
    role: 'stylist',
    specialties: ['brudepike', 'tilpasning'],
    bio: 'Erfaren stylist med spesialkompetanse på brudepikekjoler.',
    isActive: true,
    workingHours: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '16:00', available: true },
      saturday: { start: '10:00', end: '15:00', available: true },
      sunday: { start: '12:00', end: '16:00', available: false },
    },
  },
]

const seedAvailabilityRules = [
  {
    name: 'Standard åpningstider',
    description: 'Normale åpningstider for brudesalongen',
    ruleType: 'opening_hours',
    dayOfWeek: 1, // Monday
    startTime: '10:00',
    endTime: '18:00',
    isActive: true,
  },
  {
    name: 'Standard åpningstider',
    description: 'Normale åpningstider for brudesalongen',
    ruleType: 'opening_hours',
    dayOfWeek: 2, // Tuesday
    startTime: '10:00',
    endTime: '18:00',
    isActive: true,
  },
  {
    name: 'Standard åpningstider',
    description: 'Normale åpningstider for brudesalongen',
    ruleType: 'opening_hours',
    dayOfWeek: 3, // Wednesday
    startTime: '10:00',
    endTime: '18:00',
    isActive: true,
  },
  {
    name: 'Torsdager - forlengede åpningstider',
    description: 'Lengre åpningstider på torsdager',
    ruleType: 'opening_hours',
    dayOfWeek: 4, // Thursday
    startTime: '10:00',
    endTime: '19:00',
    isActive: true,
  },
  {
    name: 'Fredager - kortere åpningstider',
    description: 'Kortere åpningstider på fredager',
    ruleType: 'opening_hours',
    dayOfWeek: 5, // Friday
    startTime: '10:00',
    endTime: '17:00',
    isActive: true,
  },
  {
    name: 'Lørdager - helgeåpning',
    description: 'Helgeåpning på lørdager',
    ruleType: 'opening_hours',
    dayOfWeek: 6, // Saturday
    startTime: '10:00',
    endTime: '16:00',
    isActive: true,
  },
]

export async function seedDatabase() {
  try {
    await connectDB()

    console.log('🌱 Starting database seeding...')

    // Clear existing data
    await Service.deleteMany({})
    await Staff.deleteMany({})
    await AvailabilityRule.deleteMany({})

    console.log('🗑️  Cleared existing data')

    // Seed services
    const services = await Service.insertMany(seedServices)
    console.log(`✅ Created ${services.length} services`)

    // Seed staff
    const staff = await Staff.insertMany(seedStaff)
    console.log(`✅ Created ${staff.length} staff members`)

    // Seed availability rules
    const rules = await AvailabilityRule.insertMany(seedAvailabilityRules)
    console.log(`✅ Created ${rules.length} availability rules`)

    console.log('🎉 Database seeding completed successfully!')

    return {
      success: true,
      data: {
        services: services.length,
        staff: staff.length,
        rules: rules.length,
      },
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}
