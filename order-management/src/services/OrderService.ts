import { Order } from '../models/orderModel';
import { IOrderService } from '../interfaces/IOrderService';

export class OrderService implements IOrderService {
  async createOrder(data: any): Promise<any> {
    return await Order.create(data);
  }

  async getPaginatedOrders(page: number, perPage: number): Promise<{ count: number, orders: any[] }> {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(perPage).skip(perPage * page);
    const count = await Order.countDocuments();
    return { count, orders };
  }

  async getOrdersByCustomer(customerId: string): Promise<any[]> {
    return await Order.find({ customerId }).sort({ createdAt: -1 });
  }

  async getSalesAnalytics(): Promise<any[]> {
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

  async updateShippingStatus(id: string, shippingStatus: string): Promise<any> {
    return await Order.updateOne({ _id: id }, { shippingStatus }, { new: true });
  }

  async findOrderById(id: string): Promise<any> {
    return await Order.findById(id);
  }
}
