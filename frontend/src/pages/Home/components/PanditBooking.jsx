import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaOm, FaStar, FaLanguage, FaBriefcase, FaAward, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import SafeImage from '../../../components/common/SafeImage';

const PanditBooking = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const pandits = [
        {
            id: 1,
            name: "Pandit Rajesh Sharma",
            specialization: "Marriage & Griha Pravesh",
            experience: "15 Years",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            price: "2100",
            languages: ["Hindi", "Sanskrit"],
            description: "Expert in Vedic marriage rituals and Griha Pravesh ceremonies with traditional samagri arrangements.",
            completedPujas: "500+",
            availability: "Available Today"
        },
        {
            id: 2,
            name: "Pandit Arun Mishra",
            specialization: "Puja & Hawan",
            experience: "20 Years",
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
            price: "1500",
            languages: ["Hindi", "English"],
            description: "Specialized in all types of Puja and Hawan ceremonies. Brings complete devotion and authenticity to rituals.",
            completedPujas: "800+",
            availability: "Available This Week"
        },
        {
            id: 3,
            name: "Pandit Suresh Tiwari",
            specialization: "Satyanarayan Katha",
            experience: "12 Years",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
            price: "1800",
            languages: ["Hindi", "Marathi"],
            description: "Experienced in conducting Satyanarayan Katha and related ceremonies with proper Vedic procedures.",
            completedPujas: "350+",
            availability: "Book 2 Days Ahead"
        }
    ];

    const itemsPerPage = 3;
    const totalSlides = Math.ceil(pandits.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleBookNow = (pandit) => {
        navigate(`/booking/pandits/book/${pandit.id}`);
    };

    const visiblePandits = pandits.slice(
        currentSlide * itemsPerPage,
        (currentSlide + 1) * itemsPerPage
    );

    return (
        <section className="py-10 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">

               

                 <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Spiritual Guidance <span className="text-2xl md:text-3xl">🕉️</span>
                        </h2>
                       <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                        Connect with verified <span className="text-[#e14503]">Pandits</span>
                       </p>
                    </div>
                    <Link to="/booking/pandits" className="group flex-shrink-0 inline-flex items-center gap-2 text-[#e14503] text-sm sm:text-base font-semibold"
                                    >
                        <span className="hidden sm:inline">View All</span>
                           <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                                        →</span></Link>
                </div>


                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 justify-items-center sm:justify-items-stretch sm:overflow-visible">
                    {pandits.map((pandit) => (
                        <div key={pandit.id} className="min-w-[85%] snap-center sm:min-w-0 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full max-w-sm border border-gray-100 flex flex-col">

                            <div className="w-full h-64 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                                <SafeImage
                                    src={pandit.image}
                                    alt={pandit.name}
                                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl transform hover:scale-105 transition-transform duration-500"
                                    fallbackSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-center border-b border-gray-100 pb-4 mb-4">
                                    <h2 className="text-xl font-bold text-[#002147] mb-2">{pandit.name}</h2>
                                    <p className="text-[#e14503] font-semibold text-sm mb-3">{pandit.specialization}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{pandit.description}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-y-3 mb-4">
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaBriefcase className="text-[#e14503] text-base" />
                                        <span className="font-medium">{pandit.experience} Experience</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaLanguage className="text-[#e14503] text-base" />
                                        <span className="font-medium">{pandit.languages.join(', ')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaUsers className="text-[#e14503] text-base" />
                                        <span className="font-medium">{pandit.completedPujas} Pujas Completed</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaCalendarAlt className="text-[#e14503] text-base" />
                                        <span className="font-medium">{pandit.availability}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                        </div>
                                        <span className="text-gray-600 text-sm font-semibold">({pandit.rating}/5)</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
                                        <span className="text-3xl font-bold text-[#002147]">₹{pandit.price}</span>
                                    </div>

                                    <button
                                        onClick={() => handleBookNow(pandit)}
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


                
            </div>



        </section>
    );
};

export default PanditBooking;
