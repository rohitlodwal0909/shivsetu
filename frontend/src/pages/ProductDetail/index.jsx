import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    FaStar, FaHeart, FaShoppingCart, FaMinus, FaPlus, FaShare, FaTruck, FaUndo, FaShieldAlt,
    FaArrowLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaCheckCircle, FaListUl, FaCogs, FaComments
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import SafeImage from '../../components/common/SafeImage';
import { useDispatch, useSelector } from 'react-redux';
import {  getProductWithSlug } from '../../features/shop/ProductSlice';
import { getReviews } from '../../features/home/HomeSlice';
import { getTypeIcon } from '../../components/TypeIcon';
import { formatDate } from '../../components/datetimer/date';

/* ─── Accordion (mobile) ─── */
const AccordionItem = ({ title, children, isOpen, onClick, icon: Icon }) => (
    <div className="border-b border-gray-100 last:border-none">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                {Icon && <div className="text-[#e14503] bg-orange-50 p-2 rounded-full"><Icon size={14} /></div>}
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
                    transition={{ duration: 0.25 }}
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

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('features');
    const [expandedAccordion, setExpandedAccordion] = useState('features');
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { isHindi } = useLanguage();
    const imageScrollRef = useRef(null);


    const dispatch = useDispatch();

    const data = useSelector((state) => state.product.product);
    const products = data?.product;
    const product_name = products?.product_name;
    const gallery = products?.gallery.length > 0  ? JSON.parse(products?.gallery) : [] ;
    const  { reviews }  = useSelector((state) => state.home) || [];
    

    useEffect(() => {
    dispatch(getProductWithSlug(slug))
    dispatch(getReviews('shop'))

    },[dispatch])



    const features = ['Premium quality materials', 'Traditional craftsmanship', 'Perfect for home temples', 'Ideal for gifting', 'Authentic design', 'Carefully packaged'];
    const  specifications = { 'Material': 'Premium Quality', 'Origin': 'India', 'Weight': 'Varies by size', 'Dimensions': 'Standard Size', 'Care': 'Gentle cleaning recommended', 'Warranty': '30 days return policy' }

    // const reviews = [
    //     { id: 1, name: isHindi ? 'राहुल शर्मा' : 'Rahul Sharma', rating: 5, date: '2024-01-10', comment: isHindi ? 'बिल्कुल सुंदर! गुणवत्ता मेरी उम्मीदों से अधिक थी।' : 'Absolutely beautiful! The quality exceeded my expectations. Perfect for my home temple.', verified: true },
    //     { id: 2, name: isHindi ? 'प्रिया पटेल' : 'Priya Patel', rating: 4, date: '2024-01-08', comment: isHindi ? 'शानदार उत्पाद और तेज़ डिलीवरी।' : 'Great product and fast delivery. Very happy with my purchase.', verified: true },
    //     { id: 3, name: isHindi ? 'अमित कुमार' : 'Amit Kumar', rating: 5, date: '2024-01-05', comment: isHindi ? 'उत्कृष्ट शिल्प कौशल और प्रामाणिक डिजाइन।' : 'Excellent craftsmanship and authentic design. Highly recommended!', verified: false }
    // ];



    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) addToCart(products);
    };

    const handleToggleWishlist = () => toggleWishlist(products);

    const handleImageScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const idx = Math.round(scrollLeft / width);
        setSelectedImage(idx);
    };

    const scrollToImage = (idx) => {
        setSelectedImage(idx);
        if (imageScrollRef.current) {
            imageScrollRef.current.scrollTo({ left: idx * imageScrollRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-ibm">

            {/* ════════════════════════════════════════════════════ */}
            {/*  MOBILE VIEW                                        */}
            {/* ════════════════════════════════════════════════════ */}
            <div className="md:hidden pb-36">

                {/* Floating Header Buttons */}
                <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center pointer-events-none">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white/80 backdrop-blur-md p-2.5 rounded-full text-gray-800 shadow-md pointer-events-auto border border-white/30"
                    >
                        <FaArrowLeft size={16} />
                    </button>
                    <div className="flex gap-3 pointer-events-auto">
                        <button
                            onClick={handleToggleWishlist}
                            className={`backdrop-blur-md p-2.5 rounded-full shadow-md border border-white/30 ${isInWishlist(products?.id) ? 'bg-[#e14503] text-white' : 'bg-white/80 text-gray-800'}`}
                        >
                            <FaHeart size={16} />
                        </button>
                        <button className="bg-white/80 backdrop-blur-md p-2.5 rounded-full text-gray-800 shadow-md border border-white/30">
                            <FaShare size={16} />
                        </button>
                    </div>
                </div>

                {/* Full-width Image Carousel */}
                <div className="relative w-full bg-gray-100">
                    <div
                        ref={imageScrollRef}
                        onScroll={handleImageScroll}
                        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    >
                        {gallery.map((img, idx) => (
                            <div key={idx} className="min-w-full aspect-square snap-center">
                                <SafeImage src={img} type={"products/"} alt={`${product_name} ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {gallery.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToImage(idx)}
                                className={`rounded-full transition-all ${selectedImage === idx ? 'w-6 h-2 bg-[#e14503]' : 'w-2 h-2 bg-white/70'}`}
                            />
                        ))}
                    </div>
                    {/* Discount Badge */}
                   
                        <div className="absolute top-16 left-4 bg-[#e14503] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            {products?.discount_percent}% OFF
                        </div>
                    
                </div>

                {/* Product Info Card */}
                <div className="bg-white -mt-4 relative z-10 rounded-t-3xl px-5 pt-6 pb-4">
                    {/* Category & Stock */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-[#e14503] bg-[#e14503]/10 px-3 py-1 rounded-full">
                            {products?.category.name}
                        </span>
                        {products?.inStock !== false && (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                {isHindi ? 'स्टॉक में' : 'In Stock'}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{product_name}</h1>

                    {/* Brand */}
                    <p className="text-sm text-gray-500 mb-3">{products?.brand|| "Devine Place"}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`text-sm ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{products?.rating}</span>
                        <span className="text-sm text-gray-500">({products?.reviews} {isHindi ? 'समीक्षाएं' : 'reviews'})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100">
                        <span className="text-3xl font-bold text-gray-900">₹{products?.price}</span>
                        {products?.mrp && (
                            <>
                                <span className="text-lg text-gray-400 line-through">₹{products?.mrp}</span>
                                <span className="text-sm font-bold text-[#e14503]">{products?.discount_percent}% {isHindi ? 'बचत' : 'OFF'}</span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{products?.description}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <span className="text-sm font-semibold text-gray-900">{isHindi ? 'मात्रा' : 'Quantity'}</span>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
                            >
                                <FaMinus className="text-gray-600 text-xs" />
                            </button>
                            <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
                            >
                                <FaPlus className="text-gray-600 text-xs" />
                            </button>
                        </div>
                    </div>

                    {/* Trust Badges - Horizontal Strip */}
                    <div className="flex justify-between gap-2">
                        <div className="flex-1 flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2">
                            <FaTruck className="text-[#e14503] text-lg" />
                            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{isHindi ? 'मुफ़्त शिपिंग' : 'Free Shipping'}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2">
                            <FaUndo className="text-[#e14503] text-lg" />
                            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{isHindi ? '30-दिन वापसी' : '30-Day Returns'}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2">
                            <FaShieldAlt className="text-[#e14503] text-lg" />
                            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{isHindi ? 'गुणवत्ता आश्वासन' : 'Quality Assured'}</span>
                        </div>
                    </div>
                </div>

                {/* Accordion Sections */}
                <div className="mt-2 bg-white rounded-2xl mx-0 overflow-hidden border border-gray-100">
                    <AccordionItem
                        title={isHindi ? 'मुख्य विशेषताएं' : 'Key Features'}
                        icon={FaListUl}
                        isOpen={expandedAccordion === 'features'}
                        onClick={() => setExpandedAccordion(expandedAccordion === 'features' ? null : 'features')}
                    >
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        title={isHindi ? 'विशेष विवरण' : 'Specifications'}
                        icon={FaCogs}
                        isOpen={expandedAccordion === 'specs'}
                        onClick={() => setExpandedAccordion(expandedAccordion === 'specs' ? null : 'specs')}
                    >
                        <div className="space-y-2">
                            {Object.entries(specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-2 border-b border-gray-50 last:border-none">
                                    <span className="text-gray-500 font-medium">{key}</span>
                                    <span className="text-gray-900 font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>

                    <AccordionItem
                        title={`${isHindi ? 'समीक्षाएं' : 'Reviews'} (${reviews?.length})`}
                        icon={FaComments}
                        isOpen={expandedAccordion === 'reviews'}
                        onClick={() => setExpandedAccordion(expandedAccordion === 'reviews' ? null : 'reviews')}
                    >
                        <div className="space-y-4">
                            {reviews?.map((review) => (
                                <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-[#e14503]/10 rounded-full flex items-center justify-center">
                                                         {getTypeIcon(review?.type)}

                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{review?.title}</h4>
                                                
                                                    <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                                                        <FaCheckCircle size={8} /> {isHindi ? 'सत्यापित' : 'Verified'}
                                                    </span>
                                                
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{formatDate(review?.created_at)}</span>
                                    </div>
                                    <div className="flex gap-0.5 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`text-xs ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.description}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>
                </div>

                {/* Related Products - Horizontal Scroll */}
                <div className="mt-6 px-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{isHindi ? 'संबंधित उत्पाद' : 'Related Products'}</h3>
                    <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                        {products?.length > 0 && products?.map((relProduct) => (
                            <Link
                                key={relProduct.id}
                                to={`/product/${relProduct.id}`}
                                className="min-w-[160px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm snap-center flex-shrink-0"
                            >
                                <div className="h-40 overflow-hidden bg-gray-100">
                                    <SafeImage src={relProduct.image} alt={isHindi ? relProduct.name : relProduct.nameEn} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3">
                                    <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{isHindi ? relProduct.name : (relProduct.nameEn || relProduct.name)}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-bold text-gray-900">₹{relProduct.price}</span>
                                        <div className="flex items-center gap-0.5">
                                            <FaStar className="text-yellow-500 text-xs" />
                                            <span className="text-xs font-semibold text-gray-700">{5}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sticky Bottom Bar */}
                <div className="fixed bottom-[60px] left-0 w-full z-[100]">
                    <div className="h-8 w-full bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                    <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex items-center gap-3">
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total</span>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-bold text-gray-900 leading-none">₹{products?.price * quantity}</span>
                                {products?.mrp && (
                                    <span className="text-xs text-gray-400 line-through">₹{products?.mrp * quantity}</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-[#e14503] hover:bg-[#c23a02] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart size={14} />
                            {isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart'}
                            <FaChevronRight size={10} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════ */}
            {/*  DESKTOP VIEW                                       */}
            {/* ════════════════════════════════════════════════════ */}
            <div className="hidden md:block">
                <div className="max-w-7xl mx-auto px-4 py-8">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link to="/" className="hover:text-[#e14503] transition-colors">{isHindi ? 'होम' : 'Home'}</Link>
                        <span>/</span>
                        <Link to="/shop" className="hover:text-[#e14503] transition-colors">{isHindi ? 'दुकान' : 'Shop'}</Link>
                        <span>/</span>
                        {/* <Link to={`/categories/${products?.category?.name}`} className="hover:text-[#e14503] transition-colors">{products.category.name}</Link> */}
                        <span>/</span>
                        <span className="text-gray-900 font-semibold">{product_name}</span>
                    </div>

                    {/* Main Grid: Images + Info */}
                    <div className="grid grid-cols-12 gap-10 mb-16">

                        {/* Left: Image Gallery */}
                        <div className="col-span-7">
                            <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4 overflow-hidden">
                                <SafeImage
                                    src={gallery[selectedImage]}
                                    type={"products/"}
                                    alt={product_name}
                                    className="w-full h-[500px] object-cover rounded-xl transition-all duration-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {gallery?.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`bg-white rounded-xl p-2 border-2 transition-all hover:shadow-md ${selectedImage === index ? 'border-[#e14503] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <SafeImage src={image} type={"products/"} alt="" className="w-full h-24 object-cover rounded-lg" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Info (Sticky) */}
                        <div className="col-span-5">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                                    {/* Category & Stock */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm font-semibold text-[#e14503] bg-[#e14503]/10 px-3 py-1 rounded-full">
                                            { products?.category?.name}
                                        </span>
                                        {products?.inStock !== false && (
                                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                {isHindi ? 'स्टॉक में' : 'In Stock'}
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product_name}</h1>
                                    <p className="text-gray-500 mb-4">{isHindi ? 'ब्रांड' : 'Brand'}: <span className="font-semibold text-gray-800">{products?.brand || "Devine Brand"}</span></p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={`${i < Math.floor(products?.rating || 4) ? 'text-yellow-500' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-gray-900 font-semibold">{products?.rating || 4}</span>
                                        <span className="text-gray-500">({products?.reviews} {isHindi ? 'समीक्षाएं' : 'reviews'})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                        <span className="text-4xl font-bold text-gray-900">₹{products?.price}</span>
                                        {products?.mrp && (
                                            <>
                                                <span className="text-2xl text-gray-400 line-through">₹{products?.mrp}</span>
                                                <span className="text-lg font-semibold text-[#e14503]">{isHindi ? 'बचत' : 'Save'} {products?.discount_percent}%</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">{products?.description}</p>

                                    {/* Quantity */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">{isHindi ? 'मात्रा' : 'Quantity'}</label>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-11 h-11 rounded-xl border border-gray-300 hover:border-[#e14503] flex items-center justify-center transition-colors"
                                            >
                                                <FaMinus className="text-gray-600" />
                                            </button>
                                            <span className="w-14 text-center font-bold text-gray-900 text-lg">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-11 h-11 rounded-xl border border-gray-300 hover:border-[#e14503] flex items-center justify-center transition-colors"
                                            >
                                                <FaPlus className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mb-6">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-[#e14503] hover:bg-[#c23a02] text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5 transform transition-all"
                                        >
                                            <FaShoppingCart />
                                            {isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart'}
                                        </button>
                                        <button
                                            onClick={handleToggleWishlist}
                                            className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all hover:-translate-y-0.5 transform ${isInWishlist(products?.id) ? 'bg-[#e14503] border-[#e14503] text-white' : 'border-gray-300 text-gray-600 hover:border-[#e14503]'}`}
                                        >
                                            <FaHeart className="text-xl" />
                                        </button>
                                        <button className="w-14 h-14 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-[#e14503] flex items-center justify-center transition-all hover:-translate-y-0.5 transform">
                                            <FaShare />
                                        </button>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                        <div className="text-center">
                                            <FaTruck className="text-[#e14503] text-2xl mx-auto mb-2" />
                                            <p className="text-xs font-semibold text-gray-900">{isHindi ? 'मुफ़्त शिपिंग' : 'Free Shipping'}</p>
                                        </div>
                                        <div className="text-center">
                                            <FaUndo className="text-[#e14503] text-2xl mx-auto mb-2" />
                                            <p className="text-xs font-semibold text-gray-900">{isHindi ? '30-दिन वापसी' : '30-Day Returns'}</p>
                                        </div>
                                        <div className="text-center">
                                            <FaShieldAlt className="text-[#e14503] text-2xl mx-auto mb-2" />
                                            <p className="text-xs font-semibold text-gray-900">{isHindi ? 'गुणवत्ता आश्वासन' : 'Quality Assured'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabbed Content Section */}
                    <div className="bg-white rounded-2xl border border-gray-200 mb-16 overflow-hidden">
                        {/* Tab Headers */}
                        <div className="flex border-b border-gray-200">
                            {[
                                { key: 'features', label: isHindi ? 'मुख्य विशेषताएं' : 'Key Features', icon: FaListUl },
                                { key: 'specs', label: isHindi ? 'विशेष विवरण' : 'Specifications', icon: FaCogs },
                                { key: 'reviews', label: `${isHindi ? 'समीक्षाएं' : 'Reviews'} (${reviews?.length})`, icon: FaComments }
                            ].map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-bold border-b-2 transition-all ${activeTab === tab.key
                                        ? 'border-[#e14503] text-[#e14503] bg-orange-50/50'
                                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {activeTab === 'features' && (
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                            <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'specs' && (
                                <div className="max-w-2xl">
                                    {Object.entries(specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-4 border-b border-gray-100 last:border-none">
                                            <span className="text-gray-500 font-medium">{key}</span>
                                            <span className="text-gray-900 font-semibold">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="space-y-6 max-w-3xl">
                                    {reviews?.map((review) => (
                                        <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#e14503]/10 rounded-full flex items-center justify-center">
                                                    {getTypeIcon(review?.type)}
                                                        
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-bold text-gray-900">{review?.title}</h4>
                                                            
                                                                <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                                                                    {isHindi ? 'सत्यापित खरीद' : 'Verified Purchase'}
                                                                </span>
                                                            
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <FaStar key={i} className={`text-sm ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-400">{formatDate(review.created_at)}</span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed ml-[52px]">{review.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products - Grid */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{isHindi ? 'संबंधित उत्पाद' : 'Related Products'}</h3>
                        <div className="grid grid-cols-4 gap-6">
                            {products?.length > 0 && products?.map((relProduct) => (
                                <Link
                                    key={relProduct.id}
                                    to={`/product/${relProduct.id}`}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="h-56 overflow-hidden bg-gray-100">
                                        <SafeImage
                                            src={relProduct.image}
                                            alt={isHindi ? relProduct.name : (relProduct.nameEn || relProduct.name)}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{isHindi ? relProduct.name : (relProduct.nameEn || relProduct.name)}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-gray-900">₹{relProduct.price}</span>
                                            <div className="flex items-center gap-1">
                                                <FaStar className="text-yellow-500 text-sm" />
                                                <span className="text-sm font-semibold text-gray-900">{relProduct.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
