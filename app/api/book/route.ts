import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import { Service, Staff, Appointment } from '@/lib/models'
import { validateEmail, validatePhone } from '@/lib/utils'

interface BookingRequest {
  serviceId: string
  staffId: string
  selectedDate: string // YYYY-MM-DD
  selectedTime: string // HH:MM
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: string
  preferredStyle?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json()

    // Validate required fields
    const {
      serviceId,
      staffId,
      selectedDate,
      selectedTime,
      customerName,
      customerEmail,
      customerPhone,
    } = body

    if (
      !serviceId ||
      !staffId ||
      !selectedDate ||
      !selectedTime ||
      !customerName ||
      !customerEmail ||
      !customerPhone
    ) {
      return NextResponse.json(
        { success: false, error: 'Alle påkrevde felt må fylles ut' },
        { status: 400 }
      )
    }

    // Validate email and phone
    if (!validateEmail(customerEmail)) {
      return NextResponse.json(
        { success: false, error: 'Ugyldig e-postadresse' },
        { status: 400 }
      )
    }

    if (!validatePhone(customerPhone)) {
      return NextResponse.json(
        { success: false, error: 'Ugyldig telefonnummer' },
        { status: 400 }
      )
    }

    await connectDB()

    // Verify service exists
    const service = await Service.findById(serviceId)
    if (!service || !service.isActive) {
      return NextResponse.json(
        { success: false, error: 'Tjeneste ikke funnet' },
        { status: 404 }
      )
    }

    // Verify staff exists
    const staff = await Staff.findById(staffId)
    if (!staff || !staff.isActive) {
      return NextResponse.json(
        { success: false, error: 'Stylist ikke funnet' },
        { status: 404 }
      )
    }

    // Create appointment start and end times
    const appointmentStart = new Date(`${selectedDate}T${selectedTime}:00`)
    const appointmentEnd = new Date(appointmentStart)
    appointmentEnd.setMinutes(appointmentEnd.getMinutes() + service.durationMin)

    // Check if slot is still available
    const existingAppointment = await Appointment.findOne({
      staffId: staffId,
      start: { $lt: appointmentEnd },
      end: { $gt: appointmentStart },
      status: { $in: ['pending', 'confirmed'] },
    })

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, error: 'Tidspunktet er ikke lenger tilgjengelig' },
        { status: 409 }
      )
    }

    // Create the appointment
    const appointment = await Appointment.create({
      serviceId: serviceId,
      staffId: staffId,
      start: appointmentStart,
      end: appointmentEnd,
      status: 'pending',
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: customerPhone.trim(),
      notes: body.notes?.trim(),
      preferredStyle: body.preferredStyle?.trim(),
    })

    // Populate service and staff details for response
    await appointment.populate([
      { path: 'serviceId', select: 'name price deposit currency' },
      { path: 'staffId', select: 'name email' },
    ])

    // TODO: Send confirmation email
    // TODO: Create calendar event
    // TODO: Send SMS confirmation (if enabled)

    return NextResponse.json(
      {
        success: true,
        data: {
          appointmentId: appointment._id,
          appointment: appointment,
          nextStep: 'payment',
          paymentAmount: service.deposit,
          paymentCurrency: service.currency,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved opprettelse av time' },
      { status: 500 }
    )
  }
}
