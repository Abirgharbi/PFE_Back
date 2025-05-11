import Stripe from 'stripe';

export interface IStripeClient {
    paymentIntents: Stripe.PaymentIntentsResource;
    customers: Stripe.CustomersResource;
    paymentMethods: Stripe.PaymentMethodsResource;
}
