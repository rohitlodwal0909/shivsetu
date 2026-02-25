import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaArrowRight, FaClock } from 'react-icons/fa';
import { blogs } from '../../../data/blogs';
import SafeImage from '../../../components/common/SafeImage';

const BlogSection = ({blogs}) => {
    // Get latest 3 blogs
    // const latestBlogs = blogs.slice(0, 3);

    return (
        <section className="py-10 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                  <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Latest Blogs <span className="text-2xl md:text-3xl">📰</span>
                        </h2>
                       <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                        Insights & Wisdom for <span className="text-[#e14503]">You</span>
                       </p>
                    </div>
                    <Link  to="/blogs" className="group flex-shrink-0 inline-flex items-center gap-2 text-[#e14503] text-sm sm:text-base font-semibold"
                                    >
                        <span className="hidden sm:inline">View All</span>
                           <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                                        →</span></Link>
                </div>


                {/* Blog Cards - Matching Card Style */}
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x md:grid md:grid-cols-3 md:gap-6">
                    {blogs?.map((blog) => (
                        <div
                            key={blog.id}
                            className="min-w-[85%] md:min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300 snap-center"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                <SafeImage
                                    src={blog.image}
                                    type="blogs/"
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 bg-[#e14503] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {blog.category || "Fashion"}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                    {blog.description}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <FaCalendar className="text-[#e14503] text-xs" />
                                            <span>{blog.created_at}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <FaClock className="text-[#e14503] text-xs" />
                                        <span>{blog.readTime || "7 min read"}</span>
                                    </div>
                                </div>

                                {/* Read More Button */}
                                <Link
                                    to={`/blog/${blog.id}`}
                                    className="mt-4 block w-full text-center bg-[#e14503] hover:bg-[#c23a02] text-white py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Read Article
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button at Bottom */}
                
            </div>
        </section>
    );
};

export default BlogSection;
