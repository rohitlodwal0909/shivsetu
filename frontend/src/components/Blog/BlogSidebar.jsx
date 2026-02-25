import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFolder, FaChevronRight, FaClock, FaTag } from 'react-icons/fa';
import { blogs, getCategories, getTags } from '../../data/blogs';
import SafeImage from '../common/SafeImage';

const BlogSidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const categories = getCategories();
    const tags = getTags();
    const recentPosts = blogs.slice(0, 3); // Get first 3 posts

    // In a real app, you might handle search via a prop or context
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // Implement search navigation or filtering here
    };

    return (
        <aside className="space-y-8">
            {/* Search Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Search</h3>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-[#e14503] focus:ring-1 focus:ring-[#e14503] transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e14503] transition-colors"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link
                                to={`/blogs?category=${category}`}
                                className="flex items-center justify-between group py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                                <div className="flex items-center gap-3 text-gray-600 group-hover:text-[#e14503] transition-colors">
                                    <FaFolder className="text-gray-400 group-hover:text-[#e14503]" />
                                    <span className="font-medium">{category}</span>
                                </div>
                                <div className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full group-hover:bg-orange-100 group-hover:text-[#e14503] transition-colors">
                                    {blogs.filter(b => b.category === category).length}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Posts</h3>
                <div className="space-y-6">
                    {recentPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-4 group">
                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                <SafeImage
                                    src={post.image}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#e14503] transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FaClock className="text-gray-400" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Tags Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg hover:bg-[#e14503] hover:text-white cursor-pointer transition-colors flex items-center gap-1"
                        >
                            <FaTag className="text-xs opacity-50" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Newsletter Widget (Optional) */}
            <div className="bg-gradient-to-br from-[#e14503] to-[#c23a02] rounded-2xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Subscribe</h3>
                <p className="text-sm opacity-90 mb-4">Get the latest updates and offers directly in your inbox.</p>
                <form className="space-y-3">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-4 text-white placeholder-white/70 focus:outline-none focus:bg-white/20 transition-all text-sm"
                    />
                    <button type="button" className="w-full bg-white text-[#e14503] font-bold py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors shadow-lg">
                        Subscribe Now
                    </button>
                </form>
            </div>
        </aside>
    );
};

export default BlogSidebar;
