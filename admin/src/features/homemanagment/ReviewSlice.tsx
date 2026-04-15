import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

export interface Review {
  id: number;
  type: string;
  title: string;
  description: string;
  image?: string;
}

interface ReviewState {
  loading: boolean;
  error: string | null;
  reviews: Review[];
}

interface UpdateReviewPayload {
  id: number | string;
  data: {
    type: string;
    title: string;
    description: string;
  };
}

/* ================= INITIAL STATE ================= */

const initialState: ReviewState = {
  loading: false,
  error: null,
  reviews: [],
};

/* ================= THUNKS ================= */

// ✅ CREATE
export const createReview = createAsyncThunk<
  Review,
  { type: string; title: string; description: string },
  { rejectValue: string }
>('review/create', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/review/create', data);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || 'Review creation failed');
  }
});

// ✅ GET
export const getReview = createAsyncThunk<Review[], void, { rejectValue: string }>(
  'review/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/review/find');
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  },
);

// ✅ DELETE
export const deleteReview = createAsyncThunk<
  number | string,
  number | string,
  { rejectValue: string }
>('review/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/review/delete/${id}`);
    return id;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || 'Review delete failed');
  }
});

// ✅ UPDATE
export const updateReview = createAsyncThunk<Review, UpdateReviewPayload, { rejectValue: string }>(
  'review/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/review/update/${id}`, data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Review update failed');
    }
  },
);

/* ================= SLICE ================= */

const ReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ========= CREATE ========= */
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Create failed';
      })

      /* ========= GET ========= */
      .addCase(getReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReview.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch failed';
      })

      /* ========= DELETE ========= */
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Delete failed';
      })

      /* ========= UPDATE ========= */
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;

        const index = state.reviews.findIndex((item) => item.id === action.payload.id);

        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Update failed';
      });
  },
});

export default ReviewSlice.reducer;
