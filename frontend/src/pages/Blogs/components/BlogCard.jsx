import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const BlogCard = ({ id, image, title, excerpt, author, date, readTime, category }) => {
    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[420px] border border-gray-100">
            {/* Image Background with Parallax Effect */}
            <div className="absolute inset-0 h-full w-full overflow-hidden">
                <SafeImage
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            </div>

            {/* Floating Category Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-lg flex items-center gap-1 group-hover:bg-[#e14503] group-hover:border-[#e14503] transition-colors duration-300">
                    <FaTag className="text-orange-200" />
                    <span>{category}</span>
                </div>
            </div>

            {/* Content - Bottom Align */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {/* Date & Author Tag */}
                <div className="flex items-center gap-3 mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex items-center gap-1 text-orange-200 text-xs font-bold uppercase tracking-wider">
                        <FaUser className="text-[#e14503]" /> {author}
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="text-gray-300 text-xs">{date}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-md group-hover:text-orange-50 transition-colors line-clamp-2">
                    {title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                    <div className="flex flex-col">
                        <span className="text-gray-300 text-xs uppercase tracking-wide">Read Time</span>
                        <div className="flex items-center gap-1.5 text-white font-medium">
                            <FaClock className="text-orange-400" /> {readTime}
                        </div>
                    </div>
                </div>

                {/* Hidden Button - Reveals on Hover */}
                <div className="mt-0 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                    <Link
                        to={`/blog/${id}`}
                        className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2 transition-all"
                    >
                        Read Article <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
