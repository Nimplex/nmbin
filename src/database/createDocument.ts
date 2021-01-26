import docs, { Doc } from '../models/document.model'

export interface document { data: string, language: string, title: string }
export default async function (document: document): Promise<Doc> {

    const Document = await docs.create({
        data: document.data,
        language: document.language,
        title: document.title
    }); Document.save()

    return Document
}