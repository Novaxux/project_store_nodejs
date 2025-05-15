import express from "express";
import { getProduct, getProducts } from "../controllers/products.controller.js";
import { verifySession } from "../middleware/verifySession.js";
const router = express.Router();

router.use(verifySession);
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;  
