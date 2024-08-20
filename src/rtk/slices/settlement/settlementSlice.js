import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ------------------------------ get merchant ------------------------------ */
export const fetchSettlements = createAsyncThunk(
  "admin/fetchSettlements",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/fetch_settlement/?merchantId=${datax.merchantId}&from=${datax.from}&to=${datax.to}`,
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
/* ----------------------------- DoSettlement ----------------------------- */
export const DoSettlement = createAsyncThunk(
  "admin/DoSettlement",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/do_settlement`, datax, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const GetSettlementCalculation = createAsyncThunk(
  "admin/GetSettlementCalculation",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/calculate_settlement`, datax, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const SettlementSlice = createSlice({
  name: "settlement",
  // state
  initialState: {
    settlements: [],
    settlementValue: {
      successVolume: "",
      fees: "",
      tax: "",
      settlementVolume: "",
    },
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
      /* ------------------------- get settlement  ------------------------- */
      .addCase(fetchSettlements.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.settlements = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchSettlements.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchSettlements.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create settlement  ------------------------- */
      .addCase(DoSettlement.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.settlements = [...state.settlements, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(DoSettlement.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(DoSettlement.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      })
      /* ------------------------- CALCULATE settlement  ------------------------- */
      .addCase(GetSettlementCalculation.fulfilled, (state, { payload }) => {
        state.loader = false;

        state.settlementValue.fees = payload.data.fees;
        state.settlementValue.tax = payload.data.tax;
        state.settlementValue.settlementVolume = payload.data.settlementValue;
        state.settlementValue.successVolume = payload.data.successVolume;

        state.successMessage = payload.message;
      })
      .addCase(GetSettlementCalculation.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(GetSettlementCalculation.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.error;
      });
  },
});

export const { messageClear } = SettlementSlice.actions;
export default SettlementSlice.reducer;
