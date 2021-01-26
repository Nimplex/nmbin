import docs, { Doc } from '../models/document.model'

export default async function (id: string): Promise<Doc | null> {
    return await docs.findOne({ _id: id })
}