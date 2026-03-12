import React, { useState } from 'react';
import SankalpForm from './SankalpForm';
import ReviewBooking from './ReviewBooking';
import PaymentPlaceholder from './PaymentPlaceholder';
import { FaUserEdit, FaFileInvoice, FaCreditCard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { bookPuja } from '../../../features/puja/PujaSlice';
import { useDispatch } from 'react-redux';

const BookingStepper = ({ pujaDetails, serviceType = 'puja' }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState(null);
    const dispatch = useDispatch();


    const handleSankalpSubmit = (data) => {
        setBookingData(data);
        setCurrentStep(2);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handlePayment = async () => {

                const updatedData = {
                ...bookingData,
                amount: pujaDetails?.price,
                puja_package_id: pujaDetails?.id
            };

        setBookingData(updatedData);

       await dispatch(bookPuja(updatedData));

        setCurrentStep(3);
    };

    const steps = [
        { id: 1, name: "Sankalp", icon: FaUserEdit },
        { id: 2, name: "Review", icon: FaFileInvoice },
        { id: 3, name: "Payment", icon: FaCreditCard },
    ];

    return (
        <div className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-xl shadow-orange-100/50 overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:shadow-orange-200/50">  
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
            <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                            Booking Amount
                        </p>
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-purple-600 drop-shadow-sm">
                            ₹{pujaDetails?.price}
                        </h2>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-500 border border-orange-200 shadow-inner">
                        <FaCreditCard size={24} />
                    </div>
                </div>

                {/* Stepper */}
                <div className="relative mb-8 px-2">
                    <div className="absolute left-0 top-1/2 w-full h-1.5 bg-gray-100 rounded-full -z-0"></div>
                    <motion.div
                        className="absolute left-0 top-1/2 h-1.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full -z-0"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    ></motion.div>

                    <div className="flex justify-between relative z-10">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center group cursor-default">
                                <motion.div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-[3px] 
                                    ${currentStep >= step.id
                                            ? 'bg-gradient-to-r from-orange-500 to-red-600 border-white text-white shadow-lg shadow-orange-200'
                                            : 'bg-white border-gray-200 text-gray-400'}`}
                                    animate={{
                                        scale: currentStep === step.id ? 1.2 : 1,
                                        opacity: 1
                                    }}
                                >
                                    {step.id < currentStep ? '✓' : step.id}
                                </motion.div>
                                <span className={`text-[10px] font-bold mt-2 uppercase tracking-widest transition-colors duration-300
                                    ${currentStep >= step.id ? 'text-orange-600' : 'text-gray-400'}`}>
                                    {step.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SankalpForm
                                onSubmit={handleSankalpSubmit}
                                defaultValues={bookingData}
                                serviceType={serviceType}
                            />
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ReviewBooking
                                formData={bookingData}
                                onBack={handleBack}
                                onConfirm={handlePayment}
                            />
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <PaymentPlaceholder
                                pujaDetails={pujaDetails}
                                formData={bookingData}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-6 pb-6 text-center">
                <motion.div
                    className="text-xs text-gray-400 flex items-center justify-center gap-2 bg-gray-50/80 py-2.5 rounded-xl border border-gray-100"
                    whileHover={{ scale: 1.02 }}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Secured by SSL Payment
                </motion.div>
            </div>
        </div>
    );
};

export default BookingStepper;