import express from 'express'
import { login, register } from '../controllers/AuthController.js'

const router = express.Router()

// register
router.post('/register', register)
router.post('/login', login)


export default router