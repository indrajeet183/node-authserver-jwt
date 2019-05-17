import express from 'express';
import passport from 'passport';
import AuthController from '../middleware/auth'
const router = express.Router()

router.post('/',AuthController.authenticateUser);

export default router;
