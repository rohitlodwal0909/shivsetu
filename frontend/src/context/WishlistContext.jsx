import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    // Load wishlist from localStorage initially
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem("shivsetu_wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const { showToast } = useToast();

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("shivsetu_wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        const exists = wishlistItems.find((item) => item.id === product.id);

        if (exists) {
            return;
        }

        showToast(`${product.product_name || product.name} added to wishlist! ❤️`, { type: 'success', icon: '❤️' });

        setWishlistItems((prevItems) => [...prevItems, product]);
    };

    const removeFromWishlist = (productId) => {
        const item = wishlistItems.find((i) => i.id === productId);
        if (item) {
            showToast(`${item.product_name || item.name} removed from wishlist`, { type: 'info', icon: '💔' });
        }

        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        const exists = wishlistItems.find((item) => item.id === product.id);
        if (exists) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const getWishlistCount = () => {
        return wishlistItems.length;
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistContext;
