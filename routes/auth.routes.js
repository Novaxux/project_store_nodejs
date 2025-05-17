import express from 'express';
import {
  login,
  validateSession,
  signUp,
  logoutUser
} from '../controllers/auth.controller.js';
import { verifySession } from '../middleware/verifySession.js';
const router = express.Router();

router.post('/login', login);
router.get('/validateSession', verifySession, validateSession);
router.post('/signup', signUp);
router.post('/logout', logoutUser)
export default router;
