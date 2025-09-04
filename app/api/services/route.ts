import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import { Service } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()
    const services = await Service.find({ isActive: true })
      .sort({ price: 1 })
      .lean()
    return NextResponse.json({ success: true, data: services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await connectDB()
    const service = await Service.create(body)
    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
