import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { AppError } from '../middleware/errorHandler';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    if (items && items.length === 0) {
      return next(new AppError('No order items', 400));
    }

    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const tax = Number((0.10 * subtotal).toFixed(2));
    const shippingCost = subtotal > 1000 ? 0 : 50; 
    const totalAmount = subtotal + tax + shippingCost;

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      notes,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return next(new AppError('Order not found', 404));

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to view this order', 403));
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return next(new AppError('Order not found', 404));

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate('user', 'id name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();

    res.json({
      orders,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    next(error);
  }
};
