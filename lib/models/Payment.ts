import mongoose, { Schema, Document } from 'mongoose'
import type { Payment as PaymentType } from '@/types'

export interface PaymentDocument extends Omit<PaymentType, 'id'>, Document {
  _id: string
}

const paymentSchema = new Schema<PaymentDocument>(
  {
    appointmentId: {
      type: String,
      required: [true, 'Avtale-ID er påkrevd'],
      ref: 'Appointment',
    },
    provider: {
      type: String,
      required: [true, 'Betalingsleverandør er påkrevd'],
      enum: {
        values: ['stripe', 'vipps'],
        message: 'Betalingsleverandør må være stripe eller vipps',
      },
    },
    amount: {
      type: Number,
      required: [true, 'Beløp er påkrevd'],
      min: [0, 'Beløp kan ikke være negativt'],
    },
    currency: {
      type: String,
      required: [true, 'Valuta er påkrevd'],
      default: 'NOK',
      enum: {
        values: ['NOK', 'EUR', 'USD'],
        message: 'Valuta må være NOK, EUR eller USD',
      },
    },
    status: {
      type: String,
      required: [true, 'Status er påkrevd'],
      enum: {
        values: [
          'requires_action',
          'succeeded',
          'refunded',
          'failed',
          'pending',
        ],
        message: 'Ugyldig betalingsstatus',
      },
      default: 'pending',
    },
    providerIntentId: {
      type: String,
      required: [true, 'Leverandør intent-ID er påkrevd'],
      trim: true,
    },
    receiptUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Kvitterings-URL må være en gyldig URL'],
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
paymentSchema.index({ appointmentId: 1 })
paymentSchema.index({ provider: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ providerIntentId: 1 })
paymentSchema.index({ createdAt: -1 })

// Prevent model re-compilation during development
const Payment =
  mongoose.models.Payment ||
  mongoose.model<PaymentDocument>('Payment', paymentSchema)

export default Payment
