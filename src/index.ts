import express, {Request, Response } from 'express'
import { router } from './routes/loginRoute'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

const app = express()

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['abc'] }))
app.use(router)

app.listen (3000, () => {
    console.log('listening on port')
})