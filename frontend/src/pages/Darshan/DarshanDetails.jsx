import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaMapMarkerAlt, FaClock, FaHistory, FaArrowLeft, FaShareAlt, FaStar, FaInfoCircle } from 'react-icons/fa';
import SafeImage from '../../components/common/SafeImage';

const DarshanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    // Dummy data fetching simulation
    const place = {
        id: id,
        image: "https://images.unsplash.com/photo-1605649487216-90a3f9100eb0?q=80&w=1200&auto=format&fit=crop",
        title: isHindi ? "श्री महाकालेश्वर ज्योतिर्लिंग" : "Shri Mahakaleshwar Jyotirlinga",
        description: isHindi ? "महाकालेश्वर ज्योतिर्लिंग भारत के बारह प्रसिद्ध ज्योतिर्लिंगों में से एक है। यह गौरवशाली मंदिर रुद्र सागर झील के किनारे स्थित है। आध्यात्मिक रूप से, प्रलय (विनाश) के देवता भगवान शिव सर्वोच्च देवता के रूप में राज्य करते हैं। यह एकमात्र ज्योतिर्लिंग है जो दक्षिणमुखी है।" : "Mahakaleshwar Jyotirlinga is one of the most famous twelve Jyotirlingas of India. The glory of magnificent temple is situated near the Rudra Sagar lake. Spiritually, the Lord Shiva, the deity of pralaya (destruction), reigns as the supreme deity. This is the only Jyotirlinga which is Dakshinamukhi.",
        location: "Jaisinghpura, Ujjain, Madhya Pradesh 456006",
        timing: "4:00 AM - 11:00 PM",
        significance: isHindi ? "यह मंदिर अपनी भस्म आरती के लिए प्रसिद्ध है, जो दुनिया में अपनी तरह की एकमात्र आरती है। ऐसा माना जाता है कि जो कोई भी इस लिंग की पूजा करता है, उसे मृत्यु (काल) का भय नहीं रहता।" : "The temple is famous for its Bhasma Aarti, which is the only one of its kind in the world. It is believed that anyone who worships this Lingam is never afraid of death (Kaal).",
        history: isHindi ? "मंदिर का इतिहास प्राचीन काल से है। इसका उल्लेख कई पुराणों में मिलता है। वर्तमान संरचना का निर्माण मराठा काल में किया गया था।" : "The temple's history dates back to ancient times. It occupies a place in several Puranas. The current structure was built during the Maratha period.",
        tips: [
            isHindi ? "भस्म आरती के लिए ऑनलाइन बुकिंग अनिवार्य है" : "Online booking is mandatory for Bhasma Aarti",
            isHindi ? "मोबाइल और बैग लॉकर में जमा करने होंगे" : "Mobiles and bags must be deposited in lockers",
            isHindi ? "पारंपरिक वस्त्र अनिवार्य हैं (गर्भगृह के लिए)" : "Traditional attire is mandatory (for Garbhagriha)"
        ]
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-ibm">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full">
                <SafeImage
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-black/40 to-black/30"></div>

                {/* Navbar Action */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all border border-white/20 shadow-lg"
                    >
                        <FaArrowLeft />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all border border-white/20 shadow-lg">
                        <FaShareAlt />
                    </button>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 pb-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                                {isHindi ? "प्रमुख मंदिर" : "Major Temple"}
                            </span>
                            <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1.5 rounded-full text-sm font-bold">
                                <FaStar size={12} /> 4.9
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-4 max-w-5xl">
                            {place.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-lg">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <FaMapMarkerAlt className="text-orange-400" />
                                <span>{place.location}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <FaClock className="text-blue-400" />
                                <span>{place.timing}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <FaHistory className="text-orange-500" />
                                {isHindi ? "परिचय" : "About"}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {place.description}
                            </p>

                            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                                    {isHindi ? "महत्व" : "Significance"}
                                </h3>
                                <p className="text-gray-700 italic leading-relaxed">
                                    "{place.significance}"
                                </p>
                            </div>
                        </div>

                        {/* History */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <FaHistory className="text-purple-500" />
                                {isHindi ? "इतिहास" : "History"}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {place.history}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Info & Map */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Visiting Tips */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <FaInfoCircle className="text-blue-500" />
                                {isHindi ? "यात्री सुझाव" : "Travel Tips"}
                            </h3>
                            <ul className="space-y-4">
                                {place.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0"></div>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full mt-8 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg">
                                <FaMapMarkerAlt />
                                {isHindi ? "मैप पर देखें" : "View on Map"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DarshanDetails;
