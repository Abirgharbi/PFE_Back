
import mongoose, { Document, Schema } from 'mongoose';

export interface Promo extends Document {
    id: string;
    code: string;
    start_date: string;
    expire_date: string;
    discount: number;
    total_apply: number;
}

export const promoSchema = new Schema<Promo>({
    id: { type: String, required: false },
    code: { type: String, required: false },
    start_date: { type: String, required: false },
    expire_date: { type: String, required: false },
    discount: { type: Number, required: false },
    total_apply: { type: Number, required: false, default: 0 }
},

    {
        timestamps: true
    });


export const Promo = mongoose.model<Promo>('Promo', promoSchema);