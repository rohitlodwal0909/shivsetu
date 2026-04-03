import Hero from './components/Hero';
import PremiumCategories from './components/PremiumCategories';
import FeaturedProductsNew from './components/FeaturedProductsNew';
import NewArrivals from './components/NewArrivals';
import BlogSection from './components/BlogSection';
import ClientReviews from './components/ClientReviews';
import YouTubeReviews from './components/YouTubeReviews';
import BookCabs from './components/BookCabs';
import ChadavaBooking from './components/ChadavaBooking';
import PanditBooking from './components/PanditBooking';
import ShubhMuhurat from './components/ShubhMuhurat';
import Panchang from './components/Panchang';
import PujaSection from './components/PujaSection';
import DarshanSection from './components/DarshanSection';
import KundliSection from './components/KundliSection';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomedata } from '../../features/home/HomeSlice';

const Home = () => {

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(getHomedata());
    }, [dispatch]);


    return (
        <div>
            <Hero sliders={data?.sliders}/>
            <Panchang /> {/* Mobile: Card, Desktop: Grid (Hidden via CSS if needed, but per request keeping both) */}
            <PremiumCategories categories={data?.categories}/>
            <FeaturedProductsNew products={data?.products}/>
            {/* <NewArrivals /> */}

            <DarshanSection tours={data?.tour}/>
            <BookCabs cabs={data?.cabs}/>
            {/* <ChadavaBooking />
            <PanditBooking /> */}

            <PujaSection pujas={data?.pujas}/>
            <KundliSection />

            <ClientReviews />
            <BlogSection blogs={data?.blogs}/>
            <YouTubeReviews />

        </div>
    );
};

export default Home;
