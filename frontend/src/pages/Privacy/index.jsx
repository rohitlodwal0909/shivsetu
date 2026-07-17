import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaPhone, FaEnvelope, FaGlobe, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Privacy = () => {
    const { isHindi } = useLanguage();
    const [activeSection, setActiveSection] = useState(1);

    const privacyData = [
        {
            id: 1,
            title: isHindi ? "1. जानकारी जो हम एकत्र करते हैं" : "1. Information We Collect",
            content: isHindi 
                ? "हम उपयोगकर्ताओं से निम्नलिखित जानकारी एकत्र कर सकते हैं:\n\nव्यक्तिगत जानकारी:\n• पूरा नाम (Full Name)\n• मोबाइल नंबर (Mobile Number)\n• ईमेल पता (Email Address)\n• जन्म तिथि (Date of Birth)\n• पता (Address)\n• भुगतान की जानकारी (Payment Information)\n\nसेवा संबंधित जानकारी:\n• टैक्सी और यात्रा सेवाओं के लिए बुकिंग विवरण\n• पूजा प्राथमिकताएं और धार्मिक विवरण\n• ज्योतिष परामर्श विवरण जैसे कि जन्म तिथि, समय और स्थान\n\nतकनीकी जानकारी:\n• आईपी पता (IP Address)\n• ब्राउज़र प्रकार (Browser Type)\n• डिवाइस की जानकारी (Device Information)\n• कुकीज़ और उपयोग डेटा (Cookies & Usage Data)"
                : "We may collect the following information from users:\n\nPersonal Information:\n• Full Name\n• Mobile Number\n• Email Address\n• Date of Birth\n• Address\n• Payment Information\n\nService Related Information:\n• Booking details for taxi and yatra services\n• Pooja preferences and religious details\n• Astrology consultation details such as birth date, time, and place\n\nTechnical Information:\n• IP address\n• Browser type\n• Device information\n• Cookies and usage data"
        },
        {
            id: 2,
            title: isHindi ? "2. हम आपकी जानकारी का उपयोग कैसे करते हैं" : "2. How We Use Your Information",
            content: isHindi 
                ? "हम आपकी जानकारी का उपयोग निम्नलिखित के लिए करते हैं:\n• हमारी सेवाएं प्रदान करना और प्रबंधित करना\n• बुकिंग और परामर्श की पुष्टि करना\n• सुरक्षित रूप से भुगतान संसाधित करना\n• उपयोगकर्ता अनुभव में सुधार करना\n• बुकिंग अपडेट और सूचनाएं भेजना\n• ग्राहक सहायता अनुरोधों का जवाब देना\n• सुरक्षा बनाए रखना और धोखाधड़ी को रोकना"
                : "We use your information to:\n• Provide and manage our services\n• Confirm bookings and consultations\n• Process payments securely\n• Improve user experience\n• Send booking updates and notifications\n• Respond to customer support requests\n• Maintain security and prevent fraud"
        },
        {
            id: 3,
            title: isHindi ? "3. जानकारी साझा करना" : "3. Sharing of Information",
            content: isHindi 
                ? "हम आपकी व्यक्तिगत जानकारी को तीसरे पक्षों को बेचते या किराए पर नहीं देते हैं। हम निम्नलिखित भागीदारों के साथ सीमित जानकारी साझा कर सकते हैं ताकि सेवाएं प्रदान की जा सकें:\n• टैक्सी सेवा प्रदाता\n• पूजा आयोजक या पंडित\n• यात्रा भागीदार\n• भुगतान गेटवे प्रदाता\n• सरकारी अधिकारी यदि कानूनी रूप से आवश्यक हो"
                : "We do not sell or rent your personal information to third parties.\nWe may share limited information with:\n• Taxi service providers\n• Pooja organizers or pandits\n• Travel partners\n• Payment gateway providers\n• Government authorities if legally required"
        },
        {
            id: 4,
            title: isHindi ? "4. भुगतान सुरक्षा" : "4. Payment Security",
            content: isHindi 
                ? "सभी भुगतान सुरक्षित और एन्क्रिप्टेड भुगतान गेटवे के माध्यम से संसाधित किए जाते हैं। हम अपने सर्वर पर आपके डेबिट/क्रेडिट कार्ड के विवरण संग्रहीत नहीं करते हैं।"
                : "All payments are processed through secure payment gateways. We do not store your debit/credit card details on our servers."
        },
        {
            id: 5,
            title: isHindi ? "5. कुकीज़ नीति" : "5. Cookies Policy",
            content: isHindi 
                ? "हमारी वेबसाइट कुकीज़ का उपयोग निम्नलिखित कार्यों के लिए कर सकती है:\n• वेबसाइट की कार्यक्षमता में सुधार करना\n• उपयोगकर्ता प्राथमिकताओं को याद रखना\n• वेबसाइट ट्रैफ़िक का विश्लेषण करना\nउपयोगकर्ता चाहें तो अपने ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को अक्षम कर सकते हैं।"
                : "Our website may use cookies to:\n• Improve website functionality\n• Remember user preferences\n• Analyze website traffic\nUsers can disable cookies through browser settings if preferred."
        },
        {
            id: 6,
            title: isHindi ? "6. डेटा सुरक्षा" : "6. Data Protection",
            content: isHindi 
                ? "हम आपके डेटा को निम्नलिखित जोखिमों से बचाने के लिए उचित तकनीकी और संगठनात्मक सुरक्षा उपाय लागू करते हैं:\n• अनधिकृत पहुंच\n• डेटा का दुरुपयोग\n• परिवर्तन या प्रकटीकरण\nहालांकि, इंटरनेट पर कोई भी प्रसारण या इलेक्ट्रॉनिक स्टोरेज का तरीका 100% सुरक्षित नहीं है, इसलिए हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।"
                : "We implement appropriate security measures to protect your data from:\n• Unauthorized access\n• Data misuse\n• Alteration or disclosure\nHowever, no online platform can guarantee 100% security."
        },
        {
            id: 7,
            title: isHindi ? "7. उपयोगकर्ता के अधिकार" : "7. User Rights",
            content: isHindi 
                ? "उपयोगकर्ताओं के पास निम्नलिखित अधिकार हैं:\n• अपने व्यक्तिगत डेटा तक पहुंचना\n• गलत जानकारी को सुधारने का अनुरोध करना\n• डेटा को हटाने का अनुरोध करना\n• प्रचार या मार्केटिंग संचार से बाहर निकलना (Opt out)\nइन अधिकारों का उपयोग करने के लिए, कृपया नीचे दिए गए विवरणों का उपयोग करके हमसे संपर्क करें।"
                : "Users have the right to:\n• Access their personal data\n• Request correction of incorrect information\n• Request deletion of data\n• Opt out of promotional communications\nFor such requests, contact us using the details below."
        },
        {
            id: 8,
            title: isHindi ? "8. तृतीय-पक्ष लिंक" : "8. Third-Party Links",
            content: isHindi 
                ? "हमारी वेबसाइट में तृतीय-पक्ष वेबसाइटों या सेवाओं के लिंक हो सकते हैं। हम ऐसी बाहरी वेबसाइटों की गोपनीयता प्रथाओं या सामग्री के लिए ज़िम्मेदार नहीं हैं। हम आपको उनकी गोपनीयता नीतियों को पढ़ने की सलाह देते हैं।"
                : "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of external websites."
        },
        {
            id: 9,
            title: isHindi ? "9. बच्चों की गोपनीयता" : "9. Children’s Privacy",
            content: isHindi 
                ? "हमारी सेवाएं माता-पिता या अभिभावक की देखरेख के बिना 18 वर्ष से कम उम्र के बच्चों के लिए उपलब्ध नहीं हैं।"
                : "Our services are not intended for children under 18 years of age without parental supervision."
        },
        {
            id: 10,
            title: isHindi ? "10. गोपनीयता नीति में परिवर्तन" : "10. Changes to Privacy Policy",
            content: isHindi 
                ? "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। नीति के अपडेट किए गए संस्करणों को संशोधित प्रभावी तिथि के साथ तुरंत इस पृष्ठ पर पोस्ट किया जाएगा।"
                : "We may update this Privacy Policy from time to time. Updated versions will be posted on this page with the revised effective date."
        },
        {
            id: 11,
            title: isHindi ? "11. हमसे संपर्क करें" : "11. Contact Us",
            content: isHindi 
                ? "यदि आपके पास इस गोपनीयता नीति के संबंध में कोई प्रश्न हैं, तो आप हमसे संपर्क कर सकते हैं:\n• वेबसाइट: shivsetu.com\n• ईमेल: support@shivsetu.com\n• फोन: +91-XXXXXXXXXX"
                : "If you have any questions regarding this Privacy Policy, you may contact us:\n• Website: shivsetu.com\n• Email: support@shivsetu.com\n• Phone: +91-XXXXXXXXXX"
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
                            {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
                        </span>
                    </nav>

                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e14503]/10 text-[#e14503] mb-6">
                            <FaShieldAlt className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                            {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 font-medium">
                            {isHindi ? "प्रभावी तिथि: २५ मई २०२६" : "Effective Date: 25 May 2026"}
                        </p>
                        <p className="text-gray-600 mt-6 leading-relaxed max-w-2xl">
                            {isHindi 
                                ? "शिवसेतु में, हम आपकी गोपनीयता को महत्व देते हैं और आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं। यह नीति बताती है कि हमारी सेवाओं का उपयोग करते समय हम आपके डेटा को कैसे एकत्र और संसाधित करते हैं।"
                                : "At ShivSetu, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our services including Astro Consultation, Online Pooja Booking, Taxi Booking, and Yatra Booking services."}
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
                            {privacyData.map((item) => (
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
                        {privacyData.map((item) => (
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

                        {/* Contact details card */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 md:p-8 shadow-md">
                            <h3 className="text-lg md:text-xl font-bold mb-4">
                                {isHindi ? "गोपनीयता संबंधी प्रश्न?" : "Privacy Concerns?"}
                            </h3>
                            <p className="text-gray-300 text-xs md:text-sm mb-6 leading-relaxed">
                                {isHindi 
                                    ? "यदि हमारी गोपनीयता नीति या आपके डेटा अधिकारों के संबंध में कोई प्रश्न हैं, तो कृपया नीचे दिए गए माध्यमों से हमारी टीम से संपर्क करें।"
                                    : "If you have any questions or queries regarding this Privacy Policy or how your data is handled, feel free to get in touch with our team."}
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

export default Privacy;
