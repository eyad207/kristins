import mongoose, { Schema, Document } from 'mongoose'
import type { Blackout as BlackoutType } from '@/types'

export interface BlackoutDocument extends Omit<BlackoutType, 'id'>, Document {
  _id: string
}

const blackoutSchema = new Schema<BlackoutDocument>(
  {
    staffId: {
      type: String,
      trim: true,
    },
    roomId: {
      type: String,
      trim: true,
    },
    start: {
      type: Date,
      required: [true, 'Starttidspunkt er påkrevd'],
    },
    end: {
      type: Date,
      required: [true, 'Sluttidspunkt er påkrevd'],
    },
    reason: {
      type: String,
      required: [true, 'Årsak er påkrevd'],
      trim: true,
      maxlength: [200, 'Årsak kan ikke være lengre enn 200 tegn'],
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
blackoutSchema.index({ staffId: 1, start: 1, end: 1 })
blackoutSchema.index({ roomId: 1, start: 1, end: 1 })
blackoutSchema.index({ start: 1, end: 1 })

// Validation: end time must be after start time
blackoutSchema.pre('save', function (this: BlackoutDocument) {
  if (this.end <= this.start) {
    throw new Error('Sluttidspunkt må være etter starttidspunkt')
  }
})

// Prevent model re-compilation during development
const Blackout =
  mongoose.models.Blackout ||
  mongoose.model<BlackoutDocument>('Blackout', blackoutSchema)

export default Blackout
