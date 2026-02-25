import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSearch, FaHeart, FaShoppingCart, FaGlobe, FaChevronDown, FaStar, FaFire, FaTag, FaComments, FaCar, FaOm, FaMountain, FaCalendarAlt, FaSun, FaTh, FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Marquee from './components/Marquee';
import LanguageDropdown from './components/LanguageDropdown';
import { religiousProducts } from '../../data/products';
import './MegaMenu.css';
import './Header.css';

const Header = ({ onToggleChat }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const megaMenuRef = useRef(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t, toggleLanguage, language, isHindi } = useLanguage();
    const { getCartCount, addToCart, cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const { getWishlistCount, wishlistItems, removeFromWishlist } = useWishlist();

    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    // Helper to close all sheets
    const closeAllSheets = () => {
        setIsServicesOpen(false);
        setIsWishlistOpen(false);
        setIsCartOpen(false);
        setIsMobileSearchOpen(false);
    };

    // Close mega menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setIsMegaMenuOpen(false);
                setActiveCategory(null);
            }
        };

        if (isMegaMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMegaMenuOpen]);

    // Lock body scroll when any bottom sheet is open
    useEffect(() => {
        if (isServicesOpen || isWishlistOpen || isCartOpen || isMobileSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isServicesOpen, isWishlistOpen, isCartOpen, isMobileSearchOpen]);

    // Auto-focus search input when search sheet opens
    useEffect(() => {
        if (isMobileSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 350);
        }
    }, [isMobileSearchOpen]);

    const mobileServices = [
        { path: '/booking/cabs', icon: FaCar, label: isHindi ? 'कैब' : 'Cabs', color: 'bg-blue-500' },
        { path: '/booking/pandits', icon: FaOm, label: isHindi ? 'पंडित जी' : 'Pandit Ji', color: 'bg-orange-500' },
        { path: '/packages', icon: FaMountain, label: isHindi ? 'दर्शन' : 'Darshan', color: 'bg-emerald-500' },
        { path: '/panchang', icon: FaCalendarAlt, label: isHindi ? 'पंचांग' : 'Panchang', color: 'bg-purple-500' },
        { path: '/puja', icon: FaSun, label: isHindi ? 'पूजा' : 'Puja', color: 'bg-red-500' },
        { path: '/kundli', icon: FaStar, label: isHindi ? 'कुंडली' : 'Kundli', color: 'bg-amber-500' },
    ];

    const categories = [
        { name: isHindi ? 'होम' : 'Home', path: '/' },
        { name: isHindi ? 'हमारे बारे में' : 'About', path: '/about' },
        { name: isHindi ? 'दुकान' : 'Shop', path: '/shop' },
        { name: isHindi ? 'श्रेणी' : 'Category', path: '/categories' },
        { name: isHindi ? 'ट्रेंडिंग' : 'Trending', path: '/trending' },
        { name: isHindi ? 'नया आगमन' : 'New Arrival', path: '/new-arrival' }
    ];

    const bottomNav = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Categories', path: '/categories' },
        { name: 'Trending', path: '/trending' },
        { name: 'New Arrival', path: '/new-arrival' },
        { name: 'All', path: '/shop' }
    ];

    const leftNavItems = [
        { name: isHindi ? 'कैब बुकिंग' : ' Cabs', path: '/booking/cabs' },
        { name: isHindi ? 'पंडित जी बुक करें' : ' Pandit Ji', path: '/booking/pandits' },
        { name: isHindi ? 'यात्रा पैकेज' : 'Darshan', path: '/packages' },
        { name: isHindi ? 'पंचांग' : 'Panchang', path: '/panchang' },
        { name: isHindi ? 'चढ़ावा' : 'Puja', path: '/puja' },
        { name: isHindi ? 'चढ़ावा' : 'Kundli', path: '/kundli' },
    ];

    const cartSubtotal = getCartTotal();
    const cartTotal = cartSubtotal + cartSubtotal * 0.1;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            closeAllSheets();
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="header-wrapper">
            {/* Marquee Announcement Bar */}
            <Marquee />

            {/* Main Header */}
            <div className="header-main">
                <div className="header-container">
                    {/* Top Navigation Bar */}
                    <div className="header-top">
                        {/* Left Navigation */}
                        <nav className="header-nav-left">
                            {leftNavItems.map((item, index) => (
                                <Link key={index} to={item.path} className="nav-link">
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Center Logo */}
                        <Link to="/" className="header-logo">
                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="logo-text">ECOM</span>
                        </Link>

                        {/* Right Actions */}
                        <div className="header-actions">
                            {/* Desktop: Language Dropdown */}
                            <div className="hidden md:block">
                                <LanguageDropdown />
                            </div>

                            <button
                                className="action-icon hidden md:flex"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Search"
                            >
                                <FaSearch />
                            </button>
                            <button
                                onClick={() => navigate(user ? '/profile' : '/login')}
                                className="action-icon hidden md:flex"
                                aria-label="Account"
                            >
                                <FaUser />
                            </button>
                            {/* Customer Support / Chat */}
                            <button
                                onClick={onToggleChat}
                                className="action-icon hidden md:flex"
                                aria-label="Customer support chat"
                            >
                                <FaComments />
                            </button>
                            <Link to="/wishlist" className="action-icon relative hidden md:flex" aria-label="Wishlist">
                                <FaHeart />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e14503] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {wishlistCount > 9 ? '9+' : wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/cart"
                                className="action-icon cart-icon relative hidden md:flex"
                                aria-label="Cart"
                            >
                                <FaShoppingCart />
                                <span className={`cart-badge ${cartCount === 0 ? 'bg-gray-400' : ''}`}>
                                    {cartCount}
                                </span>
                            </Link>

                            {/* ========== MOBILE ICONS ========== */}

                            {/* Mobile Search */}
                            <button
                                onClick={() => { closeAllSheets(); setIsMobileSearchOpen(true); }}
                                className="flex md:hidden items-center justify-center p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                                aria-label="Search"
                            >
                                <FaSearch className="text-base" />
                            </button>

                            {/* Mobile Services Toggle */}
                            <button
                                onClick={() => { closeAllSheets(); setIsServicesOpen(true); }}
                                className="flex md:hidden items-center justify-center p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                                aria-label="Services"
                            >
                                <FaTh className="text-lg" />
                            </button>

                            {/* Mobile Wishlist Icon */}
                            <button
                                onClick={() => { closeAllSheets(); setIsWishlistOpen(true); }}
                                className="relative flex md:hidden items-center justify-center p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                                aria-label="Wishlist"
                            >
                                <FaHeart className="text-lg" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e14503] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                        {wishlistCount > 9 ? '9+' : wishlistCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Cart Icon */}
                            <button
                                onClick={() => { closeAllSheets(); setIsCartOpen(true); }}
                                className="cart-icon relative flex md:hidden text-gray-700 p-2 items-center justify-center"
                                aria-label="Cart"
                            >
                                <FaShoppingCart className="text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e14503] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Desktop Search Bar */}
                    {isSearchOpen && (
                        <div className="search-dropdown">
                            <input
                                type="text"
                                placeholder={isHindi ? "उत्पाद खोजें..." : "Search for products..."}
                                className="search-input"
                                autoFocus
                            />
                        </div>
                    )}

                    {/* ==================== BOTTOM SHEETS ==================== */}

                    {/* Search Bottom Sheet */}
                    <div className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${isMobileSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileSearchOpen(false)} />
                        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ease-out ${isMobileSearchOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            {/* Drag Handle */}
                            <div className="flex justify-center pt-3 pb-1">
                                <div className="w-10 h-1 bg-gray-300 rounded-full" />
                            </div>
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3">
                                <h3 className="text-base font-bold text-gray-900">{isHindi ? 'खोजें' : 'Search'}</h3>
                                <button onClick={() => setIsMobileSearchOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <FaTimes className="text-gray-500 text-xs" />
                                </button>
                            </div>
                            {/* Search Input */}
                            <div className="px-5 pb-6">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={isHindi ? "उत्पाद, श्रेणी या ब्रांड खोजें..." : "Search products, categories, brands..."}
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-100 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e14503]/20 focus:bg-white focus:border focus:border-[#e14503]"
                                        />
                                    </div>
                                </form>
                                {/* Quick Links */}
                                <div className="mt-4">
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">{isHindi ? 'लोकप्रिय' : 'Popular'}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Rudraksha', 'Puja Kit', 'Incense', 'Idols', 'Mala'].map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => { setSearchQuery(tag); closeAllSheets(); navigate(`/shop?search=${encodeURIComponent(tag)}`); }}
                                                className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 active:bg-gray-200"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services Bottom Sheet */}
                    <div className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${isServicesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/40" onClick={() => setIsServicesOpen(false)} />
                        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ease-out ${isServicesOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            {/* Drag Handle */}
                            <div className="flex justify-center pt-3 pb-1">
                                <div className="w-10 h-1 bg-gray-300 rounded-full" />
                            </div>
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3">
                                <h3 className="text-base font-bold text-gray-900">{isHindi ? 'हमारी सेवाएं' : 'Our Services'}</h3>
                                <button onClick={() => setIsServicesOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <FaTimes className="text-gray-500 text-xs" />
                                </button>
                            </div>
                            {/* Grid */}
                            <div className="px-5 pb-8 grid grid-cols-3 gap-3">
                                {mobileServices.map((service, idx) => (
                                    <Link
                                        key={idx}
                                        to={service.path}
                                        onClick={() => setIsServicesOpen(false)}
                                        className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl bg-gray-50 active:scale-[0.95] transition-all"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center shadow-lg`}>
                                            <service.icon className="text-white text-lg" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-800 text-center">{service.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Wishlist Bottom Sheet */}
                    <div className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${isWishlistOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/40" onClick={() => setIsWishlistOpen(false)} />
                        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ease-out max-h-[80vh] flex flex-col ${isWishlistOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            {/* Drag Handle */}
                            <div className="flex justify-center pt-3 pb-1 shrink-0">
                                <div className="w-10 h-1 bg-gray-300 rounded-full" />
                            </div>
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">{isHindi ? 'इच्छा सूची' : 'Wishlist'}</h3>
                                    <p className="text-xs text-gray-500">{wishlistCount} {isHindi ? 'आइटम' : 'items'}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link to="/wishlist" onClick={() => setIsWishlistOpen(false)} className="text-xs text-[#e14503] font-semibold">
                                        {isHindi ? 'सभी देखें' : 'View All'}
                                    </Link>
                                    <button onClick={() => setIsWishlistOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <FaTimes className="text-gray-500 text-xs" />
                                    </button>
                                </div>
                            </div>
                            {/* Wishlist Items */}
                            <div className="flex-1 overflow-y-auto overscroll-contain">
                                {wishlistItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                            <FaHeart className="text-red-200 text-2xl" />
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">{isHindi ? 'कोई आइटम नहीं' : 'No items yet'}</p>
                                        <Link to="/shop" onClick={() => setIsWishlistOpen(false)} className="mt-3 text-xs text-[#e14503] font-semibold">
                                            {isHindi ? 'खरीदारी करें' : 'Start Shopping'}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="px-5 py-3 space-y-3">
                                        {wishlistItems.map((item) => (
                                            <div key={item.id} className="flex gap-3 items-center">
                                                <Link to={`/product/${item.id}`} onClick={() => setIsWishlistOpen(false)} className="shrink-0">
                                                    <img
                                                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80'}
                                                        alt={isHindi ? item.name : (item.nameEn || item.name)}
                                                        className="w-16 h-16 object-cover rounded-xl"
                                                    />
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{isHindi ? item.name : (item.nameEn || item.name)}</h4>
                                                    <p className="text-sm font-bold text-gray-900 mt-0.5">₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <button
                                                        onClick={() => { addToCart(item); }}
                                                        className="w-8 h-8 rounded-full bg-[#e14503] flex items-center justify-center"
                                                    >
                                                        <FaShoppingCart className="text-white text-xs" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                                                    >
                                                        <FaTrash className="text-gray-400 text-xs" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cart Bottom Sheet */}
                    <div className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
                        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ease-out max-h-[85vh] flex flex-col ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            {/* Drag Handle */}
                            <div className="flex justify-center pt-3 pb-1 shrink-0">
                                <div className="w-10 h-1 bg-gray-300 rounded-full" />
                            </div>
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">{isHindi ? 'शॉपिंग कार्ट' : 'Shopping Cart'}</h3>
                                    <p className="text-xs text-gray-500">{cartCount} {isHindi ? 'आइटम' : 'items'}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link to="/cart" onClick={() => setIsCartOpen(false)} className="text-xs text-[#e14503] font-semibold">
                                        {isHindi ? 'सभी देखें' : 'View All'}
                                    </Link>
                                    <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <FaTimes className="text-gray-500 text-xs" />
                                    </button>
                                </div>
                            </div>
                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto overscroll-contain">
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FaShoppingCart className="text-gray-300 text-2xl" />
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">{isHindi ? 'कार्ट खाली है' : 'Cart is empty'}</p>
                                        <Link to="/shop" onClick={() => setIsCartOpen(false)} className="mt-3 text-xs text-[#e14503] font-semibold">
                                            {isHindi ? 'खरीदारी करें' : 'Start Shopping'}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="px-5 py-3 space-y-3">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-3 items-center">
                                                <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="shrink-0">
                                                    <img
                                                        src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80'}
                                                        alt={isHindi ? item.name : (item.nameEn || item.name)}
                                                        className="w-14 h-14 object-cover rounded-xl"
                                                    />
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{isHindi ? item.name : (item.nameEn || item.name)}</h4>
                                                    <p className="text-sm font-bold text-gray-900 mt-0.5">₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center bg-gray-100 rounded-full">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-7 h-7 flex items-center justify-center rounded-full"
                                                        >
                                                            <FaMinus className="text-gray-500 text-[8px]" />
                                                        </button>
                                                        <span className="w-5 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center rounded-full"
                                                        >
                                                            <FaPlus className="text-gray-500 text-[8px]" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center ml-1"
                                                    >
                                                        <FaTrash className="text-gray-400 text-[10px]" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Cart Footer with Total + Checkout */}
                            {cartItems.length > 0 && (
                                <div className="shrink-0 border-t border-gray-100 px-5 py-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{isHindi ? 'कुल राशि' : 'Total'}</p>
                                            <p className="text-lg font-bold text-gray-900">₹{cartTotal.toFixed(2)}</p>
                                        </div>
                                        <Link
                                            to="/checkout"
                                            onClick={() => setIsCartOpen(false)}
                                            className="bg-[#e14503] text-white px-6 py-2.5 rounded-xl font-bold text-sm"
                                        >
                                            {isHindi ? 'चेकआउट' : 'Checkout'}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Navigation */}
                    <nav className="category-nav">
                        {categories.map((category, index) => (
                            <div key={index} className="relative group">
                                <Link
                                    to={category.path}
                                    className="category-link"
                                >
                                    {category.name}
                                    {category.subCategories && <span className="dropdown-arrow">▼</span>}
                                </Link>
                                {category.subCategories && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-56 bg-white shadow-xl rounded-lg overflow-hidden hidden group-hover:block z-50 border border-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                        <div className="py-2">
                                            {category.subCategories.map((sub, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={sub.path}
                                                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#e14503] transition-colors border-b last:border-0 border-gray-50"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>


        </header>
    );
};

export default Header;
