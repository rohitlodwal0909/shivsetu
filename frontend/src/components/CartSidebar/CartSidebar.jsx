import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    const { isHindi } = useLanguage();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9990] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#e14503] to-[#ff6b35]">
                    <div className="flex items-center gap-3 text-white">
                        <FaShoppingBag className="text-2xl" />
                        <div>
                            <h2 className="text-xl font-bold">
                                {isHindi ? "आपकी कार्ट" : "Your Cart"}
                            </h2>
                            <p className="text-sm text-white/80">
                                {getCartCount()} {isHindi ? "आइटम" : "items"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-200px)]">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <FaShoppingBag className="text-gray-300 text-6xl mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {isHindi ? "कार्ट खाली है" : "Your cart is empty"}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {isHindi ? "अभी खरीदारी शुरू करें!" : "Start shopping now!"}
                            </p>
                            <Link
                                to="/shop"
                                onClick={onClose}
                                className="bg-[#e14503] hover:bg-[#c23a02] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                            >
                                {isHindi ? "शॉप पर जाएं" : "Go to Shop"}
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-gray-50 rounded-xl p-3 flex gap-3">
                                    {/* Image */}
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80'}
                                        alt={isHindi ? item.name : (item.nameEn || item.name)}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                                            {isHindi ? item.name : (item.nameEn || item.name)}
                                        </h4>
                                        <p className="text-[#e14503] font-bold">₹{item.price}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-7 h-7 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-[#e14503] transition-colors disabled:opacity-50"
                                                >
                                                    <FaMinus className="text-xs" />
                                                </button>
                                                <span className="font-semibold text-gray-900 w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-[#e14503] transition-colors"
                                                >
                                                    <FaPlus className="text-xs" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-600 p-2 transition-colors"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-600 font-medium">
                                {isHindi ? "कुल राशि" : "Subtotal"}
                            </span>
                            <span className="text-2xl font-bold text-gray-900">₹{getCartTotal().toFixed(2)}</span>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-2">
                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="block w-full bg-[#e14503] hover:bg-[#c23a02] text-white text-center py-3 rounded-xl font-bold transition-colors"
                            >
                                {isHindi ? "चेकआउट करें" : "Proceed to Checkout"}
                            </Link>
                            <Link
                                to="/cart"
                                onClick={onClose}
                                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-center py-3 rounded-xl font-semibold transition-colors"
                            >
                                {isHindi ? "कार्ट देखें" : "View Cart"}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
