import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaGlobe, FaInfoCircle, FaPhone, FaShieldAlt, FaFileContract, FaBoxOpen, FaStar, FaFire, FaClock } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Explore = () => {
    const { isHindi, toggleLanguage } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const quickLinks = [
        { name: isHindi ? 'कार्ट' : 'Cart', path: '/cart', icon: FaBoxOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: isHindi ? 'इच्छा सूची' : 'Wishlist', path: '/wishlist', icon: FaStar, color: 'text-red-500', bg: 'bg-red-50' },
        { name: isHindi ? 'सहायता' : 'Support', path: '/contact', icon: FaPhone, color: 'text-green-500', bg: 'bg-green-50' },
        { name: isHindi ? 'हमारे बारे में' : 'About Us', path: '/about', icon: FaInfoCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy', path: '/privacy', icon: FaShieldAlt, color: 'text-purple-500', bg: 'bg-purple-50' },
        { name: isHindi ? 'नियम और शर्तें' : 'Terms', path: '/terms', icon: FaFileContract, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    const categories = [
        { name: isHindi ? 'सभी उत्पाद' : 'All Products', path: '/shop', icon: FaBoxOpen },
        { name: isHindi ? 'बेस्ट सेलर' : 'Best Sellers', path: '/best-seller', icon: FaStar },
        { name: isHindi ? 'ट्रेंडिंग' : 'Trending Now', path: '/trending', icon: FaFire },
        { name: isHindi ? 'नया आगमन' : 'New Arrivals', path: '/new-arrival', icon: FaClock },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-2xl font-bold gradient-text mb-4">Explore</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder={isHindi ? "उत्पाद खोजें..." : "Search for products/services..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </form>
            </div>

            <div className="p-4 space-y-6">
                {/* Language Toggle */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <FaGlobe className="text-[#e14503]" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Language / भाषा</p>
                            <p className="text-xs text-gray-500">{isHindi ? 'हिंदी' : 'English'}</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="px-4 py-2 bg-[#e14503] text-white text-sm font-bold rounded-lg hover:bg-[#c23a02] transition-colors"
                    >
                        Change
                    </button>
                </div>

                {/* Quick Links Grid */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Links</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-[#e14503]/30 transition-all"
                            >
                                <div className={`w-10 h-10 rounded-full ${link.bg} flex items-center justify-center`}>
                                    <link.icon className={`${link.color} text-lg`} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 text-center">{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Shopping Categories */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <h2 className="text-lg font-bold text-gray-900 p-4 border-b border-gray-100">Shopping</h2>
                    <div className="divide-y divide-gray-100">
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                to={cat.path}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                    <cat.icon />
                                </div>
                                <span className="text-gray-700 font-medium flex-1">{cat.name}</span>
                                <span className="text-gray-400">›</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
