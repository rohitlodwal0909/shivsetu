import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaMobileAlt } from 'react-icons/fa';
import { signup } from '../../features/auth/AuthenticationSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.authentication);

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

const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        return alert("Passwords do not match");
    }

    try {

        const resultAction = await dispatch(
            signup({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password
            })
        );

        if (signup.fulfilled.match(resultAction)) {
            navigate('/login');
        }

    } catch (error) {
        console.error(error);
    } finally {
    }
};

    return (
        <div className="min-h-screen bg-gray-100 md:flex md:items-center md:justify-center">

            <div className="w-full max-w-6xl bg-white md:rounded-[2rem] md:shadow-2xl overflow-hidden md:flex min-h-screen md:min-h-[650px]">

                {/* ================= DESKTOP LEFT PANEL ================= */}
                <div className="hidden md:flex w-1/2 bg-[#0f1117] text-white p-12 items-center justify-center relative">

                    <div className="absolute inset-0 bg-gradient-to-br from-[#e14503]/20 via-purple-900/20 to-black"></div>

                    <div className="relative z-10 max-w-md space-y-6">
                        <h2 className="text-4xl font-bold leading-tight">
                            🕉 Join <br />
                            <span className="text-[#e14503]">ShivSetu</span>
                        </h2>

                        <p className="text-gray-300">
                            भगवान शिव से जुड़ने का पावन माध्यम।
                            पूजा बुकिंग, रुद्राक्ष, आध्यात्मिक मार्गदर्शन और बहुत कुछ।
                        </p>

                        <div className="space-y-3 pt-4 text-sm text-gray-300">
                            <div>• Personalized Devotee Profile</div>
                            <div>• Puja & Pandit Booking Access</div>
                            <div>• Secure & Trusted Platform</div>
                            <div>• Exclusive Spiritual Offers</div>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT PANEL ================= */}
                <div className="w-full md:w-1/2 flex flex-col bg-white relative">

                    {/* ========== MOBILE APP HEADER ========== */}
                    <div className="md:hidden bg-gradient-to-br from-[#0f1117] to-black text-white px-6 pt-14 pb-20 rounded-b-[3rem] shadow-xl">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#e14503] rounded-3xl flex items-center justify-center text-3xl font-bold shadow-lg mb-4">
                                🕉
                            </div>

                            <h2 className="text-2xl font-bold">Create Account</h2>
                            <p className="text-gray-300 text-sm mt-1">
                                Begin your spiritual journey
                            </p>
                        </div>
                    </div>

                    {/* ========== FORM CONTAINER ========== */}
                    <div className="flex-1 px-6 -mt-12 md:mt-0 md:p-12 bg-white rounded-t-[2.5rem] md:rounded-none shadow-xl md:shadow-none flex flex-col justify-center">

                        <div className="hidden md:block mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Create Your ShivSetu Account
                            </h2>
                            <p className="text-gray-500">
                                Enter your details to get started
                            </p>
                        </div>
                        {error && (
    <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4">
        {error}
    </div>
)}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0f1117] text-white py-4 rounded-xl font-bold mt-4"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#e14503] font-bold">
                                Sign In
                            </Link>
                        </div>

                        <div className="h-8 md:hidden"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;