import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { AppError } from '../middleware/errorHandler';

export const getCartProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productIds } = req.body;
    if (!Array.isArray(productIds)) {
      return next(new AppError('productIds must be an array', 400));
    }
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
