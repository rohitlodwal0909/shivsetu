import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaArrowRight, FaOm } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';
import MobileKundli from './mobile/MobileKundli';

const KundliSection = () => {
    const { isHindi } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        time: '',
        place: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Kundli Request:', formData);
    };

    return (
        <>
            {/* Mobile View */}
            <MobileKundli
                isHindi={isHindi}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            {/* Desktop View */}
            <div className="hidden md:block">
                <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50 py-12 lg:py-24">

                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">


                            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-sm text-orange-600 text-sm font-bold uppercase tracking-wider">
                                    <FaOm />
                                    {isHindi ? "वैदिक ज्योतिष" : "Vedic Astrology"}
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-ibm text-gray-900">
                                    {isHindi ? "अपनी" : "Get Your"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600 relative inline-block">
                                        {isHindi ? "मुफ्त कुंडली" : "Free Kundli"}
                                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                        </svg>
                                    </span>
                                </h2>



                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                                    {[
                                        { icon: "🌟", text: isHindi ? "जीवन रिपोर्ट" : "Life Report" },
                                        { icon: "🔮", text: isHindi ? "दोष निवारण" : "Dosha Remedies" },
                                        { icon: "💎", text: isHindi ? "रत्न सुझाव" : "Gemstones" },
                                        { icon: "💑", text: isHindi ? "गुण मिलान" : "Match Making" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="font-semibold text-gray-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="lg:col-span-6 relative">

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none animate-spin-slow">
                                    <SafeImage
                                        src="https://cdn-icons-png.flaticon.com/512/3556/3556608.png"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 relative shadow-2xl lg:mx-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                        {isHindi ? "कुंडली विवरण" : "Enter Birth Details"}
                                    </h3>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder={isHindi ? "पूरा नाम" : "Full Name"}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative group">
                                                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        type="date"
                                                        name="dob"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        type="time"
                                                        name="time"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium text-sm"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="relative group">
                                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                                <input
                                                    type="text"
                                                    name="place"
                                                    placeholder={isHindi ? "जन्म स्थान" : "Birth Place"}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4"
                                        >
                                            {isHindi ? "कुंडली प्राप्त करें" : "Get Free Kundli"} <FaArrowRight />
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </section >
            </div>
        </>
    );
};

export default KundliSection;
