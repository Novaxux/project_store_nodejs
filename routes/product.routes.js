import express from 'express';
import {
  getProduct,
  getProducts,
  createProduct,
  editProduct,
  searchProducts,
} from '../controllers/products.controller.js';
import { verifySession, verifyAdmin } from '../middleware/verifySession.js';
const router = express.Router();

router.use(verifySession);

router.get('/', getProducts);
router.post('/', verifyAdmin, createProduct);
router.get('/:id', getProduct);
router.put('/:id', verifyAdmin, editProduct);
router.get('/search', searchProducts);

export default router;
