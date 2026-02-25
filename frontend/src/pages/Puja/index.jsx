import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import PujaCard from './components/PujaCard';
import MobilePujaCard from './components/MobilePujaCard';
import { FaFilter, FaOm, FaPray, FaStar, FaCalendarAlt, FaFire } from 'react-icons/fa';
import pujas from '../../data/pujas';
import PageHeader from '../../components/common/PageHeader';
import Pagination from '../../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPuja } from '../../features/puja/PujaSlice';

const Puja = () => {
    const { isHindi } = useLanguage();

    const dispatch = useDispatch();

    const  {pujas}  = useSelector((state) => state.puja);

    const allpuja = pujas?.pujas || [];
    const category = pujas?.category || [];


    useEffect(() => {
        dispatch(getPuja());
    }, [dispatch]);

    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [priceSort, setPriceSort] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

const filters = [
  { id: 'All', label: 'All' },
  ...category.map((cat) => ({
      id: cat.id,
      label: cat.name
  }))
];

    // Filter logic
        const filteredPujas = allpuja.filter((puja) => {
            if (activeFilter === 'All') return true;
            return puja.category_id === Number(activeFilter);
        });


    // Sort logic
    const sortedPujas = [...filteredPujas].sort((a, b) => {
        if (priceSort === 'low') return a.price - b.price;
        if (priceSort === 'high') return b.price - a.price;
        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedPujas.length / itemsPerPage);

    const currentPujas = sortedPujas.slice(
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
        <div className="min-h-screen bg-gray-50  md:pb-12">
            {/* Page Header */}
            <PageHeader
                title={isHindi ? 'ऑनलाइन पूजा बुक करें' : 'Book Puja Online'}
                subtitle={isHindi ? 'घर बैठे प्रामाणिक पंडित जी से पूजा करवाएं' : 'Get authentic pujas performed by experienced pandits from home'}
                breadcrumb={[{ label: isHindi ? 'पूजा' : 'Puja', link: '/puja' }]}
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
                            <span className="font-semibold text-gray-900">{sortedPujas.length}</span>{' '}
                            {isHindi ? 'पूजाएं' : 'pujas'}
                        </p>
                        <select
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#e14503]"
                        >
                            <option value="default">{isHindi ? 'डिफ़ॉल्ट' : 'Default'}</option>
                            <option value="low">{isHindi ? 'कम कीमत' : 'Price: Low to High'}</option>
                            <option value="high">{isHindi ? 'अधिक कीमत' : 'Price: High to Low'}</option>
                        </select>
                    </div>
                </div>

                {/* Mobile: Vertical List */}
                <div className="md:hidden space-y-4">
                    {currentPujas.map((puja) => (
                        <MobilePujaCard key={puja.id} {...puja} />
                    ))}
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPujas.map((puja) => (
                        <PujaCard key={puja.id} {...puja} />
                    ))}
                </div>

                {/* No Results */}
                {sortedPujas.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                        <FaOm className="text-gray-300 text-5xl mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-2">
                            {isHindi ? 'इस फ़िल्टर में कोई पूजा नहीं मिली' : 'No pujas found for this filter'}
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

export default Puja;
