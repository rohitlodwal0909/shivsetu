import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../../../context/LanguageContext';
import SafeImage from '../../../components/common/SafeImage';

const ShubhMuhurat = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { isHindi } = useLanguage();

    const muhurats = [
        {
            id: 1,
            occasion: isHindi ? "रुद्राक्ष माला" : "Rudraksha Mala",
            occasionHi: "रुद्राक्ष माला",
            date: "15 Jan 2024",
            time: "06:30 AM - 08:00 AM",
            nakshatra: isHindi ? "रोहिणी" : "Rohini",
            nakshatraHi: "रोहिणी",
            ratingScore: 5.0,
            image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
            description: isHindi ? "शुद्ध 5 मुखी रुद्राक्ष माला ध्यान और आध्यात्मिक विकास के लिए। हिमालय के संतों द्वारा आशीर्वाद प्राप्त।" : "Pure 5-faced Rudraksha mala for meditation and spiritual growth. Blessed by Himalayan saints."
        },
        {
            id: 2,
            occasion: isHindi ? "पीतल की मूर्तियाँ" : "Brass Idols",
            occasionHi: "पीतल की मूर्तियाँ",
            date: "18 Jan 2024",
            time: "10:00 AM - 12:00 PM",
            nakshatra: isHindi ? "उत्तरा फाल्गुनी" : "Uttara Phalguni",
            nakshatraHi: "उत्तरा फाल्गुनी",
            ratingScore: 4.8,
            image: "https://images.unsplash.com/photo-1612278674406-1e3a0a0c7d2b?auto=format&fit=crop&w=800&q=80",
            description: isHindi ? "देवताओं की हस्तनिर्मित पीतल की मूर्तियाँ। घरेलू मंदिरों और दैनिक पूजा के लिए उत्तम।" : "Handcrafted brass idols of deities. Perfect for home temples and daily worship."
        },
        {
            id: 3,
            occasion: isHindi ? "पूजा थाली सेट" : "Puja Thali Set",
            occasionHi: "पूजा थाली सेट",
            date: "20 Jan 2024",
            time: "07:15 AM - 09:00 AM",
            nakshatra: isHindi ? "पुष्य" : "Pushya",
            nakshatraHi: "पुष्य",
            ratingScore: 5.0,
            image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
            description: isHindi ? "सभी आवश्यक वस्तुओं के साथ पूर्ण पूजा थाली सेट। शुद्ध पीतल से बना चांदी की परत के साथ।" : "Complete puja thali set with all essential items. Made from pure brass with silver plating."
        },
        {
            id: 4,
            occasion: isHindi ? "आध्यात्मिक पुस्तकें" : "Spiritual Books",
            occasionHi: "आध्यात्मिक पुस्तकें",
            date: "22 Jan 2024",
            time: "11:30 AM - 01:00 PM",
            nakshatra: isHindi ? "अश्विनी" : "Ashwini",
            nakshatraHi: "अश्विनी",
            ratingScore: 4.5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            description: isHindi ? "पवित्र ग्रंथ और आध्यात्मिक पुस्तकें। आधुनिक जीवन मार्गदर्शन के लिए प्राचीन ज्ञान।" : "Sacred texts and spiritual books. Ancient wisdom for modern life guidance."
        }
    ];

    const itemsPerPage = 4;
    const totalSlides = Math.ceil(muhurats.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const visibleMuhurats = muhurats.slice(
        currentSlide * itemsPerPage,
        (currentSlide + 1) * itemsPerPage
    );

    return (
        <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-16 font-ibm">
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 block">
                        {isHindi ? "शुभ समय" : "AUSPICIOUS TIMINGS"}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {isHindi ? "शुभ मुहूर्त" : "Shubh Muhurat"}
                    </h2>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {visibleMuhurats.map((muhurat) => (
                        <div key={muhurat.id} className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full max-w-sm border border-gray-100 flex flex-col">

                            <div className="w-full h-64 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                                <SafeImage
                                    src={muhurat.image}
                                    alt={muhurat.occasion}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-center border-b border-gray-100 pb-4 mb-4">
                                    <h2 className="text-xl font-bold text-[#002147] mb-2">{muhurat.occasion}</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">{muhurat.description}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-y-3 mb-4">
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaCalendarAlt className="text-[#e14503] text-base" />
                                        <span className="font-medium">{isHindi ? "तिथि" : "Date"}: {muhurat.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaClock className="text-[#e14503] text-base" />
                                        <span className="font-medium">{isHindi ? "समय" : "Time"}: {muhurat.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 text-sm">
                                        <FaStar className="text-[#e14503] text-base" />
                                        <span className="font-medium">{isHindi ? "नक्षत्र" : "Nakshatra"}: {muhurat.nakshatra}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-sm" />
                                            ))}
                                        </div>
                                        <span className="text-gray-600 text-sm font-semibold">({muhurat.ratingScore}/5)</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Link
                                        to="/muhurat-details"
                                        className="w-full bg-[#e14503] text-white py-3.5 px-6 rounded-full font-bold text-lg hover:bg-[#c23a02] transition-colors duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        {isHindi ? "विवरण देखें" : "View Details"}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {totalSlides > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
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


                <div className="flex justify-center mt-8">
                    <Link
                        to="/muhurat"
                        className="inline-flex items-center gap-2 bg-[#e14503] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#c23a02] transition-colors duration-300 group"
                    >
                        {isHindi ? "सभी मुहूर्त देखें" : "View All Muhurats"}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ShubhMuhurat;
