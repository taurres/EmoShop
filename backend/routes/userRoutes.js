import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)

// authenticate user by token before getting user profile
router.route('/profile').get(protect, getUserProfile)


export default router