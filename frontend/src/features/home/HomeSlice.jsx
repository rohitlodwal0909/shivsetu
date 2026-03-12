import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

/* ================= TYPES ================= */

const initialState = {
  loading: false,
  error: null,
  marquee: null,
  tours: null,
  singletour: null,
  singlecab: null,
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

export const getTours = createAsyncThunk(
  'home/tours',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/home/tours`,
      );
      return response.data.tours;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);


export const getCabs = createAsyncThunk(
  'home/cabs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/home/cabs`,
      );
      return response.data.cabs;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

export const singleCab = createAsyncThunk(
  'home/singleCab',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/home/singlecab/${id}`,
      );
      return response.data.cabs;
    } catch (err) {
      return rejectWithValue(
            err.response?.data?.message || 'Home data fetch failed',
        );
    }
  },
);

export const singleTour = createAsyncThunk(
  'home/singleTour',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/home/singletour/${id}`,
      );
      return response.data.tours;
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

      .addCase(getTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(singleTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleTour.fulfilled, (state, action) => {
        state.loading = false;
        state.singletour = action.payload;
      })
      .addCase(singleTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(singleCab.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleCab.fulfilled, (state, action) => {
        state.loading = false;
        state.singlecab = action.payload;
      })
      .addCase(singleCab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


       .addCase(getCabs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCabs.fulfilled, (state, action) => {
        state.loading = false;
        state.cabs = action.payload;
      })
      .addCase(getCabs.rejected, (state, action) => {
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
      });
  },
});

export default HomeSlice.reducer;