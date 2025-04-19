import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import { IOrderService } from '../interfaces/IOrderService';
import { IEmailService } from '../interfaces/IEmailService';
import { ICustomerService } from '../interfaces/ICustomerService'
import { IAddressService } from '../interfaces/IAddressService';

export class OrderController {
  constructor(
    private orderService: IOrderService,
    private emailService: IEmailService,
    private customerService: ICustomerService,
    private addressService: IAddressService
  ) {}

  addOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { amount, productCard, addressId, revenue, customerId } = req.body;
    try {
      const address = await this.addressService.getAddress(addressId);
      const order = await this.orderService.createOrder({ amount, productCard, address, revenue, customerId });
      return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 0;
      const { count, orders } = await this.orderService.getPaginatedOrders(page, 5);
      return res.status(StatusCodes.OK).json({ count, orders });
    } catch (error) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  getSalesAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const analytics = await this.orderService.getSalesAnalytics();
      return res.status(StatusCodes.OK).json(analytics);
    } catch (error) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  getCustomerOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const orders = await this.orderService.getOrdersByCustomer(id);
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  updateShippingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { shippingStatus } = req.body;

      if (!shippingStatus) {
        return next(new CustomError(StatusCodes.BAD_REQUEST, 'Shipping status is required'));
      }

      const order = await this.orderService.findOrderById(id);
      const customer = await this.customerService.findCustomerById(order.customerId.toString());

      if (shippingStatus === 'confirmed') {
        this.emailService.sendConfirmationEmail(order, customer.email);
      }

      if (shippingStatus === 'shipped') {
        this.emailService.sendDeliveredEmail(customer.email);
      }

      await this.orderService.updateShippingStatus(order.id, shippingStatus);
      return res.status(StatusCodes.OK).end();
    } catch (error) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
  }
}
