// Application constants and configuration

export const API_BASE_URL = "http://localhost:5000/api";
export const IMAGE_URL = "http://localhost:5000/uploads/";

export const ROUTES = {
    HOME: "/",
    SHOP: "/shop",
    CART: "/cart",
    CHECKOUT: "/checkout",
    ACCOUNT: "/account",
};

export const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Books",
];

export const SHIPPING_THRESHOLD = 50; // Free shipping above this amount
export const TAX_RATE = 0.1; // 10% tax

export default {
    API_BASE_URL,
    ROUTES,
    CATEGORIES,
    SHIPPING_THRESHOLD,
    TAX_RATE,
};
