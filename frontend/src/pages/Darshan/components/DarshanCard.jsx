import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const DarshanCard = ({ id, image, title, description, location, timing, tag }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/darshan/${id}`)}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
        >
            {/* Image Section */}
            <div className="relative h-[180px] sm:h-[250px] overflow-hidden">
                <SafeImage
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity"></div>

                {tag && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 uppercase tracking-wide">
                        {tag}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="text-white/90 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-orange-400" /> {location}
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-2 drop-shadow-md">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                    <FaClock className="text-orange-500" />
                    <span className="font-medium">{timing}</span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 flex-grow leading-relaxed text-sm">
                    {description}
                </p>

                <button
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all flex items-center justify-center gap-2"
                >
                    View Details <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default DarshanCard;
