import React, { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt, FaCheckCircle, FaClock, FaUser } from 'react-icons/fa';
import BookingStepper from './components/BookingStepper';
import SafeImage from '../../components/common/SafeImage';
import { useDispatch, useSelector } from 'react-redux';
import { getPujaWithSlug } from '../../features/puja/PujaSlice';

const PujaBooking = () => {
    const { slug } = useParams();
   const [searchParams] = useSearchParams();

   const pkgId = searchParams.get("pkg");


    const  { pujaDetails }  = useSelector((state) => state.puja);
     const pujas = pujaDetails?.pujas;
     
     const selectedPackage = React.useMemo(() => {

            return pujas?.packages?.find(
                (data) => data.id === Number(pkgId)
            );
    }, [pujas, pkgId]);

    const dispatch = useDispatch();
    
    useEffect(() => {
    dispatch(getPujaWithSlug(slug))
    },[dispatch,slug])


    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    // Mock Data (Ideally fetched from API)
    // const pujaDetails = {
    //     id: id,
    //     image: "https://images.unsplash.com/photo-1621847324329-37398e0a473a?q=80&w=1200",
    //     title: isHindi ? "महा शिवरात्रि विशेष: काल भैरव रक्षा कवच हवन" : "Maha Shivratri Vishesh: Kaal Bhairav Raksha Kavach Puja",
    //     location: isHindi ? "नागचंद्रेश्वर मंदिर, उज्जैन" : "Nagchandreshwar Mandir, Ujjain",
    //     date: "15 Feb 2026",
    //     time: "6:00 PM onwards",
    //     duration: "2-3 Hours",
    //     package: pkgId == 2 ? "Couple Puja" : pkgId == 3 ? "Family Puja" : "Single Puja",
    //     price: pkgId == 2 ? 901 : pkgId == 3 ? 1501 : 501,
    // };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                                <SafeImage src={pujas?.image} type={"pujas/"} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-orange-500/80 backdrop-blur-sm px-2 py-0.5 rounded mb-2 w-fit">
                                        <FaMapMarkerAlt /> {pujas?.location}
                                    </div>
                                    <h2 className="text-lg font-bold leading-tight line-clamp-2">
                                        {pujas?.puja_name}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaCalendarAlt size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">Date</p>
                                            <p className="font-semibold text-gray-800">{pujas?.date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaClock size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">Time</p>
                                            <p className="font-semibold text-gray-800">{ "8:PM"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaUser size={14} /></div>
                                        <div>
                                            <p className="text-xs text-gray-400">Package</p>
                                            <p className="font-semibold text-gray-800">{selectedPackage?.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 mt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">Subtotal</span>
                                        <span className="font-semibold text-gray-800">₹{selectedPackage?.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-500 text-sm">Convenience Fee</span>
                                        <span className="font-semibold text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                        <span className="text-base font-bold text-gray-900">Total Payable</span>
                                        <span className="text-2xl font-bold text-orange-600">₹{selectedPackage?.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
                                Need help? <button className="text-orange-600 font-bold hover:underline">Chat with us</button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Booking Stepper Form */}
                    <div className="md:col-span-8 lg:col-span-8 order-1 md:order-2">
                        {/* Mobile Summary Card (Visible only on mobile) */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4 items-center md:hidden">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <SafeImage  src={pujas?.image} type={"pujas/"} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">
                                    {selectedPackage?.puja_name}
                                </h2>
                                <div className="text-sm font-bold text-orange-600">
                                    Total: ₹{selectedPackage?.price}
                                </div>
                            </div>
                        </div>

                        {/* STEPPER */}
                        <BookingStepper pujaDetails={selectedPackage} />

                        {/* Trust Footer */}
                        <div className="mt-8 text-center flex items-center justify-center gap-6 text-gray-400 opacity-60">
                            <FaCheckCircle /> Verified Pandits • <FaShieldAlt /> Secure Payment
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PujaBooking;
