import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const ClientReviews = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const reviews = [
        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Business Owner",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "Absolutely amazing service! The quality of products exceeded my expectations. Fast delivery and excellent customer support. Highly recommended!",
            date: "2 days ago"
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Fashion Designer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "The best online shopping experience I've had. Products are genuine and prices are reasonable. The spiritual services are also top-notch.",
            date: "1 week ago"
        },
        {
            id: 3,
            name: "Amit Patel",
            role: "Software Engineer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            rating: 4,
            review: "Great collection of products and services. The cab booking for temple visits was very convenient. Will definitely order again!",
            date: "2 weeks ago"
        },
        {
            id: 4,
            name: "Sneha Gupta",
            role: "Teacher",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "Excellent platform for both shopping and spiritual services. The chadava booking feature is unique and very helpful. Loved it!",
            date: "3 weeks ago"
        },
        {
            id: 5,
            name: "Vikram Singh",
            role: "Entrepreneur",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            review: "Outstanding quality and service. The pandit booking service made organizing my puja so easy. Highly professional team!",
            date: "1 month ago"
        },
        {
            id: 6,
            name: "Anita Desai",
            role: "Homemaker",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
            rating: 4,
            review: "Very satisfied with my purchase. The products are exactly as described. Customer service is responsive and helpful.",
            date: "1 month ago"
        }
    ];

    const itemsPerPage = 2;
    const totalSlides = Math.ceil(reviews.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const visibleReviews = reviews.slice(
        currentSlide * itemsPerPage,
        (currentSlide + 1) * itemsPerPage
    );

    return (
        <section className="py-10 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">

                <div className="mb-8 lg:mb-16 pl-1 text-left">
                    <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Client Reviews <span className="text-2xl md:text-3xl">💬</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-1.5 font-medium">
                        What our devotees <span className="text-[#e14503]">Say</span>
                    </p>
                </div>


                {/* Mobile View - Horizontal Scroll */}
                <div className="flex md:hidden overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x mb-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="min-w-[85%] snap-center bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative bg-gray-50 p-6 border-b border-gray-200">
                                <FaQuoteLeft className="text-[#e14503] text-3xl mb-4" />
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 mb-6 leading-relaxed text-base">"{review.review}"</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <SafeImage
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        fallbackSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 font-bold">{review.name}</h4>
                                        <p className="text-gray-600 text-sm">{review.role}</p>
                                    </div>
                                    <span className="text-gray-500 text-sm">{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View - Grid with Pagination */}
                <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
                    {visibleReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative bg-gray-50 p-6 border-b border-gray-200">
                                <FaQuoteLeft className="text-[#e14503] text-3xl mb-4" />
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 mb-6 leading-relaxed text-base">"{review.review}"</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <SafeImage
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        fallbackSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 font-bold">{review.name}</h4>
                                        <p className="text-gray-600 text-sm">{review.role}</p>
                                    </div>
                                    <span className="text-gray-500 text-sm">{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="hidden md:flex justify-center gap-2">
                    {[...Array(totalSlides)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-[#e14503] w-8' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientReviews;
