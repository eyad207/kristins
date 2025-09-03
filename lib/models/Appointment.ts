import mongoose, { Schema, Document } from 'mongoose'
import type { Appointment as AppointmentType } from '@/types'

export interface AppointmentDocument
  extends Omit<AppointmentType, 'id'>,
    Document {
  _id: string
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    serviceId: {
      type: String,
      required: [true, 'Tjeneste-ID er påkrevd'],
      ref: 'Service',
    },
    userId: {
      type: String,
      required: [true, 'Bruker-ID er påkrevd'],
      ref: 'User',
    },
    staffId: {
      type: String,
      ref: 'Staff',
    },
    start: {
      type: Date,
      required: [true, 'Starttidspunkt er påkrevd'],
    },
    end: {
      type: Date,
      required: [true, 'Sluttidspunkt er påkrevd'],
    },
    status: {
      type: String,
      required: [true, 'Status er påkrevd'],
      enum: {
        values: ['pending', 'confirmed', 'cancelled', 'no-show', 'completed'],
        message: 'Ugyldig status',
      },
      default: 'pending',
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notater kan ikke være lengre enn 1000 tegn'],
    },
    customerName: {
      type: String,
      required: [true, 'Kundenavn er påkrevd'],
      trim: true,
      maxlength: [100, 'Kundenavn kan ikke være lengre enn 100 tegn'],
    },
    customerEmail: {
      type: String,
      required: [true, 'Kunde e-post er påkrevd'],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Vennligst oppgi en gyldig e-postadresse',
      ],
    },
    customerPhone: {
      type: String,
      required: [true, 'Kunde telefon er påkrevd'],
      trim: true,
      match: [
        /^(\+47|0047|47)?[2-9]\d{7}$/,
        'Vennligst oppgi et gyldig norsk telefonnummer',
      ],
    },
    preferredStyle: {
      type: String,
      trim: true,
      maxlength: [200, 'Foretrukket stil kan ikke være lengre enn 200 tegn'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: Record<string, unknown>) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// Indexes for performance
appointmentSchema.index({ start: 1 })
appointmentSchema.index({ end: 1 })
appointmentSchema.index({ status: 1 })
appointmentSchema.index({ serviceId: 1 })
appointmentSchema.index({ userId: 1 })
appointmentSchema.index({ customerEmail: 1 })
appointmentSchema.index({ start: 1, end: 1 }) // Compound index for date range queries

// Validation: end time must be after start time
appointmentSchema.pre('save', function () {
  if (this.end <= this.start) {
    throw new Error('Sluttidspunkt må være etter starttidspunkt')
  }
})

// Prevent model re-compilation during development
const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument>('Appointment', appointmentSchema)

export default Appointment
