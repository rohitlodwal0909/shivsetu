import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

interface OrderState {
  loading: boolean;
  error: string | null;
  orders: any[];
  updatedStatus: null;
}

interface UpdatePackagePayload {
  id: number | string;
  data: FormData;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  orders: [],
  updatedStatus: null,
};

// GET PACKAGES
export const getOrder = createAsyncThunk<any[], void, { rejectValue: string }>(
  'Order/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/find`);
      return response.data.orders;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch Order',
      );
    }
  },
);

export const updateOrder = createAsyncThunk<any, UpdatePackagePayload, { rejectValue: string }>(
  'Order/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Order/update/${id}`, data);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Order creation failed',
      );
    }
  },
);

/* ================= SLICE ================= */

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.orders = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* GET */
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.orders.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.orders[index] = updated;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearOrderState } = OrderSlice.actions;
export default OrderSlice.reducer;
