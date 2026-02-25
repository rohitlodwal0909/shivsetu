import React, { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ isOpen: controlledIsOpen, onToggle, showFloatingButton = true }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hi! How can I help you today?', sender: 'bot' }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile);
            return () => window.removeEventListener('resize', checkIsMobile);
        }
    }, []);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const toggleChat = () => {
        if (controlledIsOpen !== undefined) {
            onToggle && onToggle();
        } else {
            setInternalIsOpen(prev => !prev);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        // Add user message
        const newMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user'
        };
        setMessages([...messages, newMessage]);
        setInputMessage('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: 'Thank you for your message! Our team will get back to you shortly.',
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <>
            {/* Chatbot Button - can be floating or inline inside header */}
            {showFloatingButton && (
                <div className="fixed bottom-6 right-6 z-[9999]">
                    <button
                        onClick={toggleChat}
                        className="chatbot-button relative bg-gradient-to-r from-[#e14503] to-[#c23a02] text-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110"
                        aria-label="Chat with us"
                    >
                        <FaComments className="text-3xl" />

                        {/* Light Minimalistic Wave Ripples */}
                        <span className="wave-ripple wave-1"></span>
                        <span className="wave-ripple wave-2"></span>
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`fixed z-[9999] animate-fade-in ${isMobile
                        ? 'bottom-20 right-4 left-4 w-auto max-w-none'
                        : 'bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)]'
                    } h-[500px] max-h-[calc(100vh-10rem)]`}
                >
                    <div className="bg-white rounded-2xl border border-gray-200 h-full flex flex-col shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#e14503] to-[#c23a02] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaComments className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Customer Support</h3>
                                    <p className="text-xs text-white/80">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.sender === 'user'
                                                ? 'bg-gradient-to-r from-[#e14503] to-[#c23a02] text-white rounded-br-none shadow-md'
                                                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e14503] focus:ring-2 focus:ring-[#e14503]/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#e14503] to-[#c23a02] hover:from-[#c23a02] hover:to-[#e14503] text-white p-3 rounded-xl transition-all transform hover:scale-105 shadow-md"
                                >
                                    <FaPaperPlane className="text-xl" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* Light Minimalistic Wave Animation */
                .chatbot-button {
                    animation: gentle-pulse 3s ease-in-out infinite;
                }

                @keyframes gentle-pulse {
                    0%, 100% { 
                        transform: scale(1); 
                    }
                    50% { 
                        transform: scale(1.03); 
                    }
                }

                .wave-ripple {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 1.5px solid rgba(225, 69, 3, 0.3);
                    opacity: 0;
                    animation: light-wave 3s ease-out infinite;
                }

                .wave-2 {
                    animation-delay: 1.5s;
                }

                @keyframes light-wave {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.8);
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
};

export default Chatbot;
