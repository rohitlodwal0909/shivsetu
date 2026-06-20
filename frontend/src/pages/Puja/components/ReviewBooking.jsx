import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaUser, FaPhone, FaMapMarkerAlt, FaDna, FaCalendarAlt, FaUsers } from 'react-icons/fa';

import { motion } from 'framer-motion';

const ReviewBooking = ({ formData, onBack, onConfirm }) => {
    const { isHindi } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-gray-50/80 rounded-2xl p-5 space-y-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {isHindi ? "भक्त विवरण" : "Devotee Details"}
                </h4>

                <motion.div className="flex items-center gap-4" variants={itemVariants}>
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
                        <FaUser size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "नाम" : "Name"}</p>
                        <p className="font-bold text-gray-800 text-sm">{formData.name}</p>
                    </div>
                </motion.div>

                <div className="h-px bg-gray-200/60 w-full"></div>

                <motion.div className="flex items-center gap-4" variants={itemVariants}>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm border border-green-200">
                        <FaPhone size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "संपर्क" : "Contact"}</p>
                        <p className="font-bold text-gray-800 text-sm">{formData.mobile_no}</p>
                    </div>
                </motion.div>

                {formData.pickupLocation ? (
                    /* Cab-specific review fields */
                    <>
                        <div className="h-px bg-gray-200/60 w-full"></div>
                        <motion.div className="flex items-center gap-4" variants={itemVariants}>
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                                <FaMapMarkerAlt size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "पिकअप" : "Pickup"}</p>
                                <p className="font-bold text-gray-800 text-sm">{formData.pickupLocation}</p>
                            </div>
                        </motion.div>

                        <div className="h-px bg-gray-200/60 w-full"></div>
                        <motion.div className="flex items-center gap-4" variants={itemVariants}>
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
                                <FaMapMarkerAlt size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "ड्रॉप" : "Drop"}</p>
                                <p className="font-bold text-gray-800 text-sm">{formData.dropLocation}</p>
                            </div>
                        </motion.div>

                        <div className="h-px bg-gray-200/60 w-full"></div>
                        <motion.div className="flex items-center gap-4" variants={itemVariants}>
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm border border-purple-200">
                                <FaCalendarAlt size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "यात्रा तिथि" : "Travel Date"}</p>
                                <p className="font-bold text-gray-800 text-sm">{formData.travelDate}</p>
                            </div>
                        </motion.div>

                        <div className="h-px bg-gray-200/60 w-full"></div>
                        <motion.div className="flex items-center gap-4" variants={itemVariants}>
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
                                <FaUsers size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "यात्री" : "Passengers"}</p>
                                <p className="font-bold text-gray-800 text-sm">{formData.passengers}</p>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    /* Puja/Pandit/Chadava review fields */
                    <>
                        {(formData.gotra || formData.rashi) && (
                            <>
                                <div className="h-px bg-gray-200/60 w-full"></div>
                                <motion.div className="flex items-center gap-4" variants={itemVariants}>
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm border border-purple-200">
                                        <FaDna size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "गोत्र / राशि" : "Gotra / Rashi"}</p>
                                        <p className="font-bold text-gray-800 text-sm">
                                            {formData.gotra || '-'} / {formData.rashi || '-'}
                                        </p>
                                    </div>
                                </motion.div>
                            </>
                        )}

                        <div className="h-px bg-gray-200/60 w-full"></div>
                        <motion.div className="flex items-center gap-4" variants={itemVariants}>
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
                                <FaMapMarkerAlt size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{isHindi ? "स्थान" : "Location"}</p>
                                <p className="font-bold text-gray-800 text-sm">{formData.location}</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            <div className="flex gap-3">
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="flex-1 py-3.5 rounded-xl border-2 border-gray-100 text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                >
                    {isHindi ? "संपादित करें" : "Edit Details"}
                </motion.button>
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-200/50 hover:shadow-green-300/50 transition-all text-sm flex items-center justify-center gap-2"
                >
                    {isHindi ? "भुगतान करें" : "Proceed to Pay"}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ReviewBooking;
