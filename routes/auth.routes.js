import express from "express";
import {
  login,
  validateSession,
  signUp,
} from "../controllers/auth.controllers.js";
import { verifySession } from "../middleware/verifySession.js";
const Router = express.Router();

Router.post("/login", login);
Router.get("/protected", verifySession, validateSession);
Router.post("/signup", signUp);

export default Router;
