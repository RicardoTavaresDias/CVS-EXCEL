import express from 'express'
import { routerCvs } from './routers/router-cvs.js'

export const app = express()

app.use(express.json())
app.use(routerCvs)



