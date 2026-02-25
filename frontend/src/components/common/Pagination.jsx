import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-3 rounded-xl border flex items-center justify-center transition-all ${currentPage === 1
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-600 bg-white shadow-sm'
                    }`}
            >
                <FaChevronLeft size={14} />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === page
                        ? 'bg-orange-600 text-white shadow-orange-200'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-500 hover:text-orange-600'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-xl border flex items-center justify-center transition-all ${currentPage === totalPages
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-600 bg-white shadow-sm'
                    }`}
            >
                <FaChevronRight size={14} />
            </button>
        </div>
    );
};

export default Pagination;
