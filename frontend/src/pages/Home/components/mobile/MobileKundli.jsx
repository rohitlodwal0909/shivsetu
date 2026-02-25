import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaArrowRight, FaOm, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../../components/common/SafeImage';

const MobileKundli = ({ isHindi, formData, handleChange, handleSubmit }) => {
    return (
        <div className="md:hidden py-6 px-4 bg-gradient-to-br from-orange-50 via-white to-purple-50">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                        <FaOm /> {isHindi ? "वैदिक ज्योतिष" : "Vedic Astrology"}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1 leading-tight">
                        {isHindi ? "आपकी कुंडली" : "Your Kundli"}
                    </h2>
                </div>
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-500">
                    <FaStar />
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-4 snap-x scrollbar-hide pb-4 -mx-4 px-4">

                {/* Card 1: Intro / Call to Action */}
                <div className="min-w-[85%] snap-center bg-gradient-to-br from-[#fff0e6] to-[#fff] rounded-2xl p-6 shadow-md border border-orange-100 relative overflow-hidden flex flex-col justify-between h-[380px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>

                    <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {isHindi ? "मुफ्त कुंडली प्राप्त करें" : "Get Free Kundli"}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            {isHindi
                                ? "अपने जीवन के रहस्यों को जानें। वैदिक ज्योतिष के माध्यम से विस्तृत रिपोर्ट और उपाय प्राप्त करें।"
                                : "Discover the secrets of your life. Get detailed reports and remedies through Vedic Astrology."}
                        </p>

                        <div className="flex-grow flex items-center justify-center my-4">
                            <div className="w-40 h-40 relative">
                                <div className="absolute inset-0 bg-orange-200 rounded-full animate-pulse opacity-20"></div>
                                <SafeImage
                                    src="https://cdn-icons-png.flaticon.com/512/3556/3556608.png"
                                    className="w-full h-full object-contain relative z-10 drop-shadow-lg"
                                />
                            </div>
                        </div>

                        <div className="text-center mt-auto">
                            <p className="text-xs text-orange-500 font-semibold flex items-center justify-center gap-1 animate-bounce">
                                {isHindi ? "शुरू करने के लिए स्वाइप करें" : "Swipe to Start"} <FaChevronRight />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Features Grid */}
                <div className="min-w-[85%] snap-center bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative overflow-hidden h-[380px] flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900">
                            {isHindi ? "आपको क्या मिलेगा?" : "What You'll Get"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Premium Features</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-grow content-center">
                        {[
                            { icon: "🌟", title: isHindi ? "जीवन रिपोर्ट" : "Life Report", color: "bg-yellow-50 border-yellow-100" },
                            { icon: "🔮", title: isHindi ? "दोष निवारण" : "Dosha Remedies", color: "bg-purple-50 border-purple-100" },
                            { icon: "💎", title: isHindi ? "रत्न सुझाव" : "Gemstones", color: "bg-blue-50 border-blue-100" },
                            { icon: "💑", title: isHindi ? "गुण मिलान" : "Match Making", color: "bg-pink-50 border-pink-100" }
                        ].map((item, i) => (
                            <div key={i} className={`${item.color} border p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 h-full shadow-sm`}>
                                <span className="text-3xl mb-1">{item.icon}</span>
                                <span className="text-xs font-bold text-gray-700">{item.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                            {isHindi ? "विवरण दर्ज करें" : "Enter Details"} <FaChevronRight />
                        </p>
                    </div>
                </div>

                {/* Card 3: Input Form */}
                <div className="min-w-[90%] snap-center bg-white rounded-2xl p-6 shadow-lg border border-orange-100 relative overflow-hidden h-auto self-start">
                    <div className="mb-5 text-center">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3">
                            {isHindi ? "विवरण दर्ज करें" : "Enter Birth Details"}
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm peer-focus:text-orange-500" />
                            <input
                                type="text"
                                name="name"
                                placeholder={isHindi ? "पूरा नाम" : "Full Name"}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium placeholder-gray-400 text-gray-900"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative group">
                                <FaCalendarAlt className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
                                <input
                                    type="date"
                                    name="dob"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium text-gray-900"
                                    onChange={handleChange}
                                    value={formData.dob}
                                />
                            </div>
                            <div className="relative group">
                                <FaClock className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
                                <input
                                    type="time"
                                    name="time"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium text-gray-900"
                                    onChange={handleChange}
                                    value={formData.time}
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
                            <input
                                type="text"
                                name="place"
                                placeholder={isHindi ? "जन्म स्थान" : "Birth Place"}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium placeholder-gray-400 text-gray-900"
                                onChange={handleChange}
                                value={formData.place}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 mt-2"
                        >
                            {isHindi ? "कुंडली प्राप्त करें" : "Get Free Kundli"} <FaArrowRight />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default MobileKundli;
