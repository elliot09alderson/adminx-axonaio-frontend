import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchApps = createAsyncThunk(
  "admin/fetchApps",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_app`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchActiveApps = createAsyncThunk(
  "admin/fetchActiveApps",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_active_app`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const toggleStatus = createAsyncThunk(
  "admin/toggleStatus",
  async ({ app_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/toggle_status/${app_id}`, null, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createApp = createAsyncThunk(
  "user/createApp",
  async ({ app_name, status }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/create_app`,
        { app_name, status },
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const assignAppToMerchant = createAsyncThunk(
  "admin/assignAppToMerchant",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/merchant/app_permissions/${datax.merchantId}`,
        datax,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "apps",
  initialState: {
    apps: [],
    activeApps: [],
    error: null,
    loader: false,
    successMessage: "",
    errorMessage: "",
    toggleLoader: false,
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
      .addCase(assignAppToMerchant.fulfilled, (state, { payload }) => {
        state.loader = false;
      })
      .addCase(assignAppToMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(assignAppToMerchant.rejected, (state, { payload }) => {
        state.errorMessage = "check your internet connection";
      })
      .addCase(createApp.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.apps = payload.data;

        state.successMessage = "logged in successfully";
      })
      .addCase(createApp.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createApp.rejected, (state, { payload }) => {
        state.loader = false;
        state.apps = payload.data;

        state.errorMessage = "check your internet connection";
      })
      .addCase(fetchApps.fulfilled, (state, { payload }) => {
        state.loader = false;

        state.apps = payload.data;
        state.successMessage = "Apps fetched successfully";
      })
      .addCase(fetchApps.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchApps.rejected, (state, { payload }) => {
        state.loader = false;

        state.errorMessage = "check your internet connection";
      })

      // ACTIVE APPS
      .addCase(fetchActiveApps.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.activeApps = payload.data;
        state.successMessage = "Apps fetched successfully";
      })
      .addCase(fetchActiveApps.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchActiveApps.rejected, (state, { payload }) => {
        state.loader = false;

        state.errorMessage = "check your internet connection";
      })
      //___________ Toggle Status_____________
      .addCase(toggleStatus.fulfilled, (state, { payload }) => {
        state.toggleLoader = false;

        state.successMessage = "apps status changed ";
      })
      .addCase(toggleStatus.pending, (state, { payload }) => {
        state.toggleLoader = true;
      })
      .addCase(toggleStatus.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "check your internet connection";
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
