import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex gap-4 p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-indigo-500 transition-colors">
            <SafeImage
                src={item.image}
                type={"products/"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-2">{item.category}</p>
                <p className="text-2xl font-bold text-indigo-400">${item.price}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                >
                    <FaTrash />
                </button>

                <div className="flex items-center gap-3 bg-slate-900 rounded-lg px-4 py-2">
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-400 hover:text-white transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <FaMinus size={12} />
                    </button>
                    <span className="text-white font-semibold w-8 text-center">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <FaPlus size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
