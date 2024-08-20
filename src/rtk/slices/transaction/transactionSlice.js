import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
/* ------------------------------ get merchant ------------------------------ */
export const fetchTransactions = createAsyncThunk(
  "admin/fetchTransactions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/get_payin_transaction/${m_id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  // state
  initialState: {
    transactions: [],
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
      /* ------------------------- get TRANSACTIONS  ------------------------- */
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.transactions = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchTransactions.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchTransactions.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = transactionSlice.actions;
export default transactionSlice.reducer;
