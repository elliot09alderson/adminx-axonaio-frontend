import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ------------------------------ get webhooks ------------------------------ */
export const fetchWebhooks = createAsyncThunk(
  "admin/fetchWebhooks",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_webhook/${datax.merchantId}?type=${datax.app}&&mode=${datax.mode}`,
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
/* ------------------------------ change merchant passcode------------------------------ */
export const changeMerchantPasscode = createAsyncThunk(
  "admin/fetchWebhooks",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/change_merchant_password/${merchantId}`,
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
/* ----------------------------- get Api's ----------------------------- */
export const fetchApis = createAsyncThunk(
  "admin/fetchApis",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_apikeys/${merchantId}?type=${datax.app}&&mode=${datax.mode}`,
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

const MerchantSettingSlice = createSlice({
  name: "merchantsetting",
  // state
  initialState: {
    payinwebhooks: [],
    payinapikeys: [],
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
      /* ------------------------- get webhooks ------------------------- */
      .addCase(fetchWebhooks.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.payinwebhooks = payload.payinwebhooks;
        state.successMessage = payload.message;
      })
      .addCase(fetchWebhooks.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchWebhooks.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- fetch api keys   ------------------------- */
      .addCase(fetchApis.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.payinapikeys = payload.payinapikeys;
        state.successMessage = payload.message;
      })
      .addCase(fetchApis.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchApis.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      });
  },
});

export const { messageClear } = MerchantSettingSlice.actions;
export default MerchantSettingSlice.reducer;
