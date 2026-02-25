import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiUrl } from '../../constants/contant';

interface PackageState {
  loading: boolean;
  error: string | null;
  packages: any[];
  updatedStatus: null;
}

interface UpdatePackagePayload {
  id: number | string;
  data: FormData;
}

const initialState: PackageState = {
  loading: false,
  error: null,
  packages: [],
  updatedStatus: null,
};
const token = localStorage.getItem('token');

// CREATE PACKAGE
export const createPackage = createAsyncThunk<any, FormData, { rejectValue: string }>(
  'package/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/package/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data; // 👈 only data
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

// GET PACKAGES
export const getPackage = createAsyncThunk<any[], void, { rejectValue: string }>(
  'package/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/package/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.packages; // 👈 array
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

export const deletePackage = createAsyncThunk<any, FormData, { rejectValue: string }>(
  'package/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiUrl}/package/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
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

export const updatePackage = createAsyncThunk<any, UpdatePackagePayload, { rejectValue: string }>(
  'package/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/package/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

export const updatePackageStatus = createAsyncThunk<
  { id: number; status: string }, // ✅ fulfilled return type
  { id: number; status: string }, // ✅ argument type
  { rejectValue: string } // ✅ rejected payload type
>('package/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await axios.put(
      `${apiUrl}/package/updatestatus/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Backend should return: { id, status }
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Status update failed');
  }
});

/* ================= SLICE ================= */

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    clearPackageState: (state) => {
      state.packages = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.packages.unshift(action.payload); // 👈 new package top
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET */
      .addCase(getPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPackage.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.packages = action.payload; // 👈 replace list
      })
      .addCase(getPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.packages = state.packages.filter((item) => item.id !== deletedId);
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.packages.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.packages[index] = updated;
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(updatePackageStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePackageStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.updatedStatus = action.payload;
      })
      .addCase(updatePackageStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearPackageState } = packageSlice.actions;
export default packageSlice.reducer;
