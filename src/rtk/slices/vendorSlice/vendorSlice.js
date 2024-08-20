import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
/* ------------------------------ get Vendor ------------------------------ */
export const fetchVendor = createAsyncThunk(
  "admin/fetchVendor",
  async ({ app_mode }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_vendor_banks?app_mode=${app_mode}`,
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
/* ----------------------------- createVendor ----------------------------- */
export const createVendor = createAsyncThunk(
  "admin/createVendor",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/create_vendor_banks?app_mode=${datax.app_mode}`,
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
/* ----------------------------- get vendor keys ----------------------------- */
export const getVendorKeys = createAsyncThunk(
  "admin/getVendorKeys",
  async ({ vendorId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_banks_keys/${vendorId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ----------------------------- create vendor keys ----------------------------- */
export const insertVendorKeyValue = createAsyncThunk(
  "admin/insertVendorKeyValue",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/insert_values/${datax.bankName}`,
        { keys: datax.dynamicFields },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const VendorSlice = createSlice({
  name: "Vendor",
  // state
  initialState: {
    vendors: [],
    keys: [],
    bankDetails: [],
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
      /* ------------------------- get Vendor  ------------------------- */
      .addCase(fetchVendor.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.vendors = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchVendor.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchVendor.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create Vendor  ------------------------- */
      .addCase(createVendor.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.vendors = [...state.vendors, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(createVendor.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createVendor.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- get Vendor keys ------------------------- */
      .addCase(getVendorKeys.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.keys = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(getVendorKeys.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getVendorKeys.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- insert Vendor key ka value ------------------------- */
      .addCase(insertVendorKeyValue.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.bankDetails = [...state.bankDetails, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(insertVendorKeyValue.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(insertVendorKeyValue.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = VendorSlice.actions;
export default VendorSlice.reducer;
