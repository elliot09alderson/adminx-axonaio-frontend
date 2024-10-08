import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const changeAccessModeOfMerchant = createAsyncThunk(
  "admin/changeAccessModeOfMerchant",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/merchant/mode_access/${id}`, null, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ------------------------------ get merchant ------------------------------ */
export const fetchMerchant = createAsyncThunk(
  "admin/fetchMerchant",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_merchant`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ----------------------------- createMerchant ----------------------------- */
export const createMerchant = createAsyncThunk(
  "admin/createMerchant",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/onboard_merchant`, datax, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* -------------------------------------------------------------------------- */
/*                               create pricings                              */
/* -------------------------------------------------------------------------- */
export const createPayinPricing = createAsyncThunk(
  "admin/createPayinPricing",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    console.log(datax);
    try {
      const { data } = await api.put(
        `set_payin_price/${datax.merchant}`,
        datax.pricing,
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
export const createPayoutPricing = createAsyncThunk(
  "admin/createPayoutPricing",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `set_payout_price/${datax.merchant}`,
        datax.pricing,
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
/* -------------------------------------------------------------------------- */
/*                               get pricings                              */
/* -------------------------------------------------------------------------- */
export const getMerchantPayinPricing = createAsyncThunk(
  "admin/getMerchantPayinPricing",
  async ({ merchantId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`get_payin_price/${merchantId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getMerchantPayoutPricing = createAsyncThunk(
  "admin/getMerchantPayoutPricing",
  async ({ merchantId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`get_payout_price/${merchantId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getMerchantDocDetail = createAsyncThunk(
  "admin/getMerchantDocDetail",
  async ({ merchantId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_merchant_doc_details/${merchantId}`,
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
export const getMerchantBasicDetail = createAsyncThunk(
  "admin/getMerchantBasicDetail",
  async ({ merchantId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_merchant_details/${merchantId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const uploadMerchantDoc = createAsyncThunk(
  "admin/uploadMerchantDoc",
  async ({ merchantId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/merchant_doc_upload/${merchantId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// _____________ UPDATE USER DETAILS ______________________
export const updateUserDetails = createAsyncThunk(
  "admin/updateUserDetails",
  async ({ merchantId, datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/update_merchant_details/${merchantId}`,
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
export const updateUserReasonsAndNotify = createAsyncThunk(
  "admin/updateUserReasonsAndNotify",
  async ({ merchantId, reasons }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/update_reasons/${merchantId}`, reasons, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const MerchantSlice = createSlice({
  name: "merchant",
  // state
  initialState: {
    merchants: [],
    reasons: [],
    merchantDocDetails: {},
    merchantBasicDetails: {},
    loader: false,
    successMessage: "",
    errorMessage: "",
    merchantpayinpricing: [],
    merchantpayoutpricing: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* ------------------------- get merchant  ------------------------- */
      .addCase(fetchMerchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchants = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchMerchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create merchant  ------------------------- */
      .addCase(createMerchant.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchants = [...state.merchants, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(createMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createMerchant.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- merchant payin pricing ------------------------- */
      .addCase(getMerchantPayinPricing.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchantpayinpricing = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getMerchantPayinPricing.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getMerchantPayinPricing.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- merchant payout pricing ------------------------- */
      .addCase(getMerchantPayoutPricing.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchantpayoutpricing = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getMerchantPayoutPricing.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getMerchantPayoutPricing.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create payout pricing ------------------------- */
      .addCase(createPayoutPricing.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchantpayoutpricing = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(createPayoutPricing.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createPayoutPricing.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create payin pricing ------------------------- */
      .addCase(createPayinPricing.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchantpayinpricing = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(createPayinPricing.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createPayinPricing.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      // _________merchant Basic Details___________
      .addCase(getMerchantBasicDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchantBasicDetails = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getMerchantBasicDetail.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getMerchantBasicDetail.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // _________merchant Doc Details___________
      .addCase(getMerchantDocDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.merchantDocDetails = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getMerchantDocDetail.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getMerchantDocDetail.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // _________update User Details___________
      .addCase(updateUserDetails.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.merchantDocDetails = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(updateUserDetails.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateUserDetails.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      // _________update User Reasons And Notify___________
      .addCase(updateUserReasonsAndNotify.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.reasons = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(updateUserReasonsAndNotify.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateUserReasonsAndNotify.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = MerchantSlice.actions;
export default MerchantSlice.reducer;
