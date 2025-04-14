import Stripe from 'stripe';
import { generateResponse } from '../utils/stripe';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

const pay = async (
    req: Request,
    res: Response
): Promise<Response<any>> => {

    const {
        paymentMethodId,
        paymentIntentId,
        currency,
        useStripeSdk,
        cvcToken,
        email,
        amount,
    }: {
        paymentMethodId?: string;
        paymentIntentId?: string;
        cvcToken?: string;
        items: string[];
        currency: string;
        useStripeSdk: boolean;
        email?: string;
        amount: number;
    } = req.body;

    const stripe = new Stripe(stripeSecretKey as string, {
        apiVersion: '2022-08-01' as Stripe.LatestApiVersion,
        typescript: true,
    });

    try {
        if (cvcToken && email) {
            const customers = await stripe.customers.list({
                email,
            });

            if (!customers.data[0]) {
                return res.send({
                    error:
                        'There is no associated customer object to the provided e-mail',
                });
            }

            const paymentMethods = await stripe.paymentMethods.list({
                customer: customers.data[0].id,
                type: 'card',
            });

            if (!paymentMethods.data[0]) {
                return res.send({
                    error: `There is no associated payment method to the provided customer's e-mail`,
                });
            }

            const params: Stripe.PaymentIntentCreateParams = {
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
            const intent = await stripe.paymentIntents.create(params);
            return res.status(200).send(generateResponse(intent));
        } else if (paymentMethodId) {
            // Create new PaymentIntent with a PaymentMethod ID from the client.
            const params: Stripe.PaymentIntentCreateParams = {
                amount: amount,
                confirm: true,
                return_url: 'flutterstripe://redirect',
                confirmation_method: 'manual',
                currency,
                payment_method: paymentMethodId,
                use_stripe_sdk: useStripeSdk,
            };
            const intent = await stripe.paymentIntents.create(params);
            return res.status(200).send(generateResponse(intent));
        } else if (paymentIntentId) {
            const intent = await stripe.paymentIntents.confirm(paymentIntentId);
            return res.status(200).send(generateResponse(intent));
        }

        return res.sendStatus(400);
    } catch (e: any) {
        return res.send({ error: e.message });
    }

}
export { pay };