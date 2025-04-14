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
exports.calculateTotalRevenue = exports.updateProductStatus = exports.getTotalMoneyEarned = exports.updateProductAfterSelling = exports.updateProductRating = exports.checkProductsInStock = exports.getDiscountedProducts = exports.getBestSellingProducts = exports.getProductsByCategory = exports.getPopularProducts = exports.getRecentProducts = exports.getFiltredProducts = exports.getProductById = exports.getProducts = exports.deleteProduct = exports.updateProduct = exports.addProduct = void 0;
const product_1 = require("../models/product");
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../middleware/errorHandler");
const category_1 = require("../models/category");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, compare_at_price, description, category, images, quantity, thumbnail, productCost, model, ratingsAverage, ratingsCount, colors, discount } = req.body;
        const product = model
            ? yield product_1.Product.create({
                name,
                price,
                compare_at_price,
                description,
                category,
                quantity,
                productCost,
                model,
                thumbnail,
                ratingsAverage,
                ratingsCount,
                colors,
                discount
            })
            : yield product_1.Product.create({
                name,
                price,
                compare_at_price,
                description,
                category,
                images,
                thumbnail,
                productCost,
                ratingsAverage,
                ratingsCount,
                quantity,
                colors,
                discount
            });
        return res.status(http_status_codes_1.StatusCodes.OK).send(product);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, compare_at_price, description, category, images, quantity, thumbnail, productCost, ratingsAverage, ratingsCount, colors } = req.body;
        const product = yield product_1.Product.findByIdAndUpdate(req.params.id, {
            name,
            price,
            compare_at_price,
            description,
            category,
            images,
            quantity,
            thumbnail,
            productCost,
            ratingsAverage,
            ratingsCount,
            colors
        }, { new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).send(product);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.findByIdAndDelete(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(product);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.deleteProduct = deleteProduct;
const getRecentProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var perPage = 6;
        var page = Number(req.query.page);
        page > 0 ? page : page = 0;
        const [count, products] = yield Promise.all([
            product_1.Product.countDocuments(),
            product_1.Product.find({ status: true }).sort({ createdAt: -1 })
                .limit(perPage)
                .skip(perPage * page)
        ]);
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getRecentProducts = getRecentProducts;
const getPopularProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var perPage = 6;
        var page = Number(req.query.page);
        page > 0 ? page : page = 0;
        const [count, products] = yield Promise.all([
            product_1.Product.countDocuments(),
            product_1.Product.find({ status: true }).sort({ totalRevenue: -1 })
                .limit(perPage)
                .skip(perPage * page)
        ]);
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getPopularProducts = getPopularProducts;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var perPage = 6;
        var page = Number(req.query.page);
        page > 0 ? page : page = 0;
        const [count, products] = yield Promise.all([
            product_1.Product.countDocuments(),
            product_1.Product.find()
                .sort({ createdAt: -1 })
                .limit(perPage)
                .skip(perPage * page)
        ]);
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.findById(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(product);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getProductById = getProductById;
const getFiltredProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min, max, rating } = req.query;
        const products = yield product_1.Product.find({
            $and: [
                { status: true },
                { price: { $gte: min, $lte: max } },
                { ratingsAverage: { $gte: rating } }
            ]
        });
        const count = products.length;
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getFiltredProducts = getFiltredProducts;
const getProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.Category.findById(id);
        const products = yield product_1.Product.find({ category: category.name, status: true });
        const count = products.length;
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getProductsByCategory = getProductsByCategory;
const getBestSellingProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find({ status: true }).sort({ revenue: -1 }).limit(5);
        return res.status(http_status_codes_1.StatusCodes.OK).send(products);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getBestSellingProducts = getBestSellingProducts;
const getDiscountedProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { discount } = req.query;
        const products = yield product_1.Product.find({ discount: { $gte: discount }, status: true });
        const count = products.length;
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getDiscountedProducts = getDiscountedProducts;
const checkProductsInStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const productIds = Object.keys(product);
        const productQuantities = Object.values(product);
        const allProducts = yield product_1.Product.find({ _id: { $in: productIds } });
        const products = allProducts.filter((product, index) => {
            return product.quantity < productQuantities[index];
        });
        const count = products.length;
        return res.status(http_status_codes_1.StatusCodes.OK).send({ count, products });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.checkProductsInStock = checkProductsInStock;
const updateProductRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        // Find the product by its ID
        const product = yield product_1.Product.findById(id);
        if (!product) {
            // If the product is not found, return an error response
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
        }
        // Update the ratingsAverage and ratingsCount properties of the product
        product.ratingsCount++;
        product.ratingsAverage = (product.ratingsAverage * (product.ratingsCount - 1) + rating) / product.ratingsCount;
        // Save the updated product
        yield product.save();
        // Return the updated product as a response
        return res.status(http_status_codes_1.StatusCodes.OK).json(product);
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.updateProductRating = updateProductRating;
const updateProductAfterSelling = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = yield product_1.Product.findById(id);
        if (!product) {
            return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found'));
        }
        const newQuantity = product.quantity - quantity;
        const revenue = product.totalRevenue + ((product.price - product.productCost) * quantity);
        const updatedProduct = yield product_1.Product.updateOne({ _id: product._id }, { quantity: newQuantity, totalRevenue: revenue }, { new: true });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Product updated successfully', updatedProduct });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.updateProductAfterSelling = updateProductAfterSelling;
const getTotalMoneyEarned = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find();
        const totalMoneyEarned = products.reduce((acc, product) => {
            return acc + product.totalRevenue;
        }, 0);
        return res.status(http_status_codes_1.StatusCodes.OK).send({ totalMoneyEarned });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.getTotalMoneyEarned = getTotalMoneyEarned;
const updateProductStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.findById(req.params.id);
        if (!product) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        const updatedProduct = yield product_1.Product.updateOne({ _id: product._id }, { status: !product.status }, { new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ updatedProduct });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
});
exports.updateProductStatus = updateProductStatus;
const calculateTotalRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalRevenue" }
                }
            }
        ]);
        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
        return res.status(http_status_codes_1.StatusCodes.OK).send({ totalRevenue });
    }
    catch (error) {
        console.error("Error calculating total revenue:", error);
    }
});
exports.calculateTotalRevenue = calculateTotalRevenue;
//# sourceMappingURL=product.js.map