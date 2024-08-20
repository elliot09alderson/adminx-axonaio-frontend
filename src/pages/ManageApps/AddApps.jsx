import { Button } from "../../components/Buttons/Buttons";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/table/dataTable/DataTable";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Modal, Label, TextInput } from "flowbite-react";
import {
  createApp,
  fetchApps,
  toggleStatus,
} from "../../rtk/slices/appSlice/appSlice";
import { Link } from "react-router-dom";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { toggleActivate } from "../../rtk/slices/employeeSlice/employeeSlice";
import { ThreeDots } from "react-loader-spinner";

const AddApps = () => {
  const [app_name, setApp_name] = useState("");

  const { apps, toggleLoader } = useSelector((slice) => slice.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApps());
    // console.log(activeApps);
  }, []);

  const columns = [
    { field: "app_id", headerName: "App id", width: 290 },
    { field: "app_name", headerName: "App Name", width: 190 },
    {
      field: "status",
      headerName: "status",
      width: 190,
    },
    {
      field: "added_by",
      headerName: "Added By",
      width: 190,

      renderCell: (params) => {
        return <div>{params.row.added_by?.first_name}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            {params.row.status === "active" ? (
              <BsToggle2On
                size={25}
                onClick={() => {
                  dispatch(toggleStatus({ app_id: params?.row?.app_id })).then(
                    (res) => dispatch(fetchApps())
                  );
                }}
              />
            ) : (
              <BsToggle2Off
                size={25}
                onClick={() => {
                  dispatch(toggleStatus({ app_id: params?.row?.app_id })).then(
                    (res) => dispatch(fetchApps())
                  );
                }}
              />
            )}
          </div>
        );
      },
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      type: "string",
    },
  ];

  return (
    <div className=" flex capitalize lg:text-xl gap-8 mt-4 flex-col min-h-screen">
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <h2 htmlFor="" className="text-white">
            App name
          </h2>
          <input
            onChange={(e) => setApp_name(e.target.value)}
            className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 lg:w-96 font-semibold px-4 py-3 dark:text-white"
            required
            placeholder="Enter App Name"
          />
        </div>

        <Button
          text="Add App"
          className={" px-4 py-3 "}
          onClick={() => {
            dispatch(createApp({ app_name, status: "active" }));
          }}
        />
      </div>

      <DataTable slug="products" columns={columns} rows={apps} />
    </div>
  );
};

export default AddApps;
