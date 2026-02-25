import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiHeart, FiShoppingBag, FiUser, FiSun, FiMap } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav = () => {
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();
    const { user } = useAuth();
    const location = useLocation();

    const cartCount = getCartCount();
    const wishlistCount = getWishlistCount();

    const navItems = [
        { name: 'Home', path: '/', icon: FiHome },
        { name: 'Shop', path: '/shop', icon: FiGrid },
        { name: 'Puja', path: '/puja', icon: FiSun }, // Replaced Wishlist
        { name: 'Tours', path: '/packages', icon: FiMap }, // Replaced Cart
        { name: 'Account', path: user ? '/profile' : '/login', icon: FiUser },
    ];

    // Hide on specific routes if needed, e.g., inside specific booking flows, but usually good to show everywhere
    // const hideOnRoutes = ['/checkout'];
    // if (hideOnRoutes.includes(location.pathname)) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[1000] md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full relative transition-colors duration-200 ${isActive ? 'text-[#e14503]' : 'text-gray-500 hover:text-gray-900'
                            }`
                        }
                    >
                        <div className="relative p-1">
                            <item.icon className="text-xl mb-1" />
                            {item.count > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#e14503] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                                    {item.count > 9 ? '9+' : item.count}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-medium leading-none">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MobileBottomNav;
