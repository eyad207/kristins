import mongoose, { Schema, Document } from 'mongoose'
import type { Page as PageType } from '@/types'

export interface PageDocument extends Omit<PageType, 'id'>, Document {
  _id: string
}

const pageSchema = new Schema<PageDocument>(
  {
    title: {
      type: String,
      required: [true, 'Sidetittel er påkrevd'],
      trim: true,
      maxlength: [100, 'Tittel kan ikke være lengre enn 100 tegn'],
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
    content: {
      type: String,
      required: [true, 'Innhold er påkrevd'],
    },
    seo: {
      metaTitle: {
        type: String,
        trim: true,
        maxlength: [60, 'Meta-tittel kan ikke være lengre enn 60 tegn'],
      },
      metaDescription: {
        type: String,
        trim: true,
        maxlength: [160, 'Meta-beskrivelse kan ikke være lengre enn 160 tegn'],
      },
      ogImage: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'OG-bilde må være en gyldig URL'],
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
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
// slug already has a unique index via schema path definition
pageSchema.index({ isPublished: 1 })
pageSchema.index({ publishedAt: -1 })

// Auto-set published date when publishing
pageSchema.pre('save', function (this: PageDocument) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
})

// Prevent model re-compilation during development
const Page =
  mongoose.models.Page || mongoose.model<PageDocument>('Page', pageSchema)

export default Page
