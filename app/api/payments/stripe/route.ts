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

    // TODO: Initialize Stripe
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //   apiVersion: '2023-10-16',
    // })

    // TODO: Create Stripe PaymentIntent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: appointment.serviceId.deposit * 100, // Convert to øre
    //   currency: appointment.serviceId.currency.toLowerCase(),
    //   metadata: {
    //     appointmentId: appointmentId
    //   }
    // })

    // TODO: Save payment record
    // const payment = await Payment.create({
    //   appointmentId: appointmentId,
    //   provider: 'stripe',
    //   amount: appointment.serviceId.deposit,
    //   currency: appointment.serviceId.currency,
    //   status: 'pending',
    //   providerIntentId: paymentIntent.id
    // })

    // Placeholder response
    return NextResponse.json({
      success: true,
      data: {
        message: 'Stripe integration placeholder - not implemented yet',
        appointmentId: appointmentId,
        // clientSecret: paymentIntent.client_secret,
        // paymentId: payment._id
      },
    })
  } catch (error) {
    console.error('Error creating Stripe payment:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved opprettelse av betaling' },
      { status: 500 }
    )
  }
}
