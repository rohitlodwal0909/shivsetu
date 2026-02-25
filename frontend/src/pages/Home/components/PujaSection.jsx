import { useNavigate } from 'react-router-dom';
import PujaCard from '../../Puja/components/PujaCard';
import { useLanguage } from '../../../context/LanguageContext';

const PujaSection = ({pujas}) => {
    const navigate = useNavigate();
    const { isHindi } = useLanguage();

    const topPujas = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1621847324329-37398e0a473a?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "महा शिवरात्रि विशेष: काल भैरव रक्षा कवच हवन" : "Maha Shivratri Vishesh: Kaal Bhairav Raksha Kavach (Aapada Haran) Hawan & Puja",
            description: isHindi ? "काली नजर, बुरी नजर और दुर्घटनाओं से रक्षा, शत्रुओं पर विजय" : "Raksha from kaali nazar, buri nazar, evil eye and accidents, victory over enemies",
            location: isHindi ? "विक्रांत भैरव मंदिर, उज्जैन" : "Vikrant Bhairav Mandir, Ujjain",
            date: "15 Feb, 2026",
            price: 301,
            tag: "Ends in 1 day",
            slots: "Limited Slots Available"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1561577903-8250269f8c6d?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "मंगल दोष निवारण पूजा" : "Mangal Dosh Nivaran Puja",
            description: isHindi ? "विवाह में देरी और वैवाहिक जीवन में समस्याओं के लिए" : "For delays in marriage and problems in marital life",
            location: isHindi ? "मंगलनाथ मंदिर, उज्जैन" : "Mangalnath Mandir, Ujjain",
            date: "Every Tuesday",
            price: 2100,
            tag: "Popular",
            slots: "Filling Fast"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1582260654271-e970a2408c69?q=80&w=800&auto=format&fit=crop",
            title: isHindi ? "महामृत्युंजय जाप और हवन" : "Mahamrityunjay Jaap & Hawan",
            description: isHindi ? "स्वास्थ्य और दीर्घायु के लिए" : "For health and longevity",
            location: isHindi ? "महाकालेश्वर मंदिर, उज्जैन" : "Mahakaleshwar Mandir, Ujjain",
            date: "Every Monday",
            price: 5100,
            tag: "Premium",
            slots: "Available"
        }
    ];

    return (
        <section className="section-padding bg-gray-50 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-1">
               

                  <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        DIVINE EXPERIENCES <span className="text-2xl md:text-3xl">🕉️</span>
                        </h2>
                       <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                        Divine Puja  <span className="text-[#e14503]">Booking</span>
                       </p>
                    </div>                    
                    <button
                        onClick={() => navigate('/puja')}
                       className="group flex-shrink-0 inline-flex items-center gap-2 text-[#e14503] text-sm sm:text-base font-semibold"
                    >
                        <span className="hidden sm:inline">View All</span>
                           <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                                        →</span>
                    </button>
                
                </div>

                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0">
                    {pujas?.map((puja) => (
                        <div key={puja.id} className="min-w-[85%] snap-center sm:min-w-0">
                            <PujaCard {...puja} />
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default PujaSection;
