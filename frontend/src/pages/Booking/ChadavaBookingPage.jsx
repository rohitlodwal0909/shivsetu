import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getChadavaById } from '../../data/chadava';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt, FaCheckCircle, FaClock, FaOm, FaStar } from 'react-icons/fa';
import BookingStepper from '../Puja/components/BookingStepper';
import SafeImage from '../../components/common/SafeImage';

const ChadavaBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    const service = getChadavaById(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isHindi ? 'सेवा नहीं मिली' : 'Service Not Found'}
                    </h1>
                    <button
                        onClick={() => navigate('/booking/chadava')}
                        className="inline-block px-6 py-3 bg-[#e14503] text-white rounded-xl font-bold hover:bg-[#c23a02] transition-colors shadow-md mt-4"
                    >
                        {isHindi ? 'वापस जाएं' : 'Back to Offerings'}
                    </button>
                </div>
            </div>
        );
    }

    // Build details object compatible with BookingStepper's pujaDetails prop
    const bookingDetails = {
        id: service.id,
        image: service.image,
        title: service.name,
        location: `${service.temple}, ${service.location}`,
        date: isHindi ? 'आपकी चयनित तिथि' : 'Your Selected Date',
        time: isHindi ? 'मंदिर अनुसार' : 'As per Temple Schedule',
        duration: isHindi ? 'मंदिर अनुसार' : 'As per Temple',
        package: isHindi ? 'पवित्र चढ़ावा' : 'Sacred Offering',
        price: parseInt(service.price) || 0,
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12 font-ibm">
            {/* Header */}
            <div className="bg-white sticky top-0 z-50 px-4 py-4 md:px-8 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-full hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                        <FaArrowLeft className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                            {isHindi ? "बुकिंग विवरण पूरा करें" : "Complete Your Booking"}
                        </h1>
                        <p className="text-xs text-gray-500 hidden md:block">Secure Checkout • Step 1 of 3</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                    <FaShieldAlt /> 100% Secure
                </div>
            </div>

            <div className="container mx-auto max-w-6xl p-4 md:py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Booking Summary (Desktop Sticky) */}
                    <div className="md:col-span-4 lg:col-span-4 order-2 md:order-1">
                        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-24">
                            <div className="relative h-48">
                                <SafeImage src={service.image} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-orange-500/80 backdrop-blur-sm px-2 py-0.5 rounded mb-2 w-fit">
                                        <FaOm /> {isHindi ? 'पवित्र चढ़ावा' : 'Sacred Offering'}
                                    </div>
                                    <h2 className="text-lg font-bold leading-tight line-clamp-2">
                                        {service.name}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaMapMarkerAlt size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{isHindi ? 'मंदिर' : 'Temple'}</p>
                                            <p className="font-semibold text-gray-800">{service.temple}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaMapMarkerAlt size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{isHindi ? 'स्थान' : 'Location'}</p>
                                            <p className="font-semibold text-gray-800">{service.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaStar size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{isHindi ? 'रेटिंग' : 'Rating'}</p>
                                            <p className="font-semibold text-gray-800">{service.rating} ({service.reviews} {isHindi ? 'समीक्षाएं' : 'Reviews'})</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 mt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">{isHindi ? 'चढ़ावा राशि' : 'Offering Amount'}</span>
                                        <span className="font-semibold text-gray-800">₹{service.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-500 text-sm">{isHindi ? 'सुविधा शुल्क' : 'Convenience Fee'}</span>
                                        <span className="font-semibold text-green-600">{isHindi ? 'मुफ़्त' : 'FREE'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                        <span className="text-base font-bold text-gray-900">{isHindi ? 'कुल देय' : 'Total Payable'}</span>
                                        <span className="text-2xl font-bold text-orange-600">₹{service.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
                                {isHindi ? 'सहायता चाहिए?' : 'Need help?'}{' '}
                                <button className="text-orange-600 font-bold hover:underline">
                                    {isHindi ? 'हमसे चैट करें' : 'Chat with us'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Booking Stepper Form */}
                    <div className="md:col-span-8 lg:col-span-8 order-1 md:order-2">
                        {/* Mobile Summary Card (Visible only on mobile) */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4 items-center md:hidden">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <SafeImage src={service.image} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">
                                    {service.name}
                                </h2>
                                <p className="text-xs text-gray-500 mb-1">{service.temple}, {service.location}</p>
                                <div className="text-sm font-bold text-orange-600">
                                    {isHindi ? 'कुल:' : 'Total:'} ₹{service.price}
                                </div>
                            </div>
                        </div>

                        {/* STEPPER */}
                        <BookingStepper pujaDetails={bookingDetails} serviceType="chadava" />

                        {/* Trust Footer */}
                        <div className="mt-8 text-center flex items-center justify-center gap-6 text-gray-400 opacity-60">
                            <FaCheckCircle /> {isHindi ? 'सत्यापित पंडित' : 'Verified Pandits'} • <FaShieldAlt /> {isHindi ? 'सुरक्षित भुगतान' : 'Secure Payment'}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChadavaBookingPage;
