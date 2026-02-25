import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiUrl } from '../../constants/contant';

/* ================= TYPES ================= */

export interface Cab {
  id: number;
  name: string;
  seating: string;
  price_per_km: number;
  ac: string;
  music_system: string;
  icon: string;
  status?: string;
}

interface CabState {
  loading: boolean;
  error: string | null;
  cabs: Cab[];
  updatedStatus: { id: number; status: string } | null;
}

interface UpdateCabPayload {
  id: number | string;
  data: FormData;
}

const initialState: CabState = {
  loading: false,
  error: null,
  cabs: [],
  updatedStatus: null,
};

const token = localStorage.getItem('token');

/* ================= CREATE CAB ================= */

export const createCab = createAsyncThunk<Cab, FormData, { rejectValue: string }>(
  'cab/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/cab/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Cab creation failed');
    }
  },
);

/* ================= GET CABS ================= */

export const getCab = createAsyncThunk<Cab[], void, { rejectValue: string }>(
  'cab/find',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/cab/find`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.cabs;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cabs');
    }
  },
);

/* ================= DELETE CAB ================= */

export const deleteCab = createAsyncThunk<number, number, { rejectValue: string }>(
  'cab/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/cab/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  },
);

/* ================= UPDATE CAB ================= */

export const updateCab = createAsyncThunk<Cab, UpdateCabPayload, { rejectValue: string }>(
  'cab/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${apiUrl}/cab/update/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  },
);

/* ================= UPDATE STATUS ================= */

export const updateCabStatus = createAsyncThunk<
  { id: number; status: string },
  { id: number; status: string },
  { rejectValue: string }
>('cab/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await axios.put(
      `${apiUrl}/cab/updatestatus/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Status update failed');
  }
});

/* ================= SLICE ================= */

const cabSlice = createSlice({
  name: 'cab',
  initialState,
  reducers: {
    clearCabState: (state) => {
      state.cabs = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createCab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCab.fulfilled, (state, action: PayloadAction<Cab>) => {
        state.loading = false;
        state.cabs.unshift(action.payload);
      })
      .addCase(createCab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* GET */
      .addCase(getCab.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCab.fulfilled, (state, action: PayloadAction<Cab[]>) => {
        state.loading = false;
        state.cabs = action.payload;
      })
      .addCase(getCab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      /* DELETE */
      .addCase(deleteCab.fulfilled, (state, action: PayloadAction<number>) => {
        state.cabs = state.cabs.filter((cab) => cab.id !== action.payload);
      })

      /* UPDATE */
      .addCase(updateCab.fulfilled, (state, action: PayloadAction<Cab>) => {
        const index = state.cabs.findIndex((cab) => cab.id === action.payload.id);
        if (index !== -1) {
          state.cabs[index] = action.payload;
        }
      })

      /* STATUS */
      .addCase(updateCabStatus.fulfilled, (state, action) => {
        state.updatedStatus = action.payload;
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearCabState } = cabSlice.actions;
export default cabSlice.reducer;
