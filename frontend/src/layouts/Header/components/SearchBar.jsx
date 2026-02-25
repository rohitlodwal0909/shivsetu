import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
        </form>
    );
};

export default SearchBar;
