import express from 'express';
import {
  login,
  validateSession,
  signUp,
  logoutUser,
  getClients,
} from '../controllers/auth.controller.js';
import { verifyAdmin, verifySession } from '../middleware/verifySession.js';
import { validateUser } from '../middleware/validateUser.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup',validateUser, signUp);
router.post('/logout', logoutUser);
router.use(verifySession);
router.get('/', verifyAdmin, getClients);
router.get('/validateSession', validateSession);
export default router;
