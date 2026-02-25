import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaMobileAlt, FaGoogle, FaFacebook } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate Signup
        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side - Branding (Hidden on Mobile) */}
                <div className="hidden md:flex w-1/2 bg-[#1a1c23] items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 -right-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute -bottom-10 left-0 w-80 h-80 bg-[#e14503] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="relative z-10 text-white space-y-6">
                        <h2 className="text-4xl font-bold leading-tight">Join the <br /><span className="text-[#e14503]">Community</span></h2>
                        <p className="text-gray-400 text-lg">Create an account to unlock exclusive benefits, track orders, and more.</p>

                        <ul className="space-y-4 pt-4">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#e14503]/20 flex items-center justify-center text-[#e14503]"><FaUser size={12} /></div>
                                <span>Personalized Profile</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#e14503]/20 flex items-center justify-center text-[#e14503]"><FaEnvelope size={12} /></div>
                                <span>Order Updates & Tracking</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#e14503]/20 flex items-center justify-center text-[#e14503]"><FaLock size={12} /></div>
                                <span>Secure Checkout</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white relative">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-500">Please fill in your details to sign up</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                placeholder="Mobile Number"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a1c23] hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign Up'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account? {' '}
                            <Link to="/login" className="text-[#e14503] font-bold hover:underline">Sign In</Link>
                        </p>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4">Or sign up with</p>
                            <div className="flex gap-4 justify-center">
                                <button className="flex items-center justify-center w-12 h-12 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                                    <FaGoogle className="text-red-500" />
                                </button>
                                <button className="flex items-center justify-center w-12 h-12 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                                    <FaFacebook className="text-blue-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
