import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaStar, FaCheckCircle, FaTimesCircle, FaPhoneAlt, FaWhatsapp, FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SafeImage from '../../components/common/SafeImage';
import PackageCard from './components/PackageCard';
import packages from '../../data/packages';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isHindi } = useLanguage();
    const [activeTab, setActiveTab] = useState('itinerary');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Mock Data
    // Find Package Data
    const pkg = packages.find(p => p.id === parseInt(id));

    if (!pkg) {
        return <div className="min-h-screen flex items-center justify-center">Package not found</div>;
    }

    // Merged Data
    const packageData = {
        ...pkg,
        // Mocking detail fields
        itinerary: [
            {
                day: 1,
                title: isHindi ? "आगमन और दर्शन" : "Arrival & Darshan",
                desc: isHindi
                    ? "होटल में चेक-इन। मंदिर दर्शन और शाम को आरती।"
                    : "Check-in at hotel. Temple Darshan and evening Aarti."
            },
            {
                day: 2,
                title: isHindi ? "स्थानीय भ्रमण और प्रस्थान" : "Local Sightseeing & Departure",
                desc: isHindi
                    ? "स्थानीय मंदिरों के दर्शन। दोपहर के भोजन के बाद प्रस्थान।"
                    : "Visit local temples. Departure after lunch."
            }
        ],
        inclusions: [
            "AC Accommodation (Double Sharing)",
            "Breakfast & Dinner",
            "AC Vehicle for Sightseeing",
            "Temple VIP Darshan Assistance",
            "All Tolls & Parking"
        ],
        exclusions: [
            "Train/Flight Tickets",
            "Personal Expenses",
            "Lunch",
            "Any Extra Sightseeing"
        ],
        faqs: [
            {
                question: isHindi ? "क्या भोजन पैकेज में शामिल है?" : "Is food included in the package?",
                answer: isHindi ? "हाँ, हम नाश्ता और रात का खाना प्रदान करते हैं। दोपहर का भोजन शामिल नहीं है।" : "Yes, we provide Breakfast and Dinner. Lunch is not included in the package."
            },
            {
                question: isHindi ? "क्या होटल रद्दीकरण नीति लचीली है?" : "Is the hotel cancellation policy flexible?",
                answer: isHindi ? "यात्रा की तारीख से 48 घंटे पहले तक रद्दीकरण निःशुल्क है।" : "Cancellation is free up to 48 hours before the trip date."
            },
            {
                question: isHindi ? "क्या मैं अपनी यात्रा तिथियां बदल सकता हूँ?" : "Can I change my travel dates?",
                answer: isHindi ? "हाँ, उपलब्धता के आधार पर तिथियां बदली जा सकती हैं।" : "Yes, dates can be changed subject to availability."
            },
            {
                question: isHindi ? "क्या गाइड हिंदी/अंग्रेजी बोलता है?" : "Does the guide speak Hindi/English?",
                answer: isHindi ? "हाँ, हमारे गाइड हिंदी और अंग्रेजी दोनों भाषाओं में निपुण हैं।" : "Yes, our guides are fluent in both Hindi and English."
            }
        ]
    };

    const relatedPackages = [
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1621847324329-37398e0a473a?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "उज्जैन-ओंकारेश्वर ज्योतिर्लिंग यात्रा" : "Ujjain-Omkareshwar Jyotirlinga Tour",
            location: "Ujjain & Omkareshwar",
            duration: "3 Days / 2 Nights",
            price: 8499,
            rating: 4.9,
            reviews: 89
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1566830646678-0b63c224213d?q=80&w=1200",
            title: isHindi ? "संपूर्ण उज्जैन दर्शन" : "Complete Ujjain Sightseeing",
            location: "Ujjain",
            duration: "1 Day",
            price: 2499,
            rating: 4.7,
            reviews: 210
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1598890777032-bde66e447735?q=80&w=1200",
            title: isHindi ? "शिप्रा आरती और नाव विहार" : "Shipra Aarti & Boat Ride Experience",
            location: "Ram Ghat, Ujjain",
            duration: "4 Hours",
            price: 999,
            rating: 4.9,
            reviews: 312
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (

        <div className="min-h-screen bg-gray-50 md:pb-12 font-ibm">
            {/* Immersive Hero Section - Orange Gradient */}
            <div className="relative h-[60vh] min-h-[400px]">
                <SafeImage
                    src={packageData.image}
                    alt={packageData.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950 via-orange-900/40 to-transparent"></div>

                <div className="absolute top-0 left-0 w-full p-6 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all border border-white/10"
                    >
                        <FaArrowLeft />
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-2 text-orange-300 font-bold uppercase tracking-wider mb-2">
                            <FaMapMarkerAlt /> {packageData.location}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                            {packageData.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-200 font-medium">
                            <div className="flex items-center gap-2 bg-orange-900/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-orange-500/30">
                                <FaClock className="text-orange-300" /> {packageData.duration}
                            </div>
                            <div className="flex items-center gap-2 bg-orange-900/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-orange-500/30">
                                <FaStar className="text-yellow-400" /> {packageData.rating} ({packageData.reviews} Reviews)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isHindi ? "यात्रा के बारे में" : "About the Tour"}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {packageData.description}
                            </p>
                        </div>

                        {/* Tabs - Orange Accent */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            <div className="flex border-b border-gray-100">
                                <button
                                    onClick={() => setActiveTab('itinerary')}
                                    className={`flex-1 py-4 font-bold text-sm uppercase tracking-wider transition-all ${activeTab === 'itinerary' ? 'text-[#e14503] border-b-2 border-[#e14503] bg-orange-50/50' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {isHindi ? "यात्रा कार्यक्रम" : "Itinerary"}
                                </button>
                                <button
                                    onClick={() => setActiveTab('inclusions')}
                                    className={`flex-1 py-4 font-bold text-sm uppercase tracking-wider transition-all ${activeTab === 'inclusions' ? 'text-[#e14503] border-b-2 border-[#e14503] bg-orange-50/50' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {isHindi ? "समावेश/बहिष्करण" : "Inclusions"}
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                {activeTab === 'itinerary' && (
                                    <div className="space-y-8 relative">
                                        {/* Vertical Timeline Line */}
                                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                                        {packageData.itinerary.map((day, index) => (
                                            <div key={index} className="relative pl-10">
                                                {/* Timeline Dot */}
                                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-orange-100 border-4 border-[#e14503] z-10"></div>

                                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                        <span className="text-[#e14503]">Day {day.day}:</span> {day.title}
                                                    </h3>
                                                    <p className="text-gray-600">{day.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'inclusions' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="font-bold text-[#e14503] mb-4 flex items-center gap-2">
                                                <FaCheckCircle /> {isHindi ? "शामिल है" : "What's Included"}
                                            </h3>
                                            <ul className="space-y-3">
                                                {packageData.inclusions.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                                        <span className="text-orange-500 mt-1">✓</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                                                <FaTimesCircle /> {isHindi ? "शामिल नहीं है" : "What's Excluded"}
                                            </h3>
                                            <ul className="space-y-3">
                                                {packageData.exclusions.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                                        <span className="text-red-400 mt-1">✕</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}</h2>
                            <div className="space-y-4">
                                {packageData.faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-200">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className={`w-full flex items-center justify-between p-4 text-left font-bold transition-colors ${openFaqIndex === index ? 'bg-orange-50 text-[#e14503]' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                                        >
                                            <span className="text-sm md:text-base">{faq.question}</span>
                                            {openFaqIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                        <div
                                            className={`transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-40 opacity-100 p-4 border-t border-orange-100 bg-white' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                        >
                                            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar - Orange Theme */}
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-gray-500 text-sm">Starting from</span>
                                <span className="text-3xl font-bold text-gray-900">₹{packageData.price}</span>
                                <span className="text-gray-400 text-sm mb-1">/ person</span>
                            </div>

                            <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all mb-4">
                                <FaWhatsapp className="text-xl" />
                                {isHindi ? "व्हाट्सएप पर पूछताछ करें" : "Enquire on WhatsApp"}
                            </button>

                            <button className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all">
                                <FaPhoneAlt className="text-sm" />
                                {isHindi ? "अभी कॉल करें" : "Call Now to Book"}
                            </button>

                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Need Help?</p>
                                <a href="tel:+911234567890" className="text-lg font-bold text-gray-800 hover:text-[#e14503] transition-colors">
                                    +91 999 999 9999
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-[60px] left-0 w-full z-50 bg-white border-t border-gray-100 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] md:hidden flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Starting from</span>
                    <span className="text-xl font-bold text-gray-900">₹{packageData.price}</span>
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#25D366] text-white p-3 rounded-full shadow-lg">
                        <FaWhatsapp size={20} />
                    </button>
                    <button className="bg-[#e14503] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-200">
                        View Itinerary
                    </button>
                </div>
            </div>

            {/* Related Tours Section */}
            <div className="container mx-auto px-4 py-16 border-t border-gray-200 mt-16 md:mb-0 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    {isHindi ? "संबंधित यात्रा पैकेज" : "Similar Tour Packages"}
                </h2>
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible">
                    {relatedPackages.map((pkg) => (
                        <div key={pkg.id} className="min-w-[85%] md:min-w-0 snap-center">
                            <PackageCard {...pkg} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PackageDetails;
