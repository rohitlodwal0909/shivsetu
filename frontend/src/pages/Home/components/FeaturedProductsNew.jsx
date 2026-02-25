import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import SafeImage from '../../../components/common/SafeImage';

const FeaturedProductsNew = ({ products = [] }) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleWishlist = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <section className="py-10 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8 lg:mb-16 flex items-start sm:items-center justify-between gap-4">

                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Featured Products <span className="text-xl md:text-3xl">✨</span>
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                        Handpicked selections for your 
                        <span className="text-[#e14503]"> Devotion</span>
                    </p>
                </div>

                <Link
                    to="/shop"
                    className="group flex-shrink-0 inline-flex items-center gap-2 text-[#e14503] text-sm sm:text-base font-semibold"
                >
                    <span className="hidden sm:inline">View All</span>

                    <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#e14503] text-white transition-all duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>

           </div>

                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 sm:mb-12 sm:overflow-visible sm:pb-0">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[85%] sm:min-w-0 group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 snap-center"
                        >
                            <Link to={`/product/${product.slug}`} className="block relative h-[300px] sm:h-[400px]">
                                
                                {/* Product Image */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <SafeImage
                                        src={product.image}
                                        type="products/"
                                        alt={product.product_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Discount Badge */}
                                {product.discount_percent > 0 && (
                                    <div className="absolute top-4 left-4 bg-[#e14503] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-30">
                                        -{product.discount_percent}%
                                    </div>
                                )}

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                {/* Default Name */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 group-hover:opacity-0 transition-opacity duration-300 z-20">
                                    <h3 className="text-white text-xl font-bold drop-shadow-lg">
                                        {product.product_name}
                                    </h3>
                                </div>

                                {/* Hover Panel */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-[#e14503] text-xs font-bold uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">
                                            {product.category || "category"}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <FaStar className="text-yellow-400 text-sm" />
                                            <span className="text-gray-700 text-sm font-semibold">
                                                {product.rating || 5}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-gray-900 text-lg font-bold mb-3 leading-tight">
                                        {product.product_name}
                                    </h3>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ₹{product.price}
                                        </span>
                                        {product.mrp && (
                                            <span className="text-gray-400 text-sm line-through">
                                                ₹{product.mrp}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="flex-1 bg-[#e14503] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c23a02] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>

                                        <button
                                            onClick={(e) => handleToggleWishlist(e, product)}
                                            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                                                isInWishlist(product.id)
                                                    ? 'bg-[#e14503] text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                            title="Add to Wishlist"
                                        >
                                            <FaHeart />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default FeaturedProductsNew;