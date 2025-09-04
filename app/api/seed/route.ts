import { NextResponse } from 'next/server'
import { seedDatabase } from '@/scripts/seed-database'

export async function POST() {
  try {
    const result = await seedDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Seeding failed',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to seed the database',
    endpoints: {
      POST: '/api/seed - Seeds the database with initial data',
    },
  })
}
