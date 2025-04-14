//PaymentMethodValidationHandler.ts
import { PaymentHandler } from './PaymentHandlet';
import { Request, Response } from 'express';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', );

export class PaymentMethodValidationHandler extends PaymentHandler {
    public async handle(req: Request, res: Response): Promise<Response<any>> {
        const { customer } = req.body;
        if (customer) {
            const paymentMethods = await stripe.paymentMethods.list({
                customer: customer.id,
                type: 'card'
            });
            if (!paymentMethods.data[0]) {
                return res.send({ error: 'No payment method found for this customer.' });
            }
            req.body.paymentMethod = paymentMethods.data[0].id;
        }
        return super.handle(req, res);
    }
}
