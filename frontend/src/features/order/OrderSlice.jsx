import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

/* ================= INITIAL STATE ================= */

const initialState = {
  loading: false,
  error: null,
  orders: [],
  singleOrder: null,
};

/* ================= CREATE ORDER ================= */

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/order/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order creation failed"
      );
    }
  }
);

/* ================= GET MY ORDERS ================= */

export const getMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* ================= SLICE ================= */

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE ORDER ===== */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== GET MY ORDERS ===== */
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;