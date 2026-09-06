import express from 'express';
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
} from '../controllers/productController';
import { protect, adminOnly } from '../middleware/auth';
import { validateProduct } from '../middleware/validate';

const router = express.Router();

router.route('/').get(getProducts).post(protect, adminOnly, validateProduct, createProduct);
router.get('/featured', getFeaturedProducts);
router.route('/:id').get(getProduct).put(protect, adminOnly, updateProduct).delete(protect, adminOnly, deleteProduct);
router.get('/:id/related', getRelatedProducts);

export default router;
