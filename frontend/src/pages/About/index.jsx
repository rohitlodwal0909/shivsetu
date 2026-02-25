import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaQuoteLeft, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
    const { isHindi } = useLanguage();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const teamMembers = [
        {
            id: 1,
            name: isHindi ? "विक्रम सिंह" : "Vikram Singh",
            role: isHindi ? "संस्थापक और सीईओ" : "Founder & CEO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            bio: isHindi
                ? "तकनीक के माध्यम से सांस्कृतिक विरासत को संरक्षित करने का विजनरी लीडर।"
                : "Visionary leader with a passion for preserving cultural heritage through technology.",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            id: 2,
            name: isHindi ? "प्रिया शर्मा" : "Priya Sharma",
            role: isHindi ? "परिचालन प्रमुख" : "Head of Operations",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
            bio: isHindi
                ? "स्टोर से आपके घर तक निर्बाध अनुभव सुनिश्चित करना।"
                : "Ensuring seamless experiences from our store to your doorstep.",
            social: { linkedin: "#", instagram: "#" }
        },
        {
            id: 3,
            name: isHindi ? "अमित पटेल" : "Amit Patel",
            role: isHindi ? "उत्पाद प्रबंधक" : "Product Manager",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
            bio: isHindi
                ? "परंपरा और आधुनिकता के बीच डिजिटल पुल बनाना।"
                : "Crafting the digital bridge between tradition and modernity.",
            social: { twitter: "#", instagram: "#" }
        },
        {
            id: 4,
            name: isHindi ? "स्नेहा गुप्ता" : "Sneha Gupta",
            role: isHindi ? "लीड डिज़ाइनर" : "Lead Designer",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
            bio: isHindi
                ? "हमारी दृश्य पहचान के हर पिक्सेल में कहानियाँ बुनना।"
                : "Weaving stories into every pixel of our visual identity.",
            social: { linkedin: "#", instagram: "#" }
        }
    ];

    const stats = [
        { label: isHindi ? "खुश ग्राहक" : "Happy Customers", value: "50K+" },
        { label: isHindi ? "उत्पाद" : "Products", value: "1000+" },
        { label: isHindi ? "शहर कवर किए गए" : "Cities Covered", value: "100+" },
        { label: isHindi ? "विश्वास के वर्ष" : "Years of Trust", value: "5+" }
    ];

    const values = [
        {
            id: 1,
            icon: <FaGlobe className="w-8 h-8 text-[#e14503]" />,
            title: isHindi ? "राष्ट्रीय पहुँच" : "Pan‑India Presence",
            description: isHindi
                ? "भारत के दर्जनों शहरों में विश्वसनीय डिलीवरी और सेवाएँ, ताकि आस्था की हर ज़रूरत समय पर पूरी हो।"
                : "Trusted deliveries and services across India so every spiritual need is served on time."
        },
        {
            id: 2,
            icon: <FaQuoteLeft className="w-8 h-8 text-[#e14503]" />,
            title: isHindi ? "विश्वास और पारदर्शिता" : "Trust & Transparency",
            description: isHindi
                ? "हर उत्पाद, हर सेवा और हर बुकिंग में स्पष्ट जानकारी और ईमानदारी हमारी पहली प्राथमिकता है।"
                : "From products to bookings, clear information and honesty sit at the core of everything we do."
        },
        {
            id: 3,
            icon: <FaInstagram className="w-8 h-8 text-[#e14503]" />,
            title: isHindi ? "आधुनिक अनुभव" : "Modern Experience",
            description: isHindi
                ? "परंपरा की गरिमा को बनाए रखते हुए, हम आपको एक सहज और आधुनिक ऑनलाइन अनुभव देते हैं।"
                : "We offer a smooth, modern online experience while preserving the dignity of traditions."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-white font-ibm overflow-hidden">
            {/* Hero – Clean, two-column */}
            <section
                ref={heroRef}
                className="relative bg-gray-50 border-b border-gray-100"
            >
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6 md:space-y-8"
                    >
                        <nav className="flex items-center text-xs md:text-sm text-gray-500 gap-2">
                            <span className="hover:text-gray-900 cursor-pointer transition-colors">
                                {isHindi ? "होम" : "Home"}
                            </span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-900 font-medium">
                                {isHindi ? "हमारे बारे में" : "About Us"}
                            </span>
                        </nav>

                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
                            {isHindi ? "ब्रांड के पीछे की कहानी" : "The Story Behind The Brand"}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
                            {isHindi
                                ? "जहाँ आस्था मिलती है आधुनिक, भरोसेमंद अनुभव से"
                                : "Where faith meets a modern, trustworthy experience."}
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                            {isHindi
                                ? "हम एक साधारण ई‑कॉमर्स स्टोर नहीं, बल्कि आपका डिजिटल आध्यात्मिक साथी हैं – जो सही उत्पाद, सही सेवा और सही जानकारी एक ही जगह लाता है।"
                                : "We are not just another store; we are your digital spiritual companion—bringing the right products, services, and guidance together in one place."}
                        </p>

                        <div className="grid grid-cols-3 gap-4 md:gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-100 bg-white px-4 py-3 md:px-5 md:py-4"
                                >
                                    <p className="text-lg md:text-2xl font-semibold text-[#e14503]">
                                        {stat.value}
                                    </p>
                                    <p className="text-[11px] md:text-xs font-medium text-gray-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y, opacity }}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative h-64 md:h-80 lg:h-[360px]"
                    >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#e14503]/10 via-amber-100/40 to-white" />
                        <img
                            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80"
                            alt={isHindi ? "टीम द्वारा काम करते हुए" : "Team working in studio"}
                            className="absolute inset-4 rounded-2xl object-cover shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
                        />
                        <div className="absolute -bottom-6 left-6 rounded-2xl bg-white shadow-md px-4 py-3 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#e14503]/10 flex items-center justify-center">
                                <span className="text-xs font-semibold text-[#e14503]">24×7</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-900">
                                    {isHindi ? "समर्पित सपोर्ट" : "Dedicated support"}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    {isHindi ? "पूजा, यात्रा और ऑर्डर – सब एक साथ" : "For rituals, travel & orders—under one roof."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Who we are + Mission / Vision */}
            <section className="py-16 md:py-20 lg:py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6 md:space-y-7"
                    >
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
                            {isHindi ? "हम कौन हैं" : "Who We Are"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                            {isHindi
                                ? "आस्था से जुड़ी हर छोटी‑बड़ी जरूरत के लिए एक ही प्लेटफॉर्म"
                                : "One destination for every detail of your spiritual life."}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                            {isHindi
                                ? "ऑनलाइन पूजा सामग्री ढूँढना, सही पंडित बुक करना या भरोसेमंद यात्रा की योजना बनाना हमेशा आसान नहीं होता। हम यही परेशानी दूर करने आए हैं – क्यूरेटेड उत्पादों, वेरिफाइड सेवाओं और आसान डिजिटल अनुभव के साथ।"
                                : "Finding authentic puja items, booking the right priest, or planning a reliable spiritual trip is not always simple. We solve this by bringing curated products, verified services, and a seamless digital experience together."}
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                            {isHindi
                                ? "हमारी टीम टेक्नोलॉजी और परंपरा – दोनों को बराबर महत्व देती है, ताकि आप आधुनिक सुविधा के साथ आस्था की purity भी महसूस कर सकें।"
                                : "Our team values both technology and tradition equally, so you enjoy modern convenience without compromising on the purity of your faith."}
                        </p>

                        <div className="mt-6 grid md:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-1">
                                    {isHindi ? "भरोसा" : "Trust First"}
                                </p>
                                <p className="text-sm text-gray-700">
                                    {isHindi
                                        ? "हर लिस्टेड उत्पाद और सेवा को मैन्युअली वेरिफाई किया जाता है।"
                                        : "Every product and service is manually reviewed before it reaches you."}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-1">
                                    {isHindi ? "सिंपल एक्सपीरियंस" : "Simple Experience"}
                                </p>
                                <p className="text-sm text-gray-700">
                                    {isHindi
                                        ? "पूजा बुकिंग से लेकर डिलीवरी तक, सब कुछ few‑clicks में।"
                                        : "From booking rituals to doorstep delivery—everything in just a few clicks."}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="space-y-4"
                    >
                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 md:p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e14503] mb-1">
                                {isHindi ? "मिशन" : "Mission"}
                            </p>
                            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                {isHindi
                                    ? "आस्था की हर journey को confusion‑free, transparent और accessible बनाना – चाहे वो घर की छोटी सी पूजा हो या दूरस्थ तीर्थ यात्रा।"
                                    : "To make every spiritual journey confusion‑free, transparent, and accessible—from a small home ritual to a once‑in‑a‑lifetime pilgrimage."}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 md:p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 mb-1">
                                {isHindi ? "विजन" : "Vision"}
                            </p>
                            <p className="text-sm md:text-base text-amber-900 leading-relaxed">
                                {isHindi
                                    ? "भारत और दुनिया के हर घर के लिए ऐसा प्लेटफॉर्म बनना जिस पर आँख बंद करके भरोसा किया जा सके जब बात faith, rituals और culture की हो।"
                                    : "To be the platform families instinctively trust whenever they think of faith, rituals, and culture—whether in India or abroad."}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values – clean cards */}
            <section className="py-16 md:py-20 lg:py-24 bg-gray-50 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
                                {isHindi ? "हमारे प्रिंसिपल" : "Our Principles"}
                            </p>
                            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
                                {isHindi
                                    ? "तीन चीजें जो हमें अलग बनाती हैं"
                                    : "Three things that make us different."}
                            </h2>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        {values.map((value) => (
                            <motion.div
                                key={value.id}
                                variants={itemVariants}
                                className="rounded-2xl border border-gray-100 bg-white p-6 md:p-7 flex flex-col gap-3 hover:border-[#e14503]/70 transition-colors"
                            >
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e14503]/10 text-[#e14503]">
                                    {value.icon}
                                </div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline / How it works */}
            <section className="py-16 md:py-20 lg:py-24 bg-white px-4 border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
                            {isHindi ? "हमारा तरीका" : "How It Works"}
                        </p>
                        <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
                            {isHindi
                                ? "आपकी faith‑journey के हर स्टेप पर साथ"
                                : "With you at every step of your faith journey."}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 md:gap-8">
                        {[
                            isHindi ? "खोजें" : "Discover",
                            isHindi ? "चुनें" : "Choose",
                            isHindi ? "कनेक्ट करें" : "Connect",
                            isHindi ? "पूरा करें" : "Complete",
                        ].map((label, index) => (
                            <div
                                key={label}
                                className="relative rounded-2xl border border-gray-100 bg-gray-50/60 px-5 py-5 flex flex-col gap-2"
                            >
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                                    {index + 1}
                                </span>
                                <p className="text-sm font-semibold text-gray-900">{label}</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {index === 0 && (isHindi
                                        ? "क्यूरेटेड उत्पादों, पूजा किट्स और सेवाओं को आसानी से ब्राउज़ करें।"
                                        : "Browse curated products, puja kits, and trusted services in one clean interface.")}
                                    {index === 1 && (isHindi
                                        ? "transparent विवरण, रिव्यू और pricing के साथ compare कर के चुनें।"
                                        : "Compare options with transparent details, reviews, and pricing before you decide.")}
                                    {index === 2 && (isHindi
                                        ? "पंडित, सेवा‑पार्टनर या support टीम से सीधा connect रहें।"
                                        : "Stay directly connected with priests, partners, or our support team when you need help.")}
                                    {index === 3 && (isHindi
                                        ? "पूजा, यात्रा या डिलीवरी – सब समय पर और trackable तरीके से पूरा होता है।"
                                        : "Your ritual, journey, or delivery is completed on time, with live tracking and updates.")}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder & core team */}
            <section className="py-16 md:py-20 lg:py-24 bg-gray-50 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
                                {isHindi ? "लोग" : "People"}
                            </p>
                            <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
                                {isHindi
                                    ? "एक टीम जो सच‑मुच समझती है कि faith का value क्या है"
                                    : "A team that truly understands the value of faith."}
                            </h2>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[1.1fr_1.2fr] gap-10 lg:gap-14 items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
                                    VS
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {isHindi ? "विक्रम सिंह" : "Vikram Singh"}
                                    </p>
                                    <p className="text-[11px] uppercase tracking-[0.14em] text-gray-500">
                                        {isHindi ? "संस्थापक और सीईओ" : "Founder & CEO"}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                {isHindi
                                    ? "“हमने यह प्लेटफॉर्म सिर्फ products बेचने के लिए नहीं, बल्कि ऐसा space बनाने के लिए शुरू किया जहाँ लोग बेझिझक faith practice कर सकें – भले ही वो किसी भी शहर या देश में हों।”"
                                    : "“We didn’t start this platform just to sell products. We started it to create a space where people can practise their faith confidently—no matter which city or country they live in.”"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {isHindi
                                    ? "— विक्रम, हर feature को खुद end‑user की नज़र से टेस्ट करते हैं – ताकि experience साफ, simple और भरोसेमंद रहे।"
                                    : "— Vikram personally looks at each feature from an end‑user’s lens to keep the experience clean, simple, and trustworthy."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            className="grid md:grid-cols-3 gap-6"
                        >
                            {teamMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="rounded-2xl bg-white border border-gray-100 overflow-hidden flex flex-col"
                                >
                                    <div className="h-32 md:h-36 overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {member.name}
                                        </p>
                                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#e14503]">
                                            {member.role}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600 line-clamp-3">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
