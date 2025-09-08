import mongoose, { Schema, Document } from 'mongoose'
import type { Setting as SettingType } from '@/types'

export interface SettingDocument extends Omit<SettingType, 'id'>, Document {
  _id: string
}

const settingSchema = new Schema<SettingDocument>(
  {
    key: {
      type: String,
      required: [true, 'Innstillingsnøkkel er påkrevd'],
      unique: true,
      trim: true,
      match: [
        /^[a-z][a-z0-9_]*$/,
        'Nøkkel må starte med bokstav og kun inneholde små bokstaver, tall og understreker',
      ],
    },
    value: {
      type: Schema.Types.Mixed,
      required: [true, 'Verdi er påkrevd'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Beskrivelse kan ikke være lengre enn 200 tegn'],
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
// key already has a unique index from schema path definition

// Static method to get setting by key
settingSchema.statics.getByKey = async function (key: string) {
  const setting = await this.findOne({ key })
  return setting ? setting.value : null
}

// Static method to set setting by key
settingSchema.statics.setByKey = async function (
  key: string,
  value: string | number | boolean | object,
  description?: string
) {
  return await this.findOneAndUpdate(
    { key },
    { value, description },
    { upsert: true, new: true }
  )
}

// Prevent model re-compilation during development
const Setting =
  mongoose.models.Setting ||
  mongoose.model<SettingDocument>('Setting', settingSchema)

export default Setting
