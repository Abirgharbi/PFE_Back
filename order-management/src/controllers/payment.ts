import { Request, Response } from 'express';
import StripeService from '../service/stripeService';
import { generateResponse } from '../utils/stripe';
import Stripe from 'stripe';

const stripeService = new StripeService();

export const pay = async (req: Request, res: Response) => {
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
        currency: string;
        useStripeSdk: boolean;
        email?: string;
        amount: number;
    } = req.body;

    // Check for missing required fields
    if (!currency || !amount) {
        return res.status(400).send({ error: 'Missing required fields: currency or amount.' });
    }

    try {
        // Handle the case where cvcToken and email are provided
        if (cvcToken && email) {
            // Fetch customers by email
            const customers = await stripeService.listCustomersByEmail(email);
            if (!customers[0]) {
                return res.status(400).send({
                    error: 'No associated customer found for the provided email.',
                });
            }

            // Fetch payment methods for the customer
            const paymentMethods = await stripeService.listPaymentMethods(customers[0].id);
            if (!paymentMethods[0]) {
                return res.status(400).send({
                    error: 'No payment method found for this customer.',
                });
            }

            // Create a payment intent using the payment method ID
            const intent = await stripeService.createPaymentIntent(amount, currency, paymentMethods[0].id, useStripeSdk);
            return res.status(200).send(generateResponse(intent));
        } 
        
        // Handle the case where a PaymentMethodId is provided
        else if (paymentMethodId) {
            // Create new PaymentIntent with a PaymentMethod ID from the client
            const intent = await stripeService.createPaymentIntent(amount, currency, paymentMethodId, useStripeSdk);
            return res.status(200).send(generateResponse(intent));
        } 
        
        // Handle the case where a PaymentIntentId is provided for confirmation
        else if (paymentIntentId) {
            const intent = await stripeService.confirmPaymentIntent(paymentIntentId);
            return res.status(200).send(generateResponse(intent));
        }

        // If none of the conditions are met, return an error
        return res.status(400).send({ error: 'Invalid request: missing required parameters.' });
    } catch (e: any) {
        // Catch any errors and send a response with the error message
        return res.status(500).send({ error: e.message });
    }
};
