import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaUser, FaArrowLeft, FaCalendar, FaTag, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { blogs } from '../../data/blogs';
import BlogSidebar from '../../components/Blog/BlogSidebar';
import SafeImage from '../../components/common/SafeImage';
import BlogCard from '../Blogs/components/BlogCard';

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogs.find(p => p.id === parseInt(id));

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                    <div className="text-6xl mb-4">😕</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h1>
                    <p className="text-gray-500 mb-6">The article you are looking for doesn't exist or has been moved.</p>
                    <Link to="/blogs" className="inline-block px-6 py-3 bg-[#e14503] text-white rounded-xl font-bold hover:bg-[#c23a02] transition-colors shadow-md">
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    // Find related posts
    const relatedPosts = blogs
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <SafeImage
                    src={post.image}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    style={{ height: '70vh' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full z-20 pb-12 lg:pb-20">
                    <div className="container max-w-7xl mx-auto px-4">
                        <div className="max-w-4xl">
                            <Link to="/blogs" className="inline-flex items-center text-white/80 hover:text-white mb-6 uppercase tracking-wider text-xs font-bold transition-colors">
                                <FaArrowLeft className="mr-2" /> Back to Blogs
                            </Link>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-[#e14503] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                    <FaClock className="text-[#e14503]" /> {post.readTime}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                                        <FaUser />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-white/60 font-bold tracking-widest">Written By</span>
                                        <span className="font-bold">{post.author}</span>
                                    </div>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-white/20"></div>
                                <div className="hidden md:flex flex-col">
                                    <span className="text-[10px] uppercase text-white/60 font-bold tracking-widest">Published On</span>
                                    <span className="font-bold flex items-center gap-2"><FaCalendar className="text-[#e14503]" /> {post.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container - Overlapping the Hero */}
            <div className="relative z-30 -mt-8">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Main Article Content */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-t-3xl shadow-xl overflow-hidden min-h-screen border border-gray-100">
                                <div className="p-6 md:p-10 lg:p-14">
                                    {/* Article Content */}
                                    <div
                                        className="prose prose-lg md:prose-xl max-w-none 
                                        prose-headings:font-bold prose-headings:text-gray-900 
                                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
                                        prose-p:text-gray-600 prose-p:leading-8 prose-p:mb-8
                                        prose-a:text-[#e14503] prose-a:font-semibold hover:prose-a:text-[#c23a02]
                                        prose-img:rounded-3xl prose-img:shadow-lg prose-img:my-10
                                        prose-strong:text-gray-900 prose-strong:font-bold
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#e14503] prose-blockquote:bg-orange-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
                                        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
                                    />

                                    {/* Tags & Share */}
                                    <div className="mt-16 pt-8 border-t border-gray-100">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags && post.tags.map((tag, i) => (
                                                    <span key={i} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-[#e14503] hover:text-white transition-colors cursor-pointer border border-gray-100 hover:border-[#e14503]">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Share:</span>
                                                <div className="flex gap-2">
                                                    <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"><FaFacebook /></button>
                                                    <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1"><FaTwitter /></button>
                                                    <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all transform hover:-translate-y-1"><FaLinkedin /></button>
                                                    <button className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1"><FaWhatsapp /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Posts Section */}
                            {relatedPosts.length > 0 && (
                                <div className="mt-16 mb-20">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-3xl font-bold text-gray-900">Related Articles</h3>
                                        <Link to="/blogs" className="hidden md:flex items-center gap-2 text-[#e14503] font-bold hover:gap-3 transition-all">
                                            View All <FaArrowLeft className="rotate-180" />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                                        {relatedPosts.map(relatedPost => (
                                            <BlogCard key={relatedPost.id} {...relatedPost} />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 pl-0 lg:pl-8 mt-8 lg:mt-0">
                            <div className="sticky top-24 space-y-8">
                                <BlogSidebar />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
