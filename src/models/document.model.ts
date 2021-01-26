import mongoose, { Schema, Document } from 'mongoose'

export interface Doc extends Document {
    data: string
    language: string
}

const DocSchema: Schema = new Schema({
    data: { type: String, required: true },
    language: { type: String, required: true }
})

export default mongoose.model<Doc>('docs', DocSchema)