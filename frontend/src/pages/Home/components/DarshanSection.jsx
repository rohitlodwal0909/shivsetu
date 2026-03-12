import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarshanCard from '../../Darshan/components/DarshanCard';
import { useLanguage } from '../../../context/LanguageContext';
import { FaArrowRight } from 'react-icons/fa';

const DarshanSection = ({tours}) => {
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    
    const featuredTours = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "उज्जैन आध्यात्मिक यात्रा" : "Ujjain Spiritual Tour",
            description: isHindi
                ? "महाकाल दर्शन और उज्जैन के प्रमुख मंदिरों की पूर्ण यात्रा।"
                : "Complete spiritual tour including Mahakal Darshan and major temples of Ujjain.",
            location: "Ujjain, MP",
            timing: "2 Days / 1 Night",
            tag: "Popular"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1605648916319-5e3dfd9dca10?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "काशी विश्वनाथ टूर" : "Kashi Vishwanath Tour",
            description: isHindi
                ? "गंगा आरती और काशी दर्शन का दिव्य अनुभव।"
                : "Experience divine Ganga Aarti and sacred Kashi temples.",
            location: "Varanasi, UP",
            timing: "3 Days / 2 Nights",
            tag: "Premium"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1622885989050-2b6e0d7e0f16?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "अयोध्या राम मंदिर यात्रा" : "Ayodhya Ram Mandir Tour",
            description: isHindi
                ? "श्री राम जन्मभूमि और अयोध्या के पवित्र स्थलों का दर्शन।"
                : "Visit Shri Ram Janmabhoomi and sacred places of Ayodhya.",
            location: "Ayodhya, UP",
            timing: "2 Days / 1 Night",
            tag: "Trending"
        }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                            {isHindi ? "विशेष टूर पैकेज" : "Featured Tour Packages"} ✈️
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {isHindi
                                ? "आध्यात्मिक यात्राओं का चयन"
                                : "Curated spiritual travel experiences"}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/darshan')}
                        className="group inline-flex items-center gap-2 text-[#e14503] font-semibold"
                    >
                        <span className="hidden sm:inline">
                            {isHindi ? "सभी देखें" : "View All"}
                        </span>

                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                            <FaArrowRight />
                        </span>
                    </button>
                </div>

                {/* Cards */}
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-visible">
                    {tours?.map((tour) => (
                        <div key={tour.id} className="min-w-[85%] snap-center sm:min-w-0">
                            <DarshanCard
                                {...tour}
                                onClick={() => navigate(`/booking/tour/book/${tour.id}`)}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DarshanSection;