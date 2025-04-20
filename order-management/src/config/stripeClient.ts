import Stripe from 'stripe';
import { generateResponse } from '../utils/stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

class StripeSingleton {
    private static instance: Stripe;

    private constructor() {}  // Private constructor to prevent external instantiation

    public static getInstance(): Stripe {
        if (!StripeSingleton.instance) {
            // Lazy initialization of the Stripe client
            StripeSingleton.instance = new Stripe(stripeSecretKey as string, {
                apiVersion: '2022-08-01' as Stripe.LatestApiVersion,
                typescript: true,
            });
        }
        return StripeSingleton.instance;
    }
}

export default StripeSingleton;
