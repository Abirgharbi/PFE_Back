"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const orderRoutes = (0, express_1.Router)();
orderRoutes.post('/add', order_1.addOrder);
orderRoutes.get('/get', order_1.getOrders);
orderRoutes.get('/getSalesAnalytics', order_1.getSalesAnalytics);
orderRoutes.get('/getCustomerOrders/:id', order_1.getCustomerOrders);
orderRoutes.put('/updateShippingStatus/:id', order_1.updateShippingStatus);
exports.default = orderRoutes;
//# sourceMappingURL=order.js.map