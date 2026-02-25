import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/shop', label: 'Shop' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-200 ${isActive
                            ? 'text-indigo-400 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default NavLinks;
