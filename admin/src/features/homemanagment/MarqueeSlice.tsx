import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

export interface Marquee {
  id: number;
  text: string;
}

interface MarqueeState {
  loading: boolean;
  error: string | null;
  marquees: Marquee[];
}

interface UpdateMarqueePayload {
  id: number | string;
  data: { text: string };
}

/* ================= INITIAL STATE ================= */

const initialState: MarqueeState = {
  loading: false,
  error: null,
  marquees: [],
};

/* ================= THUNKS ================= */

// CREATE
export const createMarquee = createAsyncThunk<Marquee, { text: string }, { rejectValue: string }>(
  'marquee/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/marquee/create', data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Marquee creation failed');
    }
  },
);

// GET
export const getMarquees = createAsyncThunk<Marquee[], void, { rejectValue: string }>(
  'marquee/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/marquee/find');
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch marquees');
    }
  },
);

// DELETE
export const deleteMarquee = createAsyncThunk<any, number | string, { rejectValue: string }>(
  'marquee/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/marquee/delete/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Marquee delete failed');
    }
  },
);

// UPDATE
export const updateMarquee = createAsyncThunk<
  Marquee,
  UpdateMarqueePayload,
  { rejectValue: string }
>('marquee/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/marquee/update/${id}`, data);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    return rejectWithValue(error.response?.data?.message || 'Marquee update failed');
  }
});

/* ================= SLICE ================= */

const MarqueeSlice = createSlice({
  name: 'marquee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createMarquee.fulfilled, (state, action: PayloadAction<Marquee>) => {
        state.marquees.unshift(action.payload);
      })

      .addCase(getMarquees.fulfilled, (state, action: PayloadAction<Marquee[]>) => {
        state.marquees = action.payload;
      })

      .addCase(deleteMarquee.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.marquees = state.marquees.filter((item) => item.id !== deletedId);
      })

      .addCase(updateMarquee.fulfilled, (state, action: PayloadAction<Marquee>) => {
        const index = state.marquees.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.marquees[index] = action.payload;
        }
      });
  },
});

export default MarqueeSlice.reducer;
