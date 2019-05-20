import express from 'express';
const router = express.Router()
import User from './user'
import SignUp from './signup'
import Login from './login'
import Leaves from './leaves/leaves'

router.use('/users',User)
router.use('/auth',SignUp)
router.use('/login',Login)
router.use('/leaves',Leaves)

export default router