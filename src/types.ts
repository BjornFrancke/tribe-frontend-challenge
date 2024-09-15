export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
}

export interface BasketItem {
    item: Product;
    quantity: number;
}
