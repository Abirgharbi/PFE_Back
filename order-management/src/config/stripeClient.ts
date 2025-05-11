import Stripe from 'stripe';
import { IStripeClient } from '../interface/IStripeClient';
import dotenv from 'dotenv';

dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

class StripeSingleton implements IStripeClient {
    private static instance: Stripe;
    private static lock = false;

    private constructor() {}

    public static async getInstance(): Promise<IStripeClient> {
        if (StripeSingleton.lock) {
            // Wait if another thread is initializing
            await new Promise(resolve => {
                const interval = setInterval(() => {
                    if (!StripeSingleton.lock) {
                        clearInterval(interval);
                        resolve(null);
                    }
                }, 10);
            });
        }

        if (!StripeSingleton.instance) {
            StripeSingleton.lock = true;
            try {
                StripeSingleton.instance = new Stripe(stripeSecretKey as string, {
                    apiVersion: '2022-08-01' as Stripe.LatestApiVersion,
                    typescript: true,
                });
            } catch (error) {
                throw new Error(`Failed to initialize Stripe client: ${error.message}`);
            } finally {
                StripeSingleton.lock = false;
            }
        }

        return StripeSingleton.instance;
    }

    // Implement the methods from IStripeClient interface
    public get paymentIntents() {
        return StripeSingleton.instance.paymentIntents;
    }

    public get customers() {
        return StripeSingleton.instance.customers;
    }

    public get paymentMethods() {
        return StripeSingleton.instance.paymentMethods;
    }
}

export default StripeSingleton;
