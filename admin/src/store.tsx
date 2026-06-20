import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../src/features/authentication/AuthenticationSlice';
import locationSlice from '../src/features/location/locationSlice';
import PackageSlice from '../src/features/tourmanagment/PackageSlice';
import CategorySlice from '../src/features/productmanagment/CategorySlice';
import ProductSlice from '../src/features/productmanagment/ProductSlice';
import PujaCategorySlice from '../src/features/pujamanagment/PujaCategorySlice';
import PujaSlice from '../src/features/pujamanagment/PujaSlice';
import PujaPackageSlice from '../src/features/pujamanagment/PujaPackageSlice';
import PanditSlice from '../src/features/pujamanagment/PanditSlice';
import CabSlice from '../src/features/tourmanagment/CabSlice';
import SliderSlice from '../src/features/homemanagment/SliderSlice';
import MarqueeSlice from '../src/features/homemanagment/MarqueeSlice';
import BlogSlice from '../src/features/homemanagment/BlogSlice';
import ReviewSlice from '../src/features/homemanagment/ReviewSlice';
import OrderSlice from '../src/features/productmanagment/OrderSlice';
import BookingSlice from '../src/features/pujamanagment/BookingSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
    orders: OrderSlice,
    package: PackageSlice,
    category: CategorySlice,
    product: ProductSlice,
    pujaCategory: PujaCategorySlice,
    puja: PujaSlice,
    pujaPackage: PujaPackageSlice,
    cab: CabSlice,
    slider: SliderSlice,
    marquee: MarqueeSlice,
    blog: BlogSlice,
    review: ReviewSlice,
    pandit: PanditSlice,
    pujabooking: BookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
