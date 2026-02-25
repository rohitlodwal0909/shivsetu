import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaFacebook } from 'react-icons/fa';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agree: false
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
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Sign up:', formData);
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join us and start shopping today</p>
                </div>


                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>


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
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                            <div className="relative">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
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
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#e14503] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>


                        <label className="flex items-start gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                required
                                className="w-4 h-4 mt-1 accent-[#e14503]"
                            />
                            <span className="text-sm text-gray-700">
                                I agree to the{' '}
                                <Link to="/terms" className="text-[#e14503] hover:text-[#c23a02] font-semibold">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-[#e14503] hover:text-[#c23a02] font-semibold">
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>


                        <button
                            type="submit"
                            className="w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-3 rounded-xl font-bold transition-colors"
                        >
                            Create Account
                        </button>
                    </form>


                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="text-sm text-gray-500">Or sign up with</span>
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
                        Already have an account?{' '}
                        <Link to="/signin" className="text-[#e14503] hover:text-[#c23a02] font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
