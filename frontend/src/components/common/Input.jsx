import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required, className = '', error }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-3 bg-white border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#e14503] focus:ring-[#e14503]/20'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${className}`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default Input;
