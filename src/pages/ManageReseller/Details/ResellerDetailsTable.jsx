import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Buttons/Buttons";
import { Modal, Label } from "flowbite-react";
import {
  createRoute,
  fetchRoutes,
} from "../../../rtk/slices/adminSlice/routeSlice";
import { fetchVendor } from "../../../rtk/slices/vendorSlice/vendorSlice";
import DataTable from "../../../components/table/dataTable/DataTable";
import {
  fetchFreshMerchant,
  fetchReseller,
  makeReseller,
  populateResellersMerchant,
} from "../../../rtk/slices/resellerSlice/resellerSlice";

import { Link } from "react-router-dom";
const ResellerDetailsTable = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [appMode, setAppMode] = useState("");
  const [selectReseller, setSelectReseller] = useState("");
  const [freshMerchant, setFreshMerchant] = useState("");

  /* -------------------------SELECTORS ------------------------ */

  useEffect(() => {
    dispatch(fetchReseller());
  }, []);

  useEffect(() => {
    dispatch(populateResellersMerchant({ resellerId: selectReseller }));
  }, [selectReseller]);

  const { resellers, resellersMerchant, loader, freshMerchants } = useSelector(
    (slice) => slice.reseller
  );
  console.log("resellers= == = > ", resellers);
  const initialValues = {
    merchant: "",
    app: "",
    payinFields: {},
    payoutFields: {},
  };
  const columns = [
    {
      field: "img",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "m_id",
      type: "string",
      headerName: "Merchant Id",
      width: 250,
    },
    {
      field: "name",
      type: "string",
      headerName: "Reseller Name",
      width: 250,
    },
    {
      field: "phonenumber",
      type: "string",
      headerName: "Phone Number",
      width: 250,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
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
  const validationSchema = Yup.object().shape({
    merchant: Yup.string().required("Merchant is required"),
    app: Yup.string().required("App selection is required"),
    payinFields: Yup.object().when("app", {
      is: "Payin",
      then: Yup.object().shape({
        // Define validation for Payin fields here
      }),
    }),
    payoutFields: Yup.object().when("app", {
      is: "Payout",
      then: Yup.object().shape({
        // Define validation for Payout fields here
      }),
    }),
  });

  const handleAppChange = (e, values, setValues) => {
    const selectedApp = e.target.value;
    const newValues = {
      ...values,
      app: selectedApp,
      payinFields: {},
      payoutFields: {},
    };
    setValues(newValues);
    if (selectedApp) {
      dispatch(fetchVendor({ app_mode: selectedApp }));
    }
  };

  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <select
          id="merchant"
          name="merchant"
          onChange={(e) => setSelectReseller(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Select Reseller" />
          {resellers.map((item, idx) => (
            <option key={idx} value={item.r_id} label={item.name} />
          ))}
        </select>

        <Button
          text="Add Reseller"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => {
            setOpenModal(true);
            dispatch(fetchFreshMerchant());
          }}
        >
          Create Reseller
        </Button>
      </div>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        className="outline-none"
        initialFocus={useRef()}
      >
        <Modal.Header>
          <h1 className="lg:text-2xl dark:text-white my-4 mb-6 ml-4">
            Add Reseller
          </h1>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            dispatch(createRoute({ datax: values })).then((result) => {
              if (result.payload.status) {
                resetForm();
                console.log("inserted....");
              }
            });
            console.log(values);
            alert(`Submitted values: ${JSON.stringify(values, null, 2)}`);
          }}
        >
          {({ values, handleSubmit, setValues }) => (
            <Form
              onSubmit={handleSubmit}
              className="gap-8 py-4 mb-2 flex flex-col px-8 "
            >
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="merchant">Select Merchant</Label>
                  <Field
                    as="select"
                    id="merchant"
                    name="merchant"
                    className="rounded-lg h-12"
                    onChange={() => {
                      setFreshMerchant(e.target.value);
                    }}
                  >
                    <option value="" label="Select Merchant" />
                    {freshMerchants.map((item) => (
                      <option key={item.m_id} value={item.m_id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="merchant"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="app">Set Pricing</Label>
                  <Field
                    as="select"
                    id="app"
                    name="app"
                    className="rounded-lg  h-12"
                    onChange={(e) => handleAppChange(e, values, setValues)}
                  >
                    <option value="" label="Set Pricing" />
                    <option value="Payin">Payin</option>
                    <option value="Payout">Payout</option>
                  </Field>
                  <ErrorMessage
                    name="app"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                text=" Assign as Reseller"
                className="w-full"
                disabled={loader}
                onClick={() => {
                  dispatch(makeReseller({ merchantId: setFreshMerchant })).then(
                    (result) => {
                      if (result.payload.status) {
                        dispatch(fetchReseller());
                      }
                    }
                  );
                }}
              >
                Assign as Reseller
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <h1 className="lg:text-2xl dark:text-white text-xl">
        Reseller's Merchant Table
      </h1>
      <DataTable columns={columns} rows={resellersMerchant} />
    </div>
  );
};

export default ResellerDetailsTable;
