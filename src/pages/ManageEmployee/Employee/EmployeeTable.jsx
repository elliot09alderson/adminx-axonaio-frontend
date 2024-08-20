import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Buttons/Buttons";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";

import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../../utils/Notifications/ToastNotifications";
import { Link } from "react-router-dom";
import OnboardEmployee from "./OnboardEmployee";
import {
  fetchEmployees,
  toggleActivate,
} from "../../../rtk/slices/employeeSlice/employeeSlice";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";

const EmployeeTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { employees, successMessage, errorMessage } = useSelector(
    (slice) => slice.employee
  );

  const columns = [
    { field: "emp_id", headerName: "Employee id", width: 210 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "first_name",
      type: "string",
      headerName: "employee name",
      width: 250,
    },
    {
      field: "designation",
      type: "string",
      headerName: "designation",
      width: 250,
    },
    {
      field: "personal_email",
      type: "string",
      headerName: "personal email",
      width: 250,
    },
    {
      field: "official_email",
      type: "string",
      headerName: "official email",
      width: 190,
    },
    {
      field: "mobile_no",
      type: "string",
      headerName: "mobile no",
      width: 190,
    },
    {
      field: "department",
      type: "string",
      headerName: "department",
      width: 190,
    },
    {
      field: "last_active",
      type: "string",
      headerName: "last seen at",
      width: 190,
    },
    // {
    //   field: "is_active",
    //   type: "string",
    //   headerName: "employee_status",
    //   width: 190,
    // },
    {
      field: "permissions",
      type: "string",
      headerName: "permissions",
      width: 190,
    },
    {
      field: "added_By",
      type: "string",
      headerName: "added_By",
      width: 190,
    },

    {
      field: "role",
      type: "string",
      headerName: "user role",
      width: 190,
    },
    {
      field: "mobile_no",
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
      field: "is_active",
      headerName: "Employee Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className="action"
            onClick={() => {
              dispatch(toggleActivate({ employeeId: params.row.emp_id })).then(
                (result) => {
                  if (result.payload?.status) {
                    fetchEmployees();
                  }
                }
              );
            }}
          >
            {!params.row.is_active ? (
              <BsToggle2Off size={30} className="text-red-500 " />
            ) : (
              <BsToggle2On size={30} className="text-green-500 " />
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchEmployees());
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
        text="Add Employee"
        onClick={() => setOpenModal((prev) => !openModal)}
      />
      {openModal ? (
        <OnboardEmployee setOpenModal={setOpenModal} />
      ) : (
        <>
          <h1 className="lg:text-2xl  dark:text-white  text-xl">
            Employee Table
          </h1>

          <DataTable slug="products" columns={columns} rows={employees} />
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
