import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../src/features/authentication/AuthenticationSlice';
import locationSlice from '../src/features/location/locationSlice';
import PackageSlice from '../src/features/tourmanagment/PackageSlice';
import CategorySlice from '../src/features/productmanagment/CategorySlice';
import ProductSlice from '../src/features/productmanagment/ProductSlice';
import PujaCategorySlice from '../src/features/pujamanagment/PujaCategorySlice';
import PujaSlice from '../src/features/pujamanagment/PujaSlice';
import PujaPackageSlice from '../src/features/pujamanagment/PujaPackageSlice';
import CabSlice from '../src/features/tourmanagment/CabSlice';
import SliderSlice from '../src/features/homemanagment/SliderSlice';
import MarqueeSlice from '../src/features/homemanagment/MarqueeSlice';
import BlogSlice from '../src/features/homemanagment/BlogSlice';
import ReviewSlice from '../src/features/homemanagment/ReviewSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    location: locationSlice,
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
