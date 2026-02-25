import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../constants/contant';

interface AuthState {
  loading: boolean;
  error: string | null;
  user: any | null;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  token: null,
};

/* 🔹 LOGIN THUNK */
export const loginUser = createAsyncThunk<
  { user: any; token: string; message: string },
  any,
  { rejectValue: { message: string } }
>('auth/loginUser', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || { message: 'Login failed' });
  }
});

/* 🔹 AUTH SLICE */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
