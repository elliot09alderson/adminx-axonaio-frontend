// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const login_admin = createAsyncThunk(
  "admin/login_admin",
  async ({ creds }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/login`, creds, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/logout`, null, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verify_otp = createAsyncThunk(
  "admin/verify_otp",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/verify_email`, datax, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedin: false,
    isAuthenticated: false,
    user: null,
    role: null,
    status: "idle",
    error: null,
    loader: false,
    successMessage: "",
    errorMessage: "",
  },

  reducers: {
    messageClear: (state) => {
      console.log("message clearing...");
      state.errorMessage = "";
      state.successMessage = "";
      console.log("message cleared...");
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login_admin.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.isLoggedin = true;
        // state.isAuthenticated = true;
        state.successMessage = "otp sent successfully";
      })
      .addCase(login_admin.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(login_admin.rejected, (state, { payload }) => {
        state.loader = false;
        state.isLoggedin = false;
        state.isAuthenticated = false;
        state.errorMessage = "check your internet connection";
      })
      .addCase(verify_otp.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.user = payload.user;
        state.role = payload.user.role;
        state.isAuthenticated = true;
        state.isLoggedin = true;

        state.successMessage = "logged in successfully";
      })
      .addCase(verify_otp.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(verify_otp.rejected, (state, { payload }) => {
        state.loader = false;
        state.user = null;
        state.role = null;
        state.isLoggedin = false;

        state.isAuthenticated = false;
        state.errorMessage = "check your internet connection";
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.isLoggedin = false;

        state.successMessage = "logged in successfully";
      })
      .addCase(logout.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loader = false;
        state.isLoggedin = false;

        state.isAuthenticated = false;
        state.errorMessage = "check your internet connection";
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
