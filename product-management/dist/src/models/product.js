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
exports.Product = exports.productSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.productSchema = new mongoose_1.Schema({
    // _id: { type: String, required: false },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productCost: { type: Number, required: true },
    compare_at_price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String, required: false }],
    thumbnail: { type: String, required: true },
    model: { type: String, required: false },
    ratingsAverage: { type: Number, required: false, default: 0 },
    ratingsCount: { type: Number, required: false, default: 0 },
    status: { type: Boolean, required: true, default: true },
    totalRevenue: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true },
    colors: [{ type: String, required: false }],
    discount: { type: Number, required: false, default: 0 }
}, {
    timestamps: true
});
exports.Product = mongoose_1.default.model('Product', exports.productSchema);
//# sourceMappingURL=product.js.map