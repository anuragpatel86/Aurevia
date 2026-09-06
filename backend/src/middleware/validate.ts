import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRegister = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  handleValidationErrors,
];

export const validateLogin = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  handleValidationErrors,
];

export const validateProduct = [
  body('name', 'Name is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('price', 'Price is required').isNumeric(),
  body('category', 'Category is required').notEmpty(),
  handleValidationErrors,
];

export const validateOrder = [
  body('items', 'Order items are required').isArray({ min: 1 }),
  body('shippingAddress', 'Shipping address is required').notEmpty(),
  handleValidationErrors,
];
