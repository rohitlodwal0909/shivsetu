import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { blogs, getCategories } from '../../data/blogs';
import BlogCard from './components/BlogCard';
import MobileBlogCard from './components/MobileBlogCard';
import PageHeader from '../../components/common/PageHeader';
import Pagination from '../../components/common/Pagination';
import { FaTag, FaMapMarkerAlt } from 'react-icons/fa';

const Blogs = () => {
    const { isHindi } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const categories = ['All', ...getCategories()];

    // Filter Logic
    const filteredBlogs = blogs.filter((blog) => {
        if (activeFilter === 'All') return true;
        return blog.category === activeFilter;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const currentBlogs = filteredBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 md:pb-12">
            {/* Page Header */}
            <PageHeader
                title={isHindi ? 'हमारा ब्लॉग' : 'Our Blog'}
                subtitle={isHindi ? 'बेहतर जीवन और खरीदारी के लिए अंतर्दृष्टि, सुझाव और प्रेरणा।' : 'Insights, tips, and inspiration for better living and shopping.'}
                breadcrumb={[{ label: isHindi ? 'ब्लॉग' : 'Blogs', link: '/blogs' }]}
            />

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
                {/* Filter Section */}
                <div className="mb-6">
                    {/* Filter Chips - Horizontal Scroll on Mobile */}
                    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
                                    ${activeFilter === category
                                        ? 'bg-[#e14503] text-white border-[#e14503] shadow-md shadow-orange-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#e14503] hover:text-[#e14503]'
                                    }`}
                            >
                                <span className="text-xs"><FaTag /></span>
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Count Row */}
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-gray-500 text-sm">
                            {isHindi ? 'दिखा रहे हैं' : 'Showing'}{' '}
                            <span className="font-semibold text-gray-900">{filteredBlogs.length}</span>{' '}
                            {isHindi ? 'लेख' : 'articles'}
                        </p>
                    </div>
                </div>

                {/* Mobile: Vertical List of Blog Cards */}
                <div className="md:hidden space-y-4">
                    {currentBlogs.map((blog) => (
                        <MobileBlogCard key={blog.id} {...blog} />
                    ))}
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {currentBlogs.map((blog) => (
                        <BlogCard key={blog.id} {...blog} />
                    ))}
                </div>

                {/* No Results */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                        <FaTag className="text-gray-300 text-5xl mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-2">
                            {isHindi ? 'इस श्रेणी में कोई लेख नहीं मिला' : 'No articles found in this category'}
                        </p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="mt-2 bg-[#e14503] hover:bg-[#c23a02] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            {isHindi ? 'सभी दिखाएं' : 'Show All'}
                        </button>
                    </div>
                )}

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Blogs;
