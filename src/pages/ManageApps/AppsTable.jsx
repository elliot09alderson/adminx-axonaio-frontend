import { Button } from "../../components/Buttons/Buttons";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/table/dataTable/DataTable";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Modal, Label, TextInput } from "flowbite-react";
import {
  assignAppToMerchant,
  fetchActiveApps,
  fetchApps,
} from "../../rtk/slices/appSlice/appSlice";
import { fetchMerchant } from "../../rtk/slices/adminSlice/MerchantSlice";
import { Box, Chip } from "@mui/material";

const AppsTable = () => {
  const [appId, setAppId] = useState("");
  const [appName, setAppName] = useState("");
  const [accessString, setAccessString] = useState(false);
  const [merchantId, setMerchantId] = useState("");
  const dispatch = useDispatch();

  // -------------------   useSelector ----------------------
  const { apps, loader } = useSelector((slice) => slice.app);
  const { merchants } = useSelector((slice) => slice.merchant);

  // -------------------   ----------------------

  useEffect(() => {
    dispatch(fetchApps());
    dispatch(fetchMerchant());
  }, [appId]);

  useEffect(() => {
    console.log(appName);
    setAccessString(
      merchants
        ?.filter((mer) => merchantId === mer.m_id)[0]
        ?.app_permissions?.includes(appName)
    );
  }, [appName, merchantId]);
  const columns = [
    { field: "name", headerName: "Merchant Name", width: 290 },
    { field: "m_id", headerName: "Merchant Id", width: 290 },
    { field: "email", headerName: "Email", width: 290 },
    {
      field: "app_permissions",
      headerName: "Apps Enabled",
      renderCell: (params) => {
        return (
          <Box sx={{ overflowX: "scroll" }}>
            {params.row?.app_permissions?.map((permission, index) => (
              <Chip key={index} label={permission} style={{ margin: "2px" }} />
            ))}
          </Box>
        );
      },
      width: 390,
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
        <select
          onChange={(e) => {
            setAppId(e.target.value);

            console.log(appId);
          }}
          as="select"
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
          required
        >
          {" "}
          <option value="" className="p-2">
            select App
          </option>
          {apps?.map((item, idx) => (
            <option
              value={item.app_id}
              label={item.app_name}
              onClick={() => {
                setAppName(item?.app_name);
              }}
              className="p-2"
            />
          ))}
        </select>
        <select
          onChange={(e) => setMerchantId(e.target.value)}
          as="select"
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
          required
        >
          <option value="" label="Select Merchant" />
          {merchants?.map((item, idx) => (
            <option value={item.m_id} label={item.name} />
          ))}
        </select>
        {console.log(
          merchants
            ?.filter((mer) => merchantId === mer.m_id)[0]
            ?.app_permissions?.includes(appName)
        )}
        <Button
          text={loader ? "wait..." : accessString ? "Remove App" : "Add App"}
          onClick={() => {
            console.log("merchantId" + merchantId, "appId" + appId);
            if (merchantId && appId) {
              dispatch(
                assignAppToMerchant({ datax: { merchantId, appId } })
              ).then((res) => dispatch(fetchMerchant()));
            }
          }}
        />
      </div>

      <DataTable columns={columns} rows={merchants} />
    </div>
  );
};

export default AppsTable;
