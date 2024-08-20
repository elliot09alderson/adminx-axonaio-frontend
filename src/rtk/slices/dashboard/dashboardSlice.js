import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
/* ------------------------------ get Dashboard ------------------------------ */
export const fetchDashboardData = createAsyncThunk(
  "admin/fetchDashboardData",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/dashboard_data?startUTC=${datax.startUTC}&endUTC=${datax.endUTC}&merchantId=${datax.merchantId}&appMode=${datax.appMode}`,
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

const DashboardSlice = createSlice({
  name: "Dashboard",
  // state
  initialState: {
    dashboardData: [],
    loader: false,
    successMessage: "",
    errorMessage: "",
    Dashboardpayinpricing: [],
    Dashboardpayoutpricing: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* ------------------------- get Dashboard  ------------------------- */
      .addCase(fetchDashboardData.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.dashboardData = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchDashboardData.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchDashboardData.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = DashboardSlice.actions;
export default DashboardSlice.reducer;
