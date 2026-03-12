import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

/* ================= INITIAL STATE ================= */

const initialState = {
  loading: false,
  error: null,
  user: null,
  token: localStorage.getItem("token") || null,
};

/* ================= THUNKS ================= */

// ✅ USER SIGNUP
export const signup = createAsyncThunk(
  "authentication/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/authentication/signup`,
        formData
      );

      return response.data; // return full response
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Signup failed"
      );
    }
  }
);

// ✅ LOGIN WITH PASSWORD
export const userlogin = createAsyncThunk(
  "authentication/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/authentication/login`,
        formData
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// ✅ SEND OTP
export const sendOtp = createAsyncThunk(
  "authentication/sendOtp",
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/authentication/send-otp`,
        { mobile }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP send failed"
      );
    }
  }
);

// ✅ VERIFY OTP LOGIN
export const verifyOtp = createAsyncThunk(
  "authentication/verifyOtp",
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/authentication/verify-otp`,
        { mobile, otp }
      );

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== SIGNUP ===== */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== LOGIN PASSWORD ===== */
      .addCase(userlogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== VERIFY OTP ===== */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, logout } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;