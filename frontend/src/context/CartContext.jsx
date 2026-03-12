import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {

    // ✅ Load cart from localStorage initially
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("shivsetu_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const { showToast } = useToast();

    // ✅ Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("shivsetu_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {

        const existingItem = cartItems.find((item) => item.id === product.id);

        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === product.id);

            if (existing) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });

        if (existingItem) {
            showToast(
                `${product.product_name || product.name} quantity updated! 🛒`,
                { type: 'success', icon: '✅' }
            );
        } else {
            showToast(
                `${product.product_name || product.name} added to cart! 🛒`,
                { type: 'success', icon: '🛒' }
            );
        }
    };

    const removeFromCart = (productId) => {

        const item = cartItems.find((i) => i.id === productId);

        if (item) {
            showToast(
                `${item.product_name || item.name} removed from cart`,
                { type: 'info', icon: '🗑️' }
            );
        }

        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const updateQuantity = (productId, quantity) => {

        if (quantity < 1) return;

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("shivsetu_cart");
        showToast('Cart cleared!', { type: 'info', icon: '🧹' });
    };

    const getCartTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const getCartCount = () => {
        return cartItems.reduce(
            (count, item) => count + item.quantity,
            0
        );
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;