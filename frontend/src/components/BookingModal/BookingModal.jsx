import React, { useState, useEffect } from 'react';
import { FaTimes, FaCar, FaOm, FaMapMarkerAlt, FaClock, FaUsers, FaPhone, FaEnvelope, FaCheckCircle, FaCalendarAlt, FaStar, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const BookingModal = ({ isOpen, onClose, serviceType = 'cab', initialData = null }) => {
    const { t, language } = useLanguage();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingId, setBookingId] = useState('');

    // Service-specific configurations
    const serviceConfig = {
        cab: {
            icon: FaCar,
            gradient: 'bg-black', // Changed to solid black as per design
            accentColor: 'orange-500', // Making it pop on black
            textColor: 'text-white',
            prefix: 'CAB'
        },
        pandit: {
            icon: FaOm,
            gradient: 'from-orange-600 to-orange-800',
            accentColor: 'orange-600',
            textColor: 'text-white',
            prefix: 'PANDIT'
        },
        tour: {
            icon: FaMapMarkerAlt,
            gradient: 'from-green-600 to-teal-600',
            accentColor: 'green-600',
            textColor: 'text-white',
            prefix: 'TOUR'
        }
    };

    const config = serviceConfig[serviceType] || serviceConfig.cab;
    const ServiceIcon = config.icon;

    // Form state based on service type
    const getInitialFormData = () => {
        const commonFields = {
            name: '',
            phone: '',
            email: '',
            specialRequests: ''
        };

        switch (serviceType) {
            case 'cab':
                return {
                    ...commonFields,
                    pickupLocation: '',
                    dropLocation: '',
                    date: '',
                    time: '',
                    passengers: '1',
                    vehicleType: initialData?.name || 'Sedan', // Use selected cab name if available
                };
            case 'pandit':
                return {
                    ...commonFields,
                    pujaType: 'grih-pravesh',
                    date: '',
                    time: '',
                    location: '',
                    numberOfPandits: '1',
                    duration: 'half-day'
                };
            case 'tour':
                return {
                    ...commonFields,
                    tourPackage: 'himalayan-trek',
                    startDate: '',
                    endDate: '',
                    numberOfTravelers: '2',
                    accommodation: 'standard',
                    mealsIncluded: true,
                    guideRequired: true
                };
            default:
                return commonFields;
        }
    };

    const [formData, setFormData] = useState(getInitialFormData());

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormData());
        }
    }, [isOpen, initialData]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const generateBookingId = () => {
        return config.prefix + Date.now().toString().slice(-8);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBookingId = generateBookingId();
        setBookingId(newBookingId);

        const booking = {
            id: newBookingId,
            type: serviceType,
            ...formData,
            timestamp: new Date().toISOString()
        };

        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        existingBookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));

        setShowConfirmation(true);
    };

    const handleClose = () => {
        setShowConfirmation(false);
        setFormData(getInitialFormData());
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Render the modal content based on whether it's showing confirmation or form
    if (showConfirmation) {
        return (
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div
                    className="relative bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaCheckCircle className={`text-${config.accentColor} text-6xl mx-auto mb-4`} style={{ color: config.accentColor === 'orange-500' ? '#f97316' : '' }} />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('modal.common.bookingConfirmed')}</h2>
                    <p className="text-gray-600 mb-2">
                        {serviceType === 'cab' && 'Your cab has been booked successfully.'}
                        {serviceType === 'pandit' && 'Your pandit booking has been confirmed.'}
                        {serviceType === 'tour' && 'Your tour package has been booked successfully.'}
                    </p>
                    <p className={`text-lg font-bold mb-6`} style={{ color: config.accentColor === 'orange-500' ? '#f97316' : '' }}>
                        {t('modal.common.bookingId')}: {bookingId}
                    </p>
                    <button
                        onClick={handleClose}
                        className={`w-full text-white py-3 rounded-xl font-bold transition-all hover:opacity-90 shadow-lg`}
                        style={{ backgroundColor: config.accentColor === 'orange-500' ? '#ea580c' : 'var(--color-primary)' }}
                    >
                        {t('modal.common.close')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto sm:overflow-hidden"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />

            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - positioned absolutely */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 z-20 hover:bg-gray-100 rounded-full"
                >
                    <FaTimes size={24} />
                </button>

                {/* Left Panel - Dark Theme for Cab */}
                <div className={`hidden lg:flex lg:w-[45%] ${serviceType === 'cab' ? 'bg-black' : `bg-gradient-to-br ${config.gradient}`} text-white p-12 flex-col justify-between relative overflow-hidden`}>

                    {/* Decorative Elements for Cab */}
                    {serviceType === 'cab' && (
                        <>
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                {/* You can add a pattern or subtle image here if needed */}
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                                        <FaCar className="text-2xl text-white" />
                                    </div>
                                    <span className="text-2xl font-bold">ECOM</span>
                                </div>

                                <h2 className="text-4xl font-bold mb-4 leading-tight">Welcome Back!</h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    Sign in to access your account and continue your shopping journey with exclusive deals and personalized recommendations.
                                </p>
                            </div>

                            <div className="relative z-10 space-y-6 mt-auto">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                                        <FaClock className="text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Fast Checkout</h4>
                                        <p className="text-gray-500 text-sm">Save your info for quick orders</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                                        <FaStar className="text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Exclusive Deals</h4>
                                        <p className="text-gray-500 text-sm">Get access to member-only offers</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Default Content for other services */}
                    {serviceType !== 'cab' && (
                        <>
                            <div>
                                <ServiceIcon className="text-6xl mb-6" />
                                <h3 className="text-3xl font-bold mb-4">{t(`modal.${serviceType}.welcomeTitle`)}</h3>
                                <p className="text-gray-100 text-lg leading-relaxed mb-8">
                                    {t(`modal.${serviceType}.welcomeText`)}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Panel - Form */}
                <div className="w-full lg:w-[55%] p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-white">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{serviceType === 'cab' ? 'Book Your Ride' : t(`modal.${serviceType}.title`)}</h2>
                        <p className="text-gray-500 mb-8">{t(`modal.${serviceType}.subtitle`)}</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Service-specific fields */}
                            {serviceType === 'cab' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.common.name')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                placeholder="Your Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.common.phone')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                pattern="[0-9+\s-]+"
                                                title="Please enter a valid phone number"
                                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.cab.dropLocation')}
                                            </label>
                                            <div className="relative">
                                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="dropLocation"
                                                    value={formData.dropLocation}
                                                    onChange={handleChange}
                                                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                    placeholder="Drop location"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.cab.pickupLocation')}
                                            </label>
                                            <div className="relative">
                                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="pickupLocation"
                                                    value={formData.pickupLocation}
                                                    onChange={handleChange}
                                                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                    placeholder="Pickup location"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.cab.date')}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.cab.time')}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}


                            {/* Pandit & Chadava service type fields */}
                            {serviceType === 'pandit' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.common.name')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                placeholder="Your Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {t('modal.common.phone')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                pattern="[0-9+\s-]+"
                                                title="Please enter a valid phone number"
                                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Puja Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="pujaType"
                                            value={formData.pujaType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                        >
                                            <option value="grih-pravesh">Griha Pravesh</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="satyanarayan">Satyanarayan Katha</option>
                                            <option value="puja">General Puja</option>
                                            <option value="hawan">Hawan</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Location <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                                placeholder="Ceremony Location"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Special Requests
                                        </label>
                                        <textarea
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 bg-gray-50 focus:bg-white resize-none"
                                            placeholder="Any special requirements or requests..."
                                        />
                                    </div>
                                </>
                            )}


                            {/* Actions */}
                            <div className="pt-4">
                                {serviceType === 'cab' ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/30 mb-6"
                                        >
                                            Book Ride Now
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2`}
                                    >
                                        <ServiceIcon />
                                        {t('modal.common.submit')}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
