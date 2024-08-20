import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../../rtk/slices/transaction/transactionSlice.js";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../../utils/Notifications/ToastNotifications";
import { Link } from "react-router-dom";
import CreateTransaction from "./CreateTransaction";
import { Dropdown, Label } from "flowbite-react";
import { fetchMerchant } from "../../../rtk/slices/adminSlice/MerchantSlice.js";

const TransactionTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { transactions, successMessage, errorMessage } = useSelector(
    (slice) => slice.transaction
  );
  const { merchants } = useSelector((slice) => slice.merchant);

  const columns = [
    { field: "m_id", headerName: "Merchant id", width: 230 },
    { field: "transaction_id", headerName: "Transaction id", width: 230 },

    {
      field: "vendor_id",
      type: "string",
      headerName: "Bank Id",
      width: 250,
    },
    {
      field: "order_id",
      type: "string",
      headerName: "Order Id",
      width: 250,
    },
    {
      field: "transaction_type",
      type: "string",
      headerName: "transaction_type",
      width: 200,
    },
    {
      field: "transaction_username",
      type: "string",
      headerName: "transaction_username",
      width: 200,
    },
    {
      field: "transaction_email",
      type: "string",
      headerName: "transaction_email",
      width: 200,
    },
    {
      field: "transaction_contact",
      type: "string",
      headerName: "transaction_contact",
      width: 150,
    },
    {
      field: "transaction_status",
      type: "string",
      headerName: "transaction_status",
      width: 150,
    },
    {
      field: "transaction_method_id",
      type: "string",
      headerName: "Method ID",
      width: 150,
    },

    {
      field: "transaction_amount",
      headerName: "transaction amount",
      width: 200,
      type: "string",
    },
    {
      field: "transaction_ip",
      headerName: "transaction ip",
      width: 200,
      type: "string",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={`/merchants/${params.row.m_id}`}>
              <img src="/view.svg" alt="" />
            </Link>
            <div
              className="delete"
              onClick={() => handleDelete(params.row.m_id)}
            >
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchMerchant());
    // console.log("merchants-->", merchants);
  }, []);

  useEffect(() => {
    if (successMessage) {
      ToastSuccessNotifications(successMessage);
    }
    if (errorMessage) {
      ToastErrorNotifications(errorMessage);
    }
  }, []);

  function handleDelete(id) {
    console.log(id);
  }

  function BarWithDateTime() {
    const [selectMerchant, setSelectedMerchant] = useState({
      name: "",
      m_id: "",
    });
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    useEffect(() => {
      if (selectMerchant && startDateTime && endDateTime) {
        const startUTC = moment
          .tz(startDateTime, "Asia/Kolkata")
          .utc()
          .format();
        const endUTC = moment.tz(endDateTime, "Asia/Kolkata").utc().format();

        dispatch(
          fetchTransactions({ m_id: selectMerchant.m_id, startUTC, endUTC })
        );
      }
    }, [startDateTime, endDateTime]);

    const dispatch = useDispatch();

    return (
      <div className=" py-8 gap-8 rounded-lg shadow-md dark:bg-slate-700 flex lg:flex-row flex-col items-center justify-between px-8 dark:text-white w-full ">
        <Dropdown
          size="lg"
          label={selectMerchant.name ? selectMerchant.name : `Select Merchant`}
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
        <div className="flex gap-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="items-center flex justify-center gap-4">
              <Label value="To" />
              <DateTimePicker
                className="custom-datetime-picker"
                onChange={(val) => setStartDateTime(val.$d)}
                defaultValue={dayjs("2024-06-17T15:30")}
              />
            </div>
            <div className="items-center flex justify-center gap-4">
              <Label value="From" />
              <DateTimePicker
                className="custom-datetime-picker"
                onChange={(val) => setEndDateTime(val.$d)}
                sx={{ color: "white" }}
                defaultValue={dayjs("2024-06-17T15:30")}
              />
            </div>
          </LocalizationProvider>
        </div>
      </div>
    );
  }
  return (
    <div className=" flex  gap-8 flex-col dark:bg-slate-950 min-h-screen">
      <BarWithDateTime />
      {openModal && <CreateTransaction setOpenModal={setOpenModal} />}
      <h1 className="lg:text-2xl  dark:text-white  text-xl">
        Transaction Table
      </h1>

      <DataTable slug="products" columns={columns} rows={transactions} />
    </div>
  );
};

export default TransactionTable;
