import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import {
  Service,
  Staff,
  AvailabilityRule,
  Blackout,
  Appointment,
} from '@/lib/models'
import { generateTimeSlots } from '@/lib/utils'

interface TimeSlot {
  start: Date
  end: Date
  available: boolean
  staffId: string
  staffName: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')
    const date = searchParams.get('date') // YYYY-MM-DD format
    const staffId = searchParams.get('staffId') // optional

    if (!serviceId || !date) {
      return NextResponse.json(
        { success: false, error: 'serviceId and date are required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Get service details
    const service = await Service.findById(serviceId)
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }

    // Parse date and get weekday (0 = Sunday, 6 = Saturday)
    const targetDate = new Date(date)
    const weekday = targetDate.getDay()

    // Get available staff for this service (if no specific staff requested)
    const staffQuery = staffId
      ? { _id: staffId, isActive: true }
      : { isActive: true }
    const availableStaff = await Staff.find(staffQuery)

    const availableSlots: TimeSlot[] = []

    for (const staff of availableStaff) {
      // Get availability rules for this staff member and weekday
      const availabilityRules = await AvailabilityRule.find({
        staffId: staff._id.toString(),
        weekday: weekday,
      })

      for (const rule of availabilityRules) {
        // Generate time slots based on availability rule
        const slots = generateTimeSlots(
          rule.startTime,
          rule.endTime,
          service.durationMin
        )

        // Check for blackouts
        const dayStart = new Date(targetDate)
        dayStart.setHours(0, 0, 0, 0)
        const dayEnd = new Date(targetDate)
        dayEnd.setHours(23, 59, 59, 999)

        const blackouts = await Blackout.find({
          staffId: staff._id.toString(),
          start: { $lte: dayEnd },
          end: { $gte: dayStart },
        })

        // Check for existing appointments
        const existingAppointments = await Appointment.find({
          staffId: staff._id.toString(),
          start: {
            $gte: dayStart,
            $lt: dayEnd,
          },
          status: { $in: ['pending', 'confirmed'] },
        })

        // Filter out unavailable slots
        const availableSlotsTimes = slots.filter((slot) => {
          const slotStart = new Date(`${date}T${slot}:00`)
          const slotEnd = new Date(`${date}T${slot}:00`)
          slotEnd.setMinutes(slotEnd.getMinutes() + service.durationMin)

          // Check against blackouts
          const hasBlackout = blackouts.some(
            (blackout) => slotStart < blackout.end && slotEnd > blackout.start
          )

          // Check against existing appointments
          const hasAppointment = existingAppointments.some(
            (appointment) =>
              slotStart < appointment.end && slotEnd > appointment.start
          )

          return !hasBlackout && !hasAppointment
        })

        // Add available slots to result
        availableSlotsTimes.forEach((slot) => {
          const slotStart = new Date(`${date}T${slot}:00`)
          const slotEnd = new Date(`${date}T${slot}:00`)
          slotEnd.setMinutes(slotEnd.getMinutes() + service.durationMin)

          availableSlots.push({
            start: slotStart,
            end: slotEnd,
            available: true,
            staffId: staff._id.toString(),
            staffName: staff.name,
          })
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        date,
        service: {
          id: service._id,
          name: service.name,
          duration: service.durationMin,
        },
        slots: availableSlots.sort(
          (a, b) => a.start.getTime() - b.start.getTime()
        ),
      },
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
