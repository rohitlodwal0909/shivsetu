import React, { useEffect, useState } from 'react';
import PackageCard from './components/PackageCard';
import MobileTourCard from './components/MobileTourCard';
import { FaMapMarkerAlt, FaClock, FaStar, FaRupeeSign } from 'react-icons/fa';
import packages from '../../data/packages';
import PageHeader from '../../components/common/PageHeader';
import Pagination from '../../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getTours } from '../../features/home/HomeSlice';

const Packages = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [priceSort, setPriceSort] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const tours = useSelector((state) => state.home.tours);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTours()).unwrap();
    }, [dispatch]);

    // const filters = [
    //     { id: 'All', label: 'All', icon: <FaMapMarkerAlt /> },
    //     { id: 'short', label: '1-3 Days', icon: <FaClock /> },
    //     { id: 'medium', label: '4-7 Days', icon: <FaClock /> },
    //     { id: 'long', label: '7+ Days', icon: <FaClock /> },
    //     { id: 'top-rated', label: 'Top Rated', icon: <FaStar /> },
    //     { id: 'budget', label: 'Budget', icon: <FaRupeeSign /> },
    // ];

    const filters = [
    'All',
    ...new Set(
        tours
            ?.map((pkg) => pkg.states?.name)
            .filter(Boolean)
    )
];

   const filteredPackages = tours?.filter((pkg) => {
    if (activeFilter === 'All') return true;

    const days = pkg.duration_days || 0;
    const price = parseFloat(pkg.price) || 0;

    if (activeFilter === 'short') return days >= 1 && days <= 3;
    if (activeFilter === 'medium') return days >= 4 && days <= 7;
    if (activeFilter === 'long') return days > 7;
    if (activeFilter === 'top-rated') return pkg.rating >= 4.8; // agar rating ho tab
    if (activeFilter === 'budget') return price <= 7000;

    return true;
});

   const sortedPackages = [...(filteredPackages || [])].sort((a, b) => {
    const priceA = parseFloat(a.price) || 0;
    const priceB = parseFloat(b.price) || 0;

    if (priceSort === 'low') return priceA - priceB;
    if (priceSort === 'high') return priceB - priceA;
    return 0;
});

    const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);
    const currentPackages = sortedPackages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, priceSort]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 md:pb-12">
            <PageHeader
                title="Darshan Tour Packages"
                subtitle="Explore sacred temples and pilgrimage destinations across India"
                breadcrumb={[{ label: 'Packages', link: '/packages' }]}
            />

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
                <div className="mb-6">
                    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
                                    ${activeFilter === filter
                                        ? 'bg-[#e14503] text-white border-[#e14503] shadow-md shadow-orange-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#e14503] hover:text-[#e14503]'
                                    }`}
                            >
                                <span className="text-xs">{filter.icon}</span>
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-gray-500 text-sm">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">{sortedPackages.length}</span>{' '}
                            packages
                        </p>
                        <select
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#e14503]"
                        >
                            <option value="default">Default</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {currentPackages.map((pkg) => (
                        <MobileTourCard key={pkg.id} {...pkg} />
                    ))}
                </div>

                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {currentPackages.map((pkg) => (
                        <PackageCard key={pkg.id} {...pkg} />
                    ))}
                </div>

                {sortedPackages.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                        <FaMapMarkerAlt className="text-gray-300 text-5xl mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-2">
                            No packages found for this filter
                        </p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="mt-2 bg-[#e14503] hover:bg-[#c23a02] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                            Show All
                        </button>
                    </div>
                )}

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