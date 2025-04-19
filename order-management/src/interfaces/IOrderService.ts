export interface IOrderService {
  createOrder(data: any): Promise<any>;
  getPaginatedOrders(page: number, perPage: number): Promise<{ count: number, orders: any[] }>;
  getOrdersByCustomer(customerId: string): Promise<any[]>;
  getSalesAnalytics(): Promise<any[]>;
  updateShippingStatus(id: string, shippingStatus: string): Promise<any>;
  findOrderById(id: string): Promise<any>;
}
