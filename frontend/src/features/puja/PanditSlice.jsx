import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

/* ================= TYPES ================= */

const initialState = {
  loading: false,
  error: null,
  pandits: null,
  panditsDetails: null,
  book: null,
};

/* ================= THUNKS ================= */

// GET MARQUEE DATA
export const getPandits = createAsyncThunk(
  'Pandits/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pandits/get-pandits`,
      );
      return response.data.pandits;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

export const getPanditsWithSlug = createAsyncThunk(
  'Pandits/PanditsWithSlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pandits/get-pandits-details/${slug}`,
      );
      return response.data.pandit;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);


export const bookPandits = createAsyncThunk(
  'Pandits/book',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pandits/book`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);


/* ================= SLICE ================= */

const PanditsSlice = createSlice({
  name: 'pandits',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET MARQUEE
      .addCase(getPandits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPandits.fulfilled, (state, action) => {
        state.loading = false;
        state.pandits = action.payload;
      })
      .addCase(getPandits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPanditsWithSlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPanditsWithSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.panditsDetails = action.payload;
      })
      .addCase(getPanditsWithSlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookPandits.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookPandits.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(bookPandits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PanditsSlice.reducer;