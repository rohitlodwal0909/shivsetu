import { useNavigate } from 'react-router-dom';
import DarshanCard from '../../Darshan/components/DarshanCard';
import { useLanguage } from '../../../context/LanguageContext';
import { FaArrowRight } from 'react-icons/fa';

const DarshanSection = ({tours}) => {
    const navigate = useNavigate();
    const { isHindi } = useLanguage();



    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                            {isHindi ? "विशेष टूर पैकेज" : "Featured Tour Packages"} ✈️
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {isHindi
                                ? "आध्यात्मिक यात्राओं का चयन"
                                : "Curated spiritual travel experiences"}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/packages')}
                        className="group inline-flex items-center gap-2 text-[#e14503] font-semibold"
                    >
                        <span className="hidden sm:inline">
                            {isHindi ? "सभी देखें" : "View All"}
                        </span>

                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                            <FaArrowRight />
                        </span>
                    </button>
                </div>

                {/* Cards */}
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-visible">
                    {tours?.map((tour) => (
                        <div key={tour.id} className="min-w-[85%] snap-center sm:min-w-0">
                            <DarshanCard
                                {...tour}
                                onClick={() => navigate(`/packages/${tour.id}`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DarshanSection;