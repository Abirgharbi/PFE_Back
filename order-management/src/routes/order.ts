import { Router } from 'express';
import { addOrder, getOrders, getSalesAnalytics, getCustomerOrders, updateShippingStatus } from '../controllers/order';
const orderRoutes = Router();

orderRoutes.post('/add', addOrder);
orderRoutes.get('/get', getOrders);
orderRoutes.get('/getSalesAnalytics', getSalesAnalytics);
orderRoutes.get('/getCustomerOrders/:id', getCustomerOrders);
orderRoutes.put('/updateShippingStatus/:id', updateShippingStatus);


export default orderRoutes;

