import React, { useState } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';
import { GiTempleGate, GiPrayerBeads, GiMeditation, GiLotus } from 'react-icons/gi';
import { FaCar } from 'react-icons/fa';

const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'shop':
      return <GiTempleGate className="text-orange-500 text-xl" />; 
    case 'puja':
      return <GiPrayerBeads className="text-yellow-500 text-xl" />; 
    case 'tour':
      return <GiMeditation className="text-purple-500 text-xl" />; 
    case 'cab':
      return <FaCar className="text-green-500 text-xl" />; 
    default:
      return <GiLotus className="text-pink-500 text-xl" />; // 🌸 fallback lotus
  }
};

const ClientReviews = ({reviews = []}) => {
    const [currentSlide, setCurrentSlide] = useState(0);


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
                    {reviews?.map((review) => (
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
                                            className={`text-lg ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 mb-6 leading-relaxed text-base">"{review.description}"</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <SafeImage
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        fallbackSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 font-bold">{review.title}</h4>
                                        {/* <p className="text-gray-600 text-sm">{review.role}</p> */}
                                    </div>
<span className="text-gray-500 text-sm">
  {timeAgo(review.created_at)}
</span>                                </div>
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
                                            className={`text-lg ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 mb-6 leading-relaxed text-base">"{review.description}"</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
  {getTypeIcon(review.type)}
</div>
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 font-bold">{review.title}</h4>
                                        {/* <p className="text-gray-600 text-sm">{review.type}</p> */}
                                    </div>
                                        <span className="text-gray-500 text-sm">
                                        {timeAgo(review.created_at)}
                                        </span>
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
