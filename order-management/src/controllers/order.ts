import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import dotenv from 'dotenv';
dotenv.config();
import { Order } from '../models/orderModel';
import { sendConfimationEmail, deleveredOrder } from '../utils/sendConfirmationEmail';
import { Customer } from '../models/customer';
import { Address } from '../models/addressModel';

const addOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {

    const { amount, productCard, addressId, revenue, customerId } = req.body;

    try {

        const address = await Address.find({ addressId }).sort({ createdAt: -1 });

        const order = await Order.create({
            amount,
            productCard,
            address,
            revenue,
            customerId
        });

        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    try {
        var perPage = 5;
        var page: number = Number(req.query.page);
        page > 0 ? page : page = 0;

        const orders = await Order.find().sort({ createdAt: -1 })
            .limit(perPage)
            .skip(perPage * page);
        const allOrders = await Order.find().sort({ createdAt: -1 });
        const count = allOrders.length;
        return res.status(StatusCodes.OK).json({
            count,
            orders
        });
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

const getSalesAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    try {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    totalRevenue: {
                        $sum: { $toDouble: "$revenue" }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    Date: "$_id",
                    totalRevenue: 1
                }
            },
            {
                $sort: {
                    Date: 1
                }
            }
        ])

        return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

const getCustomerOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    try {
        const { id } = req.params;
        const orders = await Order.find({ customerId: id }).sort({ createdAt: -1 });

        return res.status(StatusCodes.OK).json(orders);
    }
    catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

const updateShippingStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    try {
        const { id } = req.params;

        const { shippingStatus } = req.body;


        if (!shippingStatus) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, 'Shipping status is required'));
        }

        const order = await Order.findById(id);

        const customerId = order.customerId.toString();
        const customer = await Customer.findOne({ customerId });

        const email = customer.email;

        if (shippingStatus == 'confirmed') {
            sendConfimationEmail(order, email)
        }

        if (shippingStatus == 'shipped') {
            deleveredOrder(email)
        }
        await Order.updateOne({ _id: order.id }, { shippingStatus }, { new: true });
        return res.status(StatusCodes.OK);
    }
    catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}


export { addOrder, getOrders, getSalesAnalytics, getCustomerOrders, updateShippingStatus };