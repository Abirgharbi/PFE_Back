import { ProductCard } from "./ProductCard";

import Address from "./Address";
export interface Order {
    amount: number;
    shippingStatus: string;
    address: Address;
    revenue: number;
    customerId: string;
    products: ProductCard[];
}