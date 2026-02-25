import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
    FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCheckCircle, FaArrowLeft,
    FaShareAlt, FaStar, FaChevronDown, FaChevronUp, FaPlay, FaUserFriends,
    FaOm, FaInfoCircle, FaChevronRight
} from 'react-icons/fa';
import SafeImage from '../../components/common/SafeImage';
import { AnimatePresence, motion } from 'framer-motion';
// import pujas from '../../data/pujas';
import { useDispatch, useSelector } from 'react-redux';
import { getHomedata } from '../../features/home/HomeSlice';
import { getPujaWithSlug } from '../../features/puja/PujaSlice';

const SectionTitle = ({ title, showViewAll = false }) => (
    <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {showViewAll && <button className="text-orange-600 text-sm font-semibold">View All</button>}
    </div>
);

const AccordionItem = ({ title, children, isOpen, onClick, icon: Icon }) => (
    <div className="border-b border-gray-100 last:border-none">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                {Icon && <div className="text-orange-500 bg-orange-50 p-2 rounded-full"><Icon size={14} /></div>}
                <span className="font-semibold text-gray-800 text-left">{title}</span>
            </div>
            {isOpen ? <FaChevronUp className="text-gray-400" size={14} /> : <FaChevronDown className="text-gray-400" size={14} />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);



const PujaDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isHindi } = useLanguage();
    const  { pujaDetails }  = useSelector((state) => state.puja);
    const pujas = pujaDetails?.pujas;

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getPujaWithSlug(slug))
    },[dispatch,slug])

    
    const images = pujas?.gallery.length > 0 ? JSON.parse(pujas?.gallery) : [];
    

    // State
    const [activeSection, setActiveSection] = useState('about');
    const [selectedPackage, setSelectedPackage] = useState(1);
    const [expandedAccordion, setExpandedAccordion] = useState('benefits');
    const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 8, mins: 12, secs: 25 });


   const process= [
            { title: "Booking", desc: "Select package & provide details" },
            { title: "Sankalp", desc: "Pandit ji takes sankalp with your name" },
            { title: "Puja Performance", desc: "Rituals performed at the temple" },
            { title: "Prasad", desc: "Holy prasad shipped to your home" },
        ];
      const  benefits = ["Removal of negative energy and evil eye.", "Victory over enemies and legal disputes.", "Production health and prosperity.", "Peace of mind and family harmony."];
       const temple = "The Nagchandreshwar Mandir in Ujjain is a rare temple devoted to Lord Shiva. It opens only once a year on Nag Panchami, making it incredibly significant for special prayers.";
       const faqs = [
            { q: "Is physical presence required?", a: "No, this is an online puja performed on your behalf." },
            { q: "When will I get Prasad?", a: "Prasad is dispatched within 48 hours of the puja." },
        ]


    // Mock Data
    // Find Puja Data
    // const puja = pujas.find(p => p.id === parseInt(id));

    // if (!puja) {
    //     return <div className="min-h-screen flex items-center justify-center">Puja not found</div>;
    // }

    // Merged Data (Preserving detail-specific fields while using global ID/Title/Image)
    // const pujas = {
    //     ...puja,
    //     // Mocking detail fields that are not in the list view data yet
    //     joined: 1250,
    //     images: [
    //         puja.image,
    //         "https://images.unsplash.com/photo-1604514787989-18342203e06f?q=80&w=1200",
    //         "https://images.unsplash.com/photo-1542450372-749c8922c0b9?q=80&w=1200"
    //     ],
    //     packages: [
    //         {
    //             id: 1,
    //             name: "One Member",
    //             subtitle: "For 1 Person",
    //             price: 991,
    //             image: "/Images/puja/one_member_puja_1771394742279.png", // Updated to match user file
    //             features: [
    //                 "On Puja Day, pandit ji will perform the puja rituals & call out your name and gotra in sankalp",
    //                 "After puja completion, you will receive a video of the puja ceremony with your name-gotra on Whatsapp and email",
    //                 "After selection in offerings, Sacred puja prasad will be delivered to your home"
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "2 Members",
    //             subtitle: "For Couple",
    //             price: 1501,
    //             image: "/Images/puja/puja_two_members_1771395618244.png", // Updated to match user file
    //             features: [
    //                 "On Puja Day, pandit ji will perform the puja rituals & call out names and gotras of 2 members in sankalp",
    //                 "After puja completion, you will receive a video of the puja ceremony with your name-gotra on Whatsapp and email",
    //                 "After selection in offerings, Sacred puja prasad will be delivered to your home"
    //             ]
    //         },
    //         {
    //             id: 3,
    //             name: "4 Members",
    //             subtitle: "For Family",
    //             price: 2501,
    //             image: "/Images/puja/four_members_puja_1771394861412.png", // Updated to match user file
    //             features: [
    //                 "On Puja Day, pandit ji will perform the puja rituals & call out names and gotras of 4 members in sankalp",
    //                 "After puja completion, you will receive a video of the puja ceremony with your name-gotra on Whatsapp and email",
    //                 "After selection in offerings, Sacred puja prasad will be delivered to your home"
    //             ]
    //         },
    //         {
    //             id: 4,
    //             name: "6 Members",
    //             subtitle: "For Big Family",
    //             price: 3501,
    //             image: "/Images/puja/six_members_puja_1771394943349.png", // Updated to match user file
    //             features: [
    //                 "On Puja Day, pandit ji will perform the puja rituals & call out names and gotras of 6 members in sankalp",
    //                 "After puja completion, you will receive a video of the puja ceremony with your name-gotra on Whatsapp and email",
    //                 "After selection in offerings, Sacred puja prasad will be delivered to your home"
    //             ]
    //         },
    //     ],
    //     process: [
    //         { title: "Booking", desc: "Select package & provide details" },
    //         { title: "Sankalp", desc: "Pandit ji takes sankalp with your name" },
    //         { title: "Puja Performance", desc: "Rituals performed at the temple" },
    //         { title: "Prasad", desc: "Holy prasad shipped to your home" },
    //     ],
    //     benefits: ["Removal of negative energy and evil eye.", "Victory over enemies and legal disputes.", "Production health and prosperity.", "Peace of mind and family harmony."],
    //     temple: "The Nagchandreshwar Mandir in Ujjain is a rare temple devoted to Lord Shiva. It opens only once a year on Nag Panchami, making it incredibly significant for special prayers.",
    //     faqs: [
    //         { q: "Is physical presence required?", a: "No, this is an online puja performed on your behalf." },
    //         { q: "When will I get Prasad?", a: "Prasad is dispatched within 48 hours of the puja." },
    //     ]
    // };

    // Scroll to section handler
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-3 font-ibm">

            <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center pointer-events-none md:hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white shadow-md pointer-events-auto border border-white/20"
                >
                    <FaArrowLeft size={18} />
                </button>
                <div className="flex gap-3 pointer-events-auto">
                    <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white shadow-md border border-white/20">
                        <FaShareAlt size={18} />
                    </button>
                </div>
            </div>

            <div className="relative h-[60vh] md:h-[500px] w-full bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <div className="flex w-full h-full overflow-hidden">
                        {images?.map((img, idx) => (
                            <div key={idx} className="min-w-full h-full relative transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${0 * 100}%)` }}>
                                <SafeImage src={img} type="pujas/" alt={`Slide ${idx}`} className="w-full h-full object-cover opacity-60" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20 pb-8 md:pb-12">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-orange-400 mb-3">
                                <FaMapMarkerAlt /> {pujas?.location}
                            </div>
                            <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md">
                                {pujas?.puja_name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs md:text-sm">
                                    <FaUserFriends className="text-orange-400" /> {pujas?.joined || 1000}+ Joined
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs md:text-sm">
                                    <FaCalendarAlt className="text-orange-400" /> {pujas?.date}
                                </span>
                                <span className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs md:text-sm">
                                    <FaClock className="text-orange-400" /> {pujas?.puja_duration || "2-3 Hours"}
                                </span>
                            </div>

                            <div className="inline-flex items-center gap-4 bg-orange-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg border border-orange-500/50">
                                <span className="text-xs font-bold uppercase tracking-wide opacity-90">Booking Closes In:</span>
                                <div className="flex gap-1.5 text-sm md:text-base font-bold font-mono">
                                    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.days}d</div> :
                                    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.hours}h</div> :
                                    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.mins}m</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex overflow-x-auto gap-6 md:gap-8 scrollbar-hide">
                        {['About', 'Packages', 'Process', 'Reviews'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeSection === item.toLowerCase()
                                    ? 'border-orange-600 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {item.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:container md:mx-auto md:px-4 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN (Content) */}
                    <div className="lg:col-span-2 space-y-6 pt-4  md:pb-0 px-4 md:px-0 bg-gray-50 md:bg-transparent">

                        {/* 1. About Puja */}
                        <div id="about" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <SectionTitle title={isHindi ? "पूजा के बारे में" : "About Puja"} />
                            <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                {pujas?.description}
                            </p>
                        </div>

                        {/* 2. Packages - Horizontal Scroll on Mobile, Grid on Desktop */}
                        {/* 2. Packages - New Design */}
                        <div id="packages" className="space-y-4">
                            <SectionTitle title={isHindi ? "पूजा पैकेज" : "Select Puja Package"} />

                            {/* Package Selection Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {pujas?.packages.map((pkg) => {
                                    const isSelected = selectedPackage === pkg.id;
                                    return (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${isSelected
                                                ? 'border-orange-500 bg-orange-50/50 shadow-md'
                                                : 'border-gray-100 bg-white hover:border-orange-200'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 z-10">
                                                    <FaCheckCircle className="text-green-500 bg-white rounded-full" size={18} />
                                                </div>
                                            )}

                                            {/* Image Area */}
                                            <div className="h-24 bg-gray-100 relative">
                                                <SafeImage src={pkg.image} type="packages/" className="w-full h-full object-cover" />
                                            </div>

                                            <div className="p-2 text-center pb-8"> {/* Added padding bottom for the floating price tag */}
                                                <div className={`text-sm font-bold ${isSelected ? 'text-orange-600' : 'text-gray-700'}`}>
                                                    {pkg.name}
                                                </div>
                                            </div>

                                            {/* Price Tag at Bottom */}
                                            <div className={`absolute bottom-0 left-0 w-full py-1 text-center font-bold text-sm ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                ₹{pkg.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Selected Package Details */}
                            <div className="border-2 border-orange-400 rounded-xl p-5 bg-white relative mt-4">
                                {/* Triangle Pointer using CSS clip-path or simple border hack - simplified here with absolute div */}
                                {/* Note: A proper CSS triangle would need precise positioning based on the selected card, which is complex in this grid. 
                                    For now, we'll keep the box self-contained. */}

                                <h3 className="text-center text-lg font-bold text-orange-600 mb-4">
                                    {pujas?.packages.find(p => p.id === selectedPackage)?.name}
                                </h3>

                               
                              <div
                                    className="text-sm text-gray-700 leading-relaxed space-y-2"
                                    dangerouslySetInnerHTML={{
                                        __html: pujas?.packages?.find(
                                        p => p.id === Number(selectedPackage)
                                        )?.description || ""
                                    }}
                                    />

                                <ul className="space-y-4 mb-6">
                                    {/* {pujas?.packages.find(p => p.id === selectedPackage)?.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <div className="w-5 h-5 rounded-full border border-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <div className="w-3 h-3 rounded-full bg-orange-100"></div> 
                                            </div>
                                            <span className="text-sm text-gray-700 leading-snug">{feature}</span>
                                        </li>
                                    ))} */}
                                </ul>

                                <button
                                    onClick={() => navigate(`/puja/book/${slug}?pkg=${selectedPackage}`)}
                                    className="w-full bg-[#1da040] hover:bg-[#168a33] text-white py-3.5 rounded-lg font-bold text-base shadow-sm uppercase tracking-wide transition-colors"
                                >
                                    Participate Now
                                </button>
                            </div>
                        </div>

                        {/* 3. Process Timeline */}
                        <div id="process" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <SectionTitle title={isHindi ? "पूजा प्रक्रिया" : "Puja Process"} />
                            <div className="space-y-8 relative ml-2 mt-4">
                                {/* Vertical Line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                {process.map((step, idx) => (
                                    <div key={idx} className="relative flex items-start gap-5">
                                        <div className="z-10 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white shadow-sm mt-1"></div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Puja Glimpses (Video) */}
                        <div id="glimpses">
                            <SectionTitle title={isHindi ? "झलकियाँ" : "Glimpses of Puja"} />
                            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                                <SafeImage
                                    src={pujas?.image}
                                    type='pujas/'
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 pl-1 shadow-2xl group-hover:scale-110 transition-transform">
                                        <FaPlay className="text-white drop-shadow-md" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Benefits & More (Accordions) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                            <AccordionItem
                                title={isHindi ? "लाभ" : "Benefits"}
                                icon={FaCheckCircle}
                                isOpen={expandedAccordion === 'benefits'}
                                onClick={() => setExpandedAccordion(expandedAccordion === 'benefits' ? null : 'benefits')}
                            >
                                <ul className="space-y-3">
                                    {benefits.map((b, i) => (
                                        <li key={i} className="flex gap-3 text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionItem>

                            <AccordionItem
                                title={isHindi ? "मंदिर विवरण" : "Temple Details"}
                                icon={FaOm}
                                isOpen={expandedAccordion === 'temple'}
                                onClick={() => setExpandedAccordion(expandedAccordion === 'temple' ? null : 'temple')}
                            >
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                        <SafeImage src={pujas?.image} type='pujas/' className="w-full h-full object-cover" />
                                    </div>
                                    <p>{pujas?.temple}</p>
                                </div>
                            </AccordionItem>

                            <AccordionItem
                                title={isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQs"}
                                icon={FaInfoCircle}
                                isOpen={expandedAccordion === 'faq'}
                                onClick={() => setExpandedAccordion(expandedAccordion === 'faq' ? null : 'faq')}
                            >
                                <div className="space-y-4">
                                    {faqs.map((f, i) => (
                                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-bold text-gray-800 mb-1 text-xs">{f.q}</p>
                                            <p className="text-gray-600">{f.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </AccordionItem>
                        </div>

                        {/* 6. Reviews Preview */}
                        <div id="reviews" className="pb-8">
                            <SectionTitle title="Devotee Reviews" showViewAll />
                            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x">
                                {[1, 2, 3].map((r) => (
                                    <div key={r} className="min-w-[280px] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm snap-center hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
                                                <SafeImage src={`https://i.pravatar.cc/100?img=${r + 10}`} className="w-full h-full" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">Rahul Sharma</h4>
                                                <div className="flex text-yellow-400 text-[10px] gap-0.5">
                                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 italic">
                                            "Absolutely divine experience. The pandit ji was very knowledgeable and the sankalp provided me great peace of mind."
                                        </p>
                                    </div>
                                ))}
                                <div className="w-2 shrink-0 md:hidden"></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sticky Booking Widget) */}
                    <div className="hidden lg:block lg:col-span-1 sticky top-24">
                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100px] -z-0"></div>

                            <h3 className="text-xl font-bold mb-6 relative z-10">Book this Puja</h3>

                            <div className="space-y-4 mb-8 relative z-10">
                                {pujas?.packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${selectedPackage === pkg.id
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <div>
                                            <div className="font-bold text-gray-900">{pkg.name}</div>
                                            <div className="text-xs text-gray-500">{pkg.persons}</div>
                                        </div>
                                        <div className="font-bold text-orange-600">₹{pkg.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                                <span className="text-gray-500 text-sm">Total Amount</span>
                                <span className="text-2xl font-bold text-gray-900">₹{pujas?.packages.find(p => p.id === selectedPackage)?.price}</span>
                            </div>

                            <button
                                onClick={() => navigate(`/puja/book/${id}?pkg=${selectedPackage}`)}
                                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transform hover:-translate-y-1 transition-all"
                            >
                                Book Now
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <FaCheckCircle className="text-green-500" />
                                <span>Secure Payment • Verified Pandits</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* MOBILE STICKY FOOTER - Premium Glassmorphism Design */}
            <div className="fixed bottom-[60px] left-0 w-full z-[100] md:hidden">
                {/* Gradient overlay to fade content behind footer */}
                <div className="h-12 w-full bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>

                <div className="bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total Amount</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-900 leading-none">
                                ₹{pujas?.packages.find(p => p.id === selectedPackage)?.price}
                            </span>
                            <span className="text-xs text-gray-400 line-through">₹{Math.round(pujas?.packages.find(p => p.id === selectedPackage)?.price * 1.2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(`/puja/book/${id}?pkg=${selectedPackage}`)}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                        Book Now <FaChevronRight size={12} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PujaDetails;
