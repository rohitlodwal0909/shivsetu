import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaCheckCircle } from 'react-icons/fa';

import { motion } from 'framer-motion';

const PaymentPlaceholder = ({ pujaDetails, formData }) => {
    const { isHindi } = useLanguage();

    return (
        <motion.div
            className="text-center py-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
        >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                <FaCheckCircle className="text-green-500 text-4xl relative z-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isHindi ? "बुकिंग विवरण सहेजा गया" : "Booking Details Saved"}
            </h3>
            <p className="text-gray-500 px-4 mb-8 text-sm leading-relaxed max-w-xs mx-auto">
                {isHindi
                    ? "भुगतान गेटवे एकीकरण जल्द ही आ रहा है। यह एक डेमो है।"
                    : "Payment gateway integration coming soon. This is a demo."}
            </p>

            <div className="bg-orange-50/50 p-5 rounded-xl text-left text-sm border border-orange-100 mx-auto max-w-xs shadow-sm">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500 font-medium">Amount:</span>
                    <span className="font-bold text-gray-900">₹{pujaDetails?.price}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Name:</span>
                    <span className="font-bold text-gray-900">{formData.name}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PaymentPlaceholder;
