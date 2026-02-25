import { configureStore } from '@reduxjs/toolkit';

import homeReducer from '../src/features/home/HomeSlice';
import pujaReducer from '../src/features/puja/PujaSlice';
import productReducer from '../src/features/shop/ProductSlice';


export const store = configureStore({
  reducer: {
        home: homeReducer,
        puja: pujaReducer,
        product: productReducer,
  },
});