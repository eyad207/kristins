import { NextRequest, NextResponse } from 'next/server'
import { vippsAPI } from '@/lib/vipps'
import connectDB from '@/lib/database/connection'
import Appointment from '@/lib/models/Appointment'
import { resend, EMAIL_TEMPLATES } from '@/lib/email'
import BookingConfirmationEmail from '@/emails/booking-confirmation'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: 'orderId er påkrevd' }, { status: 400 })
    }

    // Finn appointment basert på orderId
    const appointment = await Appointment.findOne({ vippsOrderId: orderId })
      .populate('service')
      .populate('customer')
      .populate('staff')

    if (!appointment) {
      return NextResponse.json({ error: 'Finner ikke timen' }, { status: 404 })
    }

    // Sjekk betalingsstatus hos Vipps
    const vippsStatus = await vippsAPI.getPaymentStatus(orderId)

    let paymentStatus = 'pending'

    if (vippsStatus.sessionState === 'PaymentSuccessful') {
      paymentStatus = 'paid'
      appointment.paymentStatus = 'paid'
      appointment.paymentDate = new Date()
      appointment.status = 'confirmed'

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
    } else if (vippsStatus.sessionState === 'PaymentTerminated') {
      paymentStatus = 'failed'
      appointment.paymentStatus = 'failed'
    } else if (vippsStatus.sessionState === 'SessionExpired') {
      paymentStatus = 'expired'
      appointment.paymentStatus = 'expired'
    }

    await appointment.save()

    return NextResponse.json({
      success: true,
      paymentStatus,
      vippsStatus: vippsStatus.sessionState,
      appointment: {
        id: appointment._id,
        status: appointment.status,
        paymentStatus: appointment.paymentStatus,
      },
    })
  } catch (error) {
    console.error('Vipps webhook error:', error)
    return NextResponse.json(
      { error: 'Feil ved behandling av Vipps callback' },
      { status: 500 }
    )
  }
}
