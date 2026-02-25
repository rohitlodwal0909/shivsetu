import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Account = () => {
    const userInfo = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001'
    };

    const orders = [
        { id: '#ORD-2024-001', date: 'Jan 10, 2024', status: 'Delivered', total: 897, items: 3 },
        { id: '#ORD-2024-002', date: 'Jan 12, 2024', status: 'In Transit', total: 199, items: 1 },
        { id: '#ORD-2024-003', date: 'Jan 13, 2024', status: 'Pending', total: 456, items: 2 }
    ];

    return (
        <div className="min-h-screen bg-gray-50 section-padding">
            <div className="container max-w-6xl">
                <h1 className="text-5xl font-bold gradient-text mb-12">My Account</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#e14503]/5 to-[#c23a02]/5 rounded-xl border border-[#e14503]/20">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#e14503] to-[#c23a02] rounded-full flex items-center justify-center shadow-lg">
                                    <FaUser className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Name</p>
                                    <p className="text-lg font-bold text-gray-900">{userInfo.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FaEnvelope className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Email</p>
                                    <p className="text-lg font-semibold text-gray-900">{userInfo.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaPhone className="text-green-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Phone</p>
                                    <p className="text-lg font-semibold text-gray-900">{userInfo.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-purple-600 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Address</p>
                                    <p className="text-lg font-semibold text-gray-900">{userInfo.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile-Only Support & Settings Links (moved from Mobile Menu) */}
                        <div className="mt-8 pt-8 border-t border-gray-100 md:hidden">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="/contact" className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center border border-gray-200">Contact Us</a>
                                <a href="/about" className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center border border-gray-200">About Us</a>
                                <a href="/privacy" className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center border border-gray-200">Privacy Policy</a>
                                <a href="/terms" className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-center border border-gray-200">Terms & Conditions</a>
                                <button className="p-3 bg-[#e14503]/10 text-[#e14503] rounded-lg text-sm font-bold hover:bg-[#e14503]/20 flex items-center justify-center border border-[#e14503]/20 col-span-2">
                                    Change Language (Hindi/English)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#e14503] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="text-lg font-bold text-gray-900 group-hover:text-[#e14503] transition-colors">{order.id}</p>
                                            <p className="text-sm text-gray-600">{order.date}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <span className="text-gray-600">
                                            <span className="font-semibold text-[#e14503]">{order.items}</span> items
                                        </span>
                                        <span className="text-2xl font-bold gradient-text">${order.total}</span>
                                    </div>
                                    <button className="mt-3 text-[#e14503] hover:text-[#c23a02] font-semibold text-sm transition-colors">
                                        View Details →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
