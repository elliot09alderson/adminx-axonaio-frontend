import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchFreshMerchant = createAsyncThunk(
  "admin/fetchMerchantForReseller",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_fresh_merchant`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const makeReseller = createAsyncThunk(
  "admin/makeReseller",
  async ({ merchantId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/convert_reseller/${merchantId}`, null, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchReseller = createAsyncThunk(
  "admin/fetchReseller",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_reseller`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const populateResellersMerchant = createAsyncThunk(
  "admin/populateResellersMerchant",
  async ({ resellerId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_reseller_merchant/${resellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const manageMerchantInArray = createAsyncThunk(
  "admin/manageMerchantInArray",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/resellers/?action=${datax.action}&&resellerId=${datax.resellerId}&&merchantId=${datax.merchantId}`,
        null,
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

const resellerSlice = createSlice({
  name: "reseller",
  // state
  initialState: {
    resellers: [],
    resellersMerchant: [],
    freshMerchants: [],
    loader: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ------------------------- get Fetch Reseller  ------------------------- */
      .addCase(fetchReseller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.resellers = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchReseller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchReseller.rejected, (state, { payload }) => {
        state.loader = false;
        state.resellers = [];

        state.errorMessage = payload.error;
      })
      /* ------------------------- get merchant  ------------------------- */
      .addCase(fetchFreshMerchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.freshMerchants = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchFreshMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchFreshMerchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        state.freshMerchants = [];
      })

      // ________________map/unmap merchant_____________
      .addCase(manageMerchantInArray.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.resellersMerchant = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(manageMerchantInArray.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(manageMerchantInArray.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      //____________ populate Resellers Merchant _________
      .addCase(populateResellersMerchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.resellersMerchant = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(populateResellersMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(populateResellersMerchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.resellersMerchant = [];
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = resellerSlice.actions;
export default resellerSlice.reducer;
