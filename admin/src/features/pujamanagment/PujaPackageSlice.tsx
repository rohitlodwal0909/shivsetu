import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

export interface PujaPackage {
  id: number;
  name: string;
  person: string;
  price: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

interface PujaPackageState {
  loading: boolean;
  error: string | null;
  packages: PujaPackage[];
  single: PujaPackage | null;
}

interface UpdatePujaPackagePayload {
  id: number;
  data: FormData;
}

/* ================= INITIAL STATE ================= */

const initialState: PujaPackageState = {
  loading: false,
  error: null,
  packages: [],
  single: null,
};

/* ================= THUNKS ================= */

// CREATE
export const createPujaPackage = createAsyncThunk<PujaPackage, FormData, { rejectValue: string }>(
  'pujaPackage/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/puja/package/create', data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Package creation failed',
      );
    }
  },
);

// GET ALL
export const getPujaPackages = createAsyncThunk<PujaPackage[], void, { rejectValue: string }>(
  'pujaPackage/getAll',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/puja/package/find/' + id);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch packages',
      );
    }
  },
);

// DELETE
export const deletePujaPackage = createAsyncThunk<number, number, { rejectValue: string }>(
  'pujaPackage/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/puja/package/delete/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Package deletion failed',
      );
    }
  },
);

// UPDATE
export const updatePujaPackage = createAsyncThunk<
  PujaPackage,
  UpdatePujaPackagePayload,
  { rejectValue: string }
>('pujaPackage/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/puja/package/update/${id}`, data);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Package update failed',
    );
  }
});

/* ================= SLICE ================= */

const PujaPackageSlice = createSlice({
  name: 'pujaPackage',
  initialState,
  reducers: {
    clearPujaPackageState: (state) => {
      state.packages = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createPujaPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPujaPackage.fulfilled, (state, action: PayloadAction<PujaPackage>) => {
        state.loading = false;
        state.packages.unshift(action.payload);
      })
      .addCase(createPujaPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET ALL */
      .addCase(getPujaPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPujaPackages.fulfilled, (state, action: PayloadAction<PujaPackage[]>) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(getPujaPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* DELETE */
      .addCase(deletePujaPackage.fulfilled, (state, action) => {
        state.packages = state.packages.filter((item) => item.id !== action.payload);
      })

      /* UPDATE */
      .addCase(updatePujaPackage.fulfilled, (state, action: PayloadAction<PujaPackage>) => {
        const index = state.packages.findIndex((item) => item.id === action.payload.id);

        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearPujaPackageState } = PujaPackageSlice.actions;
export default PujaPackageSlice.reducer;
