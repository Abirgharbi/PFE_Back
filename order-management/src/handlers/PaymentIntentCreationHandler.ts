//PaymentIntentCreationHandler.ts
import { PaymentHandler } from './PaymentHandlet';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { generateResponse } from '../utils/stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '',);

export class PaymentIntentCreationHandler extends PaymentHandler {
    public async handle(req: Request, res: Response): Promise<Response<any>> {
        const { paymentMethod, amount, currency, useStripeSdk, cvcToken, customer } = req.body;

        if (customer && paymentMethod && cvcToken) {
            const intent = await stripe.paymentIntents.create({
                amount,
                confirm: true,
                return_url: 'flutterstripe://redirect',
                confirmation_method: 'manual',
                currency,
                payment_method: paymentMethod,
                payment_method_options: { card: { cvc_token: cvcToken } },
                use_stripe_sdk: useStripeSdk,
                customer: customer.id
            });
            return res.status(200).send(generateResponse(intent));
        }

        return super.handle(req, res);
    }
}
