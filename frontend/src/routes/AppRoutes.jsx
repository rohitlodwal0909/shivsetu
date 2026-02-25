import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Categories from '../pages/Categories';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import MyProfile from '../pages/MyProfile';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import ContactUs from '../pages/ContactUs';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import CabBooking from '../pages/Booking/CabBooking';
import PanditBooking from '../pages/Booking/PanditBooking';
import ChadavaBooking from '../pages/Booking/ChadavaBooking';
import ChadavaDetails from '../pages/Booking/ChadavaDetails';
import ChadavaBookingPage from '../pages/Booking/ChadavaBookingPage';
import PanditBookingPage from '../pages/Booking/PanditBookingPage';
import CabBookingPage from '../pages/Booking/CabBookingPage';
import Puja from '../pages/Puja';
import PujaDetails from '../pages/Puja/PujaDetails';
import PujaBooking from '../pages/Puja/PujaBooking';
import Darshan from '../pages/Darshan';
import DarshanDetails from '../pages/Darshan/DarshanDetails';
import PanchangPage from '../pages/Panchang';
import Trending from '../pages/Trending';
import NewArrival from '../pages/NewArrival';
import ShubhMuhuratPage from '../pages/ShubhMuhuratPage';
import Explore from '../pages/Explore';
import Packages from '../pages/Packages';
import PackageDetails from '../pages/Packages/PackageDetails';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';


const AppRoutes = () => {
    return (
        <Routes>

            {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="categories" element={<Categories />} />
                <Route path="explore" element={<Explore />} />
                <Route path="product/:slug" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="profile" element={<MyProfile />} />
                <Route path="account" element={<MyProfile />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blog/:id" element={<BlogDetail />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="about" element={<About />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="booking/cabs" element={<CabBooking />} />
                <Route path="booking/cabs/book/:id" element={<CabBookingPage />} />
                <Route path="booking/pandits" element={<PanditBooking />} />
                <Route path="booking/chadava" element={<ChadavaBooking />} />
                <Route path="booking/chadava/:id" element={<ChadavaDetails />} />
                <Route path="booking/chadava/book/:id" element={<ChadavaBookingPage />} />
                <Route path="booking/pandits/book/:id" element={<PanditBookingPage />} />
                <Route path="puja" element={<Puja />} />
                <Route path="puja/:slug" element={<PujaDetails />} />
                <Route path="puja/book/:slug" element={<PujaBooking />} />
                <Route path="darshan" element={<Darshan />} />
                <Route path="darshan/:id" element={<DarshanDetails />} />
                <Route path="panchang" element={<PanchangPage />} />
                <Route path="trending" element={<Trending />} />
                <Route path="new-arrival" element={<NewArrival />} />
                <Route path="shubh-muhurat" element={<ShubhMuhuratPage />} />
                <Route path="packages" element={<Packages />} />
                <Route path="packages/:id" element={<PackageDetails />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
