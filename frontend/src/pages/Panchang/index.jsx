import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getPanchangam, Observer, tithiNames, nakshatraNames, yogaNames } from '@ishubhamx/panchangam-js';
import { FaSun, FaMoon, FaCalendarAlt, FaOm, FaClock, FaChevronRight, FaChevronLeft, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PanchangPage = () => {
    const { isHindi } = useLanguage();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [panchangData, setPanchangData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const calculatePanchang = async () => {
            try {

                const observer = new Observer(23.1765, 75.7885, 491);
                const p = getPanchangam(selectedDate, observer, { timezoneOffset: 330 });

                const formatTime = (dateObj) => {
                    if (!dateObj) return "--:--";
                    return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                };

                setPanchangData({
                    date: selectedDate.toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                    day: selectedDate.toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', { weekday: 'long' }),
                    tithi: tithiNames[p.tithi] || "Unknown",
                    nakshatra: nakshatraNames[p.nakshatra] || "Unknown",
                    yoga: yogaNames[p.yoga] || "Unknown",
                    karana: p.karana || "Unknown",
                    sunrise: p.sunrise ? formatTime(p.sunrise) : "--:--",
                    sunset: p.sunset ? formatTime(p.sunset) : "--:--",
                    moonrise: p.moonrise ? formatTime(p.moonrise) : "--:--",
                    moonset: p.moonset ? formatTime(p.moonset) : "--:--",
                    rahukaal: p.rahuKalamStart && p.rahuKalamEnd ? `${formatTime(p.rahuKalamStart)} - ${formatTime(p.rahuKalamEnd)}` : "--:--",
                    yamaganda: p.yamagandamStart && p.yamagandamEnd ? `${formatTime(p.yamagandamStart)} - ${formatTime(p.yamagandamEnd)}` : "--:--",
                    gulika: p.gulikaKalamStart && p.gulikaKalamEnd ? `${formatTime(p.gulikaKalamStart)} - ${formatTime(p.gulikaKalamEnd)}` : "--:--",
                    abhijit: p.abhijitMuhurtaStart && p.abhijitMuhurtaEnd ? `${formatTime(p.abhijitMuhurtaStart)} - ${formatTime(p.abhijitMuhurtaEnd)}` : "--:--",
                    festivals: p.festivals || []
                });
            } catch (error) {
                console.error("Error calculating Panchang:", error);
            }
        };

        calculatePanchang();
    }, [selectedDate, isHindi]);

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    if (!panchangData) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-ibm pt-24">

            <div className="container mx-auto px-4">


                <div className="text-center mb-12">
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-3 block">
                        {isHindi ? "दैनिक पंचांग" : "DAILY CALENDAR"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        {isHindi ? "आज का सुविचारित पंचांग" : "Today's Panchang"}
                    </h1>
                    <div className="flex items-center justify-center gap-6 bg-white inline-flex px-6 py-2 rounded-full shadow-sm border border-gray-200">
                        <button onClick={() => changeDate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                            <FaChevronLeft />
                        </button>
                        <div className="text-center">
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{panchangData.day}</span>
                            <span className="text-lg font-bold text-gray-900">{panchangData.date}</span>
                        </div>
                        <button onClick={() => changeDate(1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">


                    <div className="lg:col-span-8 space-y-8">


                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {[
                                    { label: isHindi ? "तिथि" : "Tithi", value: panchangData.tithi, icon: FaOm, color: "text-orange-500" },
                                    { label: isHindi ? "नक्षत्र" : "Nakshatra", value: panchangData.nakshatra, icon: FaCalendarAlt, color: "text-blue-500" },
                                    { label: isHindi ? "योग" : "Yoga", value: panchangData.yoga, icon: FaClock, color: "text-purple-500" },
                                    { label: isHindi ? "करण" : "Karana", value: panchangData.karana, icon: FaSun, color: "text-green-500" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0 md:last:border-0 md:last:pb-0">
                                        <div className={`mt-1 p-3 rounded-xl bg-gray-50 ${item.color}`}>
                                            <item.icon />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.value}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" />
                                    {isHindi ? "शुभ मुहूर्त" : "Auspicious Timings"}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                        <span className="text-gray-600 text-sm font-medium">{isHindi ? "अभिजीत मुहूर्त" : "Abhijit Muhurat"}</span>
                                        <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">{panchangData.abhijit}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                        <span className="text-gray-600 text-sm font-medium">{isHindi ? "गुलिक काल" : "Gulika Kal"}</span>
                                        <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">{panchangData.gulika}</span>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaExclamationTriangle className="text-red-500" />
                                    {isHindi ? "अशुभ मुहूर्त" : "Inauspicious Timings"}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                        <span className="text-gray-600 text-sm font-medium">{isHindi ? "राहु काल" : "Rahu Kal"}</span>
                                        <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg text-sm">{panchangData.rahukaal}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                        <span className="text-gray-600 text-sm font-medium">{isHindi ? "यमगण्ड" : "Yamaganda"}</span>
                                        <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg text-sm">{panchangData.yamaganda}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-4 space-y-8">


                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-6 text-center text-sm uppercase tracking-widest text-gray-500">
                                {isHindi ? "सूर्य और चंद्रमा" : "CELESTIAL BODIES"}
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FaSun className="text-orange-400 text-xl" />
                                        <span className="font-medium text-gray-700">{isHindi ? "सूर्योदय" : "Sunrise"}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{panchangData.sunrise}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-orange-300 text-xl"><FaSun /></div>
                                        <span className="font-medium text-gray-700">{isHindi ? "सूर्यास्त" : "Sunset"}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{panchangData.sunset}</span>
                                </div>
                                <div className="w-full h-px bg-gray-100"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FaMoon className="text-blue-400 text-xl" />
                                        <span className="font-medium text-gray-700">{isHindi ? "चंद्रोदय" : "Moonrise"}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{panchangData.moonrise}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-blue-300 text-xl"><FaMoon /></div>
                                        <span className="font-medium text-gray-700">{isHindi ? "चंद्रास्त" : "Moonset"}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{panchangData.moonset}</span>
                                </div>
                            </div>
                        </div>


                        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                            <h3 className="font-bold mb-4 flex items-center gap-2 relative z-10">
                                <FaCalendarAlt />
                                {isHindi ? "विशेष पर्व" : "Today's Special"}
                            </h3>

                            {panchangData.festivals.length > 0 ? (
                                <div className="space-y-3 relative z-10">
                                    {panchangData.festivals.map((festival, idx) => (
                                        <div key={idx} className="font-bold text-lg border-l-2 border-white/50 pl-3">
                                            {typeof festival === 'string' ? festival : festival.name || ""}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/80 relative z-10">
                                    {isHindi ? "आज कोई विशेष त्योहार नहीं है।" : "No special festivals today."}
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanchangPage;
