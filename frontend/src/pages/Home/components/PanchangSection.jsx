import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getPanchangam, Observer, tithiNames, nakshatraNames } from '@ishubhamx/panchangam-js';

const PanchangSection = () => {
    const [panchangData, setPanchangData] = useState({
        date: "Loading...",
        tithi: "Loading...",
        nakshatra: "Loading...",
        sunrise: "--:--",
        sunset: "--:--"
    });

    useEffect(() => {
        const calculatePanchang = async () => {
            try {
                const now = new Date();
                const observer = new Observer(28.6139, 77.2090, 216); // Delhi coordinates
                const p = getPanchangam(now, observer, { timezoneOffset: 330 });

                const formatTime = (dateObj) => {
                    if (!dateObj) return "--:--";
                    return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                };

                const tithiName = tithiNames[p.tithi] || "Unknown";
                const nakshatraName = nakshatraNames[p.nakshatra] || "Unknown";
                const sunrise = p.sunrise ? formatTime(p.sunrise) : "06:00 AM";
                const sunset = p.sunset ? formatTime(p.sunset) : "06:00 PM";

                setPanchangData({
                    date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                    day: now.toLocaleDateString('en-IN', { weekday: 'long' }),
                    tithi: tithiName,
                    nakshatra: nakshatraName,
                    sunrise: sunrise,
                    sunset: sunset
                });

            } catch (error) {
                console.error("Error calculating Panchang:", error);
                // Fallback data
                setPanchangData({
                    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                    day: new Date().toLocaleDateString('en-IN', { weekday: 'long' }),
                    tithi: "Shukla Paksha",
                    nakshatra: "Ashwini",
                    sunrise: "06:30 AM",
                    sunset: "05:45 PM"
                });
            }
        };

        calculatePanchang();
    }, []);

    return (
        <section className="py-4 px-4 bg-gray-50 md:py-8">
            <Link to="/panchang" className="block transform transition-transform active:scale-98 md:max-w-4xl md:mx-auto hover:md:scale-[1.02] duration-300">
                <div className="bg-gradient-to-br from-[#fff0e6] to-[#fff] rounded-2xl p-4 md:p-6 shadow-sm border border-orange-100 relative overflow-hidden">
                    {/* Decorative Background Icon */}
                    <FaSun className="absolute -right-4 -top-4 text-orange-100 text-6xl opacity-50" />

                    <div className="flex justify-between items-start mb-3 relative z-10">
                        <div>
                            <span className="text-xs font-bold text-[#e14503] uppercase tracking-wider flex items-center gap-1">
                                <FaCalendarAlt /> Today's Panchang
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">
                                {panchangData.date}, {panchangData.day}
                            </h3>
                        </div>
                        <div className="bg-white/80 p-1.5 rounded-full shadow-sm text-gray-400">
                            <FaChevronRight className="text-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 relative z-10">
                        <div className="bg-white p-2.5 rounded-xl border border-orange-50 shadow-sm flex flex-col justify-center">
                            <span className="text-[10px] text-gray-500 font-medium uppercase">Tithi</span>
                            <span className="text-sm font-bold text-[#e14503] truncate">{panchangData.tithi}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-orange-50 shadow-sm flex flex-col justify-center">
                            <span className="text-[10px] text-gray-500 font-medium uppercase">Nakshatra</span>
                            <span className="text-sm font-bold text-[#e14503] truncate">{panchangData.nakshatra}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 px-1 relative z-10">
                        <div className="flex items-center gap-1.5">
                            <FaSun className="text-yellow-500 text-sm" />
                            <span className="text-xs font-semibold text-gray-600">{panchangData.sunrise}</span>
                        </div>
                        <div className="h-3 w-[1px] bg-gray-300"></div>
                        <div className="flex items-center gap-1.5">
                            <FaMoon className="text-indigo-400 text-sm" />
                            <span className="text-xs font-semibold text-gray-600">{panchangData.sunset}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    );
};

export default PanchangSection;
