import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarshanCard from '../../Darshan/components/DarshanCard';
import { useLanguage } from '../../../context/LanguageContext';
import { FaArrowRight } from 'react-icons/fa';

const DarshanSection = () => {
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    const topPlaces = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1605649487216-90a3f9100eb0?q=80&w=800&auto=format&fit=crop", // Placeholder for Mahakal
            title: isHindi ? "श्री महाकालेश्वर ज्योतिर्लिंग" : "Shri Mahakaleshwar Jyotirlinga",
            description: isHindi ? "बारह ज्योतिर्लिंगों में से एक, दक्षिणमुखी ज्योतिर्लिंग। भस्म आरती के लिए प्रसिद्ध।" : "One of the twelve Jyotirlingas, the only Dakshinamukhi Jyotirlinga. Famous for Bhasma Aiwarti.",
            location: "Ujjain",
            timing: "4:00 AM - 11:00 PM",
            tag: "Must Visit"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1621847324329-37398e0a473a?q=80&w=800&auto=format&fit=crop", // Placeholder for Kal Bhairav
            title: isHindi ? "श्री काल भैरव मंदिर" : "Shri Kaal Bhairav Mandir",
            description: isHindi ? "उज्जैन के संरक्षक देवता। यहाँ भगवान को मदिरा का भोग लगाया जाता है।" : "The guardian deity of Ujjain. Liquor is offered to the deity here as a sacred ritual.",
            location: "Ujjain",
            timing: "6:00 AM - 10:00 PM",
            tag: "Divine"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1596765793467-5f7502758175?q=80&w=800&auto=format&fit=crop", // Placeholder for Harsiddhi
            title: isHindi ? "शक्तिपीठ हरसिद्धि माता" : "Shaktipeeth Harsiddhi Mata",
            description: isHindi ? "51 शक्तिपीठों में से एक। राजा विक्रमादित्य की आराध्य देवी।" : "One of the 51 Shaktipeeths. The worshipping deity of King Vikramaditya.",
            location: "Ujjain",
            timing: "5:00 AM - 10:00 PM",
            tag: "Shaktipeeth"
        }
    ];

    return (
        <section className="py-10 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-1">

                  <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">

                <div>
                   <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        {isHindi ? "उज्जैन दर्शन" : "Ujjain Darshan"} <span className="text-2xl md:text-3xl">🛕</span>
                    </h2>

                    <p className="text-sm md:text-base text-gray-500 mt-1.5 font-medium">
                        {isHindi ? "दिव्य यात्रा का अनुभव करें " : "Experience the divine "}
                        <span className="text-[#e14503]">{isHindi ? "यात्रा" : "Journey"}</span>
                    </p>
                </div>

               

                    <button
                        onClick={() => navigate('/darshan')}
                    className="group flex-shrink-0 inline-flex items-center gap-2 text-[#e14503] text-sm sm:text-base font-semibold"
                    >
                                            <span className="hidden sm:inline">View All</span>

 <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                        →
                    </span>                    </button>

           </div>

              

                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0">
                    {topPlaces.map((place) => (
                        <div key={place.id} className="min-w-[85%] snap-center sm:min-w-0">
                            <DarshanCard {...place} />
                        </div>
                    ))}
                </div>

              
            </div>
        </section>
    );
};

export default DarshanSection;
