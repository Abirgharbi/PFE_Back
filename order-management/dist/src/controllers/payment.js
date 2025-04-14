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
exports.pay = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe_2 = require("../utils/stripe");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const pay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentMethodId, paymentIntentId, currency, useStripeSdk, cvcToken, email, amount, } = req.body;
    const stripe = new stripe_1.default(stripeSecretKey, {
        apiVersion: '2022-08-01',
        typescript: true,
    });
    try {
        if (cvcToken && email) {
            const customers = yield stripe.customers.list({
                email,
            });
            if (!customers.data[0]) {
                return res.send({
                    error: 'There is no associated customer object to the provided e-mail',
                });
            }
            const paymentMethods = yield stripe.paymentMethods.list({
                customer: customers.data[0].id,
                type: 'card',
            });
            if (!paymentMethods.data[0]) {
                return res.send({
                    error: `There is no associated payment method to the provided customer's e-mail`,
                });
            }
            const params = {
                amount: amount,
                confirm: true,
                return_url: 'flutterstripe://redirect',
                confirmation_method: 'manual',
                currency,
                payment_method: paymentMethods.data[0].id,
                payment_method_options: {
                    card: {
                        cvc_token: cvcToken,
                    },
                },
                use_stripe_sdk: useStripeSdk,
                customer: customers.data[0].id,
            };
            const intent = yield stripe.paymentIntents.create(params);
            return res.status(200).send((0, stripe_2.generateResponse)(intent));
        }
        else if (paymentMethodId) {
            // Create new PaymentIntent with a PaymentMethod ID from the client.
            const params = {
                amount: amount,
                confirm: true,
                return_url: 'flutterstripe://redirect',
                confirmation_method: 'manual',
                currency,
                payment_method: paymentMethodId,
                use_stripe_sdk: useStripeSdk,
            };
            const intent = yield stripe.paymentIntents.create(params);
            return res.status(200).send((0, stripe_2.generateResponse)(intent));
        }
        else if (paymentIntentId) {
            const intent = yield stripe.paymentIntents.confirm(paymentIntentId);
            return res.status(200).send((0, stripe_2.generateResponse)(intent));
        }
        return res.sendStatus(400);
    }
    catch (e) {
        return res.send({ error: e.message });
    }
});
exports.pay = pay;
//# sourceMappingURL=payment.js.map