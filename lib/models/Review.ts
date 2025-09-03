import mongoose, { Schema, Document } from 'mongoose'
import type { Review as ReviewType } from '@/types'

export interface ReviewDocument extends Omit<ReviewType, 'id'>, Document {
  _id: string
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    userId: {
      type: String,
      required: [true, 'Bruker-ID er påkrevd'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Vurdering er påkrevd'],
      min: [1, 'Vurdering må være mellom 1 og 5'],
      max: [5, 'Vurdering må være mellom 1 og 5'],
    },
    title: {
      type: String,
      required: [true, 'Tittel er påkrevd'],
      trim: true,
      maxlength: [100, 'Tittel kan ikke være lengre enn 100 tegn'],
    },
    body: {
      type: String,
      required: [true, 'Anmeldelse tekst er påkrevd'],
      trim: true,
      maxlength: [1000, 'Anmeldelse kan ikke være lengre enn 1000 tegn'],
    },
    published: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Bilde-URL må være en gyldig URL'],
      },
    ],
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
reviewSchema.index({ userId: 1 })
reviewSchema.index({ rating: 1 })
reviewSchema.index({ published: 1 })
reviewSchema.index({ createdAt: -1 })

// Compound index for published reviews sorted by rating and date
reviewSchema.index({ published: 1, rating: -1, createdAt: -1 })

// Prevent model re-compilation during development
const Review =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>('Review', reviewSchema)

export default Review
