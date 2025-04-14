"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.orderSchema = new mongoose_1.Schema({
    amount: { type: Number, required: false },
    shippingStatus: { type: String, required: false, default: 'pending' },
    address: {
        _id: { type: String, required: false },
        city: { type: String, required: false },
        country: { type: String, required: false },
        state: { type: String, required: false },
        zipCode: { type: Number, required: false },
        line1: { type: String, required: false },
        line2: { type: String, required: false },
        customerEmail: { type: String, required: false },
    },
    revenue: { type: Number, required: false },
    customerId: { type: String, required: true },
    productCard: [{
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }]
}, {
    timestamps: true
});
exports.Order = mongoose_1.default.model('Order', exports.orderSchema);
//# sourceMappingURL=orderModel.js.map