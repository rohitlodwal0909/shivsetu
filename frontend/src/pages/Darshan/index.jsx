import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DarshanCard from './components/DarshanCard';
import { FaFilter, FaSearch, FaHistory } from 'react-icons/fa';

const Darshan = () => {
    const { isHindi } = useLanguage();
    const [filter, setFilter] = useState('All');

    // Dummy Data
    const places = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1605649487216-90a3f9100eb0?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "श्री महाकालेश्वर ज्योतिर्लिंग" : "Shri Mahakaleshwar Jyotirlinga",
            description: isHindi ? "बारह ज्योतिर्लिंगों में से एक, दक्षिणमुखी ज्योतिर्लिंग। भस्म आरती के लिए प्रसिद्ध।" : "One of the twelve Jyotirlingas, the only Dakshinamukhi Jyotirlinga. Famous for Bhasma Aiwarti.",
            location: "Ujjain",
            timing: "4:00 AM - 11:00 PM",
            tag: "Must Visit",
            category: "Jyotirlinga"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1621847324329-37398e0a473a?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "श्री काल भैरव मंदिर" : "Shri Kaal Bhairav Mandir",
            description: isHindi ? "उज्जैन के संरक्षक देवता। यहाँ भगवान को मदिरा का भोग लगाया जाता है।" : "The guardian deity of Ujjain. Liquor is offered to the deity here as a sacred ritual.",
            location: "Ujjain",
            timing: "6:00 AM - 10:00 PM",
            tag: "Divine",
            category: "Temple"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1596765793467-5f7502758175?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "शक्तिपीठ हरसिद्धि माता" : "Shaktipeeth Harsiddhi Mata",
            description: isHindi ? "51 शक्तिपीठों में से एक। राजा विक्रमादित्य की आराध्य देवी।" : "One of the 51 Shaktipeeths. The worshipping deity of King Vikramaditya.",
            location: "Ujjain",
            timing: "5:00 AM - 10:00 PM",
            tag: "Shaktipeeth",
            category: "Shaktipeeth"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1561577903-8250269f8c6d?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "मंगलनाथ मंदिर" : "Mangalnath Mandir",
            description: isHindi ? "मंगल ग्रह की जन्मस्थली। मंगल दोष निवारण के लिए प्रसिद्ध।" : "Birthplace of Mars (Mangal Graha). Famous for Mangal Dosh Nivaran.",
            location: "Ujjain",
            timing: "6:00 AM - 8:00 PM",
            tag: "Planetary",
            category: "Temple"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "राम घाट" : "Ram Ghat",
            description: isHindi ? "शिप्रा नदी के तट पर स्थित सबसे प्राचीन और पवित्र घाट। कुंभ मेले का मुख्य स्थान।" : "The most ancient and holy ghat on the banks of Shipra river. Main venue for Kumbh Mela.",
            location: "Ujjain",
            timing: "Open 24 Hours",
            tag: "Ghat",
            category: "Ghat"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1624542315758-ad87979116e0?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "सांदीपनि आश्रम" : "Sandipani Ashram",
            description: isHindi ? "गुरुकुल जहाँ भगवान कृष्ण, बलराम और सुदामा ने शिक्षा प्राप्त की थी।" : "The Gurukul where Lord Krishna, Balarama and Sudama received their education.",
            location: "Ujjain",
            timing: "7:00 AM - 6:00 PM",
            tag: "Historical",
            category: "Historical"
        }
    ];

    const filteredPlaces = filter === 'All' ? places : places.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-ibm">
            {/* Header */}
            <div className="bg-orange-500 text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        {isHindi ? "उज्जैन दर्शन" : "Ujjain Darshan"}
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto text-orange-50 font-medium">
                        {isHindi ? "उज्जैन की पवित्र भूमि की आध्यात्मिक यात्रा" : "A spiritual journey through the holy land of Ujjain"}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {['All', 'Jyotirlinga', 'Shaktipeeth', 'Temple', 'Ghat', 'Historical'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm
                                ${filter === cat
                                    ? 'bg-orange-500 text-white shadow-orange-200 scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPlaces.map((place) => (
                        <DarshanCard key={place.id} {...place} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Darshan;
