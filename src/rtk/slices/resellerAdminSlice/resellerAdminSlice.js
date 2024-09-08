import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchFreshReseller = createAsyncThunk(
  "admin/fetchFreshReseller",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_fresh_reseller`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchResellerAdmin = createAsyncThunk(
  "admin/fetchResellerAdmin",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_reseller_admin`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const makeResellerAdmin = createAsyncThunk(
  "admin/makeResellerAdmin",
  async ({ resellerId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/convert_reseller_admin/${resellerId}`,
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

export const populateResellerAdmins_Reseller = createAsyncThunk(
  "admin/populateResellerAdmins_Reseller",
  async ({ resellerAdminId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_reseller_admins_reseller/${resellerAdminId}`,
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
export const populateResellerAdminsMerchant = createAsyncThunk(
  "admin/populateResellerAdminsMerchant",
  async ({ resellerAdminId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_reseller_admins_merchant/${resellerAdminId}`,
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
export const manageMerchantInArray = createAsyncThunk(
  "admin/manageMerchantInArray",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/reseller_admin/${datax.resellerAdminId}/ra_merchants/${datax.merchantId}?action=${datax.action}`,
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
export const manageResellerInArray = createAsyncThunk(
  "admin/manageResellerInArray",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/reseller_admin/${datax.resellerAdminId}/ra_resellers/${datax.resellerId}?action=${datax.action}`,
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

const resellerAdminSlice = createSlice({
  name: "reselleradmin",
  // state
  initialState: {
    resellers: [],
    resellerAdmins: [],
    resellersMerchant: [],
    resellerAdminMerchants: [],
    freshMerchants: [],
    freshResellers: [],
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
      .addCase(fetchFreshReseller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.freshResellers = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchFreshReseller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchFreshReseller.rejected, (state, { payload }) => {
        state.loader = false;
        state.freshResellers = [];

        state.errorMessage = payload.error;
      })
      /* --------------------- make Reseller Admin  ------------------------- */
      .addCase(makeResellerAdmin.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.resellerAdmins = [state.resellerAdmins, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(makeResellerAdmin.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(makeResellerAdmin.rejected, (state, { payload }) => {
        state.loader = false;
        // state.resellerAdmins = [];

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
      /* ------------------------- get reseller admins  ------------------------- */
      .addCase(fetchResellerAdmin.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.resellerAdmins = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchResellerAdmin.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchResellerAdmin.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        state.resellerAdmins = [];
      })

      /* ------------------------- get reseller admins  ------------------------- */
      .addCase(
        populateResellerAdmins_Reseller.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.resellers = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(
        populateResellerAdmins_Reseller.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        populateResellerAdmins_Reseller.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.errorMessage = payload.error;
          state.resellers = [];
        }
      )

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
      // _______________________________
      .addCase(manageResellerInArray.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.resellersMerchant = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(manageResellerInArray.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(manageResellerInArray.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      //____________ populate ResellerAdmin Merchant _________
      .addCase(
        populateResellerAdminsMerchant.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.resellerAdminMerchants = payload.data;
          state.successMessage = payload.message;
        }
      )
      .addCase(populateResellerAdminsMerchant.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(
        populateResellerAdminsMerchant.rejected,
        (state, { payload }) => {
          state.loader = false;
          state.resellerAdminMerchants = [];
          state.errorMessage = payload.error;
        }
      );
  },
});

export const { messageClear } = resellerAdminSlice.actions;
export default resellerAdminSlice.reducer;
