//CustomerValidationHandler.ts
import { PaymentHandler } from './PaymentHandlet';
import { Request, Response } from 'express';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '',);

export class CustomerValidationHandler extends PaymentHandler {
    public async handle(req: Request, res: Response): Promise<Response<any>> {
        const { cvcToken, email } = req.body;
        if (cvcToken && email) {
            const customers = await stripe.customers.list({ email });
            if (!customers.data[0]) {
                return res.send({ error: 'No customer linked to this email.' });
            }
            req.body.customer = customers.data[0];
            return super.handle(req, res);
        }
        return super.handle(req, res);
    }
}
