import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/orderController';
import { protect, adminOnly } from '../middleware/auth';
import { validateOrder } from '../middleware/validate';

const router = express.Router();

router.route('/').post(protect, validateOrder, createOrder).get(protect, adminOnly, getAllOrders);
router.get('/my', protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
