import React, { useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const OrderConfirmation = ({ isOpen, onClose, orderDetails }) => {
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleContinueShopping = () => {
        onClose();
        navigate('/shop');
    };

    const handleViewOrders = () => {
        onClose();
        navigate('/profile');
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg z-10"
                >
                    <FaTimes size={20} />
                </button>

                {/* Success Icon */}
                <div className="text-center pt-10 pb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <FaCheckCircle className="text-5xl text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isHindi ? 'ऑर्डर पुष्टिकरण!' : 'Order Confirmed!'}
                    </h2>
                    <p className="text-gray-600">
                        {isHindi ? 'आपकी खरीदारी के लिए धन्यवाद' : 'Thank you for your purchase'}
                    </p>
                </div>

                {/* Order Details */}
                <div className="px-8 pb-8">
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
                            <span className="text-sm font-semibold text-gray-600">
                                {isHindi ? 'ऑर्डर संख्या' : 'Order Number'}
                            </span>
                            <span className="text-lg font-bold gradient-text">{orderDetails?.orderNumber || 'ORD-2024-001'}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span className="font-medium">{isHindi ? 'ग्राहक' : 'Customer'}</span>
                                <span className="font-semibold">{orderDetails?.customerName}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span className="font-medium">{isHindi ? 'ईमेल' : 'Email'}</span>
                                <span className="font-semibold">{orderDetails?.email}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span className="font-medium">{isHindi ? 'कुल राशि' : 'Total Amount'}</span>
                                <span className="text-xl font-bold gradient-text">₹{orderDetails?.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800 text-center">
                            {isHindi
                                ? <strong>ऑर्डर की पुष्टि</strong>
                                : <strong>Order confirmation</strong>}
                            {isHindi
                                ? ' आपके ईमेल पते पर भेज दी गई है।'
                                : ' has been sent to your email address.'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleViewOrders}
                            className="w-full bg-gradient-to-r from-[#e14503] to-[#c23a02] hover:from-[#c23a02] hover:to-[#e14503] text-white py-3 rounded-xl font-bold transition-all transform hover:scale-[1.02] hover:shadow-lg"
                        >
                            {isHindi ? 'मेरे ऑर्डर देखें' : 'View My Orders'}
                        </button>
                        <button
                            onClick={handleContinueShopping}
                            className="w-full bg-white border-2 border-gray-300 hover:border-[#e14503] text-gray-700 hover:text-[#e14503] py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <FaShoppingBag />
                            {isHindi ? 'खरीदारी जारी रखें' : 'Continue Shopping'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
