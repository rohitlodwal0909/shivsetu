import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMusic, FaSnowflake, FaChair } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const CabBooking = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const cabs = [
        {
            id: 1,
            name: 'Swift Dzire / Etios',
            image: '/Images/Cabs/Dzire.webp',
            seating: '4+1',
            rate: 'Rs 12/KM',
            features: ['AC Sedan', 'Clean Interiors', 'Professional Driver', 'City & Outstation'],
        },
        {
            id: 2,
            name: 'Toyota Innova Crysta',
            image: '/Images/Cabs/Innova.webp',
            seating: '6+1',
            rate: 'Rs 18/KM',
            features: ['AC SUV', 'Premium Comfort', 'Ample Legroom', 'Family Trips'],
        },
        {
            id: 3,
            name: 'Maruti Suzuki Ertiga',
            image: '/Images/Cabs/Ertiga.webp',
            seating: '6+1',
            rate: 'Rs 15/KM',
            features: ['AC SUV', 'Music System', 'Economical Group Travel', 'Verified Drivers'],
        },
        {
            id: 4,
            name: 'Tempo Traveller',
            image: '/Images/Cabs/Tempo.webp',
            seating: '12-17',
            rate: 'Rs 25/KM',
            features: ['Luxury Seating', 'Group Tours', 'Ideal for Pilgrimage', 'Pushback Seats'],
        },
    ];

    const handleBookNow = (cab) => {
        navigate(`/booking/cabs/book/${cab.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        {t('booking.cab.title')}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {t('booking.cab.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
                    {cabs.map((cab) => (
                        <div key={cab.id} className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full max-w-sm border border-gray-100 p-6 flex flex-col items-center">

                            <div className="w-full h-48 mb-6 flex items-center justify-center relative">
                                {/* Image Container with glow effect if needed */}
                                <img
                                    src={cab.image}
                                    alt={cab.name}
                                    className="w-full h-full object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-[#002147] mb-6 text-center">{cab.name}</h2>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 w-full mb-8">
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaChair className="text-xl" />
                                    <span>Seating {cab.seating}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium whitespace-nowrap">
                                    <FaCar className="text-xl" />
                                    <span>{cab.rate}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaSnowflake className="text-xl" />
                                    <span>AC Car</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaMusic className="text-xl" />
                                    <span>Music Car</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBookNow(cab)}
                                className="w-full bg-[#001f3f] text-white py-3.5 px-6 rounded-full font-bold text-lg hover:bg-[#002b52] transition-colors duration-300 flex items-center justify-center gap-2 group"
                            >
                                Book Now
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default CabBooking;
