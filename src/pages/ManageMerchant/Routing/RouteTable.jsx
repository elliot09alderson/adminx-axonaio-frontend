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

const RouteTable = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [appMode, setAppMode] = useState("");
  const [merchant, setMerchant] = useState("");

  /* -------------------------SELECTORS ------------------------ */
  const { merchants } = useSelector((state) => state.merchant);
  const { routes } = useSelector((state) => state.route);
  const { vendors } = useSelector((state) => state.vendor);

  useEffect(() => {
    if (appMode && merchant) {
      dispatch(fetchRoutes(merchant));
    }
  }, [merchant, appMode]);
  const initialValues = {
    merchant: "",
    app: "",
    payinFields: {},
    payoutFields: {},
  };
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
      field: "added_By",
      type: "string",
      headerName: "Added By",
      width: 250,
    },
    {
      field: "NetBanking",
      type: "string",
      headerName: "Net Banking",
      width: 250,
    },
    {
      field: "CC",
      type: "string",
      headerName: "Credit Card",
      width: 150,
    },
    {
      field: "DC",
      type: "string",
      headerName: "Debit Card",
      width: 200,
    },

    {
      field: "Wallet",
      headerName: "Wallet",
      width: 200,
      type: "string",
    },

    {
      field: "UPI_Collect",
      headerName: "UPI COLLECT",
      width: 200,
      type: "string",
    },
    {
      field: "upi",
      headerName: "upi",
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

  const Payout = ["NEFT", "RTGS", "IMPS", "UPI"];
  const Payin = ["CC", "DC", "NB", "UPI_COLLECT", "Wallet"];

  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <select
          onChange={(e) => setAppMode(e.target.value)}
          id="app_mode"
          name="app_mode"
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Select App" />
          <option value="Payin" label="Payin" />
          <option value="Payout" label="Payout" />
        </select>

        <select
          id="merchant"
          name="merchant"
          onChange={(e) => setMerchant(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Select Merchant" />
          {merchants.map((item, idx) => (
            <option key={idx} value={item.m_id} label={item.name} />
          ))}
        </select>

        <Button
          text="Add Route"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => setOpenModal(true)}
        >
          Add Routes
        </Button>
      </div>
      <h1 className="lg:text-2xl dark:text-white text-xl">Route Table</h1>
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
            Add Route
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
                  >
                    <option value="" label="Select Merchant" />
                    {merchants.map((item) => (
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
                  <Label htmlFor="app">Select App</Label>
                  <Field
                    as="select"
                    id="app"
                    name="app"
                    className="rounded-lg  h-12"
                    onChange={(e) => handleAppChange(e, values, setValues)}
                  >
                    <option value="" label="Select App" />
                    <option value="Payin">Payin</option>
                    <option value="Payout">Payout</option>
                  </Field>
                  <ErrorMessage
                    name="app"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {values.app === "Payin" && (
                  <div className="flex flex-col gap-4">
                    {Payin.map((item, idx) => (
                      <div key={idx} className="flex flex-col ">
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={`payinFields.${item}`}
                            className="text-white pl-1"
                          >
                            {item}
                          </label>
                          <Field
                            as="select"
                            name={`payinFields.${item}`}
                            className="rounded-lg  h-12"
                          >
                            <option value="" label={`${item}`} />
                            {vendors.map((option, idx) => (
                              <option
                                key={idx}
                                value={option._id}
                                label={option.bankName}
                              />
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name={`payinFields.${item}`}
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {values.app === "Payout" && (
                  <div className="flex flex-col gap-4">
                    {Payout.map((item, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={`payoutFields.${item}`}
                            className="text-white"
                          >
                            {item}
                          </label>
                          <Field
                            as="select"
                            name={`payoutFields.${item}`}
                            className="rounded-lg h-12"
                          >
                            <option value="" label={`Select ${item}`} />
                            {vendors.map((option, idx) => (
                              <option
                                key={idx}
                                value={option._id}
                                label={option.bankName}
                              />
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name={`payoutFields.${item}`}
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" text="Submit" className="w-full">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <DataTable columns={columns} rows={routes} />
    </div>
  );
};

export default RouteTable;
