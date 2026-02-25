import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaOm } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { getPanchangam, Observer, tithiNames, nakshatraNames, yogaNames } from '@ishubhamx/panchangam-js';
import MobilePanchang from './mobile/MobilePanchang';

const Panchang = () => {

    const [panchangData, setPanchangData] = useState({
        date: "Loading...",
        day: "",
        tithi: "",
        nakshatra: "",
        yoga: "",
        karana: "",
        sunrise: "",
        sunset: "",
        moonrise: "",
        moonset: "",
        rahukaal: "",
        festivals: []
    });

    useEffect(() => {
        const calculatePanchang = async () => {
            try {
                const now = new Date();
                const date = now;
                const observer = new Observer(28.6139, 77.2090, 216);
                const p = getPanchangam(date, observer, { timezoneOffset: 330 });


                const formatTime = (dateObj) => {
                    if (!dateObj) return "--:--";
                    return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                };


                const tithiName = tithiNames[p.tithi] || "Unknown";


                const nakshatraName = nakshatraNames[p.nakshatra] || "Unknown";


                const yogaName = yogaNames[p.yoga] || "Unknown";

                const karanaName = p.karana || "Unknown";


                const sunrise = p.sunrise ? formatTime(p.sunrise) : "06:00 AM";
                const sunset = p.sunset ? formatTime(p.sunset) : "06:00 PM";
                const moonrise = p.moonrise ? formatTime(p.moonrise) : "08:00 AM";
                const moonset = p.moonset ? formatTime(p.moonset) : "08:00 PM";


                let rahukaalStr = "04:30 PM - 06:00 PM";
                if (p.rahuKalamStart && p.rahuKalamEnd) {
                    rahukaalStr = `${formatTime(p.rahuKalamStart)} - ${formatTime(p.rahuKalamEnd)}`;
                }

                setPanchangData({
                    date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                    day: now.toLocaleDateString('en-IN', { weekday: 'long' }),
                    tithi: tithiName,
                    nakshatra: nakshatraName,
                    yoga: yogaName,
                    karana: karanaName,
                    sunrise: sunrise,
                    sunset: sunset,
                    moonrise: moonrise,
                    moonset: moonset,
                    rahukaal: rahukaalStr,
                    festivals: p.festivals || []
                });

            } catch (error) {
                console.error("Error calculating Panchang:", error);
                setPanchangData({
                    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                    day: new Date().toLocaleDateString('en-IN', { weekday: 'long' }),
                    tithi: "Shukla Paksha",
                    nakshatra: "Ashwini",
                    yoga: "Vishkumbha",
                    karana: "Bava",
                    sunrise: "06:30 AM",
                    sunset: "05:45 PM",
                    moonrise: "09:00 AM",
                    moonset: "04:00 PM",
                    rahukaal: "Check Local Calendar",
                    festivals: []
                });
            }
        };

        calculatePanchang();


    }, []);

    return (
        <section className="bg-gray-50 md:bg-gradient-to-r md:from-yellow-50 md:via-orange-50 md:to-red-50">
            {/* Mobile View: Premium Horizontal Scroll Cards (App-like) */}
            <MobilePanchang panchangData={panchangData} />

            {/* Desktop View: Detailed Grid */}
            <div className="hidden md:block max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16 font-ibm">
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 block">
                        DAILY CALENDAR
                    </span>
                     

                    <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                        Today's Panchang
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-[#e14503] to-[#ff6b35] text-white p-8 text-center">
                        <h3 className="text-3xl font-bold mb-2">{panchangData.date}</h3>
                        <p className="text-xl">{panchangData.day}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaOm className="text-[#e14503]" />
                                Panchang Details
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="font-semibold text-gray-700">Tithi:</span>
                                    <span className="text-[#e14503] font-bold">{panchangData.tithi}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="font-semibold text-gray-700">Nakshatra:</span>
                                    <span className="text-[#e14503] font-bold">{panchangData.nakshatra}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="font-semibold text-gray-700">Yoga:</span>
                                    <span className="text-[#e14503] font-bold">{panchangData.yoga}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="font-semibold text-gray-700">Karana:</span>
                                    <span className="text-[#e14503] font-bold">{panchangData.karana}</span>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaSun className="text-yellow-500" />
                                Sun & Moon
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                                        <FaSun className="text-yellow-500" /> Sunrise:
                                    </span>
                                    <span className="text-gray-900 font-bold">{panchangData.sunrise}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                                        <FaSun className="text-orange-500" /> Sunset:
                                    </span>
                                    <span className="text-gray-900 font-bold">{panchangData.sunset}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                                        <FaMoon className="text-blue-400" /> Moonrise:
                                    </span>
                                    <span className="text-gray-900 font-bold">{panchangData.moonrise}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                                        <FaMoon className="text-indigo-400" /> Moonset:
                                    </span>
                                    <span className="text-gray-900 font-bold">{panchangData.moonset}</span>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Important Timings</h4>
                            <div className="space-y-3">
                                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                                    <p className="font-semibold text-gray-700 mb-1">Rahukaal (Inauspicious)</p>
                                    <p className="text-lg font-bold text-red-600">{panchangData.rahukaal}</p>
                                </div>
                                {panchangData.festivals.length > 0 && (
                                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <p className="font-semibold text-gray-700 mb-2">Today's Festival:</p>
                                        {panchangData.festivals.map((festival, idx) => (
                                            <p key={idx} className="text-lg font-bold text-green-600">
                                                {typeof festival === 'string' ? festival : festival.name || JSON.stringify(festival)}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <Link to="/panchang" className="w-full block text-center bg-[#e14503] text-white py-3 rounded-lg font-semibold hover:bg-[#c23a02] transition-colors mt-4 shadow-lg hover:shadow-xl">
                                    View Full Panchang
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Panchang;
