import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../../../components/common/Button';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <div>
            <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">
                Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <Button type="submit" size="md" className="!p-3">
                    <FaPaperPlane />
                </Button>
            </form>
        </div>
    );
};

export default Newsletter;
