import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import { urlencoded, json } from 'body-parser'
import { join } from 'path'
import insertDocument from './database/createDocument'

const avaible_languages: string[] = ['txt', 'javascript', 'lua', 'html', 'scss', 'css']
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
app.post('/create', async (req, res) => {
    const { data, language } = req.body
    
    if (!data || !language || !avaible_languages.includes(language)) 
        return res.status(400).send('Invalid body.')

    res.json(await insertDocument({ data: data, language: language }))
})

app.listen(config.port, () => console.log(`⚡️ Server is ready! (http://localhost:${config.port})`))