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
exports.getCategoryById = exports.getCategoriesName = exports.getCategories = exports.deleteCategory = exports.updateCategory = exports.addCategory = void 0;
const category_1 = require("../models/category");
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../middleware/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = req.body;
        const category = yield category_1.Category.create({
            name, image
        });
        return res.status(http_status_codes_1.StatusCodes.OK).send(category);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = req.body;
        const category = yield category_1.Category.findByIdAndUpdate(req.params.id, {
            name, image
        }, { new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).send(category);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.findByIdAndDelete(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(category);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.deleteCategory = deleteCategory;
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var perPage = 5;
        var page = Number(req.query.page);
        page > 0 ? page : page = 0;
        const [count, categories] = yield Promise.all([
            category_1.Category.countDocuments(),
            category_1.Category.find()
                .sort({ createdAt: -1 })
                .limit(perPage)
                .skip(perPage * page)
        ]);
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, categories });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getCategories = getCategories;
// getCategoriesName
const getCategoriesName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find().select('name -_id').exec();
        const categoryNames = categories.map(category => category.name);
        return res.status(http_status_codes_1.StatusCodes.OK).send(categoryNames);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getCategoriesName = getCategoriesName;
// getCategoryById
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.findById(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(category);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=category.js.map