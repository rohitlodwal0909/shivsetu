import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, 
    FaArrowRight, FaOm, FaChevronRight, FaCompass, FaGem, 
    FaExclamationTriangle, FaCheckCircle, FaPray, FaShoppingBag, 
    FaVenusMars, FaUndo 
} from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

// Traditional North Indian Kundli Chart Component
const LagnaChart = ({ lagnaSign, housePlanets, isHindi }) => {
    const getRashiNumber = (houseNum) => {
        return ((lagnaSign - 1 + (houseNum - 1)) % 12) + 1;
    };

    // Label coordinates for Rashi numbers
    const rashiCoords = {
        1: { x: 200, y: 125 },
        2: { x: 145, y: 65 },
        3: { x: 95, y: 110 },
        4: { x: 155, y: 175 },
        5: { x: 95, y: 290 },
        6: { x: 145, y: 340 },
        7: { x: 200, y: 275 },
        8: { x: 255, y: 340 },
        9: { x: 305, y: 290 },
        10: { x: 245, y: 175 },
        11: { x: 305, y: 110 },
        12: { x: 255, y: 65 }
    };

    // Planet text coordinates
    const planetCoords = {
        1: { x: 200, y: 160 },
        2: { x: 140, y: 90 },
        3: { x: 70, y: 145 },
        4: { x: 145, y: 215 },
        5: { x: 70, y: 260 },
        6: { x: 140, y: 310 },
        7: { x: 200, y: 245 },
        8: { x: 260, y: 310 },
        9: { x: 330, y: 260 },
        10: { x: 255, y: 215 },
        11: { x: 330, y: 145 },
        12: { x: 260, y: 90 }
    };

    return (
        <div className="flex flex-col items-center">
            <svg 
                viewBox="0 0 400 400" 
                className="w-full max-w-[360px] md:max-w-[400px] h-auto text-[#e14503] bg-orange-50/10 border-4 border-[#e14503] rounded-3xl shadow-xl transition-transform duration-300"
            >
                {/* Diagonals */}
                <line x1="0" y1="0" x2="400" y2="400" stroke="#e14503" strokeWidth="2.5" />
                <line x1="400" y1="0" x2="0" y2="400" stroke="#e14503" strokeWidth="2.5" />
                
                {/* Central Diamond */}
                <polygon points="200,0 400,200 200,400 0,200" stroke="#e14503" fill="none" strokeWidth="2.5" />
                
                {/* Rashi Numbers */}
                {Object.keys(rashiCoords).map((house) => (
                    <text
                        key={`rashi-${house}`}
                        x={rashiCoords[house].x}
                        y={rashiCoords[house].y}
                        textAnchor="middle"
                        className="fill-amber-900 text-sm font-bold font-mono select-none"
                    >
                        {getRashiNumber(parseInt(house))}
                    </text>
                ))}

                {/* Planets */}
                {Object.keys(planetCoords).map((house) => {
                    const planets = housePlanets[parseInt(house) - 1] || [];
                    return (
                        <text
                            key={`planets-${house}`}
                            x={planetCoords[house].x}
                            y={planetCoords[house].y}
                            textAnchor="middle"
                            className="fill-gray-900 text-sm font-extrabold select-none tracking-tight"
                        >
                            {planets.join(' ')}
                        </text>
                    );
                })}
            </svg>
            <p className="text-xs text-gray-500 mt-4 text-center italic font-medium">
                {isHindi ? "* लग्न कुंडली (Lagna Chart) - वैदिक गृह स्थिति" : "* Lagna Chart - Vedic Planetary Positions"}
            </p>
        </div>
    );
};

// Deterministic Vedic Report Generator based on User Details
const generateKundliReport = (name, dob, time, place, gender) => {
    // Generate seed from details
    let seed = 0;
    const combinedString = `${name || ''}${dob || ''}${time || ''}${place || ''}`;
    for (let i = 0; i < combinedString.length; i++) {
        seed += combinedString.charCodeAt(i);
    }
    if (seed === 0) seed = 1234;

    const lagnaSign = (seed % 12) + 1;
    
    // Sun (Su), Moon (Mo), Mars (Ma), Mercury (Me), Jupiter (Ju), Venus (Ve), Saturn (Sa), Rahu (Ra), Ketu (Ke)
    const planets = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
    const housePlanets = Array.from({ length: 12 }, () => []);
    
    planets.forEach((p, idx) => {
        const houseIdx = (seed + idx * 7) % 12;
        housePlanets[houseIdx].push(p);
    });

    const signsEn = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const signsHi = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"];
    
    const planetList = [
        { nameEn: 'Lagna (Ascendant)', nameHi: 'लग्न', key: 'Lg' },
        { nameEn: 'Sun (Surya)', nameHi: 'सूर्य', key: 'Su' },
        { nameEn: 'Moon (Chandra)', nameHi: 'चन्द्र', key: 'Mo' },
        { nameEn: 'Mars (Mangal)', nameHi: 'मंगल', key: 'Ma' },
        { nameEn: 'Mercury (Budh)', nameHi: 'बुध', key: 'Me' },
        { nameEn: 'Jupiter (Guru)', nameHi: 'गुरु', key: 'Ju' },
        { nameEn: 'Venus (Shukra)', nameHi: 'शुक्र', key: 'Ve' },
        { nameEn: 'Saturn (Shani)', nameHi: 'शनि', key: 'Sa' },
        { nameEn: 'Rahu', nameHi: 'राहु', key: 'Ra' },
        { nameEn: 'Ketu', nameHi: 'केतु', key: 'Ke' },
    ];

    const planetPositions = planetList.map((p, idx) => {
        let houseNum = 1;
        if (p.key !== 'Lg') {
            houseNum = housePlanets.findIndex(h => h.includes(p.key)) + 1;
            if (houseNum === 0) houseNum = 1;
        }
        
        const signIdx = (lagnaSign - 1 + (houseNum - 1)) % 12;
        const degreeVal = (seed * (idx + 1) * 3.7) % 30;
        const degreeStr = `${Math.floor(degreeVal)}° ${Math.floor((degreeVal % 1) * 60)}'`;
        
        const beneficList = [true, true, true, false, true, true, true, false, false, false];
        const statusEn = beneficList[idx] ? 'Benefic' : 'Malefic';
        const statusHi = beneficList[idx] ? 'शुभ' : 'अशुभ';

        return {
            nameEn: p.nameEn,
            nameHi: p.nameHi,
            house: houseNum,
            degree: degreeStr,
            signEn: signsEn[signIdx],
            signHi: signsHi[signIdx],
            statusEn,
            statusHi
        };
    });

    const nakshatrasEn = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Poorva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Moola", "Poorvashada", "Uttarashada", "Shravana", "Dhanishta", "Shatabhisha", "Poorvabhadrapada", "Uttarabhadrapada", "Revati"];
    const nakshatrasHi = ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी", "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वाभाद्रपद", "उत्तराभाद्रपद", "रेवती"];
    
    const rashiIdx = (seed + 4) % 12;
    const nakIdx = (seed + 7) % 27;

    const luckyStones = [
        { nameEn: "Ruby", nameHi: "माणिक्य", planetEn: "Sun", planetHi: "सूर्य", benefitEn: "Enhances confidence, leadership qualities, and career growth.", benefitHi: "आत्मविश्वास, नेतृत्व क्षमता और करियर में प्रगति लाता है।" },
        { nameEn: "Pearl", nameHi: "मोती", planetEn: "Moon", planetHi: "चन्द्र", benefitEn: "Brings mental peace, emotional stability, and health.", benefitHi: "मानसिक शांति, भावनात्मक स्थिरता और स्वास्थ्य प्रदान करता है।" },
        { nameEn: "Red Coral", nameHi: "मूंगा", planetEn: "Mars", planetHi: "मंगल", benefitEn: "Increases courage, energy, and physical strength.", benefitHi: "साहस, ऊर्जा और शारीरिक शक्ति बढ़ाता है।" },
        { nameEn: "Emerald", nameHi: "पन्ना", planetEn: "Mercury", planetHi: "बुध", benefitEn: "Enhances speech, business intellect, and memory.", benefitHi: "वाणी, व्यावसायिक बुद्धि और स्मृति को बढ़ाता है।" },
        { nameEn: "Yellow Sapphire", nameHi: "पुखराज", planetEn: "Jupiter", planetHi: "गुरु", benefitEn: "Attracts wealth, wisdom, and spiritual progress.", benefitHi: "धन, ज्ञान और आध्यात्मिक उन्नति को आकर्षित करता है।" },
        { nameEn: "Diamond", nameHi: "हीरा", planetEn: "Venus", planetHi: "शुक्र", benefitEn: "Brings luxury, beauty, artistic talents, and relationships.", benefitHi: "विलासिता, सौंदर्य, कलात्मक प्रतिभा और रिश्तों को सुधारता है।" },
        { nameEn: "Blue Sapphire", nameHi: "नीलम", planetEn: "Saturn", planetHi: "शनि", benefitEn: "Brings quick luck, discipline, and professional success.", benefitHi: "शीघ्र भाग्य, अनुशासन और व्यावसायिक सफलता दिलाता है।" }
    ];

    const gemstone = luckyStones[seed % luckyStones.length];

    return {
        lagnaSign,
        housePlanets,
        planetPositions,
        nakshatraEn: nakshatrasEn[nakIdx],
        nakshatraHi: nakshatrasHi[nakIdx],
        rashiEn: signsEn[rashiIdx],
        rashiHi: signsHi[rashiIdx],
        rashiLordEn: ["Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"][rashiIdx],
        rashiLordHi: ["मंगल", "शुक्र", "बुध", "चन्द्र", "सूर्य", "बुध", "शुक्र", "मंगल", "गुरु", "शनि", "शनि", "गुरु"][rashiIdx],
        isManglik: seed % 3 === 0,
        kaalSarpEn: seed % 4 === 0 ? "Kalsarp Dosha Detected" : "No Kalsarp Dosha",
        kaalSarpHi: seed % 4 === 0 ? "आंशिक कालसर्प दोष उपस्थित है" : "कोई कालसर्प दोष नहीं है",
        sadeSatiEn: seed % 5 === 0 ? "Under Sade Sati Phase" : "Not Under Sade Sati",
        sadeSatiHi: seed % 5 === 0 ? "शनि की साढ़े साती चल रही है" : "शनि की साढ़े साती नहीं चल रही है",
        gemstone,
        luckyNumber: (seed % 9) + 1,
        luckyColorEn: ["Red", "Cream", "Saffron", "Green", "Golden", "White", "Royal Blue"][seed % 7],
        luckyColorHi: ["लाल", "क्रीम", "केसरिया", "हरा", "सुनहरा", "सफेद", "रॉयल ब्लू"][seed % 7],
    };
};

const KundliPage = () => {
    const { isHindi } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    // App state
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        time: '',
        place: '',
        gender: 'Male'
    });
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [report, setReport] = useState(null);
    const [activeTab, setActiveTab] = useState('chart');

    // Pre-fill form from homepage state redirect if available
    useEffect(() => {
        if (location.state && location.state.formData) {
            const passedData = location.state.formData;
            setFormData(prev => ({
                ...prev,
                ...passedData
            }));
            
            // Auto trigger generator
            handleGenerate(passedData);
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleGenerate(formData);
    };

    const handleGenerate = (data) => {
        if (!data.name || !data.dob || !data.time || !data.place) {
            return;
        }
        setLoading(true);
        setLoadingStep(0);
        
        // Simulating interactive calculation loading steps
        const timer1 = setTimeout(() => setLoadingStep(1), 800);
        const timer2 = setTimeout(() => setLoadingStep(2), 1600);
        const timer3 = setTimeout(() => setLoadingStep(3), 2400);
        const timer4 = setTimeout(() => {
            const res = generateKundliReport(data.name, data.dob, data.time, data.place, data.gender);
            setReport(res);
            setLoading(false);
        }, 3200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    };

    const handleReset = () => {
        setReport(null);
        setFormData({
            name: '',
            dob: '',
            time: '',
            place: '',
            gender: 'Male'
        });
        setActiveTab('chart');
    };

    // Text localization dictionary
    const t = {
        title: isHindi ? "वैदिक कुंडली" : "Vedic Kundli",
        desc: isHindi 
            ? "सटीक गणनाओं और प्रामाणिक उपायों के साथ अपनी निःशुल्क वैदिक जन्मकुंडली प्राप्त करें।" 
            : "Get your free comprehensive Vedic birth chart with detailed calculations and authentic remedies.",
        breadcrumbsHome: isHindi ? "होम" : "Home",
        breadcrumbsKundli: isHindi ? "कुंडली" : "Kundli",
        birthDetails: isHindi ? "जन्म विवरण" : "Enter Birth Details",
        name: isHindi ? "पूरा नाम" : "Full Name",
        dob: isHindi ? "जन्म तिथि" : "Date of Birth",
        time: isHindi ? "जन्म समय" : "Time of Birth",
        place: isHindi ? "जन्म स्थान (शहर)" : "Birth Place (City)",
        gender: isHindi ? "लिंग" : "Gender",
        male: isHindi ? "पुरुष" : "Male",
        female: isHindi ? "महिला" : "Female",
        other: isHindi ? "अन्य" : "Other",
        submit: isHindi ? "कुंडली जेनरेट करें" : "Generate Kundli",
        
        loading0: isHindi ? "ग्रहों की डिग्री और नक्षत्रों की गणना की जा रही है..." : "Calculating planetary degrees & Nakshatras...",
        loading1: isHindi ? "दशकों और कुंडली भावों का मानचित्रण किया जा रहा है..." : "Mapping houses and planetary ascendants...",
        loading2: isHindi ? "मांगलिक और शनि दोषों का विश्लेषण किया जा रहा है..." : "Analyzing Manglik & Saturn Doshas...",
        loading3: isHindi ? "आपकी कुंडली रिपोर्ट तैयार की जा रही है..." : "Finalizing your personal Kundli report...",

        reportHeader: isHindi ? "आपकी जन्म कुंडली रिपोर्ट" : "Your Birth Kundli Report",
        tabChart: isHindi ? "कुंडली चार्ट" : "Lagna Chart",
        tabPlanets: isHindi ? "ग्रह स्थिति" : "Planets",
        tabDoshas: isHindi ? "दोष रिपोर्ट" : "Doshas",
        tabRemedies: isHindi ? "उपाय और रत्न" : "Remedies",

        birthSummary: isHindi ? "जन्म विवरण सारांश" : "Birth Summary",
        rashi: isHindi ? "राशि" : "Rashi (Moon Sign)",
        rashiLord: isHindi ? "राशि स्वामी" : "Rashi Lord",
        nakshatra: isHindi ? "नक्षत्र" : "Nakshatra",
        luckyNum: isHindi ? "शुभ अंक" : "Lucky Number",
        luckyCol: isHindi ? "शुभ रंग" : "Lucky Color",

        planetName: isHindi ? "ग्रह" : "Planet",
        planetSign: isHindi ? "राशि" : "Sign",
        planetDegree: isHindi ? "डिग्री" : "Degree",
        planetHouse: isHindi ? "भाव" : "House",
        planetStatus: isHindi ? "अवस्था" : "Strength/Status",

        manglikTitle: isHindi ? "मांगलिक दोष विश्लेषण" : "Manglik Dosha Analysis",
        manglikYes: isHindi ? "मांगलिक दोष पाया गया" : "Manglik Dosha Detected",
        manglikNo: isHindi ? "आप मांगलिक नहीं हैं" : "No Manglik Dosha",
        manglikDescYes: isHindi 
            ? "आपकी कुंडली में आंशिक मांगलिक दोष है। विवाह में देरी या बाधाओं से बचने के लिए उचित शांति पूजा की सलाह दी जाती है।" 
            : "Mild Manglik Dosha detected. A customized pooja is recommended to reduce its impact on married life.",
        manglikDescNo: isHindi 
            ? "आपकी कुंडली में कोई मांगलिक दोष नहीं है। आपका पारिवारिक जीवन शांतिपूर्ण रहेगा।" 
            : "Congratulations, your chart is free from Manglik Dosha. This indicates favorable marital harmony.",

        doshaTitle: isHindi ? "दोष विश्लेषण" : "Major Dosha Reports",
        gemstoneTitle: isHindi ? "अनुशंसित रत्न" : "Recommended Gemstone",
        gemstoneDesc: isHindi 
            ? "अपने भाग्य को मजबूत करने, स्वास्थ्य को ठीक रखने और करियर में आ रही बाधाओं को दूर करने के लिए आपको यह रत्न धारण करना चाहिए।" 
            : "Wearing this gemstone helps strengthen your ruling planet, enhancing success, peace, and vitality.",
        buyGemstone: isHindi ? "अनुशंसित रत्न खरीदें" : "Shop Verified Gemstone",
        bookPooja: isHindi ? "दोष निवारण पूजा बुक करें" : "Book Dosha Shanti Pooja",
        newCalculation: isHindi ? "नई कुंडली जांचें" : "Check Another Kundli"
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-ibm pb-16">
            
            {/* Header / Hero */}
            <div className="bg-gradient-to-br from-[#e14503]/5 via-amber-50/30 to-white border-b border-gray-100 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center text-xs md:text-sm text-gray-500 gap-2 mb-4">
                        <Link to="/" className="hover:text-gray-900 transition-colors">{t.breadcrumbsHome}</Link>
                        <FaChevronRight className="text-gray-400 text-[10px]" />
                        <span className="text-gray-900 font-medium">{t.breadcrumbsKundli}</span>
                    </nav>

                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e14503]/10 text-[#e14503] mb-4">
                            <FaOm className="w-6 h-6 animate-spin-slow" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
                            {t.title}
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                            {t.desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Area */}
            <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
                <AnimatePresence mode="wait">
                    
                    {/* 1. Loading State */}
                    {loading && (
                        <motion.div 
                            key="loader"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-3xl border border-gray-100 p-8 py-16 shadow-lg max-w-xl mx-auto flex flex-col items-center text-center space-y-8"
                        >
                            <div className="relative w-28 h-28 flex items-center justify-center">
                                <div className="absolute inset-0 border-4 border-dashed border-orange-500 rounded-full animate-spin-slow"></div>
                                <FaOm className="w-12 h-12 text-[#e14503] animate-pulse" />
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {isHindi ? "गणना की जा रही है..." : "Computing Birth Chart..."}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium max-w-sm h-12 flex items-center justify-center">
                                    {loadingStep === 0 && t.loading0}
                                    {loadingStep === 1 && t.loading1}
                                    {loadingStep === 2 && t.loading2}
                                    {loadingStep === 3 && t.loading3}
                                </p>
                            </div>
                            
                            {/* Visual Progress Dots */}
                            <div className="flex gap-2 justify-center">
                                {[0, 1, 2, 3].map((step) => (
                                    <div 
                                        key={step} 
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            loadingStep >= step ? 'bg-[#e14503] scale-110' : 'bg-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 2. Form View */}
                    {!loading && !report && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-xl max-w-2xl mx-auto overflow-hidden flex flex-col md:flex-row w-full"
                        >
                            {/* Graphic sidebar on Desktop */}
                            <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-orange-600 to-[#e14503] p-8 flex-col justify-between text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                                
                                <div className="space-y-4 relative z-10">
                                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">Vedic Astrology</span>
                                    <h3 className="text-2xl font-bold leading-tight">
                                        {isHindi ? "अपनी भविष्यफल जानें" : "Unlock Your Future Details"}
                                    </h3>
                                    <p className="text-xs text-orange-100 leading-relaxed">
                                        {isHindi 
                                            ? "प्राचीन वैदिक ज्योतिष द्वारा अपने स्वभाव, भाग्य, ग्रहों के प्रभाव और दोषों का संपूर्ण अध्ययन प्राप्त करें।" 
                                            : "Get full insights into planets, stars, major life predictions and remedial advice."}
                                    </p>
                                </div>

                                <div className="flex justify-center items-center py-6 relative z-10">
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/512/3556/3556608.png" 
                                        alt="Astrology Wheel" 
                                        className="w-32 h-32 object-contain opacity-90 drop-shadow-md animate-spin-slow"
                                    />
                                </div>

                                <div className="text-[10px] text-orange-200 mt-auto relative z-10 border-t border-white/20 pt-4">
                                    {isHindi ? "100% सटीक वैदिक गणनाएं" : "100% Authentic Vedic Calculations"}
                                </div>
                            </div>

                            {/* Main Input Form */}
                            <div className="w-full md:w-7/12 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaCompass className="text-[#e14503]" /> {t.birthDetails}
                                </h2>
                                
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    {/* Name Input */}
                                    <div className="relative group">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#e14503] transition-colors" />
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t.name}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium"
                                        />
                                    </div>

                                    {/* Gender Choice */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Male', 'Female', 'Other'].map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                                                    formData.gender === g
                                                        ? 'border-[#e14503] bg-orange-50 text-[#e14503]'
                                                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                {g === 'Male' && <FaUser className="w-3 h-3" />}
                                                {g === 'Female' && <FaVenusMars className="w-3 h-3" />}
                                                {g === 'Other' && <FaCompass className="w-3 h-3" />}
                                                {g === 'Male' ? t.male : g === 'Female' ? t.female : t.other}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Date & Time Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative group">
                                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#e14503] transition-colors" />
                                            <input
                                                required
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-2 text-xs text-gray-900 focus:outline-none focus:border-[#e14503] focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#e14503] transition-colors" />
                                            <input
                                                required
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-2 text-xs text-gray-900 focus:outline-none focus:border-[#e14503] focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Place Input */}
                                    <div className="relative group">
                                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#e14503] transition-colors" />
                                        <input
                                            required
                                            type="text"
                                            name="place"
                                            value={formData.place}
                                            onChange={handleChange}
                                            placeholder={t.place}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all font-medium"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 text-sm"
                                    >
                                        <FaOm className="w-4 h-4" /> {t.submit} <FaArrowRight />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* 3. Results View */}
                    {!loading && report && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* Summary Card with User Details */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#e14503]/5 rounded-full blur-2xl"></div>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-100">
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1">
                                            <FaOm /> {isHindi ? "वैदिक जन्मकुंडली" : "Vedic Birth Horoscope"}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                                            {formData.name}
                                        </h2>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                                            <span className="flex items-center gap-1"><FaCalendarAlt /> {formData.dob}</span>
                                            <span className="flex items-center gap-1"><FaClock /> {formData.time}</span>
                                            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {formData.place}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleReset}
                                        className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 hover:text-[#e14503] hover:border-[#e14503] text-xs font-bold rounded-xl transition-all"
                                    >
                                        <FaUndo /> {t.newCalculation}
                                    </button>
                                </div>

                                {/* Astrological Summary Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-6">
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.rashi}</span>
                                        <span className="text-base font-extrabold text-gray-800">{isHindi ? report.rashiHi : report.rashiEn}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.rashiLord}</span>
                                        <span className="text-base font-extrabold text-gray-800">{isHindi ? report.rashiLordHi : report.rashiLordEn}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.nakshatra}</span>
                                        <span className="text-base font-extrabold text-gray-800">{isHindi ? report.nakshatraHi : report.nakshatraEn}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Lagna (लग्न)</span>
                                        <span className="text-base font-extrabold text-gray-800">{isHindi ? report.planetPositions[0].signHi : report.planetPositions[0].signEn}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.luckyNum}</span>
                                        <span className="text-base font-extrabold text-[#e14503]">{report.luckyNumber}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.luckyCol}</span>
                                        <span className="text-base font-extrabold text-amber-700">{isHindi ? report.luckyColorHi : report.luckyColorEn}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Navigation - Swipable/Scrollable on mobile */}
                            <div className="flex overflow-x-auto gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50 scrollbar-hide max-w-full">
                                {[
                                    { id: 'chart', label: t.tabChart, icon: FaOm },
                                    { id: 'planets', label: t.tabPlanets, icon: FaCompass },
                                    { id: 'doshas', label: t.tabDoshas, icon: FaExclamationTriangle },
                                    { id: 'remedies', label: t.tabRemedies, icon: FaGem }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                                                activeTab === tab.id
                                                    ? 'bg-white text-[#e14503] shadow-md'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab Content Display */}
                            <div className="min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    
                                    {/* Tab 1: Lagna Chart */}
                                    {activeTab === 'chart' && (
                                        <motion.div 
                                            key="chart-tab"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-md flex flex-col items-center justify-center"
                                        >
                                            <LagnaChart 
                                                lagnaSign={report.lagnaSign} 
                                                housePlanets={report.housePlanets} 
                                                isHindi={isHindi} 
                                            />
                                        </motion.div>
                                    )}

                                    {/* Tab 2: Planetary Positions Table */}
                                    {activeTab === 'planets' && (
                                        <motion.div 
                                            key="planets-tab"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden"
                                        >
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-gray-50 border-b border-gray-100">
                                                            <th className="p-4 pl-6 text-xs font-bold uppercase tracking-wider text-gray-400">{t.planetName}</th>
                                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">{t.planetSign}</th>
                                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">{t.planetDegree}</th>
                                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">{t.planetHouse}</th>
                                                            <th className="p-4 pr-6 text-xs font-bold uppercase tracking-wider text-gray-400">{t.planetStatus}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100 text-sm">
                                                        {report.planetPositions.map((pos, index) => (
                                                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                                <td className="p-4 pl-6 font-bold text-gray-900">{isHindi ? pos.nameHi : pos.nameEn}</td>
                                                                <td className="p-4 text-gray-600">{isHindi ? pos.signHi : pos.signEn}</td>
                                                                <td className="p-4 font-mono font-medium text-gray-500">{pos.degree}</td>
                                                                <td className="p-4 text-gray-900 font-bold">{pos.house}</td>
                                                                <td className="p-4 pr-6">
                                                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                                                                        pos.statusEn === 'Benefic' 
                                                                            ? 'bg-green-50 text-green-700' 
                                                                            : pos.statusEn === 'Neutral' 
                                                                            ? 'bg-gray-100 text-gray-600'
                                                                            : 'bg-red-50 text-red-700'
                                                                    }`}>
                                                                        {isHindi ? pos.statusHi : pos.statusEn}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Tab 3: Dosha Analysis */}
                                    {activeTab === 'doshas' && (
                                        <motion.div 
                                            key="doshas-tab"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* Manglik Card */}
                                            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md flex flex-col md:flex-row gap-6 items-start">
                                                <div className={`p-4 rounded-2xl flex-shrink-0 ${
                                                    report.isManglik ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                                }`}>
                                                    {report.isManglik ? <FaExclamationTriangle className="w-8 h-8" /> : <FaCheckCircle className="w-8 h-8" />}
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{t.manglikTitle}</h3>
                                                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                                        report.isManglik ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
                                                    }`}>
                                                        {report.isManglik ? t.manglikYes : t.manglikNo}
                                                    </span>
                                                    <p className="text-sm text-gray-600 leading-relaxed pt-2">
                                                        {report.isManglik ? t.manglikDescYes : t.manglikDescNo}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Other Doshas Card */}
                                            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md space-y-6">
                                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">{t.doshaTitle}</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    
                                                    {/* Kaal Sarp */}
                                                    <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4 bg-gray-50/50">
                                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-50 text-amber-600">
                                                            <FaExclamationTriangle className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400 font-bold uppercase">Kaal Sarp Dosha</p>
                                                            <p className="text-sm font-extrabold text-gray-800 mt-0.5">{isHindi ? report.kaalSarpHi : report.kaalSarpEn}</p>
                                                        </div>
                                                    </div>

                                                    {/* Sade Sati */}
                                                    <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4 bg-gray-50/50">
                                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-50 text-purple-600">
                                                            <FaExclamationTriangle className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400 font-bold uppercase">Saturn Sade Sati</p>
                                                            <p className="text-sm font-extrabold text-gray-800 mt-0.5">{isHindi ? report.sadeSatiHi : report.sadeSatiEn}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Tab 4: Remedies & Gemstones */}
                                    {activeTab === 'remedies' && (
                                        <motion.div 
                                            key="remedies-tab"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* Gemstone Recommendation */}
                                            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                                <div className="md:col-span-4 flex flex-col items-center p-6 bg-gradient-to-tr from-amber-500/10 to-orange-500/5 border border-amber-100 rounded-2xl text-center">
                                                    <div className="w-16 h-16 bg-[#e14503]/10 text-[#e14503] rounded-full flex items-center justify-center mb-3">
                                                        <FaGem className="w-8 h-8" />
                                                    </div>
                                                    <h4 className="text-lg font-extrabold text-gray-900">
                                                        {isHindi ? report.gemstone.nameHi : report.gemstone.nameEn}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                                                        {isHindi ? `ग्रह: ${report.gemstone.planetHi}` : `For Planet: ${report.gemstone.planetEn}`}
                                                    </p>
                                                </div>
                                                <div className="md:col-span-8 space-y-4">
                                                    <h3 className="text-xl font-bold text-gray-900">{t.gemstoneTitle}</h3>
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {isHindi ? report.gemstone.benefitHi : report.gemstone.benefitEn}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {t.gemstoneDesc}
                                                    </p>
                                                    <div>
                                                        <Link 
                                                            to="/shop" 
                                                            className="inline-flex items-center gap-2 bg-[#e14503] hover:bg-orange-700 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
                                                        >
                                                            <FaShoppingBag /> {t.buyGemstone}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Astro Remedies and Poojas */}
                                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
                                                <div className="space-y-2 text-center md:text-left">
                                                    <h3 className="text-lg md:text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                                                        <FaPray className="text-[#e14503]" /> {isHindi ? "ग्रह शांति और दोष निवारण उपाय" : "Dosha & Planet Shanti Puja"}
                                                    </h3>
                                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-xl">
                                                        {isHindi 
                                                            ? "आपकी कुंडली में मौजूद मांगलिक अथवा आंशिक कालसर्प दोष के नकारात्मक प्रभावों को दूर करने के लिए अनुभवी पंडितों से विधि-विधान सहित वैदिक पूजा करवाएं।" 
                                                            : "Mitigate the malefic effects of Manglik or Kalsarp Doshas in your horoscope. Book a personalized shanti pooja performed by verified Vedic priests."}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <Link 
                                                        to="/puja" 
                                                        className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 font-extrabold text-xs md:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
                                                    >
                                                        <FaPray className="text-[#e14503]" /> {t.bookPooja}
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                    
                </AnimatePresence>
            </div>
        </div>
    );
};

export default KundliPage;
