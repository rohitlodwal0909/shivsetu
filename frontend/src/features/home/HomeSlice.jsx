import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

/* ================= TYPES ================= */

const initialState = {
  loading: false,
  error: null,
  marquee: null,
  data: null,
};

/* ================= THUNKS ================= */

// GET MARQUEE DATA
export const getMarquee = createAsyncThunk(
  'home/marquee',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/home/get-marquee`,
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);


export const getHomedata = createAsyncThunk(
  'home/data',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/home/get-all-data`,
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

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET MARQUEE
      .addCase(getMarquee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarquee.fulfilled, (state, action) => {
        state.loading = false;
        state.marquee = action.payload;
      })
      .addCase(getMarquee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
       .addCase(getHomedata.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomedata.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getHomedata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });;
  },
});

export default HomeSlice.reducer;