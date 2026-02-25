import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { chadavaServices } from '../../data/chadava';
import ChadavaCard from './components/ChadavaCard';
import MobileChadavaCard from './components/MobileChadavaCard';
import PageHeader from '../../components/common/PageHeader';
import { FaFilter } from 'react-icons/fa';

const ChadavaBooking = () => {
    const { isHindi } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 md:pb-12">
            {/* Page Header */}
            <PageHeader
                title={isHindi ? 'पवित्र चढ़ावा और भोग' : 'Sacred Offerings & Chadava'}
                subtitle={isHindi ? 'भारत के प्रसिद्ध मंदिरों के लिए चढ़ावा बुक करें' : 'Book sacred offerings for famous temples across India'}
                breadcrumb={[{ label: isHindi ? 'चढ़ावा' : 'Chadava', link: '/booking/chadava' }]}
            />

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
                {/* Filter/Sort Bar (Simplified for now) */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-500 text-sm">
                        {isHindi ? 'दिखा रहे हैं' : 'Showing'}{' '}
                        <span className="font-semibold text-gray-900">{chadavaServices.length}</span>{' '}
                        {isHindi ? 'सेवाएं' : 'services'}
                    </p>

                    <button className="flex items-center gap-2 text-gray-600 font-medium text-sm hover:text-[#e14503] transition-colors">
                        <FaFilter /> {isHindi ? 'फिल्टर' : 'Filter'}
                    </button>
                </div>

                {/* Mobile: Vertical List of Cards */}
                <div className="md:hidden space-y-4">
                    {chadavaServices.map((service) => (
                        <MobileChadavaCard key={service.id} {...service} />
                    ))}
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {chadavaServices.map((service) => (
                        <ChadavaCard key={service.id} {...service} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChadavaBooking;
