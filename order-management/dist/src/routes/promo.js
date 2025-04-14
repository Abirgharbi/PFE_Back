"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectAuth_1 = require("../middleware/protectAuth");
const promo_1 = require("../controllers/promo");
const promoRoutes = (0, express_1.Router)();
promoRoutes.post('/add', protectAuth_1.protectAuth, promo_1.addPromo);
promoRoutes.get('/get', protectAuth_1.protectAuth, promo_1.getPromos);
promoRoutes.delete('/delete/:id', protectAuth_1.protectAuth, promo_1.deletePromo);
promoRoutes.get('/getValidPromos', promo_1.getValidPromos);
promoRoutes.put('/incrementTotalApply/:id', promo_1.incrementTotalApply);
exports.default = promoRoutes;
//# sourceMappingURL=promo.js.map