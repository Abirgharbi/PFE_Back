import Stripe from 'stripe';

export const generateResponse = (paymentIntent: Stripe.PaymentIntent) => {
    return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret,
    };
};
