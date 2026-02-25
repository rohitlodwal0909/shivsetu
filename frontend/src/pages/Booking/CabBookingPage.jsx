import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaArrowLeft, FaShieldAlt, FaCheckCircle, FaCar, FaChair, FaSnowflake, FaMusic } from 'react-icons/fa';
import BookingStepper from '../Puja/components/BookingStepper';

// Cab data
const cabs = [
    {
        id: 1,
        name: 'Swift Dzire / Etios',
        image: '/Images/Cabs/Dzire.webp',
        seating: '4+1',
        rate: 'Rs 12/KM',
        price: '12',
        features: ['AC Sedan', 'Clean Interiors', 'Professional Driver', 'City & Outstation'],
    },
    {
        id: 2,
        name: 'Toyota Innova Crysta',
        image: '/Images/Cabs/Innova.webp',
        seating: '6+1',
        rate: 'Rs 18/KM',
        price: '18',
        features: ['AC SUV', 'Premium Comfort', 'Ample Legroom', 'Family Trips'],
    },
    {
        id: 3,
        name: 'Maruti Suzuki Ertiga',
        image: '/Images/Cabs/Ertiga.webp',
        seating: '6+1',
        rate: 'Rs 15/KM',
        price: '15',
        features: ['AC SUV', 'Music System', 'Economical Group Travel', 'Verified Drivers'],
    },
    {
        id: 4,
        name: 'Tempo Traveller',
        image: '/Images/Cabs/Tempo.webp',
        seating: '12-17',
        rate: 'Rs 25/KM',
        price: '25',
        features: ['Luxury Seating', 'Group Tours', 'Ideal for Pilgrimage', 'Pushback Seats'],
    },
];

const getCabById = (id) => cabs.find(c => c.id === parseInt(id));

const CabBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    const cab = getCabById(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!cab) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isHindi ? 'कैब नहीं मिली' : 'Cab Not Found'}
                    </h1>
                    <button
                        onClick={() => navigate('/booking/cabs')}
                        className="inline-block px-6 py-3 bg-[#e14503] text-white rounded-xl font-bold hover:bg-[#c23a02] transition-colors shadow-md mt-4"
                    >
                        {isHindi ? 'वापस जाएं' : 'Back to Cabs'}
                    </button>
                </div>
            </div>
        );
    }

    const bookingDetails = {
        id: cab.id,
        image: cab.image,
        title: cab.name,
        location: isHindi ? 'उज्जैन, मध्य प्रदेश' : 'Ujjain, Madhya Pradesh',
        date: isHindi ? 'आपकी चयनित तिथि' : 'Your Selected Date',
        time: isHindi ? 'आपके अनुसार' : 'As per your preference',
        duration: isHindi ? 'आपके अनुसार' : 'As per trip',
        package: cab.name,
        price: cab.rate,
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
                            {/* Cab Image */}
                            <div className="relative bg-gradient-to-br from-[#001f3f] to-[#003366] p-6 flex flex-col items-center">
                                <div className="w-full h-40 flex items-center justify-center mb-4">
                                    <img
                                        src={cab.image}
                                        alt={cab.name}
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-white text-center mb-1">{cab.name}</h2>
                                <p className="text-blue-200 text-sm font-semibold text-center">{cab.rate}</p>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><FaChair size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{isHindi ? 'सीटिंग' : 'Seating'}</p>
                                            <p className="font-semibold text-gray-800">{cab.seating} {isHindi ? 'सीटें' : 'Seats'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><FaSnowflake size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{isHindi ? 'सुविधाएं' : 'Features'}</p>
                                            <p className="font-semibold text-gray-800">AC • {isHindi ? 'म्यूजिक' : 'Music'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="pt-2">
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-3">{isHindi ? 'शामिल है' : 'Includes'}</p>
                                    <div className="space-y-2">
                                        {cab.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 mt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">{isHindi ? 'दर' : 'Rate'}</span>
                                        <span className="font-semibold text-gray-800">{cab.rate}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-500 text-sm">{isHindi ? 'सुविधा शुल्क' : 'Convenience Fee'}</span>
                                        <span className="font-semibold text-green-600">{isHindi ? 'मुफ़्त' : 'FREE'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                        <span className="text-base font-bold text-gray-900">{isHindi ? 'प्रति किलोमीटर' : 'Per Kilometer'}</span>
                                        <span className="text-2xl font-bold text-orange-600">{cab.rate}</span>
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
                            <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                                <img src={cab.image} alt={cab.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
                                    {cab.name}
                                </h2>
                                <p className="text-xs text-gray-500 mb-1">{cab.seating} Seats • AC</p>
                                <div className="text-sm font-bold text-orange-600">
                                    {cab.rate}
                                </div>
                            </div>
                        </div>

                        {/* STEPPER */}
                        <BookingStepper pujaDetails={bookingDetails} serviceType="cab" />

                        {/* Trust Footer */}
                        <div className="mt-8 text-center flex items-center justify-center gap-6 text-gray-400 opacity-60">
                            <FaCheckCircle /> {isHindi ? 'सत्यापित ड्राइवर' : 'Verified Drivers'} • <FaShieldAlt /> {isHindi ? 'सुरक्षित भुगतान' : 'Secure Payment'}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CabBookingPage;
