import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  DoSettlement,
  fetchSettlements,
  GetSettlementCalculation,
} from "../../../rtk/slices/settlement/settlementSlice.js";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../../utils/Notifications/ToastNotifications";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Checkbox, Dropdown, Label, Modal, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import CreateSettlement from "./CreateSettlement";
import { fetchMerchant } from "../../../rtk/slices/adminSlice/MerchantSlice.js";
import moment from "moment-timezone";

const SettlementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();
  const { settlements, successMessage, errorMessage, settlementValue, loader } =
    useSelector((slice) => slice.settlement);
  const { merchants } = useSelector((slice) => slice.merchant);

  const columns = [
    { field: "SBID", headerName: "Batch Id", width: 190 },
    { field: "m_id", headerName: "merchant id", width: 190 },
    { field: "settlementId", headerName: "Settlement Id", width: 190 },
    { field: "merchantName", headerName: "Merchant name", width: 190 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "totalVolume",
      type: "string",
      headerName: "Total Volume",
      width: 250,
    },
    {
      field: "total_fees",
      type: "string",
      headerName: "Total Fees",
      width: 150,
    },
    {
      field: "total_tax",
      type: "string",
      headerName: "Total Tax",
      width: 150,
    },
    {
      field: "netSettlement",
      type: "string",
      headerName: "Net Settlement Volume",
      width: 250,
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
    const dispatch = useDispatch();

    const handleFromDateTimeChange = (newValue) => {
      setStartDateTime(newValue.$d);
    };
    const handleToDateTimeChange = (newValue) => {
      setEndDateTime(newValue.$d);
    };

    useEffect(() => {
      if (selectMerchant && startDateTime && endDateTime) {
        const startUTC = moment
          .tz(startDateTime, "Asia/Kolkata")
          .utc()
          .format();
        const endUTC = moment.tz(endDateTime, "Asia/Kolkata").utc().format();

        dispatch(
          fetchSettlements({
            datax: {
              merchantId: selectMerchant.m_id,
              from: startUTC,
              to: endUTC,
            },
          })
        );
      }
    }, [startDateTime, endDateTime]);
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
      </div>
    );
  }

  const [inputSelectMerchant, setInputSelectedMerchant] = useState({
    name: "",
    m_id: "",
  });
  const [startInputDateTime, setStartInputDateTime] = useState("");
  const [endInputDateTime, setEndInputDateTime] = useState("");

  // handle Change
  const handleFromDateTimeChange = (newValue) => {
    setStartInputDateTime(newValue.$d);
  };
  const handleToDateTimeChange = (newValue) => {
    setEndInputDateTime(newValue.$d);
  };

  // ------------------------------ GET SETTLEMENT Data -----------
  useEffect(() => {
    if (inputSelectMerchant && startInputDateTime && endInputDateTime) {
      const startUTC = moment
        .tz(startInputDateTime, "Asia/Kolkata")
        .utc()
        .format();
      const endUTC = moment.tz(endInputDateTime, "Asia/Kolkata").utc().format();
      dispatch(
        GetSettlementCalculation({
          datax: {
            merchantId: inputSelectMerchant.m_id,
            startDate: startUTC,
            endDate: endUTC,
          },
        })
      );
    }
  }, [startInputDateTime, endInputDateTime]);

  //------------------------------- Do settlement ---------------
  function submit(e) {
    e.preventDefault();
    if (inputSelectMerchant && startInputDateTime && endInputDateTime) {
      const startUTC = moment
        .tz(startInputDateTime, "Asia/Kolkata")
        .utc()
        .format();
      const endUTC = moment.tz(endInputDateTime, "Asia/Kolkata").utc().format();
      dispatch(
        DoSettlement({
          datax: {
            merchantId: inputSelectMerchant.m_id,
            startDate: startUTC,
            endDate: endUTC,
          },
        })
      ).then((result) => {
        console.log(result);
        setOpenModal(false);
      });
    }
  }
  return (
    <div className=" flex  gap-8 flex-col dark:bg-slate-950 min-h-screen">
      <BarWithDateTime />
      <Button onClick={() => setOpenModal(true)}>Do Settlement</Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create Settlement
            </h3>
            <form action="">
              <div className="flex flex-col gap-4 ">
                <Dropdown
                  size="lg"
                  label={
                    inputSelectMerchant.name
                      ? inputSelectMerchant.name
                      : `Select Merchant`
                  }
                  style={{ background: "#1E293B", width: "100%" }}
                  className="bg-day w-full"
                  dismissOnClick={true}
                >
                  {merchants.map((item, idx) => (
                    <Dropdown.Item
                      key={item.m_id}
                      onClick={() =>
                        setInputSelectedMerchant({
                          name: item.name,
                          m_id: item.m_id,
                        })
                      }
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <div className="flex flex-col gap-5">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex flex-col  gap-2 justify-center">
                      <Label htmlFor="Total" value="From" />

                      <DateTimePicker
                        className="custom-datetime-picker"
                        onChange={handleFromDateTimeChange}
                        defaultValue={dayjs("2024-06-17T15:30")}
                      />
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      <Label htmlFor="Total" value="To" />
                      <DateTimePicker
                        onChange={handleToDateTimeChange}
                        className="custom-datetime-picker"
                        defaultValue={dayjs("2024-06-17T15:30")}
                      />
                    </div>
                  </LocalizationProvider>
                </div>

                {settlementValue.successVolume && (
                  <>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="Total" value="Total Success Volume" />
                      </div>
                      <TextInput
                        id="email"
                        ref={emailInputRef}
                        value={settlementValue.successVolume}
                        className="border-white border rounded-lg"
                        disabled
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="password" value="Total Fees" />
                      </div>
                      <TextInput
                        disabled
                        value={settlementValue.fees}
                        className="border-white border rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="password" value="Total Tax" />
                      </div>
                      <TextInput
                        disabled
                        value={settlementValue.tax}
                        className="border-white border rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="password"
                          value="Total Settlement Volume"
                        />
                      </div>
                      <TextInput
                        disabled
                        value={settlementValue.settlementVolume}
                        className="border-white border rounded-lg"
                      />
                    </div>
                  </>
                )}

                <div className="w-full mt-3 ">
                  <Button
                    type={"submit"}
                    text={"Do settlement"}
                    className={"lg:w-full"}
                    onClick={(e) => {
                      submit(e);
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/* {openModal && <CreateSettlement setOpenModal={setOpenModal} />} */}
      <h1 className="lg:text-2xl  dark:text-white  text-xl">
        Settlement Table
      </h1>

      <DataTable slug="products" columns={columns} rows={settlements} />
    </div>
  );
};

export default SettlementTable;
