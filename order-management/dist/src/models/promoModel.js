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
exports.Promo = exports.promoSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.promoSchema = new mongoose_1.Schema({
    id: { type: String, required: false },
    code: { type: String, required: false },
    start_date: { type: String, required: false },
    expire_date: { type: String, required: false },
    discount: { type: Number, required: false },
    total_apply: { type: Number, required: false, default: 0 }
}, {
    timestamps: true
});
exports.Promo = mongoose_1.default.model('Promo', exports.promoSchema);
//# sourceMappingURL=promoModel.js.map