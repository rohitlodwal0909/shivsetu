import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileContract, FaPhone, FaEnvelope, FaGlobe, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Terms = () => {
    const { isHindi } = useLanguage();
    const [activeSection, setActiveSection] = useState(1);

    const termsData = [
        {
            id: 1,
            title: isHindi ? "1. शर्तों की स्वीकृति" : "1. Acceptance of Terms",
            content: isHindi 
                ? "हमारी वेबसाइट और सेवाओं का उपयोग करके जिसमें ज्योतिष परामर्श, ऑनलाइन पूजा बुकिंग, टैक्सी बुकिंग, यात्रा बुकिंग, और एस्ट्रो उत्पाद शामिल हैं, आप इन नियमों और शर्तों तथा हमारी गोपनीयता नीति से सहमत हैं। यदि आप इन शर्तों के किसी भी भाग से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।"
                : "By using our website and services including Astrology Consultation, Online Pooja Booking, Taxi Booking, Yatra Booking, and Astro Products, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our services."
        },
        {
            id: 2,
            title: isHindi ? "2. प्रदान की जाने वाली सेवाएँ" : "2. Services Offered",
            content: isHindi 
                ? "शिवसेतु निम्नलिखित सेवाएँ प्रदान करता है:\n• ऑनलाइन ज्योतिष परामर्श\n• ऑनलाइन पूजा बुकिंग\n• धार्मिक यात्रा बुकिंग\n• टैक्सी बुकिंग सेवाएँ\n• एस्ट्रो और आध्यात्मिक उत्पादों की बिक्री\nसभी सेवाएँ उपलब्धता के अधीन हैं और बिना किसी पूर्व सूचना के संशोधित या बंद की जा सकती हैं।"
                : "ShivSetu provides services including:\n• Online Astrology Consultation\n• Online Pooja Booking\n• Religious Yatra Booking\n• Taxi Booking Services\n• Sale of Astro & Spiritual Products\nAll services are subject to availability and may be modified or discontinued without prior notice."
        },
        {
            id: 3,
            title: isHindi ? "3. उपयोगकर्ता की जिम्मेदारियाँ" : "3. User Responsibilities",
            content: isHindi 
                ? "उपयोगकर्ता इस बात पर सहमत हैं:\n• सटीक और पूर्ण जानकारी प्रदान करना\n• मंच का उपयोग केवल कानूनी उद्देश्यों के लिए करना\n• खाता विवरण की गोपनीयता बनाए रखना\n• वेबसाइट का दुरुपयोग, धोखाधड़ी या अनधिकृत पहुंच से बचना\nकोई भी गलत या भ्रामक जानकारी सेवाओं को रद्द करने का कारण बन सकती है।"
                : "Users agree to:\n• Provide accurate and complete information\n• Use the platform only for lawful purposes\n• Maintain confidentiality of account details\n• Avoid misuse, fraud, or unauthorized access to the website\nAny false or misleading information may result in cancellation of services."
        },
        {
            id: 4,
            title: isHindi ? "4. ज्योतिष और आध्यात्मिक सेवाओं का अस्वीकरण" : "4. Astrology & Spiritual Services Disclaimer",
            content: isHindi 
                ? "ज्योतिष परामर्श, पूजा सेवाएँ, भविष्यवाणियाँ, और आध्यात्मिक उपचार पारंपरिक मान्यताओं और व्यक्तिगत व्याख्याओं पर आधारित हैं। शिवसेतु निम्नलिखित की गारंटी नहीं देता है:\n• विशिष्ट परिणाम\n• वित्तीय लाभ\n• स्वास्थ्य में सुधार\n• संबंधों में सफलता\n• कोई गारंटीकृत भविष्य की घटनाएँ\nउपयोगकर्ताओं को सलाह दी जाती है कि वे परामर्श के आधार पर निर्णय लेने से पहले व्यक्तिगत विवेक का उपयोग करें।"
                : "Astrology consultations, pooja services, predictions, and spiritual remedies are based on traditional beliefs and personal interpretations. ShivSetu does not guarantee:\n• Specific outcomes\n• Financial gains\n• Health improvements\n• Relationship success\n• Any guaranteed future events\nUsers are advised to use personal judgment before making decisions based on consultations."
        },
        {
            id: 5,
            title: isHindi ? "5. बुकिंग और भुगतान" : "5. Booking & Payments",
            content: isHindi
                ? "टैक्सी और यात्रा बुकिंग:\n• बुकिंग केवल सफल भुगतान के बाद ही कन्फर्म की जाती है।\n• स्थान, उपलब्धता, ईंधन शुल्क और मौसमी मांग के आधार पर कीमतें भिन्न हो सकती हैं।\n• मौसम, ट्रैफिक, हड़ताल या अप्रत्याशित घटनाओं के कारण होने वाली देरी के लिए हमारी कोई ज़िम्मेदारी नहीं है।\n\nऑनलाइन पूजा बुकिंग:\n• पूजा की तिथियां और समय पुरोहित की उपलब्धता और धार्मिक कार्यक्रमों पर निर्भर करते हैं।\n• अनुकूलित पूजा अनुरोधों के लिए अग्रिम बुकिंग की आवश्यकता हो सकती है।\n\nएस्ट्रो उत्पाद:\n• उत्पाद की छवियां केवल संदर्भ उद्देश्यों के लिए हैं।\n• रंग, आकार या डिज़ाइन में थोड़ा अंतर हो सकता है।"
                : "Taxi & Yatra Booking:\n• Bookings are confirmed only after successful payment.\n• Prices may vary depending on location, availability, fuel charges, and seasonal demand.\n• Delays due to weather, traffic, strikes, or unforeseen events are not our responsibility.\n\nOnline Pooja Booking:\n• Pooja dates and timings depend on priest availability and religious schedules.\n• Customized pooja requests may require advance booking.\n\nAstro Products:\n• Product images are for reference purposes only.\n• Slight variations in color, size, or design may occur."
        },
        {
            id: 6,
            title: isHindi ? "6. रद्दीकरण और धनवापसी नीति" : "6. Cancellation & Refund Policy",
            content: isHindi
                ? "टैक्सी / यात्रा सेवाएँ:\n• रद्दीकरण के समय के आधार पर रद्दीकरण शुल्क लागू हो सकता है।\n• भुगतान गेटवे प्रोसेसिंग के आधार पर धनवापसी की समय-सीमा भिन्न हो सकती हैं।\n\nज्योतिष परामर्श:\n• एक बार सत्र शुरू होने के बाद परामर्श शुल्क आमतौर पर गैर-वापसी योग्य होता है।\n\nपूजा बुकिंग:\n• धनवापसी की पात्रता पूजा व्यवस्था की तैयारी की स्थिति पर निर्भर करती है।\n\nएस्ट्रो उत्पाद:\n• क्षतिग्रस्त या गलत उत्पादों की रिपोर्ट डिलीवरी के 48 घंटों के भीतर की जानी चाहिए।"
                : "Taxi / Yatra Services:\n• Cancellation charges may apply depending on cancellation timing.\n• Refund timelines may vary based on payment gateway processing.\n\nAstrology Consultation:\n• Consultation fees are generally non-refundable once the session has started.\n\nPooja Booking:\n• Refund eligibility depends on the preparation status of the pooja arrangements.\n\nAstro Products:\n• Damaged or incorrect products must be reported within 48 hours of delivery."
        },
        {
            id: 7,
            title: isHindi ? "7. बौद्धिक संपदा" : "7. Intellectual Property",
            content: isHindi 
                ? "शिवसेतु पर सभी सामग्री जिसमें लोगो, पाठ, चित्र, वीडियो, ग्राफिक्स, वेबसाइट डिज़ाइन शामिल हैं, शिवसेतु की संपत्ति हैं और अनुमति के बिना कॉपी या पुन: उपयोग नहीं की जा सकती हैं।"
                : "All content on ShivSetu including Logo, Text, Images, Videos, Graphics, and Website design is the property of ShivSetu and may not be copied or reused without permission."
        },
        {
            id: 8,
            title: isHindi ? "8. दायित्व की सीमा" : "8. Limitation of Liability",
            content: isHindi 
                ? "शिवसेतु निम्नलिखित के लिए उत्तरदायी नहीं होगा:\n• अप्रत्यक्ष या परिणामी नुकसान\n• सेवा में व्यवधान\n• तृतीय-पक्ष प्रदाताओं के कारण होने वाली देरी\n• ज्योतिष सलाह के आधार पर उपयोगकर्ताओं द्वारा लिए गए निर्णय\nसेवाओं का उपयोग उपयोगकर्ता के अपने जोखिम पर है।"
                : "ShivSetu shall not be liable for:\n• Indirect or consequential losses\n• Service interruptions\n• Delays caused by third-party providers\n• Decisions taken by users based on astrology advice\nUse of services is at the user's own risk."
        },
        {
            id: 9,
            title: isHindi ? "9. तृतीय-पक्ष सेवाएँ" : "9. Third-Party Services",
            content: isHindi 
                ? "कुछ सेवाएँ तृतीय-पक्ष विक्रेताओं, यात्रा ऑपरेटरों, पंडितों या टैक्सी प्रदाताओं के माध्यम से प्रदान की जा सकती हैं। हम इसके लिए ज़िम्मेदार नहीं हैं:\n• सेवा गुणवत्ता के मुद्दे\n• देरी\n• तृतीय-पक्ष प्रदाताओं द्वारा दुर्व्यवहार\nहालाँकि, हम उपयोगकर्ताओं की समस्याओं को हल करने में सहायता करने का सर्वोत्तम प्रयास करेंगे।"
                : "Some services may be provided through third-party vendors, travel operators, pandits, or taxi providers. We are not responsible for:\n• Service quality issues\n• Delays\n• Misconduct by third-party providers\nHowever, we will try our best to assist users in resolving concerns."
        },
        {
            id: 10,
            title: isHindi ? "10. गोपनीयता" : "10. Privacy",
            content: isHindi 
                ? "हमारे मंच का आपका उपयोग हमारी गोपनीयता नीति द्वारा भी नियंत्रित होता है।"
                : "Your use of our platform is also governed by our Privacy Policy."
        },
        {
            id: 11,
            title: isHindi ? "11. पहुंच की समाप्ति" : "11. Termination of Access",
            content: isHindi 
                ? "हम उन उपयोगकर्ताओं की पहुंच को निलंबित या समाप्त करने का अधिकार सुरक्षित रखते हैं जो:\n• इन शर्तों का उल्लंघन करते हैं\n• धोखाधड़ी वाली गतिविधि में शामिल होते हैं\n• मंच का दुरुपयोग करते हैं"
                : "We reserve the right to suspend or terminate access to users who:\n• Violate these terms\n• Engage in fraudulent activity\n• Misuse the platform"
        },
        {
            id: 12,
            title: isHindi ? "12. लागू कानून" : "12. Governing Law",
            content: isHindi 
                ? "ये नियम और शर्तें भारत के कानूनों द्वारा शासित होंगी। कोई भी विवाद मध्य प्रदेश, भारत की अदालतों के अधिकार क्षेत्र के अधीन होगा।"
                : "These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of Madhya Pradesh, India."
        },
        {
            id: 13,
            title: isHindi ? "13. शर्तों में बदलाव" : "13. Changes to Terms",
            content: isHindi 
                ? "शिवसेतु बिना किसी पूर्व सूचना के किसी भी समय इन नियमों और शर्तों को अपडेट या संशोधित करने का अधिकार सुरक्षित रखता है।"
                : "ShivSetu reserves the right to update or modify these Terms & Conditions at any time without prior notice."
        },
        {
            id: 14,
            title: isHindi ? "14. संपर्क जानकारी" : "14. Contact Information",
            content: isHindi 
                ? "इन नियमों और शर्तों के संबंध में किसी भी प्रश्न या सहायता के लिए संपर्क करें:\n• वेबसाइट: shivsetu.com\n• ईमेल: support@shivsetu.com\n• फोन: +91-XXXXXXXXXX"
                : "For any questions or support regarding these Terms & Conditions, contact:\n• Website: shivsetu.com\n• Email: support@shivsetu.com\n• Phone: +91-XXXXXXXXXX"
        }
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(`section-${id}`);
        if (element) {
            const yOffset = -120; // accounting for sticky header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-ibm pb-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#e14503]/5 via-amber-50/30 to-white border-b border-gray-100 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center text-xs md:text-sm text-gray-500 gap-2 mb-6">
                        <Link to="/" className="hover:text-gray-900 transition-colors">
                            {isHindi ? "होम" : "Home"}
                        </Link>
                        <FaChevronRight className="text-gray-400 text-[10px]" />
                        <span className="text-gray-900 font-medium">
                            {isHindi ? "नियम और शर्तें" : "Terms & Conditions"}
                        </span>
                    </nav>

                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e14503]/10 text-[#e14503] mb-6">
                            <FaFileContract className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                            {isHindi ? "नियम और शर्तें" : "Terms & Conditions"}
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 font-medium">
                            {isHindi ? "प्रभावी तिथि: २५ मई २०२६" : "Effective Date: 25 May 2026"}
                        </p>
                        <p className="text-gray-600 mt-6 leading-relaxed max-w-2xl">
                            {isHindi 
                                ? "शिवसेतु में आपका स्वागत है। हमारी वेबसाइट और सेवाओं का उपयोग करके, आप इन नियमों और शर्तों का पालन करने के लिए सहमत हैं। कृपया उपयोग करने से पहले इन्हें ध्यान से पढ़ें।"
                                : "Welcome to ShivSetu. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our platform."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Sidebar navigation */}
                    <div className="hidden lg:block lg:col-span-1 sticky top-32 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm max-h-[75vh] overflow-y-auto">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
                            {isHindi ? "सामग्री सूची" : "Table of Contents"}
                        </p>
                        <ul className="space-y-1">
                            {termsData.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all duration-200 ${
                                            activeSection === item.id
                                                ? 'bg-[#e14503]/10 text-[#e14503] font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        {item.title.split('. ')[1]}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {termsData.map((item) => (
                            <motion.div
                                key={item.id}
                                id={`section-${item.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:border-[#e14503]/20 transition-all duration-300"
                                onViewportEnter={() => setActiveSection(item.id)}
                            >
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <span>{item.title}</span>
                                </h2>
                                
                                <div className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    {item.content.split('\n').map((paragraph, index) => {
                                        if (paragraph.startsWith('•')) {
                                            return (
                                                <ul key={index} className="list-disc pl-5 mt-2 space-y-1">
                                                    <li>{paragraph.substring(2)}</li>
                                                </ul>
                                            );
                                        }
                                        return <p key={index} className="mb-3">{paragraph}</p>;
                                    })}
                                </div>
                            </motion.div>
                        ))}

                        {/* Direct Contact Card at the bottom */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 md:p-8 shadow-md">
                            <h3 className="text-lg md:text-xl font-bold mb-4">
                                {isHindi ? "सहायता चाहिए?" : "Need Assistance?"}
                            </h3>
                            <p className="text-gray-300 text-xs md:text-sm mb-6 leading-relaxed">
                                {isHindi 
                                    ? "यदि आपके पास इन नियमों और शर्तों के बारे में कोई प्रश्न हैं, तो हमारी सहायता टीम आपकी मदद के लिए हमेशा उपलब्ध है।"
                                    : "If you have any questions or queries regarding these Terms & Conditions, our legal and support teams are here to help you."}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <FaEnvelope className="text-[#e14503] w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">{isHindi ? "ईमेल करें" : "Email Us"}</p>
                                        <a href="mailto:support@shivsetu.com" className="text-xs md:text-sm font-semibold hover:underline">support@shivsetu.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <FaPhone className="text-[#e14503] w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">{isHindi ? "कॉल करें" : "Call Us"}</p>
                                        <a href="tel:+91-XXXXXXXXXX" className="text-xs md:text-sm font-semibold hover:underline">+91-XXXXXXXXXX</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <FaGlobe className="text-[#e14503] w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">{isHindi ? "वेबसाइट" : "Website"}</p>
                                        <a href="https://shivsetu.com" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-semibold hover:underline">shivsetu.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
