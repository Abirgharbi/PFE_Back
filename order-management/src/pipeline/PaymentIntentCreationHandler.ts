import { PaymentHandler } from './paymenthandler';
import { Request, Response } from 'express';
import { stripe } from '../utils/stripe';

export class PaymentIntentCreationHandler implements PaymentHandler {
  async handle(req: Request, res: Response, next: () => Promise<void>): Promise<void> {
    const {
      amount,
      currency,
      useStripeSdk,
      cvcToken,
      paymentMethodId,
      paymentIntentId,
    } = req.body;

    try {
      let intent;
      if (cvcToken && (req as any).customer) {
        const customer = (req as any).customer;
        const paymentMethod = (req as any).paymentMethod;
        const params = {
          amount,
          currency,
          confirm: true,
          confirmation_method: 'manual',
          return_url: 'flutterstripe://redirect',
          payment_method: paymentMethod.id,
          payment_method_options: {
            card: { cvc_token: cvcToken },
          },
          use_stripe_sdk: useStripeSdk,
          customer: customer.id,
        };
        intent = await stripe.paymentIntents.create(params);
      } else if (paymentMethodId) {
        const params = {
          amount,
          currency,
          confirm: true,
          confirmation_method: 'manual',
          return_url: 'flutterstripe://redirect',
          payment_method: paymentMethodId,
          use_stripe_sdk: useStripeSdk,
        };
        intent = await stripe.paymentIntents.create(params);
      } else if (paymentIntentId) {
        intent = await stripe.paymentIntents.confirm(paymentIntentId);
      } else {
        res.status(400).send({ error: 'Invalid payment parameters' });
        return;
      }
      res.status(200).send(generateResponse(intent));
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
}
