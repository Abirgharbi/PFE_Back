import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface Admin extends Document {
    email: string;
}


export const adminSchema = new Schema<Admin>({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const generateAuthToken = function (email: string, expiresIn: string) {
    const { jwtSecret } = process.env;
    const token: string = jwt.sign({ email }, jwtSecret as string, {
        expiresIn: '1h',
    });
    return token;
}

export const Admin = mongoose.model<Admin>('Admin', adminSchema);