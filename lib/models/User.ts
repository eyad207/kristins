import mongoose, { Schema, Document } from 'mongoose'
import type { User as UserType } from '@/types'

export interface UserDocument extends Omit<UserType, 'id'>, Document {
  _id: string
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Navn er påkrevd'],
      trim: true,
      maxlength: [100, 'Navn kan ikke være lengre enn 100 tegn'],
    },
    email: {
      type: String,
      required: [true, 'E-post er påkrevd'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Vennligst oppgi en gyldig e-postadresse',
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^(\+47|0047|47)?[2-9]\d{7}$/,
        'Vennligst oppgi et gyldig norsk telefonnummer',
      ],
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'admin', 'staff'],
        message: 'Rolle må være customer, admin eller staff',
      },
      default: 'customer',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: Record<string, unknown>) {
        ret.id = ret._id
        ret.createdAt = ret.createdAt
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// Indexes for performance
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ createdAt: -1 })

// Prevent model re-compilation during development
const User =
  mongoose.models.User || mongoose.model<UserDocument>('User', userSchema)

export default User
