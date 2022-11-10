import express from 'express'
import { 
  deleteUser, 
  getUser, 
  getUsers, 
  updateUser 
} from '../controllers/UserController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verify.js'

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/checkauthentication', verifyToken, (req, res, next) => {
  res.send('Hello you are logged in')
})

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
  res.send(`Hello user you are logged in and can delete your account`)
})

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
  res.send('Hello admin you are logged in and can delete all accounts')
})

// UPDATE
router.put('/:id', verifyUser, updateUser)

// DELETE
router.delete('/:id', verifyUser, deleteUser)

// GET
router.get('/:id', verifyUser, getUser)

// GET ALL
router.get('/', verifyAdmin, getUsers)

export default router