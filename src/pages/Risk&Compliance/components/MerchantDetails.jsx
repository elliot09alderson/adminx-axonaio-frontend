import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccessModeOfMerchant,
  fetchMerchant,
} from "../../../rtk/slices/adminSlice/MerchantSlice";

import { Link } from "react-router-dom";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

const MerchantDetails = ({ setActive }) => {
  // -------------------   useSelector ----------------------

  const dispatch = useDispatch();
  const { merchants, successMessage, errorMessage } = useSelector(
    (slice) => slice.merchant
  );

  const columns = [
    { field: "m_id", headerName: "merchant id", width: 250 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "name",
      type: "string",
      headerName: "merchant name",
      width: 250,
    },
    {
      field: "email",
      type: "string",
      headerName: "merchant email",
      width: 150,
    },
    {
      field: "phonenumber",
      type: "string",
      headerName: "phone number",
      width: 200,
    },
    {
      field: "bg_verified",
      type: "string",
      headerName: "bg verified",
      width: 200,
    },
    {
      field: "doc_verified",
      type: "string",
      headerName: "Doc verified",
      width: 200,
    },
    {
      field: "documents_upload",
      type: "string",
      headerName: "Doc Uploaded",
      width: 200,
    },
    {
      field: "app_mode",
      headerName: " MODE ",
      width: 200,
      type: "string",
      renderCell: (params) => {
        <div
          className={`${
            params?.row?.app_mode == "test"
              ? " bg-green-500 "
              : " bg-yellow-400 "
          } text-center p-4 flex items-center justify-center`}
        >
          {params?.row?.app_mode}
        </div>;
      },
    },

    {
      field: "createdAt",
      headerName: "Created At",
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
            <Link
              to={`editmerchant/${params.row.m_id}`}
              onClick={() => setActive(1)}
            >
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

  console.log("merchants", merchants);

  useEffect(() => {
    dispatch(fetchMerchant());
  }, []);

  function handleDelete(id) {
    console.log(id);
  }
  return (
    <div className=" flex  gap-8 flex-col dark:bg-slate-950 min-h-screen">
      <h1 className="lg:text-2xl  dark:text-white  text-xl">
        Merchant Details
      </h1>

      <DataTable slug="products" columns={columns} rows={merchants} />
    </div>
  );
};

export default MerchantDetails;
