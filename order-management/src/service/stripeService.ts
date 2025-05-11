import { IStripeClient } from '../interface/IStripeClient';
import Stripe from 'stripe';

class StripeService {
    private stripe: IStripeClient;

    constructor(stripeClient: IStripeClient) {
        this.stripe = stripeClient;
    }

    // Method to create a PaymentIntent
    public async createPaymentIntent(
        amount: number,
        currency: string,
        paymentMethodId: string,
        useStripeSdk: boolean
    ) {
        const params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency,
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
            use_stripe_sdk: useStripeSdk,
        };

        try {
            const paymentIntent = await this.stripe.paymentIntents.create(params);
            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to create payment intent: ${error.message}`);
        }
    }

    // Method to confirm a PaymentIntent
    public async confirmPaymentIntent(paymentIntentId: string) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to confirm payment intent: ${error.message}`);
        }
    }

    // Method to list customers based on email
    public async listCustomersByEmail(email: string) {
        try {
            const customers = await this.stripe.customers.list({ email });
            return customers.data;
        } catch (error) {
            throw new Error(`Failed to list customers: ${error.message}`);
        }
    }

    // Method to list payment methods for a customer
    public async listPaymentMethods(customerId: string) {
        try {
            const paymentMethods = await this.stripe.paymentMethods.list({
                customer: customerId,
                type: 'card',
            });
            return paymentMethods.data;
        } catch (error) {
            throw new Error(`Failed to list payment methods: ${error.message}`);
        }
    }
}

export default StripeService;
