import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)

// authenticate user by token before getting/updating user profile
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


export default router