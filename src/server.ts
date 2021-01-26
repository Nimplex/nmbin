import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import { urlencoded, json } from 'body-parser'
import { join } from 'path'
import createDocument from './database/createDocument'
import getDocument from './database/getDocument'

const avaible_languages: string[] = ['txt', 'javascript', 'lua', 'html', 'scss', 'css', 'typescript']
const config = require('../config.json')
const app = express()
app.use(helmet())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(express.static(join(__dirname, '..', 'public')))
app.set('views', join(__dirname, '..', 'public', 'views'))
app.set('view engine', 'pug')

mongoose.connect(
    `mongodb://${config.mongo.ip}/${config.mongo.database}`, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        authSource: config.mongo.authDatabase,
        user: config.mongo.username, 
        pass: config.mongo.password 
    }
).then(() => {
    console.log(`⚡️ MongoDB connected`)
}).catch(err => {
    console.log(`❌ MongoDB error: ${err}`)
})

app.get('/', (req, res) => res.render('index'))
app.get('/:id', async (req, res) => {
    const { id } = req.params
    const document = await getDocument(id)

    if (!document) res.redirect('/')
    else res.render('document', { document: document })
})
app.post('/create', async (req, res) => {
    const { data, language, title } = req.body
    
    if (!data || 
        data.replace(/[\n ]/gm, '').length < 1 ||
        !language ||
        !title ||
        title.replace(/[\n ]/gm, '').length < 1 ||
        !avaible_languages.includes(language)
    ) return res.status(400).send('Invalid body.')

    res.json(await createDocument({ data: data, language: language, title: title }))
})

app.listen(config.port, () => console.log(`⚡️ Server is ready! (http://localhost:${config.port})`))