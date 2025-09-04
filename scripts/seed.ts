#!/usr/bin/env node

/**
 * Database seeding script for development
 * Usage: npm run seed
 */

import { seedDatabase } from '../lib/database/seed'

async function main() {
  try {
    console.log('🌱 Starting database seed...')
    await seedDatabase()
    console.log('✅ Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

main()
