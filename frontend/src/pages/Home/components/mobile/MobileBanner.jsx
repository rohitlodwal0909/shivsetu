import React from 'react';
import { Link } from 'react-router-dom';
import { FaComment } from 'react-icons/fa';
import SafeImage from '../../../../components/common/SafeImage';

const MobileBanner = ({ slides }) => {
    return (
        <div className="md:hidden w-full px-4 pt-4 pb-2 bg-white">
            {/* Login Banner - Premium Orange Design */}
            <div className="bg-gradient-to-r from-[#e14503] to-[#fbbf24] rounded-2xl p-4 flex items-center justify-between shadow-lg mb-6 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-12 h-12 bg-white opacity-10 rounded-full blur-lg"></div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                        <FaComment className="text-white text-lg drop-shadow-sm" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-[11px] font-medium tracking-wide opacity-95">Login for</span>
                        <span className="text-white text-sm font-bold tracking-wide drop-shadow-sm">Exclusive consultations</span>
                    </div>
                </div>
                <Link
                    to="/login"
                    className="relative z-10 bg-white text-[#e14503] text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-gray-50 active:scale-95 transition-all duration-200"
                >
                    Login
                </Link>
            </div>

            {/* User Greeting - Clean & Modern */}
            <div className="mb-5 pl-1">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                    Namaste Explorer <span className="text-2xl">🙏</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1.5 font-medium">
                    Welcome & explore the <span className="text-[#e14503]">Devine world</span>
                </p>
            </div>

            <div className="flex overflow-x-auto gap-4 snap-x scrollbar-hide pb-2">
                {slides.map((slide) => (
                    <div key={slide.id} className="min-w-[90%] snap-center relative rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
                        {/* Make the entire card clickable */}
                        <Link to={slide.ctaLink} className="block w-full h-full">
                            <SafeImage
                                src={slide.image}
                                type="sliders/"
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                fallbackSrc="https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2070&auto=format&fit=crop"
                            />
                            {/* No Text Overlay as per request */}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileBanner;
