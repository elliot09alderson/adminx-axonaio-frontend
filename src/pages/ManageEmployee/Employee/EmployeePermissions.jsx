import React, { useEffect, useState } from "react";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  updatePermissions,
} from "../../../rtk/slices/employeeSlice/employeeSlice.js";

import { Label, Dropdown, Modal, TextInput } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "../../../components/Buttons/Buttons";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Chip } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const EmployeePermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [action, setAction] = useState("");
  const [selectEmployee, setSelectedEmployee] = useState({
    first_name: "",
    emp_id: "",
  });
  const dispatch = useDispatch();
  const { employees, successMessage, errorMessage } = useSelector(
    (slice) => slice.employee
  );

  const names = [
    "manage Dashboard",
    "manage Transactions",
    "manage Employee",
    "manage Routes",
    "manage Merchant",
    "manage Settlements",
    "manage Vendors",
    "manage Apps",
    "manage Resellers",
    "manage Resellers Admin",
    "manage Risk & Compliance",
    "manage Accounts",
    "manage Support",
  ];
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
      field: "department",
      type: "string",
      headerName: "department",
      width: 190,
    },
    {
      field: "permissions",
      type: "string",
      headerName: "permissions",
      renderCell: (params) => {
        console.log(params.row);
        return (
          <Box sx={{ overflowX: "scroll" }}>
            {params.row.permissions.map((permission, index) => (
              <Chip key={index} label={permission} style={{ margin: "2px" }} />
            ))}
          </Box>
        );
      },
      width: 390,
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
      field: "last_active",
      type: "string",
      headerName: "last seen at",
      width: 190,
    },
    {
      field: "is_active",
      type: "string",
      headerName: "employee_status",
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
  ];

  useEffect(() => {
    dispatch(fetchEmployees());
    console.log(employees);
  }, []);

  function upadtePermissions(e) {
    console.log(selectEmployee, permissions, action);
    e.preventDefault();
    if (selectEmployee && permissions && action) {
      dispatch(
        updatePermissions({
          datax: { employeeId: selectEmployee.emp_id, permissions, action },
        })
      ).then((result) => {
        if (result.payload?.status) {
          setAction("");
          setPermissions([]);
          setSelectedEmployee({ first_name: "", emp_id: "" });
          dispatch(fetchEmployees());
        }
      });
    }
  }
  useEffect(() => {}, [action]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPermissions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <div className=" flex gap-8 flex-col  min-h-screen">
        <div className="flex items-center  gap-8 mt-4   ">
          <Dropdown
            size="lg"
            label={
              selectEmployee.first_name
                ? selectEmployee.first_name
                : `Select Employee`
            }
            style={{ background: "#1E293B", width: "300px" }}
            className="bg-day"
            dismissOnClick={true}
          >
            {employees.map((item, idx) => (
              <Dropdown.Item
                key={item.emp_id}
                onClick={() =>
                  setSelectedEmployee({
                    first_name: item.first_name,
                    emp_id: item.emp_id,
                  })
                }
              >
                {item.first_name}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <FormControl
            fullWidth
            sx={{ color: "white", width: "600px" }}
            size="medium"
          >
            <InputLabel
              id="demo-simple-select-label"
              className="text-white"
              sx={{ color: "white" }}
            >
              Permissions
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              sx={{ width: "500px" }}
              multiple
              value={permissions}
              onChange={handleChange}
              input={<OutlinedInput label="Permissions" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              className="custom-select "
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={permissions.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Dropdown
            size="lg"
            label={action ? action : `Select Action`}
            style={{ background: "#1E293B", width: "300px" }}
            className="bg-day"
            dismissOnClick={true}
          >
            <Dropdown.Item onClick={() => setAction("add")}>Add</Dropdown.Item>
            <Dropdown.Item onClick={() => setAction("remove")}>
              Remove
            </Dropdown.Item>
          </Dropdown>
          {action && (
            <Button
              // text="Add Permissions"
              className="text-center  py-3  rounded-lg bg-day"
              style={{ background: "#9fd3c7", width: "300px" }}
              onClick={(e) => {
                // setOpenModal(true);

                upadtePermissions(e);
              }}
            >
              {action == "add" ? "Add" : "Remove"} Permissions
            </Button>
          )}
        </div>
        <h1 className="lg:text-2xl  dark:text-white  text-xl">
          Employee Table
        </h1>

        <DataTable columns={columns} rows={employees} />
      </div>
    </div>
  );
};

export default EmployeePermissions;
