import mongoose, { Schema, Document } from 'mongoose'

// Custom interface that avoids Mongoose Document property conflicts
export interface DressDocument extends Document {
  name: string
  slug: string
  designer: string
  dressCollection?: string // Renamed to avoid conflict with Mongoose collection
  silhouette:
    | 'A-line'
    | 'Ballgown'
    | 'Mermaid'
    | 'Sheath'
    | 'Trumpet'
    | 'Empire'
  fabric: string
  color: string
  priceRangeMin: number
  priceRangeMax: number
  sizes: string[]
  status: 'available' | 'reserved' | 'sold' | 'on_cleaning'
  images: string[]
  description?: string
  tags: string[]
  featured: boolean
}

const dressSchema = new Schema<DressDocument>(
  {
    name: {
      type: String,
      required: [true, 'Kjole navn er påkrevd'],
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
    designer: {
      type: String,
      required: [true, 'Designer er påkrevd'],
      trim: true,
      maxlength: [100, 'Designer navn kan ikke være lengre enn 100 tegn'],
    },
    dressCollection: {
      type: String,
      trim: true,
      maxlength: [100, 'Kolleksjon navn kan ikke være lengre enn 100 tegn'],
    },
    silhouette: {
      type: String,
      required: [true, 'Silhuett er påkrevd'],
      enum: {
        values: [
          'A-line',
          'Ballgown',
          'Mermaid',
          'Sheath',
          'Trumpet',
          'Empire',
        ],
        message: 'Ugyldig silhuett',
      },
    },
    fabric: {
      type: String,
      required: [true, 'Stoff er påkrevd'],
      trim: true,
      maxlength: [100, 'Stoff kan ikke være lengre enn 100 tegn'],
    },
    color: {
      type: String,
      required: [true, 'Farge er påkrevd'],
      trim: true,
      maxlength: [50, 'Farge kan ikke være lengre enn 50 tegn'],
    },
    priceRangeMin: {
      type: Number,
      required: [true, 'Minimum pris er påkrevd'],
      min: [0, 'Pris kan ikke være negativ'],
    },
    priceRangeMax: {
      type: Number,
      required: [true, 'Maksimum pris er påkrevd'],
      min: [0, 'Pris kan ikke være negativ'],
    },
    sizes: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      required: [true, 'Status er påkrevd'],
      enum: {
        values: ['available', 'reserved', 'sold', 'on_cleaning'],
        message: 'Ugyldig status',
      },
      default: 'available',
    },
    images: [
      {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Bilde-URL må være en gyldig URL'],
      },
    ],
    description: {
      type: String,
      maxlength: [1000, 'Beskrivelse kan ikke være lengre enn 1000 tegn'],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
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
dressSchema.index({ slug: 1 })
dressSchema.index({ designer: 1 })
dressSchema.index({ silhouette: 1 })
dressSchema.index({ status: 1 })
dressSchema.index({ featured: 1 })
dressSchema.index({ priceRangeMin: 1, priceRangeMax: 1 })
dressSchema.index({ tags: 1 })

// Validation: max price must be >= min price
dressSchema.pre('save', function () {
  if (this.priceRangeMax < this.priceRangeMin) {
    throw new Error('Maksimum pris må være større enn eller lik minimum pris')
  }
})

// Prevent model re-compilation during development
const Dress =
  mongoose.models.Dress || mongoose.model<DressDocument>('Dress', dressSchema)

export default Dress
