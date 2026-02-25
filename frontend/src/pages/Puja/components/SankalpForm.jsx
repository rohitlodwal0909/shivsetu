import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaUser, FaWhatsapp, FaMapMarkerAlt, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SankalpForm = ({ onSubmit, defaultValues, serviceType = 'puja' }) => {
    const { isHindi } = useLanguage();
    const isCab = serviceType === 'cab';
    const [formData, setFormData] = useState(defaultValues || (isCab ? {
        name: '',
        mobile_no: '',
        pickupLocation: '',
        dropLocation: '',
        travelDate: '',
        passengers: ''
    } : {
        name: '',
        mobile_no: '',
        gotra: '',
        rashi: '',
        nakshatra: '',
        location: ''
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

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
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="space-y-4">
                <motion.div className="relative group" variants={itemVariants}>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isHindi ? "आपका नाम" : "Your Name"}
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                            <FaUser />
                        </div>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                            placeholder={isHindi ? "नाम दर्ज करें" : "Enter full name"}
                        />
                    </div>
                </motion.div>

                <motion.div className="relative group" variants={itemVariants}>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                        {isHindi ? "व्हाट्सएप नंबर" : "WhatsApp Number"}
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                            <FaWhatsapp className="text-lg" />
                        </div>
                        <input
                            type="tel"
                            name="mobile_no"
                            required
                            value={formData.mobile_no}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                </motion.div>

                {isCab ? (
                    /* Cab-specific fields */
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            <motion.div className="relative group" variants={itemVariants}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    {isHindi ? "पिकअप स्थान" : "Pickup Location"}
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        required
                                        value={formData.pickupLocation}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                        placeholder={isHindi ? "पिकअप पता" : "Enter pickup address"}
                                    />
                                </div>
                            </motion.div>
                            <motion.div className="relative group" variants={itemVariants}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    {isHindi ? "ड्रॉप स्थान" : "Drop Location"}
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <input
                                        type="text"
                                        name="dropLocation"
                                        required
                                        value={formData.dropLocation}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                        placeholder={isHindi ? "ड्रॉप पता" : "Enter drop address"}
                                    />
                                </div>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div className="relative group" variants={itemVariants}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    {isHindi ? "यात्रा तिथि" : "Travel Date"}
                                </label>
                                <input
                                    type="date"
                                    name="travelDate"
                                    required
                                    value={formData.travelDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                />
                            </motion.div>
                            <motion.div className="relative group" variants={itemVariants}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    {isHindi ? "यात्री" : "Passengers"}
                                </label>
                                <input
                                    type="number"
                                    name="passengers"
                                    required
                                    min="1"
                                    max="20"
                                    value={formData.passengers}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                    placeholder={isHindi ? "संख्या" : "Count"}
                                />
                            </motion.div>
                        </div>
                    </>
                ) : (
                    /* Puja/Pandit/Chadava fields */
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div className="relative group" variants={itemVariants}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    {isHindi ? "गोत्र" : "Gotra"} <span className="text-[10px] text-gray-400 font-normal opacity-70">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="gotra"
                                        value={formData.gotra}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                        placeholder={isHindi ? "गोत्र" : "Gotra"}
                                    />
                                </div>
                            </motion.div>
                            <motion.div className="relative group" variants={itemVariants}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    {isHindi ? "राशि" : "Rashi"} <span className="text-[10px] text-gray-400 font-normal opacity-70">(Optional)</span>
                                </label>
                                <select
                                    name="rashi"
                                    value={formData.rashi}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm appearance-none"
                                >
                                    <option value="">{isHindi ? "चुनें" : "Select"}</option>
                                    <option value="Mesh">Mesh (Aries)</option>
                                    <option value="Vrishabh">Vrishabh (Taurus)</option>
                                    <option value="Mithun">Mithun (Gemini)</option>
                                    <option value="Kark">Kark (Cancer)</option>
                                    <option value="Simha">Simha (Leo)</option>
                                    <option value="Kanya">Kanya (Virgo)</option>
                                    <option value="Tula">Tula (Libra)</option>
                                    <option value="Vrishchik">Vrishchik (Scorpio)</option>
                                    <option value="Dhanu">Dhanu (Sagittarius)</option>
                                    <option value="Makar">Makar (Capricorn)</option>
                                    <option value="Kumbh">Kumbh (Aquarius)</option>
                                    <option value="Meen">Meen (Pisces)</option>
                                </select>
                                <div className="absolute right-4 top-[38px] pointer-events-none text-gray-400 text-xs">
                                    <FaChevronDown />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div className="relative group" variants={itemVariants}>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                {isHindi ? "स्थान" : "Location"}
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                                    <FaMapMarkerAlt />
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                    placeholder={isHindi ? "शहर, राज्य" : "City, State"}
                                />
                            </div>
                        </motion.div>
                    </>
                )}

                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold tracking-wide shadow-lg shadow-orange-200/50 hover:shadow-orange-300/50 transition-all text-sm flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {isHindi ? "आगे बढ़ें" : "Proceed to Review"}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
            </div>
        </motion.form>
    );
};

export default SankalpForm;
