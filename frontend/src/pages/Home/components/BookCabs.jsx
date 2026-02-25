import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaSnowflake, FaChair, FaRupeeSign } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import SafeImage from '../../../components/common/SafeImage';

const BookCabs = ({cabs}) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const itemsPerPage = 3;
    const totalSlides = Math.ceil(cabs?.length / itemsPerPage);
    
    const handleBookNow = (cab) => {
        navigate(`/booking/cabs/book/${cab.id}`);
    };


    return (
        <section className="py-10 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
              

                 <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Premium Fleet <span className="text-2xl sm:text-2xl md:text-3xl">🚖</span>
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                      Comfortable travel for your <span className="text-[#e14503]">Pilgrimage</span>

                    </p>
                </div>
                <Link
                    to="/booking/cabs"
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
                    {cabs?.map((cab) => (
                        <div key={cab.id} className="min-w-[85%] snap-center sm:min-w-0 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full max-w-sm border border-gray-100 p-6 flex flex-col items-center">

                            <div className="w-full h-48 mb-6 flex items-center justify-center relative">
                                <SafeImage
                                    src={cab.icon}
                                    alt={cab.name}
                                    type="cabs/"
                                    className="w-full h-full object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                                    fallbackSrc="https://images.unsplash.com/photo-1549317661-bd348c5703f2?q=80&w=800&auto=format&fit=crop"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-[#002147] mb-6 text-center">{cab.name}</h2>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 w-full mb-8">
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaChair className="text-lg text-gray-500" />
                                    <span>Seating {cab.seating}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium whitespace-nowrap">
                                    <FaRupeeSign className="text-lg text-gray-500" />
                                    <span>Rs {cab.price_per_km} / KM</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaSnowflake className="text-lg text-gray-500" />
                                    <span>{cab?.ac_type}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaMusic className="text-lg text-gray-500" />
                                    <span>{cab.music_system || 0}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBookNow(cab)}
                                className="w-full bg-[#001f3f] text-white py-3.5 px-6 rounded-full font-bold text-lg hover:bg-[#002b52] transition-colors duration-300 flex items-center justify-center gap-2 group"
                            >
                                {t('booking.cab.bookNow')}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
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
                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-[#002147] w-8' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                )}

                {/* View All Button */}
              
            </div>


        </section>
    );
};

export default BookCabs;
