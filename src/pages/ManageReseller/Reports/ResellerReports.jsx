import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment-timezone";
import * as Yup from "yup";
import { Button } from "../../../components/Buttons/Buttons";
import { Modal, Label } from "flowbite-react";
import {
  createRoute,
  fetchRoutes,
} from "../../../rtk/slices/adminSlice/routeSlice";
import { fetchVendor } from "../../../rtk/slices/vendorSlice/vendorSlice";
import DataTable from "../../../components/table/dataTable/DataTable";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { fetchDashboardData } from "../../../rtk/slices/dashboard/dashboardSlice";
import {
  fetchReseller,
  populateResellersMerchant,
} from "../../../rtk/slices/resellerSlice/resellerSlice";
const ResellerReports = () => {
  const dispatch = useDispatch();

  const [merchantId, setMerchantId] = useState("");
  const [resellerId, setResellerId] = useState("");

  /* -------------------------SELECTORS ------------------------ */
  const { resellers, resellersMerchant } = useSelector(
    (state) => state.reseller
  );
  const { dashboardData } = useSelector((slice) => slice.dashboard);

  useEffect(() => {
    dispatch(fetchReseller());
  }, []);

  useEffect(() => {
    dispatch(populateResellersMerchant({ resellerId }));
  }, [resellerId]);
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  const columns = [
    {
      field: "numberOfRequests",
      headerName: "numberOfRequests",
      width: 190,
    },
    { field: "successRequests", headerName: "successRequests", width: 190 },
    { field: "failedRequests", headerName: "failedRequests", width: 190 },
    { field: "droppedRequests", headerName: "droppedRequests", width: 190 },
    { field: "successVolume", headerName: "successVolume", width: 190 },
    { field: "fees", headerName: "fees", width: 190 },
    { field: "tax", headerName: "tax", width: 190 },
    { field: "settlement", headerName: "settlement", width: 190 },
    {
      field: "img",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
  ];

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleFromDateTimeChange = (newValue) => {
    setStartDateTime(newValue.$d);
  };
  const handleToDateTimeChange = (newValue) => {
    console.log(newValue.$d.toISOString());
    setEndDateTime(newValue.$d);
  };
  useEffect(() => {
    if (merchantId && startDateTime && endDateTime) {
      const startUTC = moment.tz(startDateTime, "Asia/Kolkata").utc().format();
      const endUTC = moment.tz(endDateTime, "Asia/Kolkata").utc().format();

      dispatch(
        fetchDashboardData({
          datax: {
            merchantId: merchantId,
            appMode: "Payin",
            startUTC,
            endUTC,
          },
        })
      );
    }
  }, [startDateTime, endDateTime]);

  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <select
          id="merchant"
          name="merchant"
          onChange={(e) => setResellerId(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Select Reseller" />
          {resellers.map((item, idx) => (
            <option key={idx} value={item.r_id} label={item.name} />
          ))}
        </select>
        {resellersMerchant.length > 0 && (
          <select
            id="merchant"
            name="merchant"
            onChange={(e) => setMerchantId(e.target.value)}
            className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
          >
            <option value="" label="Select Merchant" />
            {resellersMerchant.map((item, idx) => (
              <option key={idx} value={item.m_id} label={item.name} />
            ))}
          </select>
        )}
        <div className="flex gap-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="items-center flex justify-center gap-4">
              <Label value="To" />
              <DateTimePicker
                className="custom-datetime-picker"
                sx={{ color: "white" }}
                defaultValue={dayjs("2024-06-17T15:30")}
                onChange={handleFromDateTimeChange}
              />
            </div>
            <div className="items-center flex justify-center gap-4">
              <Label value="From" />
              <DateTimePicker
                className="custom-datetime-picker"
                sx={{ color: "white" }}
                defaultValue={dayjs("2024-06-17T15:30")}
                onChange={handleToDateTimeChange}
              />
            </div>
          </LocalizationProvider>
        </div>
        <Button
          text="Submit"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
        >
          Submit
        </Button>
      </div>
      <h1 className="lg:text-2xl dark:text-white text-xl">Reseller Report</h1>

      <DataTable columns={columns} rows={dashboardData} />
    </div>
  );
};

export default ResellerReports;
