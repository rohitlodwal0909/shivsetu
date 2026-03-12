import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMobileAlt, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { userlogin } from '../../features/auth/AuthenticationSlice';

const Login = () => {
    const navigate = useNavigate();

    const { login, user } = useAuth();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('mobile');
    const [loading, setLoading] = useState(false);

    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    const [mobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) navigate('/account');
    }, [user, navigate]);

    const handleMobileSubmit = (e) => {
       
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowOtpInput(true);
        }, 1200);
    };

    const handleOtpVerify = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() =>
        {
            login({ name: "Devotee", mobile: mobileNumber });
            navigate('/account');

        }, 1200);
    };

const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!mobile || !password) return;

    setLoading(true);

    const resultAction = await dispatch(
        userlogin({ mobile, password })
    );

    setLoading(false);

    if (userlogin.fulfilled.match(resultAction)) {
        const user = resultAction?.payload?.user;
        login(user);
        navigate("/account");
    } else {
        alert("Invalid Credentials");
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
                            🕉 Har Har Mahadev <br />
                            <span className="text-[#e14503]">ShivSetu</span>
                        </h2>

                        <p className="text-gray-300">
                            भक्त और भगवान शिव के बीच एक पावन सेतु।
                            पूजा सामग्री, रुद्राक्ष, ज्योतिष सेवाएं और आध्यात्मिक मार्गदर्शन —
                            सब एक ही स्थान पर।
                        </p>

                        <div className="space-y-3 pt-4 text-sm text-gray-300">
                            <div>• Authentic Puja Samagri</div>
                            <div>• Verified Pandit Booking</div>
                            <div>• Secure & Trusted Platform</div>
                            <div>• 10,000+ Happy Devotees</div>
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

                            <h2 className="text-2xl font-bold">ShivSetu</h2>
                            <p className="text-gray-300 text-sm mt-1">
                                Continue your spiritual journey
                            </p>
                        </div>
                    </div>

                    {/* ========== FORM CONTAINER ========== */}
                    <div className="flex-1 px-6 -mt-12 md:mt-0 md:p-12 bg-white rounded-t-[2.5rem] md:rounded-none shadow-xl md:shadow-none flex flex-col justify-center">

                        <div className="hidden md:block mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Sign In to ShivSetu
                            </h2>
                            <p className="text-gray-500">
                                Continue your spiritual journey
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-xl mb-8 relative">
                            <div
                                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all"
                                style={{
                                    transform:
                                        activeTab === 'mobile'
                                            ? 'translateX(0)'
                                            : 'translateX(100%)'
                                }}
                            />

                            <button
                                onClick={() => {
                                    setActiveTab('mobile');
                                    setShowOtpInput(false);
                                }}
                                className="flex-1 py-3 text-sm font-semibold relative z-10"
                            >
                                <FaMobileAlt className="inline mr-1" /> Mobile
                            </button>

                            <button
                                onClick={() => setActiveTab('password')}
                                className="flex-1 py-3 text-sm font-semibold relative z-10"
                            >
                                <FaLock className="inline mr-1" /> Password
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'mobile' ? (
                                <motion.div
                                    key="mobile"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    {!showOtpInput ? (
                                        <form onSubmit={handleMobileSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm mb-2">
                                                    Mobile Number
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                                        +91
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        value={mobileNumber}
                                                        onChange={(e) =>
                                                            setMobileNumber(
                                                                e.target.value
                                                                    .replace(/\D/g, '')
                                                                    .slice(0, 10)
                                                            )
                                                        }
                                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
                                                        placeholder="Enter 10 digit number"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={mobileNumber.length < 10}
                                                className="w-full bg-[#0f1117] text-white py-4 rounded-xl font-bold"
                                            >
                                                {loading ? "Sending..." : <>Get OTP <FaArrowRight className="inline ml-2" /></>}
                                            </button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleOtpVerify} className="space-y-6">
                                            <div className="text-center text-sm text-gray-500">
                                                +91 {mobileNumber}
                                            </div>

                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(
                                                        e.target.value
                                                            .replace(/\D/g, '')
                                                            .slice(0, 6)
                                                    )
                                                }
                                                className="w-full text-center text-2xl tracking-[1em] py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
                                                placeholder="------"
                                                required
                                            />

                                            <button
                                                type="submit"
                                                className="w-full bg-[#e14503] text-white py-4 rounded-xl font-bold"
                                            >
                                                Verify & Login
                                            </button>
                                        </form>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="password"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                        <input
                                            type="text"
                                            value={mobile}
                                            onChange={(e) => setEmailOrMobile(e.target.value)}
                                            className="w-full px-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
                                            placeholder="Email or Mobile"
                                            required
                                        />

                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-4 bg-gray-50 rounded-xl border focus:border-[#e14503] outline-none"
                                            placeholder="Password"
                                            required
                                        />

                                        <button
                                            type="submit"
                                            className="w-full bg-[#0f1117] text-white py-4 rounded-xl font-bold"
                                        >
                                            Sign In
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 text-center text-sm">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-[#e14503] font-bold">
                                Create Account
                            </Link>
                        </div>

                        <div className="h-8 md:hidden"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;