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
exports.incrementTotalApply = exports.getValidPromos = exports.updatePromo = exports.deletePromo = exports.getPromos = exports.addPromo = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../middleware/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const promoModel_1 = require("../models/promoModel");
const mongodb_1 = require("mongodb");
// add promo
const addPromo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, discount, expire_date, start_date } = req.body;
    try {
        const promo = yield promoModel_1.Promo.create({
            code,
            discount,
            expire_date,
            start_date
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(promo);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.addPromo = addPromo;
// get promos
const getPromos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var perPage = 5;
        var page = Number(req.query.page);
        page > 0 ? page : page = 0;
        const promos = yield promoModel_1.Promo.find().sort({ createdAt: -1 })
            .limit(perPage)
            .skip(perPage * page);
        const count = yield promoModel_1.Promo.find()
            .countDocuments();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            count,
            promos
        });
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getPromos = getPromos;
const deletePromo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongodb_1.ObjectId(req.params.id);
        const promo = yield promoModel_1.Promo.deleteOne(id);
        if (!promo) {
            throw new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.NOT_FOUND, 'promo not found');
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(promo);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.deletePromo = deletePromo;
// update promo
const updatePromo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { code, discount, expire_date } = req.body;
    try {
        const promo = yield promoModel_1.Promo.findByIdAndUpdate(id, {
            code,
            discount,
            expire_date
        }, { new: true });
        if (!promo) {
            throw new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.NOT_FOUND, 'promo not found');
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(promo);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.updatePromo = updatePromo;
const getValidPromos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date().toISOString().split('T')[0]; // Extract the current date in the format 'YYYY-MM-DD'
        const promos = yield promoModel_1.Promo.find({
            $and: [
                { expire_date: { $gte: currentDate } },
                { start_date: { $lte: currentDate } }
            ]
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ promos });
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getValidPromos = getValidPromos;
const incrementTotalApply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const promo = yield promoModel_1.Promo.findByIdAndUpdate(id, { $inc: { total_apply: 1 } }, { new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).json(promo);
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.incrementTotalApply = incrementTotalApply;
//# sourceMappingURL=promo.js.map