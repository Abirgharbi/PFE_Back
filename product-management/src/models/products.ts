import mongoose, { Document, Schema } from 'mongoose';

export interface Products extends Document {
    name: string;
    price: number;
    compare_at_price: number;
    productCost: number;
    totalRevenue: number;
    description: string;
    category: string;
    images?: string[];
    quantity: number;
    modelName?: string;  
    thumbnail: string;
    ratingsAverage: number;
    ratingsCount: number;
    status: boolean;
    colors?: string[];
    discount: number;
    // ajouté poru GRASP
    calculateRevenue(quantitySold: number): number;
    updateRating(newRating: number): void;
    isInStock(requiredQty: number): boolean;
    toggleStatus(): void;
}

const productSchema = new Schema<Products>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        productCost: { type: Number, required: true },
        compare_at_price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        images: [{ type: String }],
        thumbnail: { type: String, required: true },
        modelName: { type: String },          
        ratingsAverage: { type: Number, default: 0 },
        ratingsCount: { type: Number, default: 0 },
        status: { type: Boolean, default: true },
        totalRevenue: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
        colors: [{ type: String }],
        discount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

// Méthodes Expert GRASP
productSchema.methods.calculateRevenue = function (quantitySold: number): number {
    return (this.price - this.productCost) * quantitySold;
};

productSchema.methods.updateRating = function (newRating: number): void {
    this.ratingsCount += 1;
    this.ratingsAverage = ((this.ratingsAverage * (this.ratingsCount - 1)) + newRating) / this.ratingsCount;
};

productSchema.methods.isInStock = function (requiredQty: number): boolean {
    return this.quantity >= requiredQty;
};

productSchema.methods.toggleStatus = function (): void {
    this.status = !this.status;
};

export const products = mongoose.model<Products>('Product', productSchema);
