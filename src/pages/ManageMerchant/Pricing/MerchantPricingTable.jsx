import TanStackTable from "../../../components/table/TansStackTable";

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
const MerchantPricingTable = () => {
  const { merchantpayinpricing, merchantpayoutpricing, merchants } =
    useSelector((slice) => slice.merchant);

  const payinPricingSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    min_range: Yup.number().required("Min range is required"),
    max_range: Yup.number().required("Max range is required"),
    UPI: Yup.number().required("UPI is required"),
    NetBanking: Yup.number().required("NetBanking is required"),
    CC: Yup.number().required("Credit Card is required"),
    DC: Yup.number().required("Debit Card is required"),
    Wallet: Yup.number().required("Wallet is required"),
    UPI_Collect: Yup.number().required("UPI Collect is required"),
  });

  const payoutPricingSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    min_range: Yup.number().required("Min range is required"),
    max_range: Yup.number().required("Max range is required"),
    UPI: Yup.number().required("UPI is required"),
    neft: Yup.number().required("NEFT is required"),
    rtgs: Yup.number().required("RTGS is required"),
    imps: Yup.number().required("IMPS is required"),
    Wallet: Yup.number().required("Wallet is required"),
  });

  const validationSchema = Yup.object().shape({
    merchant: Yup.string().required("Merchant is required"),
    app: Yup.string().required("App is required"),
    pricing: Yup.object().when("app", {
      is: "payin",
      then: () => payinPricingSchema,
      otherwise: () => payoutPricingSchema,
    }),
  });

  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef();

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

  const [selectMerchant, setSelectedMerchant] = useState({
    name: "",
    m_id: "",
  });

  const dispatch = useDispatch();
  const [selectApp, setSelectApp] = useState("");

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

  return (
    <div className=" flex gap-8 flex-col  min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4   ">
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
        <Button
          text="Add Pricing"
          className="text-center  py-3  rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => setOpenModal(true)}
        >
          Add Pricing
        </Button>
      </div>
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
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        className="outline-none"
        initialFocus={emailInputRef}
      >
        <Modal.Header>
          <p className="lg:text-2xl dark:text-white  my-4 mb-6 ml-4">
            {" "}
            Add Pricing
          </p>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ merchant: "", app: "", pricing: {} }}
            validationSchema={validationSchema}
            onSubmit={(values, resetForm) => {
              console.log("values", values);
              if (values.app === "payin") {
                dispatch(createPayinPricing({ datax: values })).then((result) =>
                  console.log(result.payload.status)
                );
              }
              if (values.app === "payout") {
                dispatch(createPayoutPricing({ datax: values })).then(
                  (result) => {
                    if (result.payload.status) {
                      resetForm();
                    }
                  }
                );
              }
              // alert(
              //   `Form submitted with values: ${JSON.stringify(values, null, 2)}`
              // );
            }}
          >
            {({ handleSubmit, values }) => (
              <Form
                onSubmit={handleSubmit}
                className="gap-4 mb-2 flex flex-col"
              >
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-1 flex-col">
                    <Label htmlFor="merchant">Select Merchant </Label>
                    <Field as={Select} id="merchant" name="merchant">
                      <option value="" label="Select merchant" />
                      {merchants.map((option) => (
                        <option key={option.name} value={option.m_id}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="merchant"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <Label htmlFor="app">Select App</Label>
                    <Field as={Select} id="app" name="app">
                      <option value="" label="Select app" />
                      <option value="payin">Pay in</option>
                      <option value="payout">Pay out</option>
                    </Field>
                    <ErrorMessage
                      name="app"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {values.app && (
                  <div className="bg-slate-850 px-2 py-4 flex flex-col justify-center items-center rounded-lg gap-2 my-2">
                    <div className="bg-slate-850 px-2 py-4 flex justify-center items-center rounded-lg gap-2 my-2">
                      <div className="flex flex-col gap-2">
                        {values.app === "payin" ? (
                          <>
                            {[
                              "type",
                              "min_range",
                              "max_range",
                              "UPI",
                              "NetBanking",
                              "CC",
                              "DC",
                              "Wallet",
                              "UPI_Collect",
                            ].map((field) => (
                              <div key={field}>
                                {field === "type" ? (
                                  <>
                                    <Field
                                      as="select"
                                      name={`pricing.${field}`}
                                      className="p-2 border rounded lg:w-72  w-64 rounded-lg"
                                    >
                                      <option value="flat" className="py-2">
                                        Flat
                                      </option>
                                      <option value="percent" className="">
                                        Percentage
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name={`pricing.${field}`}
                                      component="p"
                                      className="text-red-500 text-sm"
                                    />
                                  </>
                                ) : (
                                  <Field
                                    as={TextInput}
                                    name={`pricing.${field}`}
                                    placeholder={field}
                                  />
                                )}
                                <ErrorMessage
                                  name={`pricing.${field}`}
                                  component="p"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {[
                              "type",
                              "min_range",
                              "max_range",
                              "UPI",
                              "neft",
                              "rtgs",
                              "imps",
                              "Wallet",
                            ].map((field) => (
                              <div key={field}>
                                {field === "type" ? (
                                  <>
                                    <Field
                                      as="select"
                                      name={`pricing.${field}`}
                                      className="p-2 border rounded lg:w-72  w-64 rounded-lg"
                                    >
                                      <option value="flat" className="py-2">
                                        Flat
                                      </option>
                                      <option value="percent" className="">
                                        Percentage
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name={`pricing.${field}`}
                                      component="p"
                                      className="text-red-500 text-sm"
                                    />
                                  </>
                                ) : (
                                  <Field
                                    as={TextInput}
                                    name={`pricing.${field}`}
                                    placeholder={field}
                                  />
                                )}
                                <ErrorMessage
                                  name={`pricing.${field}`}
                                  component="p"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <Button type={"submit"} text={"Submit"} className="w-full">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MerchantPricingTable;
