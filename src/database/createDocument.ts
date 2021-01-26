import docs, { Doc } from '../models/document.model'

export interface document { data: string, language: string }

export default async function (document: document): Promise<Doc> {
    const Document = await docs.create({
        data: document.data,
        language: document.language
    }); Document.save()

    return Document
}