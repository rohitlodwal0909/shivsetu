import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ProfileInfo = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001'
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Name</p>
                        <p className="text-white font-semibold">{user.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Email</p>
                        <p className="text-white font-semibold">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                        <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Phone</p>
                        <p className="text-white font-semibold">{user.phone}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                        <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Address</p>
                        <p className="text-white font-semibold">{user.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
