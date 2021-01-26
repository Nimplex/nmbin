import docs, { Doc } from '../models/document.model'
import { Types } from 'mongoose'

export default async function (id: string): Promise<Doc | undefined> {
    let document

    try {
        document = await docs.findById(Types.ObjectId(id))
    } catch (err) {
        if (err) return undefined
    }

    if (!document) return undefined
    else return document
}