import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../constants/contant';

/* ================= TYPES ================= */

interface LocationState {
  loading: boolean;
  error: string | null;
  states: any[];
  cities: any[];
}

/* ================= INITIAL STATE ================= */

const initialState: LocationState = {
  loading: false,
  error: null,
  states: [],
  cities: [],
};

export const getState = createAsyncThunk('location/getState', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/location/getState`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong while fetching check-ins.';
    return rejectWithValue(message);
  }
});

export const getCitiesByState = createAsyncThunk(
  'location/getCitiesByState',
  async (stateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/location/getCity/${stateId}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Something went wrong while fetching check-ins.';
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearLocationState: (state) => {
      state.states = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getState.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(getState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCitiesByState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCitiesByState.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesByState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearLocationState } = locationSlice.actions;
export default locationSlice.reducer;
