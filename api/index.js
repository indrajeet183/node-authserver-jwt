import express from 'express';
const router = express.Router()
import User from './user'
import SignUp from './signup'
import Login from './login'

router.use('/users',User)
router.use('/auth',SignUp)
router.use('/login',Login)

export default router