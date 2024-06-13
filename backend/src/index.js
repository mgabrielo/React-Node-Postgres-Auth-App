import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import 'dotenv/config'

const app = express()
const FRONTEND_URL = process.env.FRONTEND_URL
const PORT = process.env.PORT

async function startServer() {
    if (!PORT || !FRONTEND_URL) {
        console.error('PORT and FRONTEND_URL values must not be empty for environment variables')
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
    app.use(cors({
        origin: FRONTEND_URL,
        credentials: true,
    }));
    app.use('/user', userRoute)
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
}

startServer();