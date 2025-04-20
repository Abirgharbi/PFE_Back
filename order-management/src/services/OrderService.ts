import { Order } from '../models/orderModel';
import { Address } from '../models/addressModel';
import { Customer } from '../models/customer';
import { EmailService } from './EmailService';

export class OrderService {
    async createOrder(data: any) {
        const { amount, productCard, addressId, revenue, customerId } = data;
        const address = await Address.find({ addressId }).sort({ createdAt: -1 });
        return await Order.create({ amount, productCard, address, revenue, customerId });
    }

    async getOrders(page: number, perPage: number = 5) {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(perPage).skip(perPage * page);
        const count = await Order.countDocuments();
        return { orders, count };
    }

    async getCustomerOrders(customerId: string) {
        return await Order.find({ customerId }).sort({ createdAt: -1 });
    }

    async getSalesAnalytics() {
        return await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: { $toDouble: "$revenue" } }
                }
            },
            { $project: { _id: 0, Date: "$_id", totalRevenue: 1 } },
            { $sort: { Date: 1 } }
        ]);
    }

    async updateShippingStatus(orderId: string, shippingStatus: string) {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        const customer = await Customer.findOne({ customerId: order.customerId.toString() });
        const email = customer?.email;
        await EmailService.sendShippingStatusEmail(shippingStatus, order, email);
        await Order.updateOne({ _id: orderId }, { shippingStatus });
    }
}
