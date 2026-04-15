import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser, FaBox, FaHeart, FaCog, FaEdit, FaSave, FaTimes, FaTrash,
    FaShoppingCart, FaStar, FaHeadset, FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaSearch, FaChevronRight, FaChevronLeft, FaSignOutAlt, FaGlobe,
    FaShieldAlt, FaFileAlt, FaQuestionCircle, FaInfoCircle,
    FaCar, FaOm, FaMountain, FaCalendarAlt, FaSun
} from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../features/order/OrderSlice';

const MyProfile = () => {
    const { isHindi, language, toggleLanguage } = useLanguage();
    const { logout, user } = useAuth(); 


    const navigate = useNavigate(); // Import navigate
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const [trackOrderId, setTrackOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const { addToCart } = useCart();

    const dispatch = useDispatch();

    // Mobile: which panel is open (null = show main menu)
    const [mobilePanel, setMobilePanel] = useState(null);

    const data = useSelector((state) => state.order.orders);

    const orders = data.orders;

    useEffect(() => {
    if(activeTab == "orders"){
        dispatch(getMyOrders()).unwrap()
     }
    },[activeTab])


    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: '',
        email: "",
        phone: "",
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    useEffect(() => {
       setProfileData({ ...profileData, firstName:user?.name,
         email: user?.email,
        phone: user?.mobile,
       })
    },[user])


    const [editedData, setEditedData] = useState({ ...profileData });

    // const orders = [
    //     { id: 'ORD-2024-0001', date: '2024-01-15', status: 'Delivered', total: 1299, items: 3 },
    //     { id: 'ORD-2024-0002', date: '2024-01-20', status: 'In Transit', total: 549, items: 1 },
    //     { id: 'ORD-2024-0003', date: '2024-01-25', status: 'Processing', total: 899, items: 2 }
    // ];

    const tabs = [
        { id: 'profile', label: isHindi ? 'प्रोफ़ाइल' : 'Profile', icon: FaUser },
        { id: 'orders', label: isHindi ? 'मेरे ऑर्डर' : 'My Orders', icon: FaBox },
        { id: 'track', label: isHindi ? 'ट्रैक ऑर्डर' : 'Track Order', icon: FaSearch },
        { id: 'wishlist', label: isHindi ? 'इच्छा सूची' : 'Wishlist', icon: FaHeart },
        { id: 'settings', label: isHindi ? 'सेटिंग्स' : 'Settings', icon: FaCog },
        { id: 'support', label: isHindi ? 'सहायता' : 'Support', icon: FaHeadset }
    ];

    const handleSaveProfile = () => {
        setProfileData({ ...editedData });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedData({ ...profileData });
        setIsEditing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'In Transit': return 'bg-blue-100 text-blue-700';
            case 'Processing': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        if (!isHindi) return status;
        switch (status) {
            case 'Delivered': return 'वितरित';
            case 'In Transit': return 'रास्ते में';
            case 'Processing': return 'प्रक्रियाधीन';
            default: return status;
        }
    };

    const handleAddToCart = (item) => addToCart(item);

    const handleTrackOrder = (e) => {
        e.preventDefault();
        if (trackOrderId.trim()) {
            setTrackingResult({
                id: trackOrderId,
                status: 'In Transit',
                location: 'Mumbai Hub',
                expectedDate: '2024-02-20',
                timeline: [
                    { status: 'Order Placed', date: '2024-02-15', completed: true },
                    { status: 'Shipped', date: '2024-02-16', completed: true },
                    { status: 'In Transit', date: '2024-02-17', completed: true },
                    { status: 'Out for Delivery', date: 'Pending', completed: false },
                    { status: 'Delivered', date: 'Pending', completed: false }
                ]
            });
        }
    };

    const openMobilePanel = (panelId) => {
        setActiveTab(panelId);
        setMobilePanel(panelId);
    };

    const closeMobilePanel = () => {
        setMobilePanel(null);
    };

    // ==========================================
    // SHARED CONTENT RENDERER (used by both views)
    // ==========================================
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information'}</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-[#e14503] hover:text-[#c23a02] font-semibold transition-colors text-sm"
                                >
                                    <FaEdit /> {isHindi ? 'संपादित करें' : 'Edit'}
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={handleSaveProfile} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-semibold transition-colors text-sm">
                                        <FaSave /> {isHindi ? 'सहेजें' : 'Save'}
                                    </button>
                                    <button onClick={handleCancelEdit} className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-semibold transition-colors text-sm">
                                        <FaTimes /> {isHindi ? 'रद्द' : 'Cancel'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {Object.entries(profileData).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type={key === 'email' ? 'email' : 'text'}
                                            value={editedData[key]}
                                            onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-xl">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{isHindi ? 'ऑर्डर इतिहास' : 'Order History'}</h2>
                        {orders?.length === 0 ? (
                            <div className="text-center py-12">
                                <FaBox className="text-gray-300 text-5xl mx-auto mb-4" />
                                <p className="text-gray-600">{isHindi ? 'अभी तक कोई ऑर्डर नहीं' : 'No orders yet'}</p>
                                <Link to="/shop" className="text-[#e14503] hover:text-[#c23a02] font-semibold mt-2 inline-block">
                                    {isHindi ? 'खरीदारी शुरू करें' : 'Start Shopping'}
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders?.map((order) => (
                                    <div key={order?.id} className="border border-gray-200 rounded-xl p-4 md:p-6 hover:border-[#e14503] transition-colors">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm md:text-base">{order.order_number}</h3>
                                                <p className="text-xs md:text-sm text-gray-600">{order.created_at}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${getStatusColor(order.order_status)}`}>
                                                {getStatusLabel(order.order_status)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                                            <p className="text-gray-600 text-sm">
                                                            {(Array.isArray(order.items)
                                                                ? order.items
                                                                : JSON.parse(order.items || "[]")
                                                            ).reduce((sum, item) => sum + (item.quantity || 0), 0)} item(s)
                                                            </p>
                                        <p className="text-lg md:text-xl font-bold text-[#e14503]">₹{order.total_amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'track':
                return (
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{isHindi ? 'ऑर्डर ट्रैक करें' : 'Track Order'}</h2>
                        <form onSubmit={handleTrackOrder} className="mb-8">
                            <div className="flex flex-col md:flex-row gap-3">
                                <input
                                    type="text"
                                    value={trackOrderId}
                                    onChange={(e) => setTrackOrderId(e.target.value)}
                                    placeholder={isHindi ? "ऑर्डर आईडी दर्ज करें" : "Enter Order ID (e.g., ORD-2024-001)"}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] focus:ring-1 focus:ring-[#e14503]"
                                />
                                <button type="submit" className="bg-[#e14503] hover:bg-[#c23a02] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-orange-200">
                                    {isHindi ? 'ट्रैक करें' : 'Track'}
                                </button>
                            </div>
                        </form>
                        {trackingResult && (
                            <div className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{isHindi ? 'ऑर्डर आईडी' : 'Order ID'}</p>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{trackingResult.id}</h3>
                                    </div>
                                    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
                                        {trackingResult.status}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                    <div className="space-y-6 md:space-y-8 relative">
                                        {trackingResult.timeline.map((step, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                    {step.completed ? '✓' : index + 1}
                                                </div>
                                                <div>
                                                    <p className={`font-bold text-sm md:text-base ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</p>
                                                    <p className="text-xs text-gray-500">{step.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'wishlist':
                return (
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{isHindi ? 'मेरी इच्छा सूची' : 'My Wishlist'}</h2>
                        {wishlistItems.length === 0 ? (
                            <div className="text-center py-12">
                                <FaHeart className="text-gray-300 text-5xl mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">{isHindi ? 'आपकी इच्छा सूची खाली है' : 'Your wishlist is empty'}</p>
                                <Link to="/shop" className="text-[#e14503] hover:text-[#c23a02] font-semibold">{isHindi ? 'उत्पाद ब्राउज़ करें' : 'Browse Products'}</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                                {wishlistItems.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#e14503] transition-colors group">
                                        <div className="relative h-32 md:h-48 overflow-hidden bg-gray-100">
                                            <img
                                                src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'}
                                                alt={isHindi ? item.name : (item.nameEn || item.name)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                                            >
                                                <FaTrash className="text-red-500 text-xs" />
                                            </button>
                                        </div>
                                        <div className="p-3 md:p-4">
                                            <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 text-xs md:text-base">{isHindi ? item.name : (item.nameEn || item.name)}</h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={`text-[10px] ${i < Math.floor(item.rating || 4) ? 'text-yellow-500' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm md:text-xl font-bold text-gray-900">₹{item.price}</span>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="bg-[#e14503] hover:bg-[#c23a02] text-white px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                                >
                                                    <FaShoppingCart className="text-[10px]" /> {isHindi ? 'जोड़ें' : 'Add'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'settings':
                return (
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{isHindi ? 'खाता सेटिंग्स' : 'Account Settings'}</h2>
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="font-bold text-gray-900 mb-4">{isHindi ? 'सूचनाएं' : 'Notifications'}</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-gray-700 text-sm">{isHindi ? 'ऑर्डर के लिए ईमेल सूचनाएं' : 'Email notifications for orders'}</span>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#e14503]" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-gray-700 text-sm">{isHindi ? 'एसएमएस सूचनाएं' : 'SMS notifications'}</span>
                                        <input type="checkbox" className="w-5 h-5 accent-[#e14503]" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-gray-700 text-sm">{isHindi ? 'प्रचार ईमेल' : 'Promotional emails'}</span>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#e14503]" />
                                    </label>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="font-bold text-gray-900 mb-4">{isHindi ? 'पासवर्ड बदलें' : 'Change Password'}</h3>
                                <div className="space-y-4 max-w-md">
                                    <input type="password" placeholder={isHindi ? "वर्तमान पासवर्ड" : "Current Password"} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503]" />
                                    <input type="password" placeholder={isHindi ? "नया पासवर्ड" : "New Password"} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503]" />
                                    <input type="password" placeholder={isHindi ? "नए पासवर्ड की पुष्टि करें" : "Confirm New Password"} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503]" />
                                    <button className="bg-[#e14503] hover:bg-[#c23a02] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                                        {isHindi ? 'पासवर्ड अपडेट करें' : 'Update Password'}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-red-600 mb-4">{isHindi ? 'खतरा क्षेत्र' : 'Danger Zone'}</h3>
                                <button className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-semibold transition-colors border border-red-200">
                                    {isHindi ? 'खाता हटाएं' : 'Delete Account'}
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'support':
                return (
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">{isHindi ? 'ग्राहक सहायता' : 'Customer Support'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-6">{isHindi ? 'संपर्क जानकारी' : 'Contact Information'}</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#e14503] shrink-0">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{isHindi ? 'हमें कॉल करें' : 'Call Us'}</p>
                                            <p className="text-gray-600">+91 98765 43210</p>
                                            <p className="text-sm text-gray-500">{isHindi ? 'सोम-शनि: सुबह 9 - शाम 6' : 'Mon-Sat: 9AM - 6PM'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#e14503] shrink-0">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{isHindi ? 'हमें ईमेल करें' : 'Email Us'}</p>
                                            <p className="text-gray-600">support@ecommerce.com</p>
                                            <p className="text-sm text-gray-500">{isHindi ? '24 घंटे के भीतर जवाब' : 'Reply within 24 hours'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#e14503] shrink-0">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{isHindi ? 'हमारा पता' : 'Our Address'}</p>
                                            <p className="text-gray-600">123, Spiritual Lane, Temple Road</p>
                                            <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-6">{isHindi ? 'हमें संदेश भेजें' : 'Send us a Message'}</h3>
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(isHindi ? 'संदेश भेजा गया!' : 'Message sent!'); }}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{isHindi ? 'विषय' : 'Subject'}</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#e14503] focus:border-[#e14503] focus:outline-none" placeholder={isHindi ? 'आपकी समस्या क्या है?' : 'What is your issue about?'} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{isHindi ? 'संदेश' : 'Message'}</label>
                                        <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#e14503] focus:border-[#e14503] focus:outline-none" placeholder={isHindi ? 'विस्तार से बताएं...' : 'Describe in detail...'}></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-[#e14503] text-white py-2 rounded-lg font-semibold hover:bg-[#c23a02] transition-colors">
                                        {isHindi ? 'संदेश भेजें' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // ==========================================
    // MOBILE: Flipkart-style Account Page
    // ==========================================
    const renderMobileView = () => {
        // If a panel is open, show that panel with a back button
        if (mobilePanel) {
            return (
                <div className="min-h-screen bg-white">
                    {/* Panel Header with Back Button */}
                    <div className="sticky top-[100px] z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                        <button onClick={closeMobilePanel} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200">
                            <FaChevronLeft className="text-gray-700" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900">
                            {tabs.find(t => t.id === mobilePanel)?.label || ''}
                        </h2>
                    </div>
                    {/* Panel Content */}
                    <div className="p-4">
                        {renderContent()}
                    </div>
                </div>
            );
        }

        // Main Account Menu (Flipkart-style)
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-[#e14503] to-[#c23a02] px-5 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
                            <span className="text-white text-xl font-bold">
                                {profileData.firstName}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-white text-lg font-bold truncate">{profileData.firstName} {profileData.lastName}</h2>
                            <p className="text-white/80 text-sm truncate">{profileData.email}</p>
                            <p className="text-white/70 text-xs mt-0.5">{profileData.phone}</p>
                        </div>
                        <button
                            onClick={() => openMobilePanel('profile')}
                            className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                        >
                            <FaEdit className="text-white text-sm" />
                        </button>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="px-4 -mt-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { id: 'orders', icon: FaBox, label: isHindi ? 'ऑर्डर' : 'Orders', color: 'bg-blue-50 text-blue-600' },
                                { id: 'wishlist', icon: FaHeart, label: isHindi ? 'विशलिस्ट' : 'Wishlist', color: 'bg-pink-50 text-pink-600', badge: wishlistItems.length },
                                { id: 'track', icon: FaSearch, label: isHindi ? 'ट्रैक' : 'Track', color: 'bg-green-50 text-green-600' },
                                { id: 'support', icon: FaHeadset, label: isHindi ? 'सहायता' : 'Help', color: 'bg-purple-50 text-purple-600' },
                            ].map(action => (
                                <button
                                    key={action.id}
                                    onClick={() => openMobilePanel(action.id)}
                                    className="flex flex-col items-center gap-2 py-3 rounded-xl active:bg-gray-50 transition-colors relative"
                                >
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${action.color}`}>
                                        <action.icon className="text-lg" />
                                    </div>
                                    {action.badge > 0 && (
                                        <span className="absolute top-1 right-2 bg-[#e14503] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {action.badge > 9 ? '9+' : action.badge}
                                        </span>
                                    )}
                                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Menu List */}
                <div className="px-4 mt-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {isHindi ? 'खाता सेटिंग्स' : 'Account Settings'}
                        </h3>
                        {[
                            { id: 'settings', icon: FaCog, label: isHindi ? 'सेटिंग्स' : 'Settings', desc: isHindi ? 'सूचनाएं, पासवर्ड' : 'Notifications, Password' },
                            { id: 'profile', icon: FaUser, label: isHindi ? 'प्रोफ़ाइल संपादित करें' : 'Edit Profile', desc: isHindi ? 'नाम, ईमेल, फ़ोन' : 'Name, Email, Phone' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => openMobilePanel(item.id)}
                                className="w-full flex items-center gap-4 px-4 py-4 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                            >
                                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                    <item.icon className="text-sm" />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                    <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                                </div>
                                <FaChevronRight className="text-gray-300 text-xs shrink-0" />
                            </button>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="w-full flex items-center gap-4 px-4 py-4 border-t border-gray-50 active:bg-gray-50 transition-colors"
                        >
                            <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center text-[#e14503] shrink-0">
                                <FaGlobe className="text-sm" />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{isHindi ? 'भाषा बदलें' : 'Change Language'}</p>
                                <p className="text-xs text-gray-500">{language === 'hi' ? 'हिंदी → English' : 'English → हिंदी'}</p>
                            </div>
                            <div className="bg-[#e14503]/10 text-[#e14503] text-xs font-bold px-3 py-1.5 rounded-full">
                                {language === 'hi' ? 'हिंदी' : 'EN'}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Services Section */}
                <div className="px-4 mt-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {isHindi ? 'सेवाएं' : 'Services'}
                        </h3>
                        {[
                            { href: '/booking/cabs', icon: FaCar, label: isHindi ? 'कैब बुकिंग' : 'Cab Booking', color: 'bg-blue-50 text-blue-600' },
                            { href: '/booking/pandits', icon: FaOm, label: isHindi ? 'पंडित जी बुक करें' : 'Book Pandit Ji', color: 'bg-orange-50 text-orange-600' },
                            { href: '/packages', icon: FaMountain, label: isHindi ? 'दर्शन यात्रा' : 'Darshan Packages', color: 'bg-green-50 text-green-600' },
                            { href: '/panchang', icon: FaCalendarAlt, label: isHindi ? 'पंचांग' : 'Panchang', color: 'bg-purple-50 text-purple-600' },
                            { href: '/kundli', icon: FaSun, label: isHindi ? 'कुंडली' : 'Kundli', color: 'bg-amber-50 text-amber-600' },
                        ].map((item, idx) => (
                            <Link
                                key={idx}
                                to={item.href}
                                className="w-full flex items-center gap-4 px-4 py-4 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                            >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                                    <item.icon className="text-sm" />
                                </div>
                                <span className="text-sm font-semibold text-gray-900 flex-1 text-left">{item.label}</span>
                                <FaChevronRight className="text-gray-300 text-xs shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* More Options */}
                <div className="px-4 mt-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {isHindi ? 'अन्य' : 'More'}
                        </h3>
                        {[
                            { href: '/contact', icon: FaPhone, label: isHindi ? 'हमसे संपर्क करें' : 'Contact Us' },
                            { href: '/about', icon: FaInfoCircle, label: isHindi ? 'हमारे बारे में' : 'About Us' },
                            { href: '/privacy', icon: FaShieldAlt, label: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy' },
                            { href: '/terms', icon: FaFileAlt, label: isHindi ? 'नियम और शर्तें' : 'Terms & Conditions' },
                            { href: '/faq', icon: FaQuestionCircle, label: isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQ' },
                        ].map((item, idx) => (
                            <Link
                                key={idx}
                                to={item.href}
                                className="w-full flex items-center gap-4 px-4 py-4 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                            >
                                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                    <item.icon className="text-sm" />
                                </div>
                                <span className="text-sm font-semibold text-gray-900 flex-1 text-left">{item.label}</span>
                                <FaChevronRight className="text-gray-300 text-xs shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <div className="px-4 mt-4 mb-6">
                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-sm border border-red-100 active:bg-red-100 transition-colors"
                    >
                        <FaSignOutAlt />
                        {isHindi ? 'लॉग आउट' : 'Log Out'}
                    </button>
                </div>
            </div>
        );
    };

    // ==========================================
    // MAIN RETURN
    // ==========================================
    return (
        <div className="min-h-screen bg-gray-50">
            {/* === MOBILE VIEW === */}
            <div className="block lg:hidden">
                {renderMobileView()}
            </div>

            {/* === DESKTOP VIEW (unchanged) === */}
            <div className="hidden lg:block">
                <PageHeader
                    title={isHindi ? 'मेरा खाता' : 'My Account'}
                    subtitle={isHindi ? 'अपनी प्रोफ़ाइल और ऑर्डर प्रबंधित करें' : 'Manage your profile and orders'}
                    breadcrumb={[{ label: isHindi ? 'प्रोफ़ाइल' : 'Profile', link: "/profile" }]}
                />

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Desktop Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                    <div className="w-16 h-16 bg-[#e14503] rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">
                                            {profileData.firstName}{profileData.lastName}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
                                        <p className="text-sm text-gray-600">{profileData.email}</p>
                                    </div>
                                </div>
                                <nav className="space-y-2">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab.id
                                                    ? 'bg-[#e14503] text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <Icon />
                                                <span className="font-medium">{tab.label}</span>
                                                {tab.id === 'wishlist' && wishlistItems.length > 0 && (
                                                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${activeTab === tab.id ? 'bg-white text-[#e14503]' : 'bg-[#e14503] text-white'}`}>
                                                        {wishlistItems.length}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => { logout(); navigate('/'); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                                    >
                                        <FaSignOutAlt />
                                        <span>{isHindi ? 'लॉग आउट' : 'Log Out'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Content */}
                        <div className="lg:col-span-3">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
