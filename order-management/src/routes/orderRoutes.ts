import express from 'express';
import { OrderController } from '../controllers/orderController';
import { EmailService } from '../services/EmailService';
import { OrderService } from '../services/OrderService';
import { CustomerService } from '../services/CustomerService';
import { AddressService } from '../services/AddressService';

const router = express.Router();

const controller = new OrderController(
  new OrderService(),
  new EmailService(),
  new CustomerService(),
  new AddressService()
);

router.post('/order', controller.addOrder.bind(controller));
router.get('/orders', controller.getOrders.bind(controller));
router.get('/analytics/sales', controller.getSalesAnalytics.bind(controller));
router.get('/orders/customer/:id', controller.getCustomerOrders.bind(controller));
router.put('/orders/:id/shipping', controller.updateShippingStatus.bind(controller));


export default router;
