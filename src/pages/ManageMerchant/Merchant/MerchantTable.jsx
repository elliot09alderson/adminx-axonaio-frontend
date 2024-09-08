import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import OnboardMerchant from "./OnboardMerchant";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccessModeOfMerchant,
  fetchMerchant,
} from "../../../rtk/slices/adminSlice/MerchantSlice";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../../utils/Notifications/ToastNotifications";
import { Link } from "react-router-dom";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

const MerchantTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { merchants, successMessage, errorMessage } = useSelector(
    (slice) => slice.merchant
  );

  const columns = [
    { field: "m_id", headerName: "merchant id", width: 90 },
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
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "isResellerAdmin",
      headerName: "Reseller Admin",
      width: 200,
      type: "string",
      renderCell: (params) => {
        console.log(params.row);
        return (
          <div
            className={` text-white font-semibold px-4 text-center rounded-lg min-w-28 ${
              params?.row?.is_reseller_admin ? "bg-green-400 " : " bg-red-400 "
            }`}
          >
            {params?.row?.is_reseller_admin ? "true" : "false"}
          </div>
        );
      },
    },
    {
      field: "isReseller",
      headerName: "Reseller",
      width: 200,
      type: "string",
      renderCell: (params) => {
        console.log(params.row);
        return (
          <div
            className={` text-white font-semibold px-4 text-center rounded-lg min-w-28 ${
              params?.row?.is_reseller ? "bg-green-400 " : " bg-red-400 "
            }`}
          >
            {params?.row?.is_reseller ? "true" : "false"}
          </div>
        );
      },
    },

    {
      field: "Mode",
      headerName: "Live Mode Access",
      width: 200,
      type: "string",
      renderCell: (params) => {
        console.log(params.row);
        return (
          <div
            className={` text-white font-semibold px-4 text-center rounded-lg min-w-28 ${
              params?.row?.change_app_mode ? "bg-yellow-300 " : " bg-red-500 "
            }`}
          >
            {params?.row?.change_app_mode ? "allowed" : "not allowed"}
          </div>
        );
      },
    },
    {
      field: "toggle access",
      headerName: "Toggle Live Mode",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <div
              onClick={() => {
                dispatch(
                  changeAccessModeOfMerchant({ id: params?.row?.m_id })
                ).then((res) => dispatch(fetchMerchant()));
              }}
            >
              {params?.row?.change_app_mode ? (
                <BsToggle2On size={25} className="text-yellow-300" />
              ) : (
                <BsToggle2Off size={25} className="text-red-500" />
              )}
            </div>
          </div>
        );
      },
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
  }, []);

  useEffect(() => {
    if (successMessage) {
      ToastSuccessNotifications(successMessage);
    }
    if (errorMessage) {
      ToastErrorNotifications(errorMessage);
    }
  }, []);
  function toggleActive(id, is_active) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn text-white ml-4 px-4 py-2 rounded-lg bg-green-500",
        cancelButton: "btn text-white mr-4 px-4 py-2 bg-red-600 rounded-lg",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: is_active
          ? ` Are you sure to deactivate this account ?`
          : " This account will be activated are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("deleting ", id);
          dispatch(toggle_activate_merchant({ id })).then(() => {
            dispatch(get_reseller_merchant());
          });

          if (is_active) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your account has been deactivated.",
              icon: "success",
            });
          } else {
            swalWithBootstrapButtons.fire({
              title: "Activated !",
              text: "Your account is activated now.",
              icon: "success",
            });
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "No changes done to your account :)",
            icon: "error",
          });
        }
      });
  }

  function handleDelete(id) {
    console.log(id);
  }
  return (
    <div className=" flex  gap-8 flex-col dark:bg-slate-950 min-h-screen">
      <Button
        text={`${openModal ? "Close" : " Add Merchant"}`}
        onClick={() => setOpenModal((prev) => !openModal)}
      />
      {openModal ? (
        <OnboardMerchant setOpenModal={setOpenModal} />
      ) : (
        <>
          <h1 className="lg:text-2xl  dark:text-white  text-xl">
            Merchant Table
          </h1>

          <DataTable slug="products" columns={columns} rows={merchants} />
        </>
      )}
    </div>
  );
};

export default MerchantTable;
