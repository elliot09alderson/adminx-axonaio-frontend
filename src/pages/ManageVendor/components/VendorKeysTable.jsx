import { useSelector, useDispatch } from "react-redux";
// import TanStackTable from "../../../components/table/TansStackTable";
import DataTable from "../../../components/table/dataTable/DataTable";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Buttons/Buttons";
import { Modal, TextInput, Select, Label } from "flowbite-react";
import {
  fetchVendor,
  getVendorKeys,
  insertVendorKeyValue,
} from "../../../rtk/slices/vendorSlice/vendorSlice";

const VendorKeysTable = () => {
  const dispatch = useDispatch();
  const [vendorId, setVendorId] = useState("");
  const [initialValues, setInitialValues] = useState({
    app: "",
    bankName: "",
    dynamicFields: [],
  });

  const { vendors, keys, loader, successMessage, errorMessage } = useSelector(
    (slice) => slice.vendor
  );

  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef();
  const [app_mode, setApp_mode] = useState("");
  const [vendorBank, setVendorBank] = useState("");

  useEffect(() => {
    if (app_mode) {
      dispatch(fetchVendor({ app_mode }));
    }
    console.log("AppMode", app_mode);
  }, [app_mode, dispatch]);

  const validationSchema = Yup.object().shape({
    app: Yup.string().required("select app "),
    bankName: Yup.string().required("Bank name is required"),
    dynamicFields: Yup.array().of(
      Yup.object().shape({
        keyName: Yup.string().required("Key is required"),
        value: Yup.string().required("Value is required"),
      })
    ),
  });

  const columns = [
    { field: "id", headerName: "SNO", width: 90 },
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
  ];

  useEffect(() => {
    if (vendorId) {
      console.log("vendorId", vendorId);
      dispatch(getVendorKeys({ vendorId }));
    }
  }, [vendorId, dispatch]);

  useEffect(() => {
      ({
      app: app_mode,
      bankName: vendorId,
      dynamicFields: keys.map((keyName) => ({ keyName, value: "" })),
    });
  }, [keys, vendorId]);

  const handleBankChange = (e, setFieldValue) => {
    const selectedVendorId = e.target.value;
    setVendorId(selectedVendorId);
    setFieldValue("bankName", selectedVendorId);
    dispatch(getVendorKeys({ vendorId: selectedVendorId }));
  };
  const handleAppChange = (e, setFieldValue) => {
    const selectedVendorId = e.target.value;
    setApp_mode(selectedVendorId);
    setFieldValue("app", selectedVendorId);
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <select
          onChange={(e) => setApp_mode(e.target.value)}
          as="select"
          id="app_mode"
          name="app_mode"
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
          required
        >
          <option value="" label="Select App" />
          <option value="Payin" label="Payin" />
          <option value="Payout" label="Payout" />
        </select>

        <select
          onChange={(e) => setVendorBank(e.target.value)}
          as="select"
          id="vendor_bank"
          name="vendor_bank"
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
          required
        >
          <option value="" label="Select Bank">
            select bank
          </option>
          {vendors.map((item, idx) => (
            <option key={idx + item.vendor_Id} value={item.vendor_Id}>
              {item.bankName}
            </option>
          ))}
        </select>

        <Button
          text="Add Bank Keys"
          className="text-center font-semibold rounded-lg bg-day"
          style={{ background: "#1E293B", width: "300px" }}
          onClick={() => setOpenModal(true)}
        />
      </div>
      {/* <DataTable slug="products" columns={columns} rows={} /> */}
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header>
          <p className="lg:text-2xl dark:text-white  my-4 mb-6 ml-4">
            {" "}
            Insert Key Values
          </p>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              dispatch(insertVendorKeyValue({ datax: values })).then(
                (result) => {
                  if (result.payload.status) {
                    resetForm();
                    console.log("inserted....");
                  }
                }
              );
              console.log(values);
              alert(`Submitted values: ${JSON.stringify(values, null, 2)}`);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <Form
                onSubmit={handleSubmit}
                className="gap-4 mb-2 flex flex-col"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="bankName">Select App</Label>
                    <Field
                      as="select"
                      id="bankName"
                      name="app"
                      className="rounded-lg"
                      onChange={(e) => handleAppChange(e, setFieldValue)}
                    >
                      <option value="" label="Select App" />

                      <option value={"Payin"}>Payin</option>
                      <option value={"Payout"}>Payout</option>
                    </Field>
                    <ErrorMessage
                      name="app"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="bankName">Select Bank</Label>
                    <Field
                      as="select"
                      id="bankName"
                      name="bankName"
                      className="rounded-lg"
                      onChange={(e) => handleBankChange(e, setFieldValue)}
                    >
                      <option value="" label="Select Bank" />
                      {vendors.map((item) => (
                        <option key={item.vendor_Id} value={item.vendor_Id}>
                          {item.bankName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="bankName"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {keys.length > 0 && (
                  <FieldArray name="dynamicFields">
                    {({ remove, push }) => (
                      <div className="bg-slate-850 px-2 py-4 flex justify-center items-center rounded-lg gap-2 my-2">
                        <div className="flex flex-col gap-2">
                          {values.dynamicFields.map((field, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-2 items-center"
                            >
                              <div className="flex gap-2 items-center">
                                <Field
                                  name={`dynamicFields.${index}.keyName`}
                                  value={field.keyName}
                                  as={TextInput}
                                  readOnly
                                />
                                <Field
                                  name={`dynamicFields.${index}.value`}
                                  as={TextInput}
                                  placeholder="Enter value"
                                />
                              </div>
                              <ErrorMessage
                                name={`dynamicFields.${index}.value`}
                                component="p"
                                className="text-red-500 text-sm text-end "
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FieldArray>
                )}

                <Button type="submit" text={"Submit"} className="w-full">
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

export default VendorKeysTable;
