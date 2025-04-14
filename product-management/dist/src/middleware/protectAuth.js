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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("./errorHandler");
// prevent user from signin/singup while logged in
const protectAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get jwt
    const token = req.cookies.jwt;
    if (token) {
        return next(new errorHandler_1.CustomError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'you are already signed in'));
    }
    next();
});
exports.protectAuth = protectAuth;
//# sourceMappingURL=protectAuth.js.map