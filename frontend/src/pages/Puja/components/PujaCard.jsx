import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const PujaCard = ({ id, slug, image, 	puja_name, description, location, date, price,puja_category }) => {
    const navigate = useNavigate();


    return (
        <div
            onClick={() => navigate(`/puja/${slug}`)}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
        >
            {/* Image Section */}
            <div className="relative h-[180px] sm:h-[250px] overflow-hidden">
                <SafeImage
                    src={image}
                    type="pujas/"
                    alt={puja_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay for puja_name (Premium style but matching font weight) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity"></div>

                {/* Tag */}
                
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 uppercase tracking-wide">
                        {puja_category?.name}
                    </div>
                

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="text-white/90 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-orange-400" /> {location}
                    </div>
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-2 drop-shadow-md">
                        {puja_name}
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex items-baseline justify-between mb-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt className="text-orange-500" />
                        <span className="font-medium">{date}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        ₹{price}
                    </div>
                </div>

                <p className="text-bold-900 mb-6 line-clamp-2 flex-grow leading-relaxed text-sm">
                    {description}
                </p>

                {/* Action Button */}
                <button
                    className="w-full py-3.5 rounded-xl bg-[#e14503] text-white font-bold text-sm shadow-lg shadow-orange-200 hover:bg-[#c23a02] hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    Book Puja <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default PujaCard;
