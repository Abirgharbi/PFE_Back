"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuthController_1 = require("../controllers/adminAuthController");
const adminRoute = (0, express_1.Router)();
adminRoute.post('/login', adminAuthController_1.login);
adminRoute.get('/logout', adminAuthController_1.logout);
adminRoute.get('/verifyMagicLink', adminAuthController_1.verifyMagicLink);
adminRoute.get('/getToken', adminAuthController_1.getToken);
exports.default = adminRoute;
//# sourceMappingURL=adminRouter.js.map