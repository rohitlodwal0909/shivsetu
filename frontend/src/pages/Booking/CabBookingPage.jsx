import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaArrowLeft, FaShieldAlt, FaCheckCircle, FaCar, FaChair, FaSnowflake, FaMusic } from 'react-icons/fa';
import BookingStepper from '../Puja/components/BookingStepper';
import { useDispatch, useSelector } from 'react-redux';
import { singleCab } from '../../features/home/HomeSlice';
import { IMAGE_URL } from '../../utils/constants';



const CabBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    const cab = useSelector((state) => state.home.singlecab) || [];
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(singleCab(id)).unwrap();
    },[id])

      const features = ['AC Sedan', 'Clean Interiors', 'Professional Driver', 'City & Outstation'];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!cab) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {'Cab Not Found'}
                    </h1>
                    <button
                        onClick={() => navigate('/booking/cabs')}
                        className="inline-block px-6 py-3 bg-[#e14503] text-white rounded-xl font-bold hover:bg-[#c23a02] transition-colors shadow-md mt-4"
                    >
                        {'Back to Cabs'}
                    </button>
                </div>
            </div>
        );
    }

    const bookingDetails = {
        id: cab.id,
        image: cab.icon,
        title: cab.name,
        location: 'Ujjain, Madhya Pradesh',
        date: 'Your Selected Date',
        time: 'As per your preference',
        duration: 'As per trip',
        package: cab.name,
        price: cab.price_per_km,
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
                            <div className="relative bg-gradient-to-br p-6 flex flex-col items-center">
                                <div className="w-full h-40 flex items-center justify-center mb-4">
                                    <img
                                        src={IMAGE_URL + "cabs/" + cab.icon}
                                        alt={cab.name}
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-dark text-center mb-1">{cab.name}</h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><FaChair size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{'Seating'}</p>
                                            <p className="font-semibold text-gray-800">{cab.seating} {'Seats'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><FaSnowflake size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">{'Features'}</p>
                                            <p className="font-semibold text-gray-800">AC • {'Music'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="pt-2">
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-3">{'Includes'}</p>
                                    <div className="space-y-2">
                                        {features?.map((feat, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 mt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">{'Rate'}</span>
                                        <span className="font-semibold text-gray-800">{cab.price_per_km}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-500 text-sm">{'Convenience Fee'}</span>
                                        <span className="font-semibold text-green-600">{'FREE'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                        <span className="text-base font-bold text-gray-900">{'Per Kilometer'}</span>
                                        <span className="text-2xl font-bold text-orange-600">{cab.price_per_km}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
                                {'Need help?'}{' '}
                                <button className="text-orange-600 font-bold hover:underline">
                                    {'Chat with us'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Booking Stepper Form */}
                    <div className="md:col-span-8 lg:col-span-8 order-1 md:order-2">
                        {/* Mobile Summary Card (Visible only on mobile) */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4 items-center md:hidden">
                            <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                                <img src={ IMAGE_URL + 'cabs/' + cab.icon} alt={cab.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
                                    {cab.name}
                                </h2>
                                <p className="text-xs text-gray-500 mb-1">{cab.seating} Seats • AC</p>
                                <div className="text-sm font-bold text-orange-600">
                                    {cab.price_per_km}
                                </div>
                            </div>
                        </div>

                        {/* STEPPER */}
                        <BookingStepper pujaDetails={bookingDetails} serviceType="cab" />

                        {/* Trust Footer */}
                        <div className="mt-8 text-center flex items-center justify-center gap-6 text-gray-400 opacity-60">
                            <FaCheckCircle /> {'Verified Drivers'} • <FaShieldAlt /> {'Secure Payment'}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CabBookingPage;
