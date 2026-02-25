import React from 'react';
import { FaCheckCircle, FaClock, FaTruck } from 'react-icons/fa';

const OrderHistory = () => {
    const orders = [
        {
            id: '#ORD-2024-001',
            date: 'Jan 10, 2024',
            status: 'Delivered',
            total: 897,
            items: 3,
            icon: <FaCheckCircle className="text-green-500" />
        },
        {
            id: '#ORD-2024-002',
            date: 'Jan 12, 2024',
            status: 'In Transit',
            total: 199,
            items: 1,
            icon: <FaTruck className="text-indigo-500" />
        },
        {
            id: '#ORD-2024-003',
            date: 'Jan 13, 2024',
            status: 'Processing',
            total: 456,
            items: 2,
            icon: <FaClock className="text-yellow-500" />
        }
    ];

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 bg-slate-900 border border-slate-700 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">{order.icon}</div>
                                <div>
                                    <p className="text-white font-semibold">{order.id}</p>
                                    <p className="text-slate-400 text-sm">{order.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold text-xl">${order.total}</p>
                                <p className="text-slate-400 text-sm">{order.items} items</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-300">
                                Status: <span className="text-white">{order.status}</span>
                            </span>
                            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                                View Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
