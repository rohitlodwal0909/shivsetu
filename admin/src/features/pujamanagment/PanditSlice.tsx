import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

interface PanditState {
  loading: boolean;
  error: string | null;
  pandits: any[];
  updatedStatus: null;
}
export interface Pandit {
  id: number;
  name: string;
  puja_name: string;
  price: string;
  exprience: string;
  language: string;
  image?: string;
  description?: string;
}

interface UpdatePanditPayload {
  id: number;
  data: FormData;
}

const initialState: PanditState = {
  loading: false,
  error: null,
  pandits: [],
  updatedStatus: null,
};

// CREATE PACKAGE
export const createPandit = createAsyncThunk<Pandit, FormData, { rejectValue: string }>(
  'Pandit/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/pandit/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Pandit creation failed',
      );
    }
  },
);

// GET PACKAGES
export const getPandit = createAsyncThunk<Pandit[], void, { rejectValue: string }>(
  'Pandit/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/pandit/find`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch Pandit',
      );
    }
  },
);

export const deletePandit = createAsyncThunk<number, number, { rejectValue: string }>(
  'Pandit/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/pandit/delete/${id}`);
      return id; // return id directly
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Pandit deletion failed',
      );
    }
  },
);

export const updatePandit = createAsyncThunk<Pandit, UpdatePanditPayload, { rejectValue: string }>(
  'Pandit/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/pandit/update/${id}`, data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Pandit update failed',
      );
    }
  },
);

/* ================= SLICE ================= */

const PanditSlice = createSlice({
  name: 'pandit',
  initialState,
  reducers: {
    clearPanditState: (state) => {
      state.pandits = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createPandit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPandit.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pandits.unshift(action.payload); // 👈 new package top
      })
      .addCase(createPandit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET */
      .addCase(getPandit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPandit.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.pandits = action.payload; // 👈 replace list
      })
      .addCase(getPandit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(deletePandit.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePandit.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.pandits = state.pandits.filter((item) => item.id !== deletedId);
      })
      .addCase(deletePandit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(updatePandit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePandit.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pandits = action.payload;
      })
      .addCase(updatePandit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearPanditState } = PanditSlice.actions;
export default PanditSlice.reducer;
