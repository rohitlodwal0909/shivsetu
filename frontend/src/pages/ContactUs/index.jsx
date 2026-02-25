import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const ContactUs = () => {
    const { isHindi } = useLanguage();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        alert(isHindi ? 'संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।' : 'Thank you for contacting us! We will get back to you soon.');
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: 'general',
            message: ''
        });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const subjectOptions = isHindi
        ? ['सामान्य पूछताछ', 'ऑर्डर सहायता', 'उत्पाद प्रश्न', 'अन्य']
        : ['General Inquiry', 'Order Support', 'Product Question', 'Other'];

    const getSubjectValue = (index) => {
        const values = ['general-inquiry', 'order-support', 'product-question', 'other'];
        return values[index];
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1596524430615-b46476ddc643?auto=format&fit=crop&w=2000&q=80"
                        alt="Contact Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>
                <div className="relative max-w-7xl mx-auto text-center z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        {isHindi ? 'संपर्क करें' : 'Get In Touch'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        {isHindi
                            ? 'हम आपसे सुनना पसंद करेंगे। हमें संदेश भेजें और हम जल्द से जल्द जवाब देंगे।'
                            : "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="bg-white rounded-3xl p-10 shadow-xl"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">{isHindi ? 'संपर्क जानकारी' : 'Contact Information'}</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-[#e14503] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <FaPhone className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{isHindi ? 'फ़ोन नंबर' : 'Phone Number'}</h3>
                                    <p className="text-gray-600 mb-1">{isHindi ? 'सोम-शुक्र, सुबह 9 - शाम 6' : 'Mon-Fri, 9am-6pm EST'}</p>
                                    <p className="text-lg font-semibold text-[#e14503]">+1-987-654-3210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-[#e14503] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <FaEnvelope className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{isHindi ? 'ईमेल पता' : 'Email Address'}</h3>
                                    <p className="text-gray-600 mb-1">{isHindi ? '24/7 ईमेल सहायता' : '24/7 email support'}</p>
                                    <p className="text-lg font-semibold text-[#e14503]">support@ecommerce.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-[#e14503] group-hover:text-white transition-all duration-300 shadow-sm">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{isHindi ? 'कार्यालय का पता' : 'Office Address'}</h3>
                                    <p className="text-gray-600">123 Business Street,</p>
                                    <p className="text-gray-600">New York, NY 10001</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-10 rounded-2xl overflow-hidden h-64 bg-gray-200 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830886888!2d-74.11976397444856!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1706696489000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-10 shadow-xl"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">{isHindi ? 'संदेश भेजें' : 'Send Message'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? 'पहला नाम' : 'First Name'}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-xl text-gray-900 focus:ring-2 focus:ring-[#e14503]/20 focus:bg-white transition-all"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? 'अंतिम नाम' : 'Last Name'}</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-xl text-gray-900 focus:ring-2 focus:ring-[#e14503]/20 focus:bg-white transition-all"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? 'ईमेल' : 'Email'}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-xl text-gray-900 focus:ring-2 focus:ring-[#e14503]/20 focus:bg-white transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? 'फ़ोन' : 'Phone'}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-xl text-gray-900 focus:ring-2 focus:ring-[#e14503]/20 focus:bg-white transition-all"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? 'विषय' : 'Subject'}</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {subjectOptions.map((option, index) => (
                                        <label key={option} className={`
                                            flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 transition-all
                                            ${formData.subject === getSubjectValue(index)
                                                ? 'border-[#e14503] bg-[#e14503]/5 text-[#e14503]'
                                                : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'}
                                        `}>
                                            <input
                                                type="radio"
                                                name="subject"
                                                value={getSubjectValue(index)}
                                                checked={formData.subject === getSubjectValue(index)}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <span className="font-semibold text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? 'संदेश' : 'Message'}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-xl text-gray-900 focus:ring-2 focus:ring-[#e14503]/20 focus:bg-white transition-all resize-none"
                                    placeholder={isHindi ? "हम आपकी कैसे मदद कर सकते हैं?" : "How can we help you?"}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#e14503] to-[#ff5722] hover:from-[#c23a02] hover:to-[#e14503] text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                            >
                                <FaPaperPlane />
                                {isHindi ? 'संदेश भेजें' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
