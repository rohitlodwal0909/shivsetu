import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaArrowRight, FaRupeeSign } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const DarshanCard = ({ 
    id, 
    banner_image, 
    package_name, 
    highlights, 
    cities, 
    duration_days, 
    tour_type,
    price
}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/packages/${id}`)}
            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col h-full hover:-translate-y-2"
        >

            {/* Image Section */}
            <div className="relative h-[200px] sm:h-[250px] overflow-hidden">

                <SafeImage
                    src={banner_image}
                    type={"packages/"}
                    alt={package_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Tour Type Badge */}
                {tour_type && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                        {tour_type}
                    </div>
                )}

               
                {/* Title & Location */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-orange-400" />
                        {cities?.city}
                    </div>

                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-2">
                        {package_name}
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">

                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">

    {/* Left Side - Duration */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
        <FaClock className="text-orange-500" />
        <span className="font-medium">
            {duration_days ? (
                <>
                    {duration_days} {duration_days > 1 ? "Days" : "Day"}{" "}
                    <span className="text-gray-500 font-normal">Tour</span>
                </>
            ) : (
                "2 Days Tour"
            )}
        </span>
    </div>

    {/* Right Side - Price */}
    {price && (
        <div className="text-lg font-bold text-orange-600 flex items-center">
            ₹{price}
        </div>
    )}

</div>

                {/* Highlights */}
                <p className="text-gray-600 mb-6 line-clamp-2 flex-grow leading-relaxed text-sm">
                    {highlights}
                </p>

                {/* Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/packages/${id}`);
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    View Tour Details
                    <FaArrowRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default DarshanCard;