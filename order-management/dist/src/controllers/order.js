"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShippingStatus = exports.getCustomerOrders = exports.getSalesAnalytics = exports.getOrders = exports.addOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../middleware/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const orderModel_1 = require("../models/orderModel");
const sendConfirmationEmail_1 = require("../utils/sendConfirmationEmail");
const customer_1 = require("../models/customer");
const addressModel_1 = require("../models/addressModel");
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, productCard, addressId, revenue, customerId } = req.body;
    try {
        const address = yield addressModel_1.Address.find({ addressId }).sort({ createdAt: -1 });
        const order = yield orderModel_1.Order.create({
            amount,
            productCard,
            address,
            revenue,
            customerId
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(order);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.addOrder = addOrder;
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var perPage = 5;
        var page = Number(req.query.page);
        page > 0 ? page : page = 0;
        const orders = yield orderModel_1.Order.find().sort({ createdAt: -1 })
            .limit(perPage)
            .skip(perPage * page);
        const allOrders = yield orderModel_1.Order.find().sort({ createdAt: -1 });
        const count = allOrders.length;
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            count,
            orders
        });
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getOrders = getOrders;
const getSalesAnalytics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.Order.aggregate([
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
        ]);
        return res.status(http_status_codes_1.StatusCodes.OK).json(orders);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getSalesAnalytics = getSalesAnalytics;
const getCustomerOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orders = yield orderModel_1.Order.find({ customerId: id }).sort({ createdAt: -1 });
        return res.status(http_status_codes_1.StatusCodes.OK).json(orders);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getCustomerOrders = getCustomerOrders;
const updateShippingStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { shippingStatus } = req.body;
        if (!shippingStatus) {
            return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Shipping status is required'));
        }
        const order = yield orderModel_1.Order.findById(id);
        const customerId = order.customerId.toString();
        const customer = yield customer_1.Customer.findOne({ customerId });
        const email = customer.email;
        if (shippingStatus == 'confirmed') {
            (0, sendConfirmationEmail_1.sendConfimationEmail)(order, email);
        }
        if (shippingStatus == 'shipped') {
            (0, sendConfirmationEmail_1.deleveredOrder)(email);
        }
        yield orderModel_1.Order.updateOne({ _id: order.id }, { shippingStatus }, { new: true });
        return res.status(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.updateShippingStatus = updateShippingStatus;
//# sourceMappingURL=order.js.map