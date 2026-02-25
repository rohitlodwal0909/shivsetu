import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import BookingModal from '../../components/BookingModal';

const TourBooking = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const features = t('booking.tour.features');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
                <div className="container max-w-6xl text-center">
                    <FaMapMarkerAlt className="text-7xl mx-auto mb-6 animate-bounce" />
                    <h1 className="text-6xl font-bold mb-6">{t('booking.tour.title')}</h1>
                    <p className="text-2xl mb-10">{t('booking.tour.subtitle')}</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-green-600 px-12 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl"
                    >
                        {t('booking.tour.bookNow')}
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="container max-w-6xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2"
                        >
                            <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-lg">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceType="tour"
            />
        </div>
    );
};

export default TourBooking;
