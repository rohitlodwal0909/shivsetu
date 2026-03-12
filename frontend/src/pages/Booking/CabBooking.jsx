import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMusic, FaSnowflake, FaChair, FaRupeeSign } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { getCabs } from '../../features/home/HomeSlice';
import { IMAGE_URL } from '../../utils/constants';

const CabBooking = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const cabs = useSelector((state) => state.home.cabs) || [];


    const dispatch = useDispatch();

    // const cabs = [
    //     { id: 1, name: 'Swift Dzire / Etios', image: '/Images/Cabs/Dzire.webp', seating: '4+1', price: 12 },
    //     { id: 2, name: 'Toyota Innova Crysta', image: '/Images/Cabs/Innova.webp', seating: '6+1', price: 18 },
    //     { id: 3, name: 'Maruti Suzuki Ertiga', image: '/Images/Cabs/Ertiga.webp', seating: '6+1', price: 15 },
    //     { id: 4, name: 'Tempo Traveller', image: '/Images/Cabs/Tempo.webp', seating: '12-17', price: 25 },
    // ];

    const handleBookNow = (cab) => {
        navigate(`/booking/cabs/book/${cab.id}`);
    };
    
    useEffect(() => {
        dispatch(getCabs()).unwrap();
    },[dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white py-12 px-4">

            <div className="max-w-7xl mx-auto">

                {/* Spiritual Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-700 mb-4">
                        {t('booking.cab.title')}
                    </h1>
                    <p className="text-base sm:text-lg text-amber-800 max-w-2xl mx-auto">
                        Safe & comfortable rides for your divine journey
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Cab Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {cabs.map((cab) => (
                        <div
                            key={cab.id}
                            className="group bg-white/90 backdrop-blur-sm rounded-3xl 
                                       border border-orange-100 shadow-lg 
                                       hover:shadow-2xl hover:-translate-y-1 
                                       transition-all duration-300 overflow-hidden flex flex-col"
                        >

                            {/* Image Section */}
                            <div className="relative h-52 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
                                <img
                                    src={IMAGE_URL + 'cabs/' + cab.icon}
                                    alt={cab.name}

                                    className="h-full object-contain p-4 transform group-hover:scale-105 transition duration-500"
                                />

                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-amber-500 
                                                text-white px-4 py-1 rounded-full text-sm font-semibold 
                                                flex items-center gap-1 shadow-md">
                                    <FaRupeeSign className="text-xs" />
                                    {cab.price_per_km}/KM
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">

                                <h2 className="text-xl font-bold text-orange-800 text-center mb-6">
                                    {cab.name}
                                </h2>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-4 text-sm text-amber-900 mb-8">

                                    <div className="flex items-center gap-2">
                                        <FaChair className="text-orange-500" />
                                        <span>{cab.seating} Seats</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaCar className="text-orange-500" />
                                        <span>Verified Driver</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaSnowflake className="text-orange-500" />
                                        <span>{cab.ac_type == "Yes" ? "AC Available" : "No AC Available"}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaMusic className="text-orange-500" />
                                        <span>{cab.music_system == "Yes" ? "Music System" : "No Music System"} </span>
                                    </div>

                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => handleBookNow(cab)}
                                    className="mt-auto w-full bg-gradient-to-r from-orange-600 to-amber-500 
                                               text-white py-3 rounded-full font-semibold 
                                               hover:from-orange-700 hover:to-amber-600 
                                               transition duration-300 shadow-md"
                                >
                                    Book Divine Ride
                                </button>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default CabBooking;