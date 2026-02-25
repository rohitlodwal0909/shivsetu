import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

export interface Puja {
  id: number;
  category_id: string;
  puja_name: string;
  description: string;
  price: string;
  location: string;
  date: string;
  puja_duration: string;
  image: string; // ✅ image URL from backend
  gallery: string[]; // ✅ gallery URLs from backend
  created_at?: string;
  updated_at?: string;
}

interface PujaState {
  loading: boolean;
  error: string | null;
  pujas: Puja[];
  single: Puja | null;
}

interface UpdatePujaPayload {
  id: number;
  data: FormData;
}

/* ================= INITIAL STATE ================= */

const initialState: PujaState = {
  loading: false,
  error: null,
  pujas: [],
  single: null,
};

/* ================= THUNKS ================= */

// CREATE
export const createPuja = createAsyncThunk<Puja, FormData, { rejectValue: string }>(
  'puja/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/puja/create', data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Puja creation failed',
      );
    }
  },
);

export const getPuja = createAsyncThunk<Puja[], void, { rejectValue: string }>(
  'puja/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/puja/find');
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch puja',
      );
    }
  },
);

// GET ALL
export const getPujaWithSlug = createAsyncThunk<Puja, string, { rejectValue: string }>(
  'puja/findBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/puja/findByslug/${slug}`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch puja',
      );
    }
  },
);

// DELETE
export const deletePuja = createAsyncThunk<number, number, { rejectValue: string }>(
  'puja/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/puja/delete/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Puja deletion failed',
      );
    }
  },
);

// UPDATE
export const updatePuja = createAsyncThunk<Puja, UpdatePujaPayload, { rejectValue: string }>(
  'puja/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/puja/update/${id}`, data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Puja update failed',
      );
    }
  },
);

/* ================= SLICE ================= */

const PujaSlice = createSlice({
  name: 'puja',
  initialState,
  reducers: {
    clearPujaState: (state) => {
      state.pujas = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ================= CREATE ================= */
      .addCase(createPuja.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPuja.fulfilled, (state, action: PayloadAction<Puja>) => {
        state.loading = false;
        state.pujas.unshift(action.payload);
      })
      .addCase(createPuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* ================= GET ================= */
      .addCase(getPuja.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPuja.fulfilled, (state, action: PayloadAction<Puja[]>) => {
        state.loading = false;
        state.pujas = action.payload;
      })
      .addCase(getPuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(getPujaWithSlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPujaWithSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.single = action.payload;
      })
      .addCase(getPujaWithSlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* ================= DELETE ================= */
      .addCase(deletePuja.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePuja.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.pujas = state.pujas.filter((item) => item.id !== action.payload);
      })
      .addCase(deletePuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* ================= UPDATE ================= */
      .addCase(updatePuja.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePuja.fulfilled, (state, action: PayloadAction<Puja>) => {
        state.loading = false;

        const index = state.pujas.findIndex((item) => item.id === action.payload.id);

        if (index !== -1) {
          state.pujas[index] = action.payload;
        }
      })
      .addCase(updatePuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearPujaState } = PujaSlice.actions;
export default PujaSlice.reducer;
