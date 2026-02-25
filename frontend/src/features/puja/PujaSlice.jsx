import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

/* ================= TYPES ================= */

const initialState = {
  loading: false,
  error: null,
  pujas: null,
  pujaDetails: null,
  book: null,
};

/* ================= THUNKS ================= */

// GET MARQUEE DATA
export const getPuja = createAsyncThunk(
  'puja/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/puja/get-puja`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

export const getPujaWithSlug = createAsyncThunk(
  'puja/pujaWithSlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/puja/get-puja-details/${slug}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);


export const bookPuja = createAsyncThunk(
  'puja/book',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/puja/book`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);


/* ================= SLICE ================= */

const PujaSlice = createSlice({
  name: 'puja',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET MARQUEE
      .addCase(getPuja.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPuja.fulfilled, (state, action) => {
        state.loading = false;
        state.pujas = action.payload;
      })
      .addCase(getPuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPujaWithSlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPujaWithSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.pujaDetails = action.payload;
      })
      .addCase(getPujaWithSlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookPuja.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookPuja.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(bookPuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PujaSlice.reducer;