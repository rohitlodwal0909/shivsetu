import { configureStore } from '@reduxjs/toolkit';

import homeReducer from '../src/features/home/HomeSlice';
import pujaReducer from '../src/features/puja/PujaSlice';
import productReducer from '../src/features/shop/ProductSlice';
import authenticationReducer from '../src/features/auth/AuthenticationSlice';
import orderReducer from '../src/features/order/OrderSlice';
import PanditReducer from '../src/features/puja/PanditSlice';


export const store = configureStore({
  reducer: {
        home: homeReducer,
        puja: pujaReducer,
        product: productReducer,
        authentication: authenticationReducer,
        order: orderReducer,
        pandits:PanditReducer
  },
});