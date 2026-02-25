import React from 'react';
import Input from '../../../components/common/Input';
import { useLanguage } from '../../../context/LanguageContext';

const ShippingForm = ({ formData, onChange, errors = {}, isMobile = false }) => {
    const { isHindi } = useLanguage();

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
        "Lakshadweep", "Puducherry"
    ];

    return (
        <div className={`bg-white ${isMobile ? 'rounded-2xl shadow-sm' : 'rounded-2xl p-8 border border-gray-200 shadow-sm'}`}>
            <div className={isMobile ? 'p-5' : ''}>
                <h2 className={`font-bold ${isMobile ? 'text-lg text-gray-900 mb-5' : 'text-3xl gradient-text mb-8'}`}>
                    {isHindi ? 'शिपिंग जानकारी' : 'Shipping Information'}
                </h2>

                <div className={`space-y-${isMobile ? '4' : '6'}`}>
                    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-${isMobile ? '4' : '6'}`}>
                        <Input
                            label={isHindi ? 'पहला नाम' : 'First Name'}
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => onChange('firstName', e.target.value)}
                            required
                            error={errors.firstName}
                        />
                        <Input
                            label={isHindi ? 'अंतिम नाम' : 'Last Name'}
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => onChange('lastName', e.target.value)}
                            required
                            error={errors.lastName}
                        />
                    </div>

                    <Input
                        label={isHindi ? 'ईमेल' : 'Email'}
                        type="email"
                        value={formData.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        required
                        error={errors.email}
                    />

                    <Input
                        label={isHindi ? 'फ़ोन' : 'Phone'}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        required
                        error={errors.phone}
                    />

                    <Input
                        label={isHindi ? 'पता' : 'Address'}
                        type="text"
                        value={formData.address}
                        onChange={(e) => onChange('address', e.target.value)}
                        required
                        error={errors.address}
                    />

                    <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-6'}`}>
                        <Input
                            label={isHindi ? 'शहर' : 'City'}
                            type="text"
                            value={formData.city}
                            onChange={(e) => onChange('city', e.target.value)}
                            required
                            error={errors.city}
                        />

                        <div className="w-full">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {isHindi ? 'राज्य' : 'State'} <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.state}
                                onChange={(e) => onChange('state', e.target.value)}
                                className={`w-full px-4 py-3 bg-white border ${errors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#e14503] focus:ring-[#e14503]/20'} rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all appearance-none`}
                            >
                                <option value="">{isHindi ? 'राज्य चुनें' : 'Select State'}</option>
                                {indianStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && (
                                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                            )}
                        </div>

                        <Input
                            label={isHindi ? 'पिन कोड' : 'ZIP Code'}
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => onChange('zipCode', e.target.value)}
                            required
                            error={errors.zipCode}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingForm;
