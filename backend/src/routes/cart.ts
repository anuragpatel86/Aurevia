import express from 'express';
import { getCartProducts } from '../controllers/cartController';

const router = express.Router();

router.post('/', getCartProducts);

export default router;
