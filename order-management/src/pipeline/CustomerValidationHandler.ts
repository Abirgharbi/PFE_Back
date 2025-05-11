import { PaymentHandler } from './paymenthandler';
import { Request, Response } from 'express';
import { stripe } from '../config/stripe';

export class CustomerValidationHandler implements PaymentHandler {
  async handle(req: Request, res: Response, next: () => Promise<void>): Promise<void> {
    const email = req.body.email;
    if (!email) {
      res.status(400).send({ error: 'Email is required' });
      return;
    }
    const customers = await stripe.customers.list({ email });
    if (!customers.data[0]) {
      res.status(400).send({ error: 'No customer found for this email' });
      return;
    }
    (req as any).customer = customers.data[0];
    await next();
  }
}
