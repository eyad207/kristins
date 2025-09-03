import mongoose, { Schema, Document } from 'mongoose'
import type { Refund as RefundType } from '@/types'

export interface RefundDocument extends Omit<RefundType, 'id'>, Document {
  _id: string
}

const refundSchema = new Schema<RefundDocument>(
  {
    paymentId: {
      type: String,
      required: [true, 'Betalings-ID er påkrevd'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Refunderingsbeløp er påkrevd'],
      min: [0, 'Beløp kan ikke være negativt'],
    },
    reason: {
      type: String,
      required: [true, 'Årsak for refundering er påkrevd'],
      trim: true,
      maxlength: [500, 'Årsak kan ikke være lengre enn 500 tegn'],
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
refundSchema.index({ paymentId: 1 })
refundSchema.index({ createdAt: -1 })

// Prevent model re-compilation during development
const Refund =
  mongoose.models.Refund ||
  mongoose.model<RefundDocument>('Refund', refundSchema)

export default Refund
