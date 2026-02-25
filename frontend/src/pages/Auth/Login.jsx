import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMobileAlt, FaLock, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { hideAuthModal, login, user } = useAuth(); // Hide modal if it's somehow open
    const [activeTab, setActiveTab] = useState('mobile'); // 'mobile' or 'password'
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    React.useEffect(() => {
        if (user) {
            navigate('/account');
        }
    }, [user, navigate]);

    // Mobile OTP State
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    // Password Login State
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleMobileSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setShowOtpInput(true);
        }, 1500);
    };

    const handleOtpVerify = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            const mockUser = {
                name: 'User',
                mobile: mobileNumber,
                email: 'user@example.com'
            };
            login(mockUser);
            setLoading(false);
            navigate('/account');
        }, 1500);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate Login
        setTimeout(() => {
            const mockUser = {
                name: 'User',
                email: emailOrMobile,
                mobile: '9876543210'
            };
            login(mockUser);
            setLoading(false);
            navigate('/account');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side - Branding / Visual (Hidden on Mobile) */}
                <div className="hidden md:flex w-1/2 bg-[#1a1c23] items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 -left-10 w-72 h-72 bg-[#e14503] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute -bottom-10 right-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="relative z-10 text-white space-y-6">
                        <h2 className="text-4xl font-bold leading-tight">Welcome to <br /><span className="text-[#e14503]">ECOM</span> World</h2>
                        <p className="text-gray-400 text-lg">Discover premium products, exclusive deals, and seamless shopping experience.</p>

                        <div className="flex gap-4 pt-4">
                            <div className="flex -space-x-3">
                                <img className="w-10 h-10 rounded-full border-2 border-[#1a1c23]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                                <img className="w-10 h-10 rounded-full border-2 border-[#1a1c23]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                                <img className="w-10 h-10 rounded-full border-2 border-[#1a1c23]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="User" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-bold">10k+</span>
                                <span className="text-xs text-gray-500">Happy Customers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white relative">

                    {/* Mobile-App Like Header for Mobile View */}
                    <div className="md:hidden mb-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-tr from-[#e14503] to-orange-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                            <span className="text-white font-bold text-2xl">E</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
                    </div>

                    <div className="hidden md:block mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-gray-500">Please choose your preferred method</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-xl mb-8 relative">
                        <div className="absolute inset-y-1 left-1 w-[calc(50%-4px)] flex transition-all duration-300 ease-out"
                            style={{ transform: activeTab === 'mobile' ? 'translateX(0)' : 'translateX(100%)' }}>
                            <div className="w-full h-full bg-white rounded-lg shadow-sm"></div>
                        </div>
                        <button
                            onClick={() => { setActiveTab('mobile'); setShowOtpInput(false); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold relative z-10 transition-colors ${activeTab === 'mobile' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FaMobileAlt /> Mobile
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold relative z-10 transition-colors ${activeTab === 'password' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FaLock /> Password
                        </button>
                    </div>

                    {/* Forms Container */}
                    <div className="relative min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'mobile' ? (
                                <motion.div
                                    key="mobile"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {!showOtpInput ? (
                                        <form onSubmit={handleMobileSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                                                    <input
                                                        type="tel"
                                                        value={mobileNumber}
                                                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none font-medium text-gray-900 placeholder-gray-400"
                                                        placeholder="Enter 10 digit number"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading || mobileNumber.length < 10}
                                                className="w-full bg-[#1a1c23] hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Get OTP <FaArrowRight className="text-sm" /></>}
                                            </button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleOtpVerify} className="space-y-6">
                                            <div className="text-center mb-6">
                                                <p className="text-gray-500 text-sm">Cancel and <button type="button" onClick={() => setShowOtpInput(false)} className="text-[#e14503] font-semibold">Change Number</button></p>
                                                <p className="text-gray-900 font-bold mt-1">+91 {mobileNumber}</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Enter OTP</label>
                                                <input
                                                    type="text"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="w-full text-center tracking-[1em] py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none font-bold text-2xl text-gray-900 placeholder-gray-300"
                                                    placeholder="------"
                                                    autoFocus
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading || otp.length < 4}
                                                className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#e14503]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify & Login'}
                                            </button>

                                            <div className="text-center">
                                                <button type="button" className="text-sm text-gray-500 font-medium hover:text-gray-900">Resend OTP in 24s</button>
                                            </div>
                                        </form>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="password"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email or Mobile</label>
                                            <input
                                                type="text"
                                                value={emailOrMobile}
                                                onChange={(e) => setEmailOrMobile(e.target.value)}
                                                className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                                placeholder="user@example.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                                <Link to="/forgot-password" className="text-sm font-semibold text-[#e14503] hover:text-[#c23a02]">Forgot?</Link>
                                            </div>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#1a1c23] hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center md:text-left">
                        <p className="text-gray-500 text-sm">
                            Don't have an account? {' '}
                            <Link to="/signup" className="text-[#e14503] font-bold hover:underline">Create Account</Link>
                        </p>

                        {/* Social Login (Optional) */}
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4">Or continue with</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    <FaGoogle className="text-red-500" /> <span className="text-sm font-medium text-gray-700">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    <FaFacebook className="text-blue-600" /> <span className="text-sm font-medium text-gray-700">Facebook</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
