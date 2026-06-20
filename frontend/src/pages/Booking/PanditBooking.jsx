import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaOm, FaStar, FaLanguage, FaBriefcase, FaAward } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getPandits } from '../../features/puja/PanditSlice';
import { IMAGE_URL, ImageUrl } from '../../utils/constants';

const PanditBooking = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const dispatch = useDispatch()

  const { pandits } = useSelector((state) => state.pandits) || []


  useEffect(() => {
   dispatch(getPandits())
  },[dispatch])

    const handleBookNow = (pandit) => {
        navigate(`/booking/pandits/book/${pandit.slug}`);
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 font-ibm">
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase mb-4 block">
                        DIVINE CONNECTIONS
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        All Pandits
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Connect with certified Pandits for all your religious ceremonies. From Griha Pravesh to Wedding rituals, we bring authenticity, devotion, and peace to your doorstep.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {pandits && pandits?.map((pandit) => (
                        <div key={pandit.id} className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full max-w-sm border border-gray-100 p-6 flex flex-col items-center">

                            <div className="w-40 h-40 mb-6 flex items-center justify-center relative rounded-full overflow-hidden border-4 border-[#e14503]">
                                <img
                                    src={IMAGE_URL + 'pandit/' + pandit.image}
                                    alt={pandit.name}
                                    className="w-full h-full object-cover drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                                />
                                {/* Rating Badge */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[#002147] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400 text-xs" />
                                        <span>{4.8}</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-[#002147] mb-2 text-center mt-3">{pandit.name}</h2>
                            <p className="text-[#e14503] font-semibold text-sm mb-2 text-center">{pandit.puja_name}</p>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                                    <FaStar className="text-yellow-400 text-xs" />
                                    <span className="text-sm font-bold text-gray-800">{4.8}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                                    <FaBriefcase className="text-[#002147] text-xs" />
                                    <span className="text-sm font-bold text-gray-800">{pandit.exprience} years</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-y-3 w-full mb-8">
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaLanguage className="text-lg text-gray-500" />
                                    <span>{pandit?.language}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <FaAward className="text-lg text-orange-500" />
                                    <span>Verified Pandit</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full mb-4">
                                <span className="text-3xl font-bold text-[#002147]">₹{pandit.price}</span>
                            </div>

                            <button
                                onClick={() => handleBookNow(pandit)}
                                className="w-full bg-[#e14503] text-white py-3.5 px-6 rounded-full font-bold text-lg hover:bg-[#c23a02] transition-colors duration-300 flex items-center justify-center gap-2 group"
                            >
                                {t('booking.pandit.bookNow')}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default PanditBooking;
