import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

/* ================= TYPES ================= */

const initialState = {
  loading: false,
  error: null,
  shop: null,
  product: null,
  category: null,
};

/* ================= THUNKS ================= */

// GET MARQUEE DATA
export const getProduct = createAsyncThunk(
  'shop/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/shop/get-shop`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

export const getCategory = createAsyncThunk(
  'shop/category',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/shop/get-category`,
      );
      return response.data.category
;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

export const getProductWithSlug = createAsyncThunk(
  'shop/product',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/shop/product/${slug}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

/* ================= SLICE ================= */

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET MARQUEE
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductWithSlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductWithSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductWithSlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProductSlice.reducer;