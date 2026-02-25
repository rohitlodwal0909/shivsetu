import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaGift, FaPercent, FaTruck } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const PromotionalModal = ({ isOpen, onClose }) => {
    const { isHindi } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all shadow-lg"
                >
                    <FaTimes className="text-xl" />
                </button>

                {/* Hero Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#e14503] via-[#ff6b35] to-[#ffa726] overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full" />
                        <div className="absolute bottom-4 right-4 w-32 h-32 bg-white rounded-full" />
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="text-6xl font-bold mb-2">🎁</div>
                            <h2 className="text-3xl font-bold">
                                {isHindi ? "विशेष छूट!" : "Special Offer!"}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {isHindi ? "पहले ऑर्डर पर 20% छूट" : "Get 20% OFF Your First Order!"}
                        </h3>
                        <p className="text-gray-600">
                            {isHindi
                                ? "हमारे धार्मिक संग्रह पर विशेष छूट का आनंद लें। सीमित समय का ऑफर!"
                                : "Use code WELCOME20 at checkout. Limited time offer!"
                            }
                        </p>
                    </div>

                    {/* Promo Code Box */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-dashed border-[#e14503] rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-center gap-3">
                            <FaGift className="text-[#e14503] text-2xl" />
                            <span className="text-2xl font-bold text-[#e14503] tracking-wider">WELCOME20</span>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <FaPercent className="text-green-600" />
                            </div>
                            <p className="text-xs text-gray-600 font-medium">
                                {isHindi ? "20% छूट" : "20% OFF"}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <FaTruck className="text-blue-600" />
                            </div>
                            <p className="text-xs text-gray-600 font-medium">
                                {isHindi ? "मुफ्त शिपिंग" : "Free Shipping"}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <FaGift className="text-purple-600" />
                            </div>
                            <p className="text-xs text-gray-600 font-medium">
                                {isHindi ? "मुफ्त उपहार" : "Free Gift"}
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/shop"
                            onClick={onClose}
                            className="block w-full bg-[#e14503] hover:bg-[#c23a02] text-white text-center py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02]"
                        >
                            {isHindi ? "अभी खरीदारी करें" : "Shop Now"}
                        </Link>
                        <button
                            onClick={onClose}
                            className="block w-full text-gray-500 hover:text-gray-700 text-center py-2 font-medium transition-colors"
                        >
                            {isHindi ? "बाद में" : "Maybe Later"}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default PromotionalModal;
