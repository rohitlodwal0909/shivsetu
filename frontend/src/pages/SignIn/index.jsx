import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';

const SignIn = () => {
    const navigate = useNavigate();
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
        navigate('/account');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>


                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                />
                            </div>
                        </div>


                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-[#e14503]"
                                />
                                <span className="text-sm text-gray-700">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-[#e14503] hover:text-[#c23a02] font-semibold">
                                Forgot password?
                            </Link>
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-3 rounded-xl font-bold transition-colors"
                        >
                            Sign In
                        </button>
                    </form>


                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="text-sm text-gray-500">Or continue with</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <FaGoogle className="text-red-500" />
                            <span className="font-semibold text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <FaFacebook className="text-blue-600" />
                            <span className="font-semibold text-gray-700">Facebook</span>
                        </button>
                    </div>


                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-[#e14503] hover:text-[#c23a02] font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
