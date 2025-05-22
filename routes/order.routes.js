import express from 'express';
import {
  createOrder,
  getOrderDetails,
  getOrders,
} from '../controllers/orders.controller.js';
import { verifySession } from '../middleware/verifySession.js';
import { validateOrder } from '../middleware/validateOrder.js';

const router = express.Router();
router.use(verifySession);
router.post('/', validateOrder, createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderDetails);

export default router;
