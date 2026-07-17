import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaStar, FaChevronLeft } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { isHindi } = useLanguage();

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaHeart className="text-red-200 text-4xl" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {isHindi ? 'आपकी इच्छा सूची खाली है' : 'Your wishlist is empty'}
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm">
                        {isHindi ? 'उन वस्तुओं को बचाएं जिन्हें आप बाद के लिए पसंद करते हैं!' : 'Save items you love for later!'}
                    </p>
                    <Link to="/shop" className="inline-block bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-full font-semibold transition-colors text-sm">
                        {isHindi ? 'खरीदारी शुरू करें' : 'Start Shopping'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <PageHeader
                    title={isHindi ? 'मेरी इच्छा सूची' : 'My Wishlist'}
                    subtitle={`${wishlistItems.length} ${isHindi ? 'आइटम सहेजे गए' : 'items saved'}`}
                    breadcrumb={[{ label: isHindi ? 'इच्छा सूची' : 'Wishlist', link: "/wishlist" }]}
                />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="flex items-center px-4 h-14">
                    <Link to="/" className="p-1 mr-3">
                        <FaChevronLeft className="text-gray-700 text-sm" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-base font-bold text-gray-900">{isHindi ? 'इच्छा सूची' : 'Wishlist'}</h1>
                        <p className="text-[11px] text-gray-500">{wishlistItems.length} {isHindi ? 'आइटम' : 'items saved'}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto md:px-4 md:py-8">
                {/* Mobile: List layout for app-like feel */}
                <div className="md:hidden">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white border-b border-gray-100 p-4">
                            <div className="flex gap-3">
                                {/* Product Image */}
                                <Link to={`/product/${item.slug}`} className="shrink-0 relative">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'}
                                        alt={isHindi ? item.name : (item.nameEn || item.name)}
                                        className="w-24 h-24 object-cover rounded-xl"
                                    />
                                    {!item.inStock && (
                                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">{isHindi ? 'स्टॉक खत्म' : 'OUT OF STOCK'}</span>
                                        </div>
                                    )}
                                </Link>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-[#e14503] font-semibold uppercase tracking-wide">{isHindi ? (item.categoryHi || item.category?.name) : item.category?.name}</p>
                                            <Link to={`/product/${item.slug}`}>
                                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mt-0.5 hover:text-[#e14503] transition-colors">
                                                    {isHindi ? item.name : (item.nameEn || item.name)}
                                                </h3>
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <FaStar className="text-yellow-500 text-[10px]" />
                                        <span className="text-[11px] text-gray-600 font-medium">{item.rating || 4.5}</span>
                                    </div>

                                    {/* Price + Add to Cart */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-base font-bold text-gray-900">₹{item.price}</span>
                                            {item.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            disabled={item.inStock === false}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${item.inStock !== false
                                                ? 'bg-[#e14503] text-white active:bg-[#c23a02]'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <FaShoppingCart className="text-[10px]" />
                                            {isHindi ? 'कार्ट' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300 group">
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <Link to={`/product/${item.slug}`} className="block w-full h-full">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'}
                                        alt={isHindi ? item.name : (item.nameEn || item.name)}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </Link>
                                {!item.inStock && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                                        {isHindi ? 'स्टॉक खत्म' : 'Out of Stock'}
                                    </div>
                                )}
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors z-10"
                                >
                                    <FaTrash className="text-red-500" />
                                </button>
                            </div>

                            <div className="p-5">
                                <p className="text-sm text-[#e14503] font-semibold mb-1">{isHindi ? (item.categoryHi || item.category?.name) : item.category?.name}</p>
                                <Link to={`/product/${item.slug}`}>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#e14503] transition-colors">
                                        {isHindi ? item.name : (item.nameEn || item.name)}
                                    </h3>
                                </Link>

                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-xs ${i < Math.floor(item.rating || 4) ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">({item.rating || 4.5})</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                                    {item.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through">₹{item.originalPrice}</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    disabled={item.inStock === false}
                                    className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${item.inStock !== false
                                        ? 'bg-[#e14503] hover:bg-[#c23a02] text-white'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <FaShoppingCart />
                                    {item.inStock !== false
                                        ? (isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart')
                                        : (isHindi ? 'स्टॉक खत्म' : 'Out of Stock')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
