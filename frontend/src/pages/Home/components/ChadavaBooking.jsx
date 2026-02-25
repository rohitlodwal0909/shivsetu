import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPrayingHands, FaStar, FaCheckCircle, FaVideo, FaCamera, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import SafeImage from '../../../components/common/SafeImage';

const ChadavaBooking = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const chadavaServices = [
        {
            id: 1,
            name: "Mahakal Bhasm Aarti",
            temple: "Mahakaleshwar Temple",
            location: "Ujjain",
            price: "3100",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1604608672516-e1b4e1b0b6c8?auto=format&fit=crop&w=800&q=80",
            includes: ["Bhasm Aarti", "Prasad Delivery", "Live Darshan"],
            description: "Experience the divine Bhasm Aarti at Mahakaleshwar Temple, a sacred ritual performed with holy ash.",
            date: "Daily Available",
            devotees: "5000+"
        },
        {
            id: 2,
            name: "Chintamani Vishvaharta Puja",
            temple: "Shri Ganesh Mandir",
            location: "Ujjain",
            price: "2100",
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1583012652990-a6dfb7e31c88?auto=format&fit=crop&w=800&q=80",
            includes: ["Special Puja", "Prasad Delivery", "Video Recording"],
            description: "Chintamani Vishvaharta Puja is a powerful practice in Sanatan Dharma to remove life obstacles and worries.",
            date: "26 Jan, Monday",
            devotees: "10000+"
        },
        {
            id: 3,
            name: "Hanuman Chalisa Path",
            temple: "Hanuman Temple",
            location: "Delhi",
            price: "1100",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1605481673617-ad63d6d88f5f?auto=format&fit=crop&w=800&q=80",
            includes: ["Chalisa Path", "Prasad", "Photo"],
            description: "Sacred recitation of Hanuman Chalisa for strength, courage, and removal of obstacles in life.",
            date: "Every Tuesday",
            devotees: "3000+"
        }
    ];

    const itemsPerPage = 3;
    const totalSlides = Math.ceil(chadavaServices.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleBookNow = (service) => {
        navigate(`/booking/chadava/book/${service.id}`);
    };

    const visibleServices = chadavaServices.slice(
        currentSlide * itemsPerPage,
        (currentSlide + 1) * itemsPerPage
    );

    const getIncludeIcon = (include) => {
        if (include.includes('Video')) return FaVideo;
        if (include.includes('Photo')) return FaCamera;
        return FaCheckCircle;
    };

    return (
        <section className="py-10 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}

                <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">
                   <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Divine Offerings <span className="text-2xl sm:text-2xl md:text-3xl">🌸</span>
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                        Book your sacred <span className="text-[#e14503]">Chadava</span>

                    </p>
                </div>
                <Link
                    to="/booking/chadava"
                    className="group flex-shrink-0 inline-flex items-center gap-2 text-[#e14503] text-sm sm:text-base font-semibold"
                    >
                    <span className="hidden sm:inline">View All</span>

                    <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>
           </div>

                {/* Cards Grid */}
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 justify-items-center sm:justify-items-stretch sm:overflow-visible">
                    {chadavaServices.map((service) => (
                        <div key={service.id} className="min-w-[85%] snap-center sm:min-w-0 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full max-w-sm border border-gray-100 flex flex-col">

                            <div className="w-full h-48 flex items-center justify-center relative overflow-hidden">
                                <SafeImage
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-center border-b border-gray-100 pb-4 mb-4">
                                    <p className="text-[#e14503] font-semibold text-xs uppercase mb-2">{service.temple}, {service.location}</p>
                                    <h2 className="text-xl font-bold text-[#002147] mb-3">{service.name}</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-y-3 mb-4">
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaMapMarkerAlt className="text-[#e14503] text-base" />
                                        <span className="font-medium">{service.temple}, {service.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaCalendarAlt className="text-[#e14503] text-base" />
                                        <span className="font-medium">{service.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaUsers className="text-[#e14503] text-base" />
                                        <span className="font-medium">{service.devotees} Devotees</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                        </div>
                                        <span className="text-gray-600 text-sm font-semibold">({service.rating}/5)</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
                                        <span className="text-3xl font-bold text-[#002147]">₹{service.price}</span>
                                    </div>

                                    <button
                                        onClick={() => handleBookNow(service)}
                                        className="w-full bg-[#e14503] text-white py-3.5 px-6 rounded-full font-bold text-lg hover:bg-[#c23a02] transition-colors duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        {t('booking.pandit.bookNow')}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots Indicator - Hidden on Mobile */}
                {totalSlides > 1 && (
                    <div className="hidden sm:flex justify-center gap-2 mt-8">
                        {[...Array(totalSlides)].map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-[#e14503] w-8' : 'bg-gray-300'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* View All Button */}
               
            </div>


        </section>
    );
};

export default ChadavaBooking;
