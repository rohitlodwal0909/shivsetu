import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaCalendarDay, FaChevronRight, FaOm } from 'react-icons/fa';

const MobilePanchang = ({ panchangData }) => {
    return (
        <div className="md:hidden py-4 px-4">
            <div className="flex overflow-x-auto gap-4 snap-x scrollbar-hide pb-4">

                {/* Card 1: Main Details */}
                <div className="min-w-[85%] snap-center bg-gradient-to-br from-[#fff0e6] to-[#fff] rounded-2xl p-5 shadow-sm border border-orange-100 relative overflow-hidden">
                    <FaSun className="absolute -right-4 -top-4 text-orange-100 text-6xl opacity-50" />

                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <span className="text-xs font-bold text-[#e14503] uppercase tracking-wider flex items-center gap-1">
                                <FaCalendarDay /> Today's Panchang
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">
                                {panchangData.date}
                            </h3>
                            <p className="text-sm text-gray-500">{panchangData.day}</p>
                        </div>
                    </div>

                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between items-center p-2.5 bg-white rounded-xl border border-orange-50 shadow-sm">
                            <span className="text-sm text-gray-600 font-medium">Tithi</span>
                            <span className="text-sm font-bold text-[#e14503]">{panchangData.tithi}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-white rounded-xl border border-orange-50 shadow-sm">
                            <span className="text-sm text-gray-600 font-medium">Nakshatra</span>
                            <span className="text-sm font-bold text-[#e14503]">{panchangData.nakshatra}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-white rounded-xl border border-orange-50 shadow-sm">
                            <span className="text-sm text-gray-600 font-medium">Yoga</span>
                            <span className="text-sm font-bold text-[#e14503]">{panchangData.yoga}</span>
                        </div>
                    </div>
                    <div className="mt-3 text-right">
                        <span className="text-[10px] text-gray-400 flex items-center justify-end gap-1">Swipe for more <FaChevronRight className="text-[8px]" /></span>
                    </div>
                </div>

                {/* Card 2: Sun & Moon */}
                <div className="min-w-[85%] snap-center bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-5 shadow-sm border border-yellow-100 relative overflow-hidden">
                    <FaSun className="absolute -right-4 -top-4 text-yellow-100 text-6xl opacity-50" />

                    <div className="mb-4 relative z-10">
                        <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider flex items-center gap-1">
                            <FaSun /> Celestial Timing
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">Sun & Moon</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 relative z-10">
                        <div className="bg-white p-3 rounded-xl border border-yellow-50 shadow-sm text-center">
                            <FaSun className="text-orange-500 mx-auto mb-1 text-lg" />
                            <span className="block text-[10px] text-gray-500 uppercase">Sunrise</span>
                            <span className="block text-sm font-bold text-gray-900">{panchangData.sunrise}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-yellow-50 shadow-sm text-center">
                            <FaSun className="text-orange-400 mx-auto mb-1 text-lg" />
                            <span className="block text-[10px] text-gray-500 uppercase">Sunset</span>
                            <span className="block text-sm font-bold text-gray-900">{panchangData.sunset}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-blue-50 shadow-sm text-center">
                            <FaMoon className="text-blue-400 mx-auto mb-1 text-lg" />
                            <span className="block text-[10px] text-gray-500 uppercase">Moonrise</span>
                            <span className="block text-sm font-bold text-gray-900">{panchangData.moonrise}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-blue-50 shadow-sm text-center">
                            <FaMoon className="text-indigo-400 mx-auto mb-1 text-lg" />
                            <span className="block text-[10px] text-gray-500 uppercase">Moonset</span>
                            <span className="block text-sm font-bold text-gray-900">{panchangData.moonset}</span>
                        </div>
                    </div>
                </div>

                {/* Card 3: Timings & Festival */}
                <div className="min-w-[85%] snap-center bg-gradient-to-br from-red-50 to-white rounded-2xl p-5 shadow-sm border border-red-100 relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                                <FaOm /> Auspicious
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 mt-1">Timings</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-white rounded-xl border-l-4 border-red-500 shadow-sm">
                                <p className="text-xs font-semibold text-gray-500 uppercase">Rahukaal</p>
                                <p className="text-base font-bold text-red-600">{panchangData.rahukaal}</p>
                            </div>
                            {panchangData.festivals.length > 0 ? (
                                <div className="p-3 bg-white rounded-xl border-l-4 border-green-500 shadow-sm">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Festival</p>
                                    {panchangData.festivals.map((festival, idx) => (
                                        <p key={idx} className="text-sm font-bold text-green-600 truncate">
                                            {typeof festival === 'string' ? festival : festival.name || JSON.stringify(festival)}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-3 bg-white rounded-xl border-l-4 border-gray-300 shadow-sm">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Festival</p>
                                    <p className="text-sm font-bold text-gray-400">No major festivals</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Link to="/panchang" className="block text-center bg-[#e14503] text-white py-2.5 rounded-xl font-bold text-sm shadow-md mt-4 relative z-10">
                        View Full Detail
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default MobilePanchang;
