import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import { Appointment } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')
    const status = searchParams.get('status')
    const staffId = searchParams.get('staffId')
    const date = searchParams.get('date') // YYYY-MM-DD

    await connectDB()

    // Build query
    const query: Record<string, string | Date | Record<string, Date>> = {}

    if (email) {
      query.customerEmail = email.toLowerCase()
    }

    if (phone) {
      query.customerPhone = phone
    }

    if (status) {
      query.status = status
    }

    if (staffId) {
      query.staffId = staffId
    }

    if (date) {
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)

      query.start = {
        $gte: startDate,
        $lte: endDate,
      }
    }

    const appointments = await Appointment.find(query)
      .populate('serviceId', 'name price currency')
      .populate('staffId', 'name email')
      .sort({ start: 1 })

    return NextResponse.json({
      success: true,
      data: appointments,
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved henting av avtaler' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const appointmentId = searchParams.get('id')

    if (!appointmentId) {
      return NextResponse.json(
        { success: false, error: 'Avtale-ID er påkrevd' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status, notes } = body

    await connectDB()

    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Avtale ikke funnet' },
        { status: 404 }
      )
    }

    // Update allowed fields
    if (
      status &&
      ['pending', 'confirmed', 'cancelled', 'no-show', 'completed'].includes(
        status
      )
    ) {
      appointment.status = status
    }

    if (notes !== undefined) {
      appointment.notes = notes
    }

    await appointment.save()

    await appointment.populate([
      { path: 'serviceId', select: 'name price currency' },
      { path: 'staffId', select: 'name email' },
    ])

    // TODO: Send status change notification email/SMS

    return NextResponse.json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved oppdatering av avtale' },
      { status: 500 }
    )
  }
}
