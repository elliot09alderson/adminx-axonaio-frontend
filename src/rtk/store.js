import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice.js";
import authSlice from "./slices/authSlice.js";
import utilsSlice from "./slices/utilsSlice.js";
import MerchantSlice from "./slices/adminSlice/MerchantSlice.js";
import vendorSlice from "./slices/vendorSlice/vendorSlice.js";
import routeSlice from "./slices/adminSlice/routeSlice.js";
import transactionSlice from "./slices/transaction/transactionSlice.js";
import settlementSlice from "./slices/settlement/settlementSlice.js";
import dashboardSlice from "./slices/dashboard/dashboardSlice.js";
import employeeSlice from "./slices/employeeSlice/employeeSlice.js";
import appSlice from "./slices/appSlice/appSlice.js";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    utils: utilsSlice,
    merchant: MerchantSlice,
    vendor: vendorSlice,
    route: routeSlice,
    settlement: settlementSlice,
    transaction: transactionSlice,
    dashboard: dashboardSlice,
    employee: employeeSlice,
    app: appSlice,
  },
});

export default store;
