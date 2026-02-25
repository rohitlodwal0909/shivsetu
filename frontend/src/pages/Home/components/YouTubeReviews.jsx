import React from 'react';
import { FaPlay, FaYoutube, FaEye } from 'react-icons/fa';
import SafeImage from '../../../components/common/SafeImage';

const YouTubeReviews = () => {
    const videoReviews = [
        {
            id: 1,
            videoId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=800&q=80",
            title: "Amazing Shopping Experience - Customer Review",
            reviewer: "Rahul Verma",
            views: "12K"
        },
        {
            id: 2,
            videoId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
            title: "Spiritual Services Review - Pandit Booking",
            reviewer: "Anjali Mehta",
            views: "8.5K"
        },
        {
            id: 3,
            videoId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            title: "Best Online Shopping Platform - Complete Review",
            reviewer: "Suresh Patel",
            views: "15K"
        },
        {
            id: 4,
            videoId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
            title: "Chadava Booking Experience - Must Watch",
            reviewer: "Neha Singh",
            views: "10K"
        }
    ];

    return (
        <section className="py-10 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">

                <div className="mb-8 lg:mb-16 pl-1 text-left">
                    <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Video Reviews <span className="text-2xl md:text-3xl">📹</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-1.5 font-medium">
                        Watch what people <span className="text-[#e14503]">Experience</span>
                    </p>
                </div>


                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                    {videoReviews.map((video) => (
                        <div
                            key={video.id}
                            className="min-w-[85%] md:min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#e14503] hover:shadow-xl transition-all duration-300 snap-center"
                        >

                            <div className="relative h-56 overflow-hidden bg-gray-900 cursor-pointer group">
                                <SafeImage
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-[#e14503] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <FaPlay className="text-white text-xl ml-1" />
                                    </div>
                                </div>
                            </div>


                            <div className="p-5">
                                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">
                                    {video.title}
                                </h3>


                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm text-gray-600">
                                    <span className="font-semibold">{video.reviewer}</span>
                                    <div className="flex items-center gap-1">
                                        <FaEye className="text-[#e14503]" />
                                        <span>{video.views}</span>
                                    </div>
                                </div>


                                <button className="mt-4 w-full bg-[#e14503] hover:bg-[#c23a02] text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                    <FaYoutube />
                                    Watch Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="text-center mt-10">
                    <a
                        href="https://youtube.com/@yourchannelname"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-[#e14503] hover:text-white text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors border border-gray-200"
                    >
                        <FaYoutube className="text-xl" />
                        View Our YouTube Channel
                    </a>
                </div>
            </div>
        </section>
    );
};

export default YouTubeReviews;
