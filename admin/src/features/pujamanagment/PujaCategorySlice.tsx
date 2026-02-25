import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

interface CategoryState {
  loading: boolean;
  error: string | null;
  categories: any[];
  updatedStatus: null;
}
export interface Category {
  id: number;
  name: string;
  description: string;
}

interface UpdateCategoryPayload {
  id: number;
  data: { name: string; description: string };
}

const initialState: CategoryState = {
  loading: false,
  error: null,
  categories: [],
  updatedStatus: null,
};

// CREATE PACKAGE
export const createCategory = createAsyncThunk<
  Category,
  { name: string; description: string },
  { rejectValue: string }
>('pujacategory/create', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/puja/category/create`, data);
    return response.data.data; // make sure backend returns single object
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Category creation failed',
    );
  }
});

// GET PACKAGES
export const getCategory = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'pujacategory/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/puja/category/find`);
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

export const deleteCategory = createAsyncThunk<number, number, { rejectValue: string }>(
  'pujacategory/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/puja/category/delete/${id}`);
      return id; // return id directly
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Category deletion failed',
      );
    }
  },
);

export const updateCategory = createAsyncThunk<
  Category,
  UpdateCategoryPayload,
  { rejectValue: string }
>('pujacategory/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/puja/category/update/${id}`, data);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Category update failed',
    );
  }
});

/* ================= SLICE ================= */

const PujaCategorySlice = createSlice({
  name: 'pujacategory',
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
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearCategoryState } = PujaCategorySlice.actions;
export default PujaCategorySlice.reducer;
