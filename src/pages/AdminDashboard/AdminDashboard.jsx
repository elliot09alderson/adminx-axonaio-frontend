import BarChartBox from "./components/barChartBox/BarChartBox";
import BigChartBox from "./components/bigChartBox/BigChartBox";
import ChartBox from "./components/chartBox/ChartBox";
import PieChartBox from "./components/pieCartBox/PieChartBox";
import TopBox from "./components/topBox/TopBox";
import { Dropdown, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  // chartBoxProduct,
  chartBoxRevenue,
  // chartBoxUser,
} from "../../data/data.ts";
import "./dashboard.scss";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { ToastErrorNotifications } from "../../../utils/Notifications/ToastNotifications.jsx";
import { fetchMerchant } from "../../rtk/slices/adminSlice/MerchantSlice.js";
import { fetchSettlements } from "../../rtk/slices/settlement/settlementSlice.js";
import moment from "moment-timezone";
import { fetchDashboardData } from "../../rtk/slices/dashboard/dashboardSlice.js";
function TopBar() {
  const { merchants } = useSelector((slice) => slice.merchant);

  useEffect(() => {
    dispatch(fetchMerchant());
  }, []);
  const [selectMerchant, setSelectedMerchant] = useState({
    name: "",
    m_id: "",
  });
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const dispatch = useDispatch();
  const [selectApp, setSelectApp] = useState("");

  const handleFromDateTimeChange = (newValue) => {
    setStartDateTime(newValue.$d);
  };
  const handleToDateTimeChange = (newValue) => {
    console.log(newValue.$d.toISOString());
    setEndDateTime(newValue.$d);
  };
  useEffect(() => {
    if (selectMerchant && selectApp && startDateTime && endDateTime) {
      const startUTC = moment.tz(startDateTime, "Asia/Kolkata").utc().format();
      const endUTC = moment.tz(endDateTime, "Asia/Kolkata").utc().format();

      dispatch(
        fetchDashboardData({
          datax: {
            merchantId: selectMerchant.m_id,
            appMode: selectApp,
            startUTC,
            endUTC,
          },
        })
      );
    }
  }, [startDateTime, endDateTime]);

  return (
    <>
      <div className="h-32 w-full rounded-xl flex items-center mb-4  justify-center">
        <div className="gap-8 flex ">
          <Dropdown
            size="lg"
            label={
              selectMerchant.name ? selectMerchant.name : `Select Merchant`
            }
            style={{ background: "#1E293B", width: "300px" }}
            className="bg-day"
            dismissOnClick={true}
          >
            {merchants.map((item, idx) => (
              <Dropdown.Item
                key={item.m_id}
                onClick={() =>
                  setSelectedMerchant({ name: item.name, m_id: item.m_id })
                }
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown
            size="lg"
            label={selectApp ? selectApp : `Select App`}
            style={{ background: "#1E293B", width: "300px" }}
            // className="bg-day"
            dismissOnClick={true}
          >
            <Dropdown.Item onClick={() => setSelectApp("Payin")}>
              Pay in
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectApp("Payout")}>
              Pay out
            </Dropdown.Item>
          </Dropdown>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs} className="">
          <div className="flex justify-center gap-12 w-full">
            <div className="flex gap-4 items-center justify-center">
              <Label htmlFor="Total" value="From" />

              <DateTimePicker
                onChange={handleFromDateTimeChange}
                defaultValue={dayjs("2024-06-17T15:30")}
                className="w-full text-white custom-datetime-picker border-white "
                sx={{ color: "white" }}
              />
            </div>
            <div className="flex gap-4 items-center justify-center">
              <Label htmlFor="Total" value="To" />
              <DateTimePicker
                defaultValue={dayjs("2024-06-17T15:30")}
                onChange={handleToDateTimeChange}
                className="w-full text-white custom-datetime-picker border-white "
                sx={{ color: "white" }}
              />
            </div>
          </div>
        </LocalizationProvider>
      </div>
    </>
  );
}

const AdminDashboard = () => {
  const [selectMerchant, setSelectedMerchant] = useState({
    name: "",
    m_id: "",
  });
  const { dashboardData } = useSelector((slice) => slice.dashboard);

  const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Transactions",
    numberOfRequests: dashboardData.numberOfRequests,
    dataKey: "users",
    percentage: 45,
    chartData: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "Tue", users: 500 },
      { name: "Wed", users: 700 },
      { name: "Thu", users: 400 },
      { name: "Fri", users: 500 },
      { name: "Sat", users: 450 },
    ],
  };
  const chartBoxProduct = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Success Transactions ",
    numberOfRequests: dashboardData.successRequests,
    // number: "238",
    dataKey: "products",
    percentage: 21,
    chartData: [
      { name: "Sun", products: 400 },
      { name: "Mon", products: 600 },
      { name: "Tue", products: 500 },
      { name: "Wed", products: 700 },
      { name: "Thu", products: 400 },
      { name: "Fri", products: 500 },
      { name: "Sat", products: 450 },
    ],
  };
  const chartBoxRevenue = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Total Volume",
    number: "56.432",
    dataKey: "revenue",
    numberOfRequests: dashboardData.successVolume,

    percentage: -12,
    chartData: [
      { name: "Sun", revenue: 400 },
      { name: "Mon", revenue: 600 },
      { name: "Tue", revenue: 500 },
      { name: "Wed", revenue: 700 },
      { name: "Thu", revenue: 400 },
      { name: "Fri", revenue: 500 },
      { name: "Sat", revenue: 450 },
    ],
  };

  const chartBoxConversion = {
    color: "gold",
    icon: "/conversionIcon.svg",
    title: "Total Settlement Volume",
    number: "2.6",
    dataKey: "ratio",
    percentage: 12,
    numberOfRequests: dashboardData.settlement,
    chartData: [
      { name: "Sun", ratio: 400 },
      { name: "Mon", ratio: 600 },
      { name: "Tue", ratio: 500 },
      { name: "Wed", ratio: 700 },
      { name: "Thu", ratio: 400 },
      { name: "Fri", ratio: 500 },
      { name: "Sat", ratio: 450 },
    ],
  };
  const [selectApp, setSelectApp] = useState("");
  return (
    <>
      <TopBar
        selectMerchant={selectMerchant}
        setSelectedMerchant={setSelectedMerchant}
        selectApp={selectApp}
        setSelectApp={setSelectApp}
      />
      <div className="home dark:text-white  dark:bg-slate-950">
        <div className="box box1">
          <TopBox />
        </div>
        <div className="box box2">
          <ChartBox {...chartBoxUser} />
        </div>
        <div className="box box3">
          <ChartBox {...chartBoxProduct} />
        </div>
        <div className="box box4">
          <PieChartBox />
        </div>
        <div className="box box5">
          <ChartBox {...chartBoxConversion} />
        </div>
        <div className="box box6">
          <ChartBox {...chartBoxRevenue} />
        </div>
        <div className="box box7">
          <BigChartBox />
        </div>
        <div className="box box8">
          <BarChartBox {...barChartBoxVisit} />
        </div>
        <div className="box box9">
          <BarChartBox {...barChartBoxRevenue} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
