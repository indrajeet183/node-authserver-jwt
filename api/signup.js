import express from 'express';
import passport from 'passport';
import AuthController from '../middleware/auth'
const router = express.Router()
  // POST /verication?token=[string]&email=[string]
router.post('/' ,AuthController.signUp);

export default router;