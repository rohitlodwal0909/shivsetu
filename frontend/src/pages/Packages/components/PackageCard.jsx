import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const PackageCard = ({ id, image, title, location, duration, price, rating, reviews }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/packages/${id}`)}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[420px]"
        >
            {/* Image Background with Parallax Effect */}
            <div className="absolute inset-0 h-full w-full overflow-hidden">
                <SafeImage
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-lg flex items-center gap-1 group-hover:bg-[#e14503] group-hover:border-[#e14503] transition-colors duration-300">
                    <FaStar className="text-yellow-400" />
                    <span>{rating} ({reviews})</span>
                </div>
            </div>

            {/* Content Content - Bottom Align */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {/* Location Tag */}
                <div className="flex items-center gap-2 mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex items-center gap-1 text-orange-200 text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg border border-orange-500/30">
                        <FaMapMarkerAlt /> {location}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md group-hover:text-orange-50 transition-colors">
                    {title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                    <div className="flex flex-col">
                        <span className="text-gray-300 text-xs uppercase tracking-wide">Duration</span>
                        <div className="flex items-center gap-1.5 text-white font-medium">
                            <FaClock className="text-orange-400" /> {duration}
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-gray-300 text-xs uppercase tracking-wide">Starting From</span>
                        <span className="text-2xl font-bold text-white">₹{price}</span>
                    </div>
                </div>

                {/* Hidden Button - Reveals on Hover */}
                <div className="mt-0 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                    <button className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2 transition-all">
                        View Details <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
