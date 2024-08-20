import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
/* ----------------------------- create Route ----------------------------- */
export const createRoute = createAsyncThunk(
  "admin/createRoute",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/create_route`, datax, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* -------------------------------------------------------------------------- */
/*                                 ///////////                                */
/* -------------------------------------------------------------------------- */
export const fetchRoutes = createAsyncThunk(
  "admin/fetchRoutes",
  async ({ m_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_routes/${m_id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const RouteSlice = createSlice({
  name: "routes",
  // state
  initialState: {
    routes: [],
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
      /* ------------------------- get Routes  ------------------------- */
      .addCase(fetchRoutes.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.routes = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchRoutes.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchRoutes.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create Routes  ------------------------- */
      .addCase(createRoute.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.routes = [...state.routes, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(createRoute.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createRoute.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = RouteSlice.actions;
export default RouteSlice.reducer;
