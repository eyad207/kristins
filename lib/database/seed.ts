import connectDB from './connection'
import { Service, Staff, Setting } from '../models'

/**
 * Seed the database with initial data for development
 */
export async function seedDatabase() {
  try {
    await connectDB()

    console.log('🌱 Seeding database...')

    // Seed Services
    const services = [
      {
        name: 'Første Prøvetime',
        slug: 'forste-provetime',
        description:
          'Første prøving av brudekjole med personlig stylist. Inkluderer konsultasjon og kjolevalg.',
        durationMin: 90,
        bufferBefore: 15,
        bufferAfter: 15,
        price: 1500,
        deposit: 500,
        currency: 'NOK',
        isActive: true,
        category: 'prøvetime' as const,
      },
      {
        name: 'Tilpasning',
        slug: 'tilpasning',
        description:
          'Profesjonell tilpasning av brudekjole for perfekt passform.',
        durationMin: 60,
        bufferBefore: 10,
        bufferAfter: 10,
        price: 800,
        deposit: 200,
        currency: 'NOK',
        isActive: true,
        category: 'tilpasning' as const,
      },
      {
        name: 'Express Prøving',
        slug: 'express-proving',
        description: 'Rask prøving for brude med kort tidsfrist.',
        durationMin: 45,
        bufferBefore: 10,
        bufferAfter: 10,
        price: 2000,
        deposit: 1000,
        currency: 'NOK',
        isActive: true,
        category: 'express' as const,
      },
    ]

    for (const serviceData of services) {
      await Service.findOneAndUpdate({ slug: serviceData.slug }, serviceData, {
        upsert: true,
        new: true,
      })
    }

    // Seed Staff
    const staff = [
      {
        name: 'Kristin Andersen',
        email: 'kristin@brudesalongkristin.no',
        phone: '+4799123456',
        role: 'admin' as const,
        bio: 'Erfaren brude-stylist med over 15 års erfaring. Spesialiserer seg på klassisk eleganse og moderne design.',
        specialties: ['Klassisk', 'Moderne', 'Vintage'],
        languages: ['Norsk', 'Engelsk'],
        calendarColor: '#D4AF37',
        workingHours: {
          tuesday: { start: '10:00', end: '17:00' },
          wednesday: { start: '10:00', end: '17:00' },
          thursday: { start: '10:00', end: '19:00' },
          friday: { start: '10:00', end: '17:00' },
          saturday: { start: '10:00', end: '16:00' },
        },
        isActive: true,
        hireDate: new Date('2010-01-01'),
      },
      {
        name: 'Maria Olsen',
        email: 'maria@brudesalongkristin.no',
        phone: '+4799234567',
        role: 'stylist' as const,
        bio: 'Yngre stylist med passion for moderne brudekjoler og trendbevisst design.',
        specialties: ['Moderne', 'Boho', 'Minimalistisk'],
        languages: ['Norsk', 'Engelsk', 'Spansk'],
        calendarColor: '#F4C2C2',
        workingHours: {
          monday: { start: '11:00', end: '18:00' },
          wednesday: { start: '10:00', end: '17:00' },
          thursday: { start: '10:00', end: '19:00' },
          friday: { start: '10:00', end: '17:00' },
          saturday: { start: '09:00', end: '15:00' },
        },
        isActive: true,
        hireDate: new Date('2020-03-15'),
      },
    ]

    for (const staffData of staff) {
      await Staff.findOneAndUpdate({ email: staffData.email }, staffData, {
        upsert: true,
        new: true,
      })
    }

    // Seed Settings
    const settings = [
      {
        key: 'business_name',
        value: 'Brudesalong Kristin',
        description: 'Navn på salongselskapet',
      },
      {
        key: 'business_email',
        value: 'post@brudesalongkristin.no',
        description: 'Hovedkontakt e-post',
      },
      {
        key: 'business_phone',
        value: '+47 99 12 34 56',
        description: 'Hovedkontakt telefon',
      },
      {
        key: 'booking_advance_days',
        value: 90,
        description: 'Hvor mange dager frem i tid kan kunder booke',
      },
      {
        key: 'cancellation_hours',
        value: 24,
        description: 'Minimum timer før avbestilling',
      },
      {
        key: 'email_notifications',
        value: true,
        description: 'Send e-post notifikasjoner',
      },
      {
        key: 'sms_notifications',
        value: false,
        description: 'Send SMS notifikasjoner',
      },
    ]

    for (const settingData of settings) {
      await Setting.findOneAndUpdate({ key: settingData.key }, settingData, {
        upsert: true,
        new: true,
      })
    }

    console.log('✅ Database seeded successfully!')
    console.log(`📊 Created/updated:`)
    console.log(`   - ${services.length} services`)
    console.log(`   - ${staff.length} staff members`)
    console.log(`   - ${settings.length} settings`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Export individual seed functions for flexibility
export async function seedServices() {
  // Service seeding logic here
}

export async function seedStaff() {
  // Staff seeding logic here
}

export async function seedSettings() {
  // Settings seeding logic here
}
