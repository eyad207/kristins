import mongoose, { Schema, Document } from 'mongoose'
import type { AvailabilityRule as AvailabilityRuleType } from '@/types'

export interface AvailabilityRuleDocument
  extends Omit<AvailabilityRuleType, 'id'>,
    Document {
  _id: string
}

const availabilityRuleSchema = new Schema<AvailabilityRuleDocument>(
  {
    staffId: {
      type: String,
      trim: true,
    },
    roomId: {
      type: String,
      trim: true,
    },
    weekday: {
      type: Number,
      required: [true, 'Ukedag er påkrevd'],
      min: [0, 'Ukedag må være mellom 0-6 (søndag-lørdag)'],
      max: [6, 'Ukedag må være mellom 0-6 (søndag-lørdag)'],
    },
    startTime: {
      type: String,
      required: [true, 'Starttid er påkrevd'],
      trim: true,
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        'Ugyldig tidsformat (bruk HH:MM)',
      ],
    },
    endTime: {
      type: String,
      required: [true, 'Sluttid er påkrevd'],
      trim: true,
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        'Ugyldig tidsformat (bruk HH:MM)',
      ],
    },
    capacity: {
      type: Number,
      required: [true, 'Kapasitet er påkrevd'],
      min: [1, 'Kapasitet må være minst 1'],
      max: [10, 'Kapasitet kan ikke være mer enn 10'],
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
availabilityRuleSchema.index({ staffId: 1, weekday: 1 })
availabilityRuleSchema.index({ roomId: 1, weekday: 1 })
availabilityRuleSchema.index({ weekday: 1 })

// Validation: end time must be after start time
availabilityRuleSchema.pre('save', function (this: AvailabilityRuleDocument) {
  const startParts = this.startTime.split(':')
  const endParts = this.endTime.split(':')

  const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1])
  const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1])

  if (endMinutes <= startMinutes) {
    throw new Error('Sluttid må være etter starttid')
  }
})

// Prevent model re-compilation during development
const AvailabilityRule =
  mongoose.models.AvailabilityRule ||
  mongoose.model<AvailabilityRuleDocument>(
    'AvailabilityRule',
    availabilityRuleSchema
  )

export default AvailabilityRule
