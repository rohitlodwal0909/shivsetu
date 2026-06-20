import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

interface PujaBookingState {
  bookings: any[];
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PujaBookingState = {
  bookings: [],
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

// GET PUJA BOOKINGS
export const getPujaBooking = createAsyncThunk<any[], void, { rejectValue: string }>(
  'pujabooking/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/puja/bookings`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch puja booking',
      );
    }
  },
);

/* ================= SLICE ================= */

const PujaBookingSlice = createSlice({
  name: 'pujabooking',
  initialState,
  reducers: {
    clearPujaBookingState: (state) => {
      state.bookings = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPujaBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPujaBooking.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getPujaBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearPujaBookingState } = PujaBookingSlice.actions;

export default PujaBookingSlice.reducer;
