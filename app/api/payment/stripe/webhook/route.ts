import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import connectDB from '@/lib/database/connection'
import Appointment from '@/lib/models/Appointment'
import { resend, EMAIL_TEMPLATES } from '@/lib/email'
import BookingConfirmationEmail from '@/emails/booking-confirmation'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Mangler Stripe signatur' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  await connectDB()

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        const appointmentId = paymentIntent.metadata.appointmentId

        if (appointmentId) {
          // Oppdater appointment status
          const appointment = await Appointment.findById(appointmentId)
            .populate('service')
            .populate('customer')
            .populate('staff')

          if (appointment) {
            appointment.paymentStatus = 'paid'
            appointment.paymentDate = new Date()
            appointment.status = 'confirmed'
            await appointment.save()

            // Send bekreftelse e-post
            try {
              await resend.emails.send({
                from: 'Kristins Brudesalong <post@kristins-brudesalong.no>',
                to: appointment.customer.email,
                subject: EMAIL_TEMPLATES.booking_confirmation.subject,
                react: BookingConfirmationEmail({
                  customerName: appointment.customer.firstName,
                  serviceName: appointment.service.name,
                  servicePrice: appointment.service.price,
                  appointmentDate: appointment.date.toLocaleDateString('no-NO'),
                  appointmentTime: appointment.timeSlot,
                  staffName: appointment.staff.name,
                  notes: appointment.notes,
                }),
              })
            } catch (emailError) {
              console.error('Failed to send confirmation email:', emailError)
            }

            console.log(`Payment succeeded for appointment ${appointmentId}`)
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        const appointmentId = paymentIntent.metadata.appointmentId

        if (appointmentId) {
          const appointment = await Appointment.findById(appointmentId)
          if (appointment) {
            appointment.paymentStatus = 'failed'
            await appointment.save()
            console.log(`Payment failed for appointment ${appointmentId}`)
          }
        }
        break
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object
        const appointmentId = paymentIntent.metadata.appointmentId

        if (appointmentId) {
          const appointment = await Appointment.findById(appointmentId)
          if (appointment) {
            appointment.paymentStatus = 'cancelled'
            await appointment.save()
            console.log(`Payment cancelled for appointment ${appointmentId}`)
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
