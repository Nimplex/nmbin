import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import { urlencoded, json } from 'body-parser'
import { join } from 'path'

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

app.listen(config.port, () => console.log(`⚡️ Server is ready! (http://localhost:${config.port})`))