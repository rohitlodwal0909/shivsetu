import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaShoppingBag, FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

const SignInModal = () => {
    const navigate = useNavigate();
    const { showSignUpModal, hideAuthModal } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign in:', formData);
        hideAuthModal();
        navigate('/account');
    };

    const handleSwitchToSignUp = () => {
        showSignUpModal();
    };

    const leftContent = (
        <>
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <FaShoppingBag className="text-4xl text-[#e14503]" />
                    <h1 className="text-3xl font-bold">ECOM</h1>
                </div>
                <h3 className="text-2xl font-bold mb-4">Welcome Back!</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                    Sign in to access your account and continue your shopping journey with exclusive deals and personalized recommendations.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <FaShoppingBag className="text-[#e14503]" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Fast Checkout</p>
                        <p className="text-sm">Save your info for quick orders</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <FaStar className="text-[#e14503]" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Exclusive Deals</p>
                        <p className="text-sm">Get access to member-only offers</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <AuthModal title="Sign In" leftContent={leftContent}>
            <p className="text-gray-600 mb-6">Enter your credentials to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative group">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#e14503] transition-colors" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative group">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#e14503] transition-colors" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                            className="w-4 h-4 accent-[#e14503] rounded"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            Remember me
                        </span>
                    </label>
                    <button
                        type="button"
                        className="text-sm text-[#e14503] hover:text-[#c23a02] font-semibold transition-colors"
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#e14503] to-[#c23a02] hover:from-[#c23a02] hover:to-[#e14503] text-white py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-lg"
                >
                    Sign In
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">Or continue with</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group">
                    <FaGoogle className="text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-gray-700">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                    <FaFacebook className="text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-gray-700">Facebook</span>
                </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <button
                    onClick={handleSwitchToSignUp}
                    className="text-[#e14503] hover:text-[#c23a02] font-semibold transition-colors"
                >
                    Sign Up
                </button>
            </p>
        </AuthModal>
    );
};

export default SignInModal;
