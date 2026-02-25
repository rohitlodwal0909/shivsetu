import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaStar, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const MobilePujaCard = ({ id, image, title, location, date, price, tag, rating, slots }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/puja/${id}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6 active:scale-[0.98] transition-transform"
        >
            <div className="relative h-56 w-full">
                <SafeImage src={image} alt={title} className="w-full h-full object-cover" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Top Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {tag && (
                        <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm backdrop-blur-md bg-opacity-90">
                            {tag}
                        </span>
                    )}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <FaStar className="text-yellow-400" /> {rating}
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">
                        <FaMapMarkerAlt className="text-orange-400" /> {location}
                    </div>
                    <h3 className="text-lg font-bold leading-tight line-clamp-2 drop-shadow-md">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="p-4 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <FaCalendarAlt className="text-orange-500" /> {date}
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs text-gray-400">From</span>
                        <span className="text-xl font-bold text-gray-900">₹{price}</span>
                    </div>
                </div>
                <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1">
                    Book <FaChevronRight size={10} />
                </button>
            </div>
        </div>
    );
};

export default MobilePujaCard;
