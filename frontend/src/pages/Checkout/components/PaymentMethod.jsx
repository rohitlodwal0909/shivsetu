import React from 'react';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import { SiRazorpay } from "react-icons/si";


const PaymentMethod = ({ selectedMethod, onMethodChange, isMobile = false }) => {
    const { isHindi } = useLanguage();

    const paymentMethods = [
        // { id: 'card', label: isHindi ? 'क्रेडिट/डेबिट कार्ड' : 'Credit/Debit Card', icon: FaCreditCard, color: 'text-blue-500' },
        // { id: 'upi', label: isHindi ? 'यूपीआई' : 'UPI', icon: FaMobileAlt, color: 'text-purple-500' },
        { id: 'cod', label: isHindi ? 'कैश ऑन डिलीवरी' : 'Cash on Delivery', icon: FaMoneyBillWave, color: 'text-green-500' },
        { id: 'razorpay', label: isHindi ? 'रेज़रपे' : 'Razorpay', icon: SiRazorpay, color: 'text-blue-600'}
    ];

    return (
        <div className={`bg-white ${isMobile ? 'rounded-2xl shadow-sm' : 'rounded-2xl p-8 border border-gray-200 shadow-sm'}`}>
            <div className={isMobile ? 'p-5' : ''}>
                <h2 className={`font-bold ${isMobile ? 'text-lg text-gray-900 mb-5' : 'text-3xl gradient-text mb-8'}`}>
                    {isHindi ? 'भुगतान विधि' : 'Payment Method'}
                </h2>

                <div className={`space-y-${isMobile ? '2' : '4'}`}>
                    {paymentMethods.map((method) => (
                        <label
                            key={method.id}
                            className={`flex items-center gap-3 ${isMobile ? 'p-4' : 'gap-4 p-6'} rounded-xl cursor-pointer transition-all ${selectedMethod === method.id
                                ? 'bg-[#e14503]/5 border-2 border-[#e14503]'
                                : 'bg-gray-50 border-2 border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={method.id}
                                checked={selectedMethod === method.id}
                                onChange={() => onMethodChange(method.id)}
                                className="w-4 h-4 accent-[#e14503]"
                            />
                            <div className={`${selectedMethod === method.id ? 'text-[#e14503]' : method.color}`}>
                                <method.icon className={`${isMobile ? 'text-lg' : 'text-2xl'}`} />
                            </div>
                            <span className={`text-gray-800 font-semibold ${isMobile ? 'text-sm' : 'text-lg'}`}>{method.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
