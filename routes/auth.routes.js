import express from "express";
import {
  login,
  validateSession,
  signUp,
} from "../controllers/auth.controllers.js";
import { verifySession } from "../middleware/verifySession.js";
const router = express.Router();

router.post("/login", login);
router.get("/validateSession", verifySession, validateSession);
router.post("/signup", signUp);

export default router;
