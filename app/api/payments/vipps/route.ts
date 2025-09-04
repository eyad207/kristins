import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import { Appointment } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId } = body

    if (!appointmentId) {
      return NextResponse.json(
        { success: false, error: 'Avtale-ID er påkrevd' },
        { status: 400 }
      )
    }

    await connectDB()

    // Verify appointment exists
    const appointment = await Appointment.findById(appointmentId).populate(
      'serviceId'
    )
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Avtale ikke funnet' },
        { status: 404 }
      )
    }

    // TODO: Initialize Vipps SDK
    // TODO: Create Vipps payment order
    // TODO: Save payment record

    // Placeholder response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Vipps integration placeholder - not implemented yet',
        appointmentId: appointmentId,
        // redirectUrl: vippsRedirectUrl,
        // paymentId: payment._id
      },
    })
  } catch (error) {
    console.error('Error creating Vipps payment:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved opprettelse av betaling' },
      { status: 500 }
    )
  }
}
