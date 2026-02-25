import React from 'react';
import CategoryCard from '../../../components/common/CategoryCard';

const Categories = () => {
    const categories = [
        {
            id: 1,
            title: 'Electronics',
            productCount: 245,
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
            link: '/shop?category=electronics'
        },
        {
            id: 2,
            title: 'Fashion',
            productCount: 532,
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
            link: '/shop?category=fashion'
        },
        {
            id: 3,
            title: 'Home & Living',
            productCount: 189,
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80',
            link: '/shop?category=home'
        },
        {
            id: 4,
            title: 'Sports',
            productCount: 156,
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
            link: '/shop?category=sports'
        }
    ];

    return (
        <section className="section-padding">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold gradient-text mb-4">Shop by Category</h2>
                    <p className="text-slate-400 text-lg">Explore our wide range of products</p>
                </div>

                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:pb-0">
                    {categories.map((category) => (
                        <div key={category.id} className="min-w-[45%] snap-center sm:min-w-0">
                            <CategoryCard {...category} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
