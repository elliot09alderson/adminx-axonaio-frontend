import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
/* ------------------------------ get merchant ------------------------------ */
export const fetchEmployees = createAsyncThunk(
  "admin/fetchEmployees",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/fetch_employees`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ----------------------------- create Employee ----------------------------- */
export const createEmployee = createAsyncThunk(
  "admin/createEmpployee",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/register`, datax, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/* ----------------------------- toggleActivate Employee ----------------------------- */
export const toggleActivate = createAsyncThunk(
  "admin/toggleActivate",
  async ({ employeeId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/employee/toggle/${employeeId}`, null, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);
/* ----------------------------- toggleActivate Employee ----------------------------- */
export const updatePermissions = createAsyncThunk(
  "admin/updatePermissions",
  async ({ datax }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/employee_permissions`, datax, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  // state
  initialState: {
    employees: [],
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
      /* ------------------------- get merchant  ------------------------- */
      .addCase(fetchEmployees.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.employees = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(fetchEmployees.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchEmployees.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- create merchant  ------------------------- */
      .addCase(createEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.employees = [...state.employees, payload.data];
        state.successMessage = payload.message;
      })
      .addCase(createEmployee.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(createEmployee.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- deactivate  employee  ------------------------- */
      .addCase(toggleActivate.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(toggleActivate.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(toggleActivate.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      /* ------------------------- update permissions ------------------------- */
      .addCase(updatePermissions.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.employees = state.employees;
        state.successMessage = payload.message;
      })
      .addCase(updatePermissions.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updatePermissions.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { messageClear } = employeeSlice.actions;
export default employeeSlice.reducer;
