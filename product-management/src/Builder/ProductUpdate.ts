class ProductUpdateBuilder {
    private updateData: any = {};

    setName(name: string) {
        this.updateData.name = name;
        return this;
    }

    setPrice(price: number) {
        this.updateData.price = price;
        return this;
    }

    setCompareAtPrice(compareAtPrice: number) {
        this.updateData.compare_at_price = compareAtPrice;
        return this;
    }

    setDescription(description: string) {
        this.updateData.description = description;
        return this;
    }

    setCategory(category: string) {
        this.updateData.category = category;
        return this;
    }

    setProductCost(productCost: number) {
        this.updateData.productCost = productCost;
        return this;
    }

    setQuantity(quantity: number) {
        this.updateData.quantity = quantity;
        return this;
    }

    setThumbnail(thumbnail: string) {
        this.updateData.thumbnail = thumbnail;
        return this;
    }

    setRatings(ratingsAverage: number, ratingsCount: number) {
        this.updateData.ratingsAverage = ratingsAverage;
        this.updateData.ratingsCount = ratingsCount;
        return this;
    }

    setColors(colors: string[]) {
        this.updateData.colors = colors;
        return this;
    }

    setDiscount(discount: number) {
        this.updateData.discount = discount;
        return this;
    }

    setModel(model: string) {
        this.updateData.model = model;
        return this;
    }

    setImages(images: string[]) {
        this.updateData.images = images;
        return this;
    }

    build() {
        return this.updateData;
    }
}
export default ProductUpdateBuilder;
