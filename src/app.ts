import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFoundRoute'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'

//parsers
app.use(express.json())
app.use(cors())

app.use('/api', router)
app.use(notFound)
app.use(globalErrorHandler)

export default app
