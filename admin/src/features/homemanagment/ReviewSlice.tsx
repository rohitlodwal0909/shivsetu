import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

export interface Review {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ReviewState {
  loading: boolean;
  error: string | null;
  reviews: Review[];
}

interface UpdateReviewPayload {
  id: number | string;
  data: FormData;
}

/* ================= INITIAL STATE ================= */

const initialState: ReviewState = {
  loading: false,
  error: null,
  reviews: [],
};

/* ================= THUNKS ================= */

// CREATE Review
export const createReview = createAsyncThunk<Review, FormData, { rejectValue: string }>(
  'review/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/review/create', data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Review creation failed');
    }
  },
);

// GET Review
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

// DELETE BLOG
export const deleteReview = createAsyncThunk<any, number | string, { rejectValue: string }>(
  'review/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/review/delete/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'review delete failed');
    }
  },
);

// UPDATE BLOG
export const updateReview = createAsyncThunk<Review, UpdateReviewPayload, { rejectValue: string }>(
  'review/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/review/update/${id}`, data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'review update failed');
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

      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.unshift(action.payload);
      })

      .addCase(getReview.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.reviews = state.reviews.filter((item) => item.id !== deletedId);
      })

      .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
        const index = state.reviews.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      });
  },
});

export default ReviewSlice.reducer;
