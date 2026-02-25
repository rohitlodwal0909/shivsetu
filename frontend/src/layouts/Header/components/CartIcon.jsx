import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
    const cartItemCount = 3; // This would come from context/state

    return (
        <Link to="/cart" className="relative group">
            <div className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200">
                <FaShoppingCart className="text-2xl text-slate-300 group-hover:text-white transition-colors" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {cartItemCount}
                    </span>
                )}
            </div>
        </Link>
    );
};

export default CartIcon;
