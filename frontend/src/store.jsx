import { configureStore } from '@reduxjs/toolkit';

import homeReducer from '../src/features/home/HomeSlice';
import pujaReducer from '../src/features/puja/PujaSlice';
import productReducer from '../src/features/shop/ProductSlice';
import authenticationReducer from '../src/features/auth/AuthenticationSlice';
import orderReducer from '../src/features/order/OrderSlice';


export const store = configureStore({
  reducer: {
        home: homeReducer,
        puja: pujaReducer,
        product: productReducer,
        authentication: authenticationReducer,
        order: orderReducer,
  },
});