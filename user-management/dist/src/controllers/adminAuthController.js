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
exports.getToken = exports.logout = exports.verifyMagicLink = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMagicLink_1 = require("../utils/sendMagicLink");
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../middleware/errorHandler");
const adminModel_1 = require("../models/adminModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        const magicToken = (0, adminModel_1.generateAuthToken)(email, '1h');
        const link = `user/admin/verifyMagicLink?token=${magicToken}`;
        yield (0, sendMagicLink_1.sendMagicLink)(email, link, "Welcome back to your dashboard. Click the link below to sign in");
        if (email === process.env.ADMIN_EMAIL) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "magic link sent to your email" });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ message: "you are not authorized to login" });
        }
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in, please try again'));
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie("token", { secure: true, httpOnly: true, sameSite: "none" })
        .header("Access-Control-Allow-Origin", process.env.FRONTEND_URL)
        .send("token removed from cookie");
});
exports.logout = logout;
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
        if (email !== process.env.ADMIN_EMAIL) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ message: "you are not authorized to login" });
        }
        else {
            // res.cookie('token', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            return res.redirect(`https://arkea-dashboard.vercel.app/verified`);
        }
    }
    catch (error) {
        next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid token'));
    }
});
exports.verifyMagicLink = verifyMagicLink;
const getToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, adminModel_1.generateAuthToken)(process.env.ADMIN_EMAIL, '30d');
        return res.status(http_status_codes_1.StatusCodes.OK).json({ token });
    }
    catch (error) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in, please try again'));
    }
});
exports.getToken = getToken;
//# sourceMappingURL=adminAuthController.js.map