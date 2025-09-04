import { NextRequest, NextResponse } from 'next/server'
import { vippsAPI } from '@/lib/vipps'
import connectDB from '@/lib/database/connection'
import Appointment from '@/lib/models/Appointment'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { appointmentId } = body

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'appointmentId er påkrevd' },
        { status: 400 }
      )
    }

    // Finn appointment
    const appointment = await Appointment.findById(appointmentId)
      .populate('service')
      .populate('customer')

    if (!appointment) {
      return NextResponse.json({ error: 'Finner ikke timen' }, { status: 404 })
    }

    if (appointment.paymentStatus === 'paid') {
      return NextResponse.json(
        { error: 'Timen er allerede betalt' },
        { status: 400 }
      )
    }

    // Opprett Vipps betaling
    const orderId = `${appointmentId}_${Date.now()}`
    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/booking/success?id=${appointmentId}`

    const vippsPayment = await vippsAPI.createPayment({
      amount: appointment.totalAmount,
      currency: 'NOK',
      orderId,
      redirectUrl,
      userFlow: 'QUICK_PAY',
      paymentDescription: `Prøvetime: ${appointment.service.name} - Kristins Brudesalong`,
      reference: appointmentId,
    })

    // Oppdater appointment med Vipps order ID
    appointment.vippsOrderId = orderId
    appointment.paymentStatus = 'pending'
    await appointment.save()

    return NextResponse.json({
      success: true,
      paymentUrl: vippsPayment.url,
      orderId: vippsPayment.orderId,
      sessionId: vippsPayment.sessionId,
    })
  } catch (error) {
    console.error('Vipps payment creation error:', error)
    return NextResponse.json(
      { error: 'Feil ved opprettelse av Vipps betaling' },
      { status: 500 }
    )
  }
}
