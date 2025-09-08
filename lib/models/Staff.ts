import mongoose, { Schema, Document } from 'mongoose'
import type { Staff as StaffType } from '@/types'

export interface StaffDocument extends Omit<StaffType, 'id'>, Document {
  _id: string
}

const staffSchema = new Schema<StaffDocument>(
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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Ugyldig e-postadresse'],
    },
    phone: {
      type: String,
      required: [true, 'Telefon er påkrevd'],
      trim: true,
      match: [/^(\+47)?[2-9]\d{7}$/, 'Ugyldig norsk telefonnummer'],
    },
    role: {
      type: String,
      required: [true, 'Rolle er påkrevd'],
      enum: {
        values: ['admin', 'stylist', 'consultant'],
        message: 'Ugyldig rolle',
      },
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio kan ikke være lengre enn 500 tegn'],
    },
    profileImageUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Profilbilde-URL må være en gyldig URL'],
    },
    specialties: [
      {
        type: String,
        trim: true,
      },
    ],
    languages: [
      {
        type: String,
        trim: true,
        default: ['Norsk'],
      },
    ],
    workingHours: {
      monday: {
        start: String,
        end: String,
      },
      tuesday: {
        start: String,
        end: String,
      },
      wednesday: {
        start: String,
        end: String,
      },
      thursday: {
        start: String,
        end: String,
      },
      friday: {
        start: String,
        end: String,
      },
      saturday: {
        start: String,
        end: String,
      },
      sunday: {
        start: String,
        end: String,
      },
    },
    calendarColor: {
      type: String,
      required: [true, 'Kalenderfarge er påkrevd'],
      trim: true,
      match: [/^#[0-9A-F]{6}$/i, 'Ugyldig hex-farge'],
      default: '#D4AF37',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hireDate: {
      type: Date,
      required: [true, 'Ansettelsesdato er påkrevd'],
      default: Date.now,
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
// email already has a unique index; avoid duplicate declaration
staffSchema.index({ role: 1 })
staffSchema.index({ isActive: 1 })

// Default languages and calendar color
staffSchema.pre('save', function (this: StaffDocument) {
  if (!this.languages || this.languages.length === 0) {
    this.languages = ['Norsk']
  }
})

// Prevent model re-compilation during development
const Staff =
  mongoose.models.Staff || mongoose.model<StaffDocument>('Staff', staffSchema)

export default Staff
