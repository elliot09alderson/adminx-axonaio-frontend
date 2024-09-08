import { useEffect, useRef, useState } from "react";

import { Button } from "../../../components/Buttons/Buttons";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  createPayinPricing,
  createPayoutPricing,
  getMerchantPayinPricing,
  getMerchantPayoutPricing,
} from "../../../rtk/slices/adminSlice/MerchantSlice";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../../utils/Notifications/ToastNotifications";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Label, Dropdown, Modal, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
const MerchantPricingTable = () => {
  const dispatch = useDispatch();
  const [selectApp, setSelectApp] = useState("");
  const params = useParams();
  const selectMerchant = params.id;

  useEffect(() => {
    if (selectMerchant) {
      if (selectApp === "Payin") {
        dispatch(getMerchantPayinPricing({ merchantId: selectMerchant.m_id }));
      } else if (selectApp === "Payout") {
        dispatch(getMerchantPayoutPricing({ merchantId: selectMerchant.m_id }));
      }
    }
    ToastErrorNotifications("please select merchant first");
  }, [selectApp]);

  const columns = [
    { field: "merchantId", headerName: "merchant id", width: 250 },

    {
      field: "type",
      type: "string",
      headerName: "TYPE",
      width: 100,
    },
    {
      field: "min_range",
      type: "string",
      headerName: "Min Range",
      width: 150,
    },
    {
      field: "max_range",
      type: "string",
      headerName: "Max Range",
      width: 150,
    },
    {
      field: "netBanking",
      type: "string",
      headerName: "NB",
      width: 150,
    },
    {
      field: "CC",
      type: "string",
      headerName: "CC",
      width: 150,
    },
    {
      field: "DC",
      type: "string",
      headerName: "DC",
      width: 150,
    },

    {
      field: "UPI_Collect",
      type: "string",
      headerName: "UPI_Collect",
      width: 150,
    },
    // {
    //   field: "Wallet",
    //   type: "string",
    //   headerName: "Wallet",
    //   width: 150,
    // },

    {
      field: "added_By",
      headerName: "created By",
      width: 200,
      type: "string",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },

    {
      field: "updatedAt",
      headerName: "updated At",
      width: 200,
      type: "string",
    },
  ];
  const payoutColumns = [
    { field: "merchantId", headerName: "merchant id", width: 250 },
    // {
    //   field: "img",
    //   headerName: "Image",
    //   width: 50,
    //   renderCell: (params) => {
    //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
    //   },
    // },
    {
      field: "type",
      type: "string",
      headerName: "TYPE",
      width: 100,
    },
    {
      field: "min_range",
      type: "string",
      headerName: "Min Range",
      width: 150,
    },
    {
      field: "max_range",
      type: "string",
      headerName: "Max Range",
      width: 150,
    },
    {
      field: "NEFT",
      type: "string",
      headerName: "NEFT",
      width: 150,
    },
    {
      field: "IMPS",
      type: "string",
      headerName: "IMPS",
      width: 150,
    },
    {
      field: "RTGS",
      type: "string",
      headerName: "RTGS",
      width: 150,
    },
    {
      field: "Wallet",
      type: "string",
      headerName: "Wallet",
      width: 150,
    },

    {
      field: "added_By",
      headerName: "created By",
      width: 200,
      type: "string",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },

    {
      field: "updatedAt",
      headerName: "updated At",
      width: 200,
      type: "string",
    },
  ];

  useEffect(() => {
    if (selectMerchant) {
      if (selectApp === "Payin") {
        dispatch(getMerchantPayinPricing({ merchantId: selectMerchant.m_id }));
      } else if (selectApp === "Payout") {
        dispatch(getMerchantPayoutPricing({ merchantId: selectMerchant.m_id }));
      }
    }
    ToastErrorNotifications("please select merchant first");
  }, [selectApp]);
  const { merchantpayinpricing, merchantpayoutpricing, merchants } =
    useSelector((slice) => slice.merchant);

  return (
    <div className="flex flex-col gap-8 mt-8">
      <Dropdown
        size="lg"
        label={selectApp ? selectApp : `Select App`}
        style={{ background: "#1E293B", width: "300px" }}
        className="bg-day"
        dismissOnClick={true}
      >
        <Dropdown.Item onClick={() => setSelectApp("Payin")}>
          Pay in
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectApp("Payout")}>
          Pay out
        </Dropdown.Item>
      </Dropdown>
      <h1 className="lg:text-2xl  dark:text-white  text-xl">
        Merchant Pricing Table
      </h1>
      {selectApp == "Payin" ? (
        <DataTable columns={columns} rows={merchantpayinpricing} />
      ) : selectApp == "Payout" ? (
        <DataTable columns={payoutColumns} rows={merchantpayoutpricing} />
      ) : (
        <div className="text-center ">Please select App</div>
      )}
    </div>
  );
};

export default MerchantPricingTable;
