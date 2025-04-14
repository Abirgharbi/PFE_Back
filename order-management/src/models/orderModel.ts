import { ProductCard } from 'ProductCard';
import mongoose, { Document, Schema } from 'mongoose';
import Address from './addressModel';

export interface Order extends Document {
    amount: number;
    productCard: ProductCard[];
    shippingStatus: string;
    address: Address;
    revenue: number;
    customerId: string;
}

export const orderSchema = new Schema<Order>({
    amount: { type: Number, required: false },
    shippingStatus: { type: String, required: false, default: 'pending' },
    address: {
        _id: { type: String, required: false },
        city: { type: String, required: false },
        country: { type: String, required: false },
        state: { type: String, required: false },
        zipCode: { type: Number, required: false },
        line1: { type: String, required: false },
        line2: { type: String, required: false },
        customerEmail: { type: String, required: false },
    },
    revenue: { type: Number, required: false },
    customerId: { type: String, required: true },
    productCard: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }]
},
    {
        timestamps: true
    });


export const Order = mongoose.model<Order>('Order', orderSchema);