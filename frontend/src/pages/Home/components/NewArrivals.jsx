import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye, FaStar, FaFire, FaArrowRight } from 'react-icons/fa';
import religiousProducts from '../../../data/products';
import { useLanguage } from '../../../context/LanguageContext';
import SafeImage from '../../../components/common/SafeImage';

const NewArrivals = () => {
    const [favorites, setFavorites] = useState([]);
    const { isHindi } = useLanguage();

    // Select products 4-7 for New Arrivals
    const products = religiousProducts.slice(4, 8);

    const toggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleAddToCart = (product) => {
        console.log('Added to cart:', product);
    };

    return (
        <section className="py-10 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8 lg:mb-16 pl-1 text-left">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        {isHindi ? "नवीनतम आगमन" : "New Arrivals"} <span className="text-2xl md:text-3xl">🆕</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-1.5 font-medium">
                        {isHindi ? "हमारे संग्रह में " : "Fresh additions to our "}
                        <span className="text-[#e14503]">{isHindi ? "नई वस्तुएं" : "Collection"}</span>
                    </p>
                </div>

                {/* Products Grid - Matches FeaturedProductsNew Design */}
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 sm:mb-12 sm:overflow-visible sm:pb-0">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[85%] sm:min-w-0 group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 snap-center"
                        >
                            <Link to={`/product/${product.id}`} className="block relative h-[300px] sm:h-[400px]">
                                {/* Product Image */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <SafeImage
                                        src={product.image}
                                        alt={isHindi ? product.name : product.nameEn}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Badge - Always Visible */}
                                <div className="absolute top-4 left-4 bg-[#e14503] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-30">
                                    NEW
                                </div>

                                {/* Dark Backdrop Overlay - Appears on Hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                {/* Initial State: Product Name with Gradient Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 group-hover:opacity-0 transition-opacity duration-300 z-20">
                                    <h3 className="text-white text-xl font-bold drop-shadow-lg">{isHindi ? product.name : product.nameEn}</h3>
                                </div>

                                {/* Hover State: Full Details Panel - Slides Up */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-[#e14503] text-xs font-bold uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">
                                            {isHindi ? product.categoryHi : product.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <FaStar className="text-yellow-400 text-sm" />
                                            <span className="text-gray-700 text-sm font-semibold">{product.rating}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-gray-900 text-lg font-bold mb-3 leading-tight">
                                        {isHindi ? product.name : product.nameEn}
                                    </h3>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-2xl font-bold text-gray-900">₹{Math.round(product.price * 83)}</span>
                                        {product.originalPrice && (
                                            <span className="text-gray-400 text-sm line-through">₹{Math.round(product.originalPrice * 83)}</span>
                                        )}
                                    </div>

                                    {/* Action Buttons in Panel */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleAddToCart(product);
                                            }}
                                            className="flex-1 bg-[#e14503] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c23a02] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleFavorite(product.id);
                                            }}
                                            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${favorites.includes(product.id)
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

                <div className="mt-10 md:mt-16 text-center">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 bg-[#e14503] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#c23a02] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                        {isHindi ? "सभी उत्पाद देखें" : "View All Products"}
                        <span className="text-xl">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
