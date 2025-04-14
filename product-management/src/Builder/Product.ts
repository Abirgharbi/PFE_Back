import { Product } from '../models/product';

class ProductBuilder {
    private _product: any;

    constructor(name: string, price: number, compare_at_price: number, description: string, category: string, productCost: number, quantity: number, thumbnail: string) {
        this._product = {
            name,
            price,
            compare_at_price,
            description,
            category,
            productCost,
            quantity,
            thumbnail,
            ratingsAverage: 0,
            ratingsCount: 0,
            colors: [],
            discount: 0,
            model: '',
            images: []
        };
    }

    setRatings(ratingsAverage: number, ratingsCount: number) {
        this._product.ratingsAverage = ratingsAverage;
        this._product.ratingsCount = ratingsCount;
        return this;
    }

    setColors(colors: string[]) {
        this._product.colors = colors;
        return this;
    }

    setDiscount(discount: number) {
        this._product.discount = discount;
        return this;
    }

    setModel(model: string) {
        this._product.model = model;
        return this;
    }

    setImages(images: string[]) {
        this._product.images = images;
        return this;
    }

    build() {
        return new Product(this._product);
    }
}

export default ProductBuilder;
