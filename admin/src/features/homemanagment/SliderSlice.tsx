import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

interface Slider {
  id: number;
  image: string;
}

interface SliderState {
  loading: boolean;
  error: string | null;
  sliders: Slider[];
}

interface UpdateSliderPayload {
  id: number | string;
  data: FormData;
}

/* ================= INITIAL STATE ================= */

const initialState: SliderState = {
  loading: false,
  error: null,
  sliders: [],
};

/* ================= THUNKS ================= */

// CREATE SLIDER
export const createSlider = createAsyncThunk<Slider, FormData, { rejectValue: string }>(
  'slider/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/slider/create', data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Slider creation failed',
      );
    }
  },
);

// GET SLIDERS
export const getSliders = createAsyncThunk<Slider[], void, { rejectValue: string }>(
  'slider/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/slider/find');
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch sliders',
      );
    }
  },
);

// DELETE SLIDER
export const deleteSlider = createAsyncThunk<any, number | string, { rejectValue: string }>(
  'slider/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/slider/delete/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Slider delete failed',
      );
    }
  },
);

// UPDATE SLIDER
export const updateSlider = createAsyncThunk<Slider, UpdateSliderPayload, { rejectValue: string }>(
  'slider/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/slider/update/${id}`, data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Slider update failed',
      );
    }
  },
);

/* ================= SLICE ================= */

const SliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    clearSliderState: (state) => {
      state.sliders = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSlider.fulfilled, (state, action: PayloadAction<Slider>) => {
        state.loading = false;
        state.sliders.unshift(action.payload);
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET */
      .addCase(getSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSliders.fulfilled, (state, action: PayloadAction<Slider[]>) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(getSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* DELETE */
      .addCase(deleteSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.sliders = state.sliders.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* UPDATE */
      .addCase(updateSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSlider.fulfilled, (state, action: PayloadAction<Slider>) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.sliders.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.sliders[index] = updated;
        }
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearSliderState } = SliderSlice.actions;
export default SliderSlice.reducer;
