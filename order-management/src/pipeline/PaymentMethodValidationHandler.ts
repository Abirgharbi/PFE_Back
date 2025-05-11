import { PaymentHandler } from './paymenthandler';
import { Request, Response } from 'express';
import { stripe } from '../config/stripeConfig';

export class PaymentMethodValidationHandler implements PaymentHandler {
  async handle(req: Request, res: Response, next: () => Promise<void>): Promise<void> {
    const customer = (req as any).customer;
    if (!customer) {
      res.status(400).send({ error: 'Customer not validated' });
      return;
    }
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card',
    });
    if (!paymentMethods.data[0]) {
      res.status(400).send({ error: 'No payment method found for customer' });
      return;
    }
    (req as any).paymentMethod = paymentMethods.data[0];
    await next();
  }
}
