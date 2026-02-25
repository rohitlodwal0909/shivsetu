import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';

const OrderSummary = ({ items, onPlaceOrder, isMobile = false }) => {
    const { isHindi } = useLanguage();
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className={`bg-white ${isMobile ? 'rounded-2xl shadow-sm' : 'rounded-2xl p-8 border border-gray-200 shadow-sm sticky top-24'}`}>
            <div className={isMobile ? 'p-5' : ''}>
                <h2 className={`font-bold ${isMobile ? 'text-lg text-gray-900 mb-4' : 'text-2xl text-gray-900 mb-8'}`}>
                    {isHindi ? 'ऑर्डर सारांश' : 'Order Summary'}
                </h2>

                {/* Items List */}
                <div className={`space-y-3 mb-5 ${!isMobile ? 'max-h-64 overflow-y-auto' : ''}`}>
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center text-gray-700 pb-3 border-b border-gray-100">
                            <img
                                src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80'}
                                alt={isHindi ? item.name : (item.nameEn || item.name)}
                                className={`${isMobile ? 'w-12 h-12' : 'w-12 h-12'} object-cover rounded-lg`}
                            />
                            <div className="flex-1 min-w-0">
                                <span className={`font-medium line-clamp-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                    {isHindi ? item.name : (item.nameEn || item.name)}
                                </span>
                                <span className="text-[#e14503] text-xs block">×{item.quantity}</span>
                            </div>
                            <span className={`font-bold text-gray-900 ${isMobile ? 'text-sm' : ''}`}>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3 mb-5">
                    <div className="flex justify-between text-gray-600">
                        <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{isHindi ? 'उपयोग' : 'Subtotal'}</span>
                        <span className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : ''}`}>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{isHindi ? 'शिपिंग' : 'Shipping'}</span>
                        <span className={`font-semibold text-green-600 ${isMobile ? 'text-sm' : ''}`}>
                            {shipping === 0 ? (isHindi ? 'मुफ़्त' : 'FREE') : `₹${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{isHindi ? 'कर (10%)' : 'Tax (10%)'}</span>
                        <span className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : ''}`}>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between items-center">
                            <span className={`font-bold text-gray-900 ${isMobile ? 'text-base' : 'text-xl'}`}>{isHindi ? 'कुल' : 'Total'}</span>
                            <span className={`font-bold text-[#e14503] ${isMobile ? 'text-lg' : 'text-2xl'}`}>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Only: Place Order button */}
                {!isMobile && (
                    <button
                        onClick={onPlaceOrder}
                        className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-4 rounded-xl font-bold text-lg transition-all"
                    >
                        {isHindi ? 'ऑर्डर करें' : 'Place Order'}
                    </button>
                )}

                {/* Trust badges */}
                <div className={`flex items-center justify-center gap-1.5 ${isMobile ? 'mt-4' : 'mt-4'}`}>
                    <FaShieldAlt className="text-xs text-gray-400" />
                    <p className="text-[11px] text-gray-400">{isHindi ? 'सुरक्षित और एन्क्रिप्टेड भुगतान' : 'Secure & encrypted payments'}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
