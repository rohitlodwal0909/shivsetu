import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaChevronLeft, FaTag, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { IMAGE_URL } from '../../utils/constants';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

    const { isHindi } = useLanguage();
    
    const subtotal = getCartTotal();
    const shipping = 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;


    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaShoppingBag className="text-gray-300 text-4xl" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {isHindi ? 'आपकी कार्ट खाली है' : 'Your cart is empty'}
                    </h2>
                    <p className="text-gray-500 mb-8 text-sm">
                        {isHindi ? 'आरंभ करने के लिए कुछ उत्पाद जोड़ें!' : 'Add some products to get started!'}
                    </p>
                    <Link to="/shop" className="inline-block bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-full font-semibold transition-colors text-sm">
                        {isHindi ? 'खरीदारी शुरू करें' : 'Start Shopping'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <PageHeader
                    title={isHindi ? 'शॉपिंग कार्ट' : 'Shopping Cart'}
                    subtitle={`${getCartCount()} ${isHindi ? 'उत्पाद आपकी कार्ट में हैं' : 'items in your cart'}`}
                    breadcrumb={[{ label: isHindi ? 'कार्ट' : 'Cart', link: "/cart" }]}
                />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="flex items-center px-4 h-14">
                    <Link to="/" className="p-1 mr-3">
                        <FaChevronLeft className="text-gray-700 text-sm" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-base font-bold text-gray-900">{isHindi ? 'शॉपिंग कार्ट' : 'Shopping Cart'}</h1>
                        <p className="text-[11px] text-gray-500">{getCartCount()} {isHindi ? 'आइटम' : 'items'}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto md:px-4 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Mobile: Card-style items */}
                        <div className="md:space-y-4">
                            {cartItems?.map((item) => (
                                <div key={item.id} className="bg-white md:rounded-2xl md:border md:border-gray-200 border-b border-gray-100 p-4 md:p-6">
                                    <div className="flex gap-3 md:gap-4">
                                        {/* Product Image */}
                                        <Link to={`/product/${item.id}`} className="shrink-0">
                                            <img
                                                src={IMAGE_URL + "products/" + item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'}
                                                alt={item?.product_name}
                                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                                                        {item?.product_name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 mt-0.5">{item?.category?.name}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                                >
                                                    <FaTrash className="text-xs" />
                                                </button>
                                            </div>

                                            {/* Price + Quantity row */}
                                            <div className="flex items-center justify-between mt-3">
                                                <p className="text-base md:text-lg font-bold text-gray-900">₹{item?.price}</p>
                                                <div className="flex items-center bg-gray-100 rounded-full">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                                                    >
                                                        <FaMinus className="text-gray-600 text-[10px]" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                                                    >
                                                        <FaPlus className="text-gray-600 text-[10px]" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile: Free shipping banner */}
                        <div className="md:hidden mx-4 mt-4 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
                            <FaTag className="text-green-600 text-sm shrink-0" />
                            <p className="text-xs text-green-700 font-medium">
                                {isHindi ? 'सभी ऑर्डर पर मुफ़्त डिलीवरी!' : 'Free delivery on all orders!'}
                            </p>
                        </div>
                    </div>

                    {/* Desktop Summary Sidebar */}
                    <div className="hidden md:block lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{isHindi ? 'ऑर्डर सारांश' : 'Order Summary'}</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>{isHindi ? 'उपयोग' : 'Subtotal'}</span>
                                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>{isHindi ? 'शिपिंग' : 'Shipping'}</span>
                                    <span className="font-semibold text-green-600">{isHindi ? 'मुफ़्त' : 'FREE'}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>{isHindi ? 'कर' : 'Tax'}</span>
                                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">{isHindi ? 'कुल' : 'Total'}</span>
                                    <span className="text-2xl font-bold text-[#e14503]">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link
                                to="/checkout"
                                className="block w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-3 rounded-xl font-bold text-center transition-colors mb-3"
                            >
                                {isHindi ? 'चेकआउट के लिए आगे बढ़ें' : 'Proceed to Checkout'}
                            </Link>
                            <Link
                                to="/shop"
                                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold text-center transition-colors"
                            >
                                {isHindi ? 'खरीदारी जारी रखें' : 'Continue Shopping'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="px-4 py-2">
                    {/* Price breakdown */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{isHindi ? 'कुल राशि' : 'Total Amount'}</p>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-bold text-gray-900">₹{total.toFixed(2)}</span>
                                <span className="text-[10px] text-green-600 font-medium">{isHindi ? 'मुफ़्त डिलीवरी' : 'Free Delivery'}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="bg-[#e14503] hover:bg-[#c23a02] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                        >
                            {isHindi ? 'चेकआउट' : 'Checkout'}
                        </Link>
                    </div>
                    {/* Trust badge */}
                    <div className="flex items-center justify-center gap-1.5 pb-1">
                        <FaShieldAlt className="text-[10px] text-gray-400" />
                        <p className="text-[10px] text-gray-400">{isHindi ? 'सुरक्षित भुगतान' : 'Secure & Safe Payments'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
