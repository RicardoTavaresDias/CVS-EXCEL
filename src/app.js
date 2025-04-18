import express from 'express'
import { routers } from './routers/index.js'

export const app = express()

app.use(express.json())
app.use(routers)



