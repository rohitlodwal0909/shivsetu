import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md overflow-hidden p-8 relative">
                <button onClick={() => navigate('/login')} className="absolute top-8 left-8 text-gray-400 hover:text-gray-900 transition-colors">
                    <FaArrowLeft />
                </button>

                <div className="text-center mb-8 pt-8">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaEnvelope className="text-[#e14503] text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
                    <p className="text-gray-500 mt-2 text-sm">No worries, we'll send you reset instructions.</p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#e14503]/20 focus:ring-4 focus:ring-[#e14503]/10 rounded-xl transition-all outline-none text-gray-900 placeholder-gray-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a1c23] hover:bg-black text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Reset Password'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm">
                            If an account exists for <strong>{email}</strong>, we have sent password reset instructions to it.
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#e14503] font-bold hover:underline"
                        >
                            Back to Login
                        </button>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 font-medium">Remember password?</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
