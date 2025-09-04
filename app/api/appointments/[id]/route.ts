import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import Appointment from '@/lib/models/Appointment'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const appointment = await Appointment.findById(params.id)
      .populate('service')
      .populate('customer')
      .populate('staff')

    if (!appointment) {
      return NextResponse.json({ error: 'Finner ikke timen' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      appointment: {
        _id: appointment._id,
        service: {
          name: appointment.service.name,
          price: appointment.service.price,
        },
        date: appointment.date,
        timeSlot: appointment.timeSlot,
        staff: {
          name: appointment.staff.name,
        },
        notes: appointment.notes,
        totalAmount: appointment.totalAmount,
        status: appointment.status,
        paymentStatus: appointment.paymentStatus,
      },
    })
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { error: 'Feil ved henting av timedetaljer' },
      { status: 500 }
    )
  }
}
