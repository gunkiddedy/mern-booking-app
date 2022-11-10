import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'

const app  = express()

dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_NEW)
    console.log('connected to mongoDB')
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected...')
})

mongoose.connection.on('connected', () => {
  console.log('mongoDB connected...')
})

/*
  MIDDLEWARES
*/ 

// will run first and then next
// app.use((req, res, next) => {
//   console.log('i am a middleware')
//   next()
// })

app.use(cors())

app.use(cookieParser())

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

// catch the errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})


const PORT = 8800
app.listen(PORT, () => {
  connect()
  console.log(`app is running on port ${PORT}`)
})