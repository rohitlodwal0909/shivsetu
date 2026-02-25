import { IMAGE_URL } from "../../utils/constants";

const PageHeader = ({ title, subtitle, breadcrumb = [] }) => {
    return (
        <div className="relative w-full overflow-hidden">
            
            {/* Responsive Banner */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[350px] lg:h-[400px]">
                
                <img
                    src={IMAGE_URL + "shop.png"}
                    alt="Spiritual Banner"
                    className="w-full h-full object-cover object-center"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

            </div>

        </div>
    );
};

export default PageHeader;