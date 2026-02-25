import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ isOpen, onClose, orderDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-[fadeIn_0.3s_ease]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                    <FaTimes className="text-gray-600" />
                </button>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-green-600 text-5xl" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600">Thank you for your purchase</p>
                </div>

                {/* Order Details */}
                {orderDetails && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order Number</span>
                                <span className="font-bold text-gray-900">{orderDetails.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Amount</span>
                                <span className="font-bold text-[#e14503] text-xl">${orderDetails.total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Estimated Delivery</span>
                                <span className="font-semibold text-gray-900">{orderDetails.delivery}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirmation Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800 text-center">
                        A confirmation email has been sent to your email address
                    </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Link
                        to="/account"
                        onClick={onClose}
                        className="block w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-3 rounded-xl font-bold text-center transition-colors"
                    >
                        View Order Details
                    </Link>
                    <Link
                        to="/shop"
                        onClick={onClose}
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold text-center transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
