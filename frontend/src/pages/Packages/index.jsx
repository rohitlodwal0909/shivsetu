import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import PackageCard from './components/PackageCard';
import MobileTourCard from './components/MobileTourCard';
import { FaMapMarkerAlt, FaClock, FaUsers, FaHeart, FaStar, FaRupeeSign } from 'react-icons/fa';
import packages from '../../data/packages';
import PageHeader from '../../components/common/PageHeader';
import Pagination from '../../components/common/Pagination';

const Packages = () => {
    const { isHindi } = useLanguage();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [priceSort, setPriceSort] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filters = [
        { id: 'All', label: isHindi ? 'सभी' : 'All', icon: <FaMapMarkerAlt /> },
        { id: 'short', label: isHindi ? '1-3 दिन' : '1-3 Days', icon: <FaClock /> },
        { id: 'medium', label: isHindi ? '4-7 दिन' : '4-7 Days', icon: <FaClock /> },
        { id: 'long', label: isHindi ? '7+ दिन' : '7+ Days', icon: <FaClock /> },
        { id: 'top-rated', label: isHindi ? 'टॉप रेटेड' : 'Top Rated', icon: <FaStar /> },
        { id: 'budget', label: isHindi ? 'बजट' : 'Budget', icon: <FaRupeeSign /> },
    ];

    // Filter logic
    const filteredPackages = packages.filter((pkg) => {
        if (activeFilter === 'All') return true;

        // Parse duration to get days
        const daysMatch = pkg.duration.match(/(\d+)\s*Days?/i);
        const days = daysMatch ? parseInt(daysMatch[1]) : 0;

        if (activeFilter === 'short') return days >= 1 && days <= 3;
        if (activeFilter === 'medium') return days >= 4 && days <= 7;
        if (activeFilter === 'long') return days > 7;
        if (activeFilter === 'top-rated') return pkg.rating >= 4.8;
        if (activeFilter === 'budget') return pkg.price <= 7000;

        return true;
    });

    // Sort logic
    const sortedPackages = [...filteredPackages].sort((a, b) => {
        if (priceSort === 'low') return a.price - b.price;
        if (priceSort === 'high') return b.price - a.price;
        if (priceSort === 'rating') return b.rating - a.rating;
        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);
    const currentPackages = sortedPackages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, priceSort]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 md:pb-12">
            {/* Page Header */}
            <PageHeader
                title={isHindi ? 'तीर्थ यात्रा पैकेज' : 'Darshan Tour Packages'}
                subtitle={isHindi ? 'भारत के प्रसिद्ध मंदिरों और तीर्थ स्थलों की यात्रा करें' : 'Explore sacred temples and pilgrimage destinations across India'}
                breadcrumb={[{ label: isHindi ? 'पैकेज' : 'Packages', link: '/packages' }]}
            />

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
                {/* Filter Section */}
                <div className="mb-6">
                    {/* Filter Chips - Horizontal Scroll on Mobile */}
                    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
                                    ${activeFilter === filter.id
                                        ? 'bg-[#e14503] text-white border-[#e14503] shadow-md shadow-orange-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#e14503] hover:text-[#e14503]'
                                    }`}
                            >
                                <span className="text-xs">{filter.icon}</span>
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort + Count Row */}
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-gray-500 text-sm">
                            {isHindi ? 'दिखा रहे हैं' : 'Showing'}{' '}
                            <span className="font-semibold text-gray-900">{sortedPackages.length}</span>{' '}
                            {isHindi ? 'पैकेज' : 'packages'}
                        </p>
                        <select
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#e14503]"
                        >
                            <option value="default">{isHindi ? 'डिफ़ॉल्ट' : 'Default'}</option>
                            <option value="low">{isHindi ? 'कम कीमत' : 'Price: Low to High'}</option>
                            <option value="high">{isHindi ? 'अधिक कीमत' : 'Price: High to Low'}</option>
                            <option value="rating">{isHindi ? 'रेटिंग' : 'Top Rated'}</option>
                        </select>
                    </div>
                </div>

                {/* Mobile: Vertical List of Tour Cards */}
                <div className="md:hidden space-y-4">
                    {currentPackages.map((pkg) => (
                        <MobileTourCard key={pkg.id} {...pkg} />
                    ))}
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {currentPackages.map((pkg) => (
                        <PackageCard key={pkg.id} {...pkg} />
                    ))}
                </div>

                {/* No Results */}
                {sortedPackages.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                        <FaMapMarkerAlt className="text-gray-300 text-5xl mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-2">
                            {isHindi ? 'इस फ़िल्टर में कोई पैकेज नहीं मिला' : 'No packages found for this filter'}
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

export default Packages;
