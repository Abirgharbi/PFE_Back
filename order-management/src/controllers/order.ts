import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import { OrderService } from '../services/OrderService';

const orderService = new OrderService();

export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(StatusCodes.CREATED).json(order);
    } catch (error: any) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 0;
        const { orders, count } = await orderService.getOrders(page);
        res.status(StatusCodes.OK).json({ count, orders });
    } catch (error: any) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

export const getSalesAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await orderService.getSalesAnalytics();
        res.status(StatusCodes.OK).json(data);
    } catch (error: any) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

export const getCustomerOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const orders = await orderService.getCustomerOrders(id);
        res.status(StatusCodes.OK).json(orders);
    } catch (error: any) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

export const updateShippingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { shippingStatus } = req.body;
        await orderService.updateShippingStatus(id, shippingStatus);
        res.status(StatusCodes.OK).json({ message: 'Shipping status updated' });
    } catch (error: any) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
