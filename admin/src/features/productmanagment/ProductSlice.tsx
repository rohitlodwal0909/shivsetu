import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

interface ProductState {
  loading: boolean;
  error: string | null;
  products: any[];
  updatedStatus: null;
}

interface UpdateProductsPayload {
  id: number | string;
  data: FormData;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  updatedStatus: null,
};

// CREATE PACKAGE
export const createProduct = createAsyncThunk<any, FormData, { rejectValue: string }>(
  'product/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/product/create`, data);

      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'product creation failed',
      );
    }
  },
);

// GET PACKAGES
export const getProduct = createAsyncThunk<any[], void, { rejectValue: string }>(
  'product/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/find`);
      return response.data.products;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch product',
      );
    }
  },
);

export const deleteProduct = createAsyncThunk<any, FormData, { rejectValue: string }>(
  'product/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/product/delete/${id}`);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'product creation failed',
      );
    }
  },
);

export const updateProduct = createAsyncThunk<any, UpdateProductsPayload, { rejectValue: string }>(
  'product/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/product/update/${id}`, data);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'product creation failed',
      );
    }
  },
);

export const updateProductStatus = createAsyncThunk<
  { id: number; status: string }, // ✅ fulfilled return type
  { id: number; status: string }, // ✅ argument type
  { rejectValue: string } // ✅ rejected payload type
>('product/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/product/updatestatus/${id}`, { status });

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Status update failed');
  }
});
/* ================= SLICE ================= */

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductState: (state) => {
      state.products = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET */
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.products = action.payload; // 👈 replace list
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.products = state.products.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.products.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.products[index] = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.updatedStatus = action.payload;
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearProductState } = ProductSlice.actions;
export default ProductSlice.reducer;
