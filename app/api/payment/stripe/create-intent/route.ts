import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG } from '@/lib/stripe'
import connectDB from '@/lib/database/connection'
import Appointment from '@/lib/models/Appointment'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { appointmentId, metadata = {} } = body

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

    // Opprett Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointment.totalAmount * 100, // Stripe bruker øre
      currency: STRIPE_CONFIG.currency,
      payment_method_types: ['card', 'klarna'],
      capture_method: STRIPE_CONFIG.capture_method,
      confirmation_method: STRIPE_CONFIG.confirmation_method,
      metadata: {
        appointmentId: appointmentId,
        customerEmail: appointment.customer.email,
        serviceName: appointment.service.name,
        ...metadata,
      },
      description: `Prøvetime: ${appointment.service.name} - Kristins Brudesalong`,
      receipt_email: appointment.customer.email,
    })

    // Oppdater appointment med payment intent ID
    appointment.paymentIntentId = paymentIntent.id
    appointment.paymentStatus = 'pending'
    await appointment.save()

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Stripe payment intent error:', error)
    return NextResponse.json(
      { error: 'Feil ved opprettelse av betaling' },
      { status: 500 }
    )
  }
}
