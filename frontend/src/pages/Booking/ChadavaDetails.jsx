import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaArrowLeft, FaCheckCircle, FaVideo, FaCamera, FaOm, FaShieldAlt } from 'react-icons/fa';
import { chadavaServices, getChadavaById } from '../../data/chadava';
import SafeImage from '../../components/common/SafeImage';
import { useLanguage } from '../../context/LanguageContext';

const ChadavaDetails = () => {
    const { id } = useParams();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const service = getChadavaById(id);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h1>
                    <Link to="/booking/chadava" className="inline-block px-6 py-3 bg-[#e14503] text-white rounded-xl font-bold hover:bg-[#c23a02] transition-colors shadow-md mt-4">
                        Back to Offerings
                    </Link>
                </div>
            </div>
        );
    }

    const getIncludeIcon = (include) => {
        if (include.includes('Video')) return FaVideo;
        if (include.includes('Photo')) return FaCamera;
        return FaCheckCircle;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <SafeImage
                    src={service.image}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    style={{ height: '70vh' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full z-20 pb-12 lg:pb-20">
                    <div className="container max-w-7xl mx-auto px-4">
                        <div className="max-w-4xl">
                            <Link to="/booking/chadava" className="inline-flex items-center text-white/80 hover:text-white mb-6 uppercase tracking-wider text-xs font-bold transition-colors">
                                <FaArrowLeft className="mr-2" /> Back to Offerings
                            </Link>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-[#e14503] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2">
                                    <FaOm /> Sacred Offering
                                </span>
                                <span className="flex items-center gap-2 text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                    <FaStar className="text-yellow-400" /> {service.rating} ({service.reviews} Reviews)
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                                {service.name}
                            </h1>
                            <div className="flex items-center gap-2 text-white/80 text-lg font-medium">
                                <FaMapMarkerAlt className="text-[#e14503]" /> {service.temple}, {service.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-30 -mt-8">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-t-3xl shadow-xl overflow-hidden min-h-screen border border-gray-100 p-6 md:p-10">
                                {/* Description */}
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Offering</h2>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        {service.description}
                                    </p>
                                    <div
                                        className="prose prose-orange text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                                    />
                                </div>

                                {/* Inclusions */}
                                <div className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <FaCheckCircle className="text-[#e14503]" /> What's Included
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.includes.map((include, idx) => {
                                            const Icon = getIncludeIcon(include);
                                            return (
                                                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
                                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#e14503]">
                                                        <Icon />
                                                    </div>
                                                    <span className="font-medium text-gray-700">{include}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Safety/Trust */}
                                <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <FaShieldAlt className="text-3xl text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">100% Secure & Verified</h4>
                                            <p className="text-sm text-gray-600">All bookings are directly verified with the temple administration.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <FaVideo className="text-3xl text-blue-500 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">Live Video Proof</h4>
                                            <p className="text-sm text-gray-600">Receive video evidence of your puja and offering instantly.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:col-span-4 pl-0 lg:pl-0 mt-8 lg:mt-0">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                                    <div className="text-center mb-6">
                                        <p className="text-gray-500 text-sm uppercase tracking-wide font-bold mb-1">Contribution Amount</p>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-4xl font-black text-gray-900">₹{service.price}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/booking/chadava/book/${service.id}`)}
                                        className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 mb-4"
                                    >
                                        Book Offering Now
                                    </button>

                                    <p className="text-center text-xs text-gray-400">
                                        *Proceeds go directly to temple maintenance and prasad distribution.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default ChadavaDetails;
