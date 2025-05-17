import express from 'express';
import {
  getProduct,
  getProducts,
  createProduct,
} from '../controllers/products.controller.js';
import { verifySession, verifyAdmin } from '../middleware/verifySession.js';
const router = express.Router();

router.use(verifySession);

router.get('/', getProducts);
router.post('/', verifyAdmin, createProduct);
router.get('/:id', getProduct);

export default router;
