import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaTag, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const MobileBlogCard = ({ id, image, title, excerpt, date, readTime, category }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/blog/${id}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6 active:scale-[0.98] transition-transform group"
        >
            <div className="relative h-64 w-full">
                <SafeImage src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Top Category Pill */}
                <div className="absolute top-4 left-4">
                    <span className="bg-[#e14503]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                        <FaTag size={8} /> {category}
                    </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                    {date}
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <h3 className="text-xl font-bold leading-tight mb-2 drop-shadow-md line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-300 text-xs mb-3 line-clamp-2 opacity-90">
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-orange-300">
                            <FaClock /> {readTime}
                        </div>
                        <button className="bg-white text-[#e14503] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 shadow-lg">
                            Read <FaChevronRight size={10} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileBlogCard;
