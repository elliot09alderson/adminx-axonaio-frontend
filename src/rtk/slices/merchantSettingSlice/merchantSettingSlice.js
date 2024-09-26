import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ------------------------------ api whitelist ------------------------------ */
export const doApiWhitelist = createAsyncThunk(
  "admin/doApiWhitelist",
  async ({ ip }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/whitelist`,
        { ip },
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
/* ------------------------------ get api whitelist ------------------------------ */
export const getApiWhitelist = createAsyncThunk(
  "admin/getApiWhitelist",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/whitelist`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ------------------------------ get domains ------------------------------ */
export const getWhitelistDomains = createAsyncThunk(
  "admin/getWhitelistDomains",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/domain`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ------------------------------ create domain ------------------------------ */
export const whitelistDomain = createAsyncThunk(
  "admin/whitelistDomain",
  async ({ domain }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/domain`,
        { domain },
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
  "admin/changeMerchantPasscode",
  async (
    { merchantId, newPassword },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(
        `/change_merchant_password/${merchantId}`,
        { newPassword },
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
export const fetchApi = createAsyncThunk(
  "admin/fetchApi",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_apikeys/${datax.merchantId}?type=${datax.app}&&mode=${datax.mode}`,
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
/* ----------------------------- delete whitelisted domain's ----------------------------- */
export const deleteWhiteListDomain = createAsyncThunk(
  "admin/deleteWhiteListDomain",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/domain/delete`,
        { id },
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
/* ----------------------------- delete WhiteList Ip ----------------------------- */
export const deleteWhiteListIp = createAsyncThunk(
  "admin/deleteWhiteListIp",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/whitelist/delete`,
        { id },
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
    whitelistDomains: [],
    WhitelistIpForApi: [],

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
      // __________________delete whitelist domain _______
      .addCase(deleteWhiteListDomain.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.whitelistDomains = state.whitelistDomains.filter(
          (item, idx) => item._id != payload.data
        );
        state.successMessage = payload.message;
      })
      .addCase(deleteWhiteListDomain.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(deleteWhiteListDomain.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // __________________delete whitelist Ip _______
      .addCase(deleteWhiteListIp.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.WhitelistIpForApi = state.WhitelistIpForApi.filter(
          (item, idx) => item._id != payload.data
        );
        state.successMessage = payload.message;
      })
      .addCase(deleteWhiteListIp.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(deleteWhiteListIp.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // __________________getWhitelistDomains _______
      .addCase(getWhitelistDomains.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.whitelistDomains = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getWhitelistDomains.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getWhitelistDomains.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // __________________do Whitelist Api _______
      .addCase(doApiWhitelist.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.WhitelistIpForApi = [...state.WhitelistIpForApi, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(doApiWhitelist.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(doApiWhitelist.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // __________________get Whitelist Api _______
      .addCase(getApiWhitelist.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.WhitelistIpForApi = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getApiWhitelist.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getApiWhitelist.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // __________________whitelist Domains _______
      .addCase(whitelistDomain.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.whitelistDomains = [...state.whitelistDomains, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(whitelistDomain.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(whitelistDomain.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- get webhooks ------------------------- */
      .addCase(fetchWebhooks.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.payinwebhooks = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchWebhooks.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchWebhooks.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // changeMerchantPasscode
      .addCase(changeMerchantPasscode.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(changeMerchantPasscode.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(changeMerchantPasscode.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- fetch api keys   ------------------------- */
      .addCase(fetchApi.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.payinapikeys = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchApi.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchApi.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      });
  },
});

export const { messageClear } = MerchantSettingSlice.actions;
export default MerchantSettingSlice.reducer;
