import mongoose, { Schema, Document } from 'mongoose'
import type { Service as ServiceType } from '@/types'

export interface ServiceDocument extends Omit<ServiceType, 'id'>, Document {
  _id: string
}

const serviceSchema = new Schema<ServiceDocument>(
  {
    name: {
      type: String,
      required: [true, 'Tjenestenavn er påkrevd'],
      trim: true,
      maxlength: [100, 'Navn kan ikke være lengre enn 100 tegn'],
    },
    slug: {
      type: String,
      required: [true, 'Slug er påkrevd'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        'Slug kan kun inneholde små bokstaver, tall og bindestreker',
      ],
    },
    description: {
      type: String,
      required: [true, 'Beskrivelse er påkrevd'],
      maxlength: [1000, 'Beskrivelse kan ikke være lengre enn 1000 tegn'],
    },
    durationMin: {
      type: Number,
      required: [true, 'Varighet er påkrevd'],
      min: [15, 'Varighet må være minst 15 minutter'],
      max: [480, 'Varighet kan ikke være mer enn 8 timer'],
    },
    bufferBefore: {
      type: Number,
      default: 15,
      min: [0, 'Buffer før kan ikke være negativ'],
      max: [60, 'Buffer før kan ikke være mer enn 60 minutter'],
    },
    bufferAfter: {
      type: Number,
      default: 15,
      min: [0, 'Buffer etter kan ikke være negativ'],
      max: [60, 'Buffer etter kan ikke være mer enn 60 minutter'],
    },
    price: {
      type: Number,
      required: [true, 'Pris er påkrevd'],
      min: [0, 'Pris kan ikke være negativ'],
    },
    deposit: {
      type: Number,
      required: [true, 'Depositum er påkrevd'],
      min: [0, 'Depositum kan ikke være negativ'],
    },
    currency: {
      type: String,
      default: 'NOK',
      enum: {
        values: ['NOK', 'EUR', 'USD'],
        message: 'Valuta må være NOK, EUR eller USD',
      },
    },
    locationId: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: [true, 'Kategori er påkrevd'],
      enum: {
        values: ['prøvetime', 'tilpasning', 'express', 'after-hours', 'gruppe'],
        message: 'Ugyldig tjenestekategori',
      },
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
serviceSchema.index({ slug: 1 })
serviceSchema.index({ category: 1 })
serviceSchema.index({ isActive: 1 })
serviceSchema.index({ price: 1 })

// Prevent model re-compilation during development
const Service =
  mongoose.models.Service ||
  mongoose.model<ServiceDocument>('Service', serviceSchema)

export default Service
