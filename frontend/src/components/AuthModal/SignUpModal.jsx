import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaFacebook, FaShoppingBag, FaShieldAlt, FaTruck, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';
import { useToast } from '../../context/ToastContext';

const SignUpModal = () => {
    const navigate = useNavigate();
    const { showSignInModal, hideAuthModal } = useAuth();
    const { showToast } = useToast();
    const [step, setStep] = useState('form');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agree: false
    });

    useEffect(() => {
        let interval;
        if (step === 'verify' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleInitiateSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match! ❌', { type: 'error' });
            return;
        }

        // Mock sending OTP
        setStep('verify');
        setTimer(30);
        showToast(`Verification code sent to ${formData.email} 📧`, { type: 'info' });
    };

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            showToast('Please enter the complete verification code', { type: 'warning' });
            return;
        }

        // Mock verification success
        console.log('Sign up:', formData);
        showToast('Account created successfully! 🎉', { type: 'success' });
        hideAuthModal();
        showSignInModal();
    };

    const handleResendOtp = () => {
        setTimer(30);
        showToast('Verification code resent! 📧', { type: 'info' });
    };

    const handleSwitchToSignIn = () => {
        showSignInModal();
    };

    const leftContent = (
        <>
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <FaShoppingBag className="text-4xl text-[#e14503]" />
                    <h1 className="text-3xl font-bold">ECOM</h1>
                </div>
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Create an account to unlock exclusive benefits, track orders, and enjoy a personalized shopping experience.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <FaTruck className="text-[#e14503]" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Free Shipping</p>
                        <p className="text-sm">On orders over $50</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <FaShieldAlt className="text-[#e14503]" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Secure Checkout</p>
                        <p className="text-sm">100% protected payments</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <AuthModal title={step === 'verify' ? "Verify Email" : "Create Account"} leftContent={leftContent}>
            {step === 'form' ? (
                <>
                    <p className="text-gray-600 mb-6">Fill in your details to get started</p>
                    <form onSubmit={handleInitiateSignup} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <label className="flex items-start gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                required
                                className="w-4 h-4 mt-1 accent-[#e14503] rounded"
                            />
                            <span className="text-sm text-gray-600">
                                I agree to the{' '}
                                <span className="text-[#e14503] hover:text-[#c23a02] font-semibold">Terms of Service</span>
                                {' '}and{' '}
                                <span className="text-[#e14503] hover:text-[#c23a02] font-semibold">Privacy Policy</span>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#e14503] to-[#c23a02] hover:from-[#c23a02] hover:to-[#e14503] text-white py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-lg"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-sm text-gray-500">Or sign up with</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group">
                            <FaGoogle className="text-red-500" />
                            <span className="font-semibold text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                            <FaFacebook className="text-blue-600" />
                            <span className="font-semibold text-gray-700">Facebook</span>
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={handleSwitchToSignIn}
                            className="text-[#e14503] hover:text-[#c23a02] font-semibold transition-colors"
                        >
                            Sign In
                        </button>
                    </p>
                </>
            ) : (
                <div className="text-center pt-4">
                    <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaEnvelope className="text-[#e14503] text-3xl" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
                    <p className="text-gray-600 mb-8">
                        We've sent a 6-digit verification code to<br />
                        <span className="font-semibold text-gray-900">{formData.email}</span>
                    </p>

                    <form onSubmit={handleVerifyAndSignup}>
                        <div className="flex justify-center gap-3 mb-8">
                            {otp.map((data, index) => (
                                <input
                                    className="w-12 h-12 border-2 border-gray-300 rounded-xl text-center text-xl font-bold focus:border-[#e14503] focus:outline-none transition-colors"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#e14503] to-[#c23a02] hover:from-[#c23a02] hover:to-[#e14503] text-white py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-lg mb-6"
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-6">
                        Didn't receive code?
                        <button
                            onClick={handleResendOtp}
                            disabled={timer > 0}
                            className={`font-semibold ${timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#e14503] hover:text-[#c23a02]'}`}
                        >
                            Resend {timer > 0 && `(${timer}s)`}
                        </button>
                    </div>

                    <button
                        onClick={() => setStep('form')}
                        className="text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 mx-auto font-medium"
                    >
                        <FaArrowLeft className="text-sm" /> Back to Sign Up
                    </button>
                </div>
            )}
        </AuthModal>
    );
};

export default SignUpModal;
