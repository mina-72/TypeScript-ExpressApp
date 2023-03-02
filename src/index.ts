import express, {Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/LoginController'
import './controllers/RootRoutControllers'

const app = express()

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['abc'] }))
app.use(AppRouter.getInstance())
app.listen (3000, () => {
    console.log('listening on port')
})