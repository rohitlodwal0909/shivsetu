import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaStar, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const MobileTourCard = ({ id, image, title, location, duration, price, rating }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/packages/${id}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6 active:scale-[0.98] transition-transform group"
        >
            <div className="relative h-64 w-full">
                <SafeImage src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Top Duration Pills */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#e14503]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {duration}
                    </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <FaStar className="text-yellow-400" /> {rating}
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-300 mb-2">
                        <FaMapMarkerAlt /> {location}
                    </div>
                    <h3 className="text-xl font-bold leading-tight mb-3 drop-shadow-md">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                        <div>
                            <p className="text-xs text-gray-300">Starting from</p>
                            <p className="text-lg font-bold">₹{price}<span className="text-xs font-normal text-gray-300">/person</span></p>
                        </div>
                        <button className="bg-white text-[#e14503] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 shadow-lg">
                            View Details <FaChevronRight size={10} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileTourCard;
