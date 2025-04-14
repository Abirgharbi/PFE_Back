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
exports.OauthLogin = exports.OauthRegister = exports.register = exports.verifyMagicLink = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customerModel_1 = require("../models/customerModel");
const sendMagicLink_1 = require("../utils/sendMagicLink");
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../middleware/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        console.log(email);
        const customer = yield customerModel_1.Customer.findOne({ email });
        if (!customer) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).send({
                message: "Please create an account.",
            });
        }
        if (!customer.verified) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).send({
                message: "Verify your Account.",
            });
        }
        const magicToken = (0, customerModel_1.generateAuthToken)(email, '1h');
        const link = `user/verifyMagicLink?token=${magicToken}`;
        yield (0, sendMagicLink_1.sendMagicLink)(email, link, "Click the link below to sign in");
        const token = (0, customerModel_1.generateAuthToken)(email, '30d');
        return res.status(http_status_codes_1.StatusCodes.OK).json({ token, customer });
    }
    catch (error) {
        console.log(error);
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in, please try again'));
    }
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, name } = req.body;
        const magicToken = (0, customerModel_1.generateAuthToken)(email, '1h');
        const exist = yield customerModel_1.Customer.findOne({ email });
        if (!exist) {
            yield (0, sendMagicLink_1.sendMagicLink)(email, magicToken, "Your account has been created. click the link below to confirm your email");
            const customer = yield customerModel_1.Customer.create({
                email,
                name,
            });
            const token = (0, customerModel_1.generateAuthToken)(email, '30d');
            return res.status(http_status_codes_1.StatusCodes.OK).json({ token, customer });
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ message: "Email already exists" });
        }
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error registering customer'));
    }
});
exports.register = register;
const verifyMagicLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ message: "token not found" });
        }
        const { jwtSecret } = process.env;
        if (!jwtSecret) {
            throw new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'JWT secret not defined');
        }
        const decodedToken = jsonwebtoken_1.default.verify(token.toString(), jwtSecret);
        const { email } = decodedToken;
        if (yield customerModel_1.Customer.findOne({ email })) {
            const customer = yield customerModel_1.Customer.findOne({ email });
            if (!customer) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ message: "customer does not exist" });
            }
            else {
                yield customerModel_1.Customer.findByIdAndUpdate(customer._id, { verified: true });
                return res.redirect(`https://arkealink.page.link/naxz`);
            }
        }
        else {
            return res.redirect(`https://arkea-dashboard.vercel.app/page-not-found`);
        }
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid token'));
    }
});
exports.verifyMagicLink = verifyMagicLink;
const OauthRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, name, image } = req.body;
        const customer = yield customerModel_1.Customer.find({ email });
        if (Object.keys(customer).length != 0) {
            const token = (0, customerModel_1.generateAuthToken)(email, '30d');
            return res.status(http_status_codes_1.StatusCodes.OK).send({ token, customer });
        }
        else {
            const customer = yield customerModel_1.Customer.create({ email, name, image, verified: true });
            const token = (0, customerModel_1.generateAuthToken)(email, '30d');
            return res.status(http_status_codes_1.StatusCodes.OK).send({ token, customer });
        }
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error registering customer'));
    }
});
exports.OauthRegister = OauthRegister;
const OauthLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        const customer = yield customerModel_1.Customer.findOne({ email: email });
        const token = (0, customerModel_1.generateAuthToken)(email, '30d');
        return res.status(http_status_codes_1.StatusCodes.OK).send({ token, customer });
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error registering customer'));
    }
});
exports.OauthLogin = OauthLogin;
//# sourceMappingURL=customerAuthController.js.map