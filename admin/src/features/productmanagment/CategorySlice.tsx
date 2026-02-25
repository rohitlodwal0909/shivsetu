import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

interface CategoryState {
  loading: boolean;
  error: string | null;
  categories: any[];
  updatedStatus: null;
}

interface UpdatePackagePayload {
  id: number | string;
  data: FormData;
}

const initialState: CategoryState = {
  loading: false,
  error: null,
  categories: [],
  updatedStatus: null,
};

// CREATE PACKAGE
export const createCategory = createAsyncThunk<any, FormData, { rejectValue: string }>(
  'category/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/category/create`, data);

      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'category creation failed',
      );
    }
  },
);

// GET PACKAGES
export const getCategory = createAsyncThunk<any[], void, { rejectValue: string }>(
  'category/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/category/find`);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch category',
      );
    }
  },
);

export const deleteCategory = createAsyncThunk<any, FormData, { rejectValue: string }>(
  'category/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Category creation failed',
      );
    }
  },
);

export const updateCategory = createAsyncThunk<any, UpdatePackagePayload, { rejectValue: string }>(
  'category/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/category/update/${id}`, data);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'category creation failed',
      );
    }
  },
);

/* ================= SLICE ================= */

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.categories = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories.unshift(action.payload); // 👈 new package top
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET */
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.categories = action.payload; // 👈 replace list
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.categories = state.categories.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.categories.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.categories[index] = updated;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearCategoryState } = CategorySlice.actions;
export default CategorySlice.reducer;
