import docs, { Doc } from '../models/document.model'

export default async function (id: string): Promise<Doc | null> {

    const Document = await docs.findById(id)

    return Document
}