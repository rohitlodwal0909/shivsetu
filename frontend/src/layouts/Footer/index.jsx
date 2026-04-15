import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaShoppingBag,
    FaTruck,
    FaUndo,
    FaLock
} from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { IMAGE_URL } from '../../utils/constants';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { isHindi } = useLanguage();
    const [openSection, setOpenSection] = useState('');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? '' : section);
    };

    const location = useLocation();

    // Check if current page is shop related
    const isShoppingPage =
        location.pathname === '/' ||
        location.pathname.startsWith('/shop') ||
        location.pathname.startsWith('/categories') ||
        location.pathname.startsWith('/product') ||
        location.pathname.startsWith('/cart') ||
        location.pathname.startsWith('/checkout') ||
        location.pathname.startsWith('/wishlist') ||
        location.pathname.startsWith('/explore') ||
        location.pathname.startsWith('/trending') ||
        location.pathname.startsWith('/new-arrival');

    const quickLinks = {
        shop: [
            { name: isHindi ? 'सभी उत्पाद' : 'All Products', path: '/shop' },
            { name: isHindi ? 'श्रेणियां' : 'Categories', path: '/categories' },
            { name: isHindi ? 'नए आगमन' : 'New Arrivals', path: '/shop?filter=new' },
            { name: isHindi ? 'बिक्री पर' : 'On Sale', path: '/shop?filter=sale' }
        ],
        company: [
            { name: isHindi ? 'हमारे बारे में' : 'About Us', path: '/about' },
            { name: isHindi ? 'ब्लॉग' : 'Blogs', path: '/blogs' },
            { name: isHindi ? 'संपर्क करें' : 'Contact Us', path: '/contact' },
            { name: isHindi ? 'करियर' : 'Careers', path: '/careers' }
        ],
        support: [
            { name: isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQs', path: '/faq' },
            { name: isHindi ? 'मेरा खाता' : 'My Account', path: '/account' },
            { name: isHindi ? 'ऑर्डर ट्रैक करें' : 'Track Order', path: '/account' },
            { name: isHindi ? 'विशलिस्ट' : 'Wishlist', path: '/wishlist' }
        ]
    };

    const features = [
        { icon: FaTruck, title: isHindi ? "मुफ्त शिपिंग" : "Free Shipping", desc: isHindi ? "₹50 से अधिक" : "Orders > $50" },
        { icon: FaUndo, title: isHindi ? "आसान रिटर्न" : "Easy Returns", desc: isHindi ? "30-दिन नीति" : "30 Days" },
        { icon: FaLock, title: isHindi ? "सुरक्षित भुगतान" : "Secure Payment", desc: isHindi ? "100% सुरक्षित" : "100% Secure" },
        { icon: FaShoppingBag, title: isHindi ? "प्रीमियम" : "Premium", desc: isHindi ? "उत्पाद" : "Quality" },
    ];

    const accordionSections = [
        { id: 'shop', title: 'Shop', links: quickLinks.shop },
        { id: 'company', title: 'Company', links: quickLinks.company },
        { id: 'support', title: 'Support', links: quickLinks.support },
    ];

    return (
        <footer>
            {/* ================= DESKTOP VIEW ================= */}
            <div className="hidden md:block bg-white border-t border-gray-200">
                {/* Features Bar */}
                {isShoppingPage && (
                    <div className="bg-gray-50 py-6 border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-[#e14503] rounded-lg flex items-center justify-center">
                                            <feature.icon className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <Link to="/" className="block w-[100px] sm:w-[150px] flex-none">
                                   <img
                                     src={IMAGE_URL + "logo/logo.svg"}
                                     alt="Shiv Setu"
                                     className="w-full h-auto object-contain"
                                   />
                            </Link>
                            <p className="text-gray-600 mb-6">
                                Your one-stop destination for premium quality products and spiritual services. Shop with confidence.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FaMapMarkerAlt className="text-[#e14503]" />
                                    <span className="text-sm">123 Main Street, New York, NY 10001</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FaPhone className="text-[#e14503]" />
                                    <span className="text-sm">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FaEnvelope className="text-[#e14503]" />
                                    <span className="text-sm">support@shivsetu.com</span>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#e14503] rounded-lg flex items-center justify-center transition-colors group">
                                        <Icon className="text-gray-700 group-hover:text-white" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Links Columns */}
                        {['shop', 'company', 'support'].map((key) => (
                            <div key={key}>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 capitalize">{key}</h3>
                                <ul className="space-y-2">
                                    {quickLinks[key].map((link, index) => (
                                        <li key={index}>
                                            <Link to={link.path} className="text-gray-600 hover:text-[#e14503] transition-colors text-sm">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-gray-50 py-6 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                        <p className="text-gray-600 text-sm">
                            © {currentYear} ShivSetu.com. {isHindi ? "सभी अधिकार सुरक्षित हैं।" : "All rights reserved."}
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link>
                            <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MOBILE APP-STYLE VIEW ================= */}
            <div className="md:hidden bg-gray-50 pb-24 border-t border-gray-200">
                {/* Brand Header */}
                <div className="flex flex-col items-center justify-center py-6 bg-white border-b border-gray-100">
                    <div className="w-12 h-12 bg-[#e14503] rounded-xl flex items-center justify-center shadow-lg mb-2">
                        {/* <span className="text-white font-bold text-2xl">S</span> */}
                       <Link to="/" className="block w-[100px] sm:w-[150px] flex-none">
                         <img
                           src={IMAGE_URL + "logo/logo.svg"}
                           alt="Shiv Setu"
                           className="w-full h-auto object-contain"
                         />
                       </Link>
                    </div>
                    {/* <span className="text-xl font-bold text-gray-900">ShivSetu.com</span> */}
                    <p className="text-xs text-gray-500 mt-1">Premium Spiritual Store</p>
                </div>

                {/* Compact Features Grid */}
                {isShoppingPage && (
                    <div className="grid grid-cols-2 gap-3 p-4">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <feature.icon className="text-[#e14503] text-xl mb-2" />
                                <h4 className="font-semibold text-gray-900 text-xs">{feature.title}</h4>
                                <p className="text-[10px] text-gray-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Accordion Links */}
                <div className="px-4 space-y-3">
                    {accordionSections.map((section) => (
                        <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 capitalize">{section.title}</span>
                                <motion.div
                                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiChevronDown className="text-gray-400" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-gray-100"
                                    >
                                        <div className="p-4 pt-0 space-y-3 bg-gray-50/50">
                                            <div className="h-2"></div>
                                            {section.links.map((link, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={link.path}
                                                    className="block text-sm text-gray-600 hover:text-[#e14503] py-1 pl-2 border-l-2 border-transparent hover:border-[#e14503] transition-all"
                                                >
                                                    {link.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Compact Contact & Socials */}
                <div className="mt-6 px-4 text-center">
                    <div className="flex justify-center gap-4 mb-6">
                        {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-[#e14503] hover:border-[#e14503] transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-xs text-gray-400 mb-2">
                            © {currentYear} ShivSetu.com. All rights reserved.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/privacy" className="text-[10px] text-gray-400 hover:text-gray-600">Privacy Policy</Link>
                            <Link to="/terms" className="text-[10px] text-gray-400 hover:text-gray-600">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
