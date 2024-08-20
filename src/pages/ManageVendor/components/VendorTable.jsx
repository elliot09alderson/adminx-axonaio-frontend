import { Button } from "../../../components/Buttons/Buttons";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../../components/table/dataTable/DataTable";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Modal, Label, TextInput } from "flowbite-react";
import {
  createVendor,
  fetchVendor,
} from "../../../rtk/slices/vendorSlice/vendorSlice";

const VendorTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [app_mode, setApp_mode] = useState("");

  const { vendors, loader, successMessage, errorMessage } = useSelector(
    (slice) => slice.vendor
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (app_mode) {
      dispatch(fetchVendor({ app_mode }));
    }
    console.log("AppMode", app_mode);
  }, [app_mode]);

  const columns = [
    { field: "vendor_Id", headerName: "Vendor id", width: 190 },
    { field: "bankName", headerName: "Bank Name", width: 190 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
  ];

  const MultiInputField = ({ values, push, remove }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (inputValue.trim()) {
          push(inputValue);
          setInputValue("");
        }
      }
    };

    return (
      <div>
        <div className="mb-2 block">
          <Label htmlFor="keysName" value="Keys Name" />
        </div>
        <TextInput
          id="keysName"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {values.keys.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-4 dark:bg-slate-850 rounded-lg p-4">
            {values.keys.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 justify-center mb-1 text-white rounded-full bg-slate-400 dark:bg-slate-700"
              >
                <span className="mr-2">{item}</span>
                <button
                  type="button"
                  className="text-red-500 rounded-full px-2 text-center pb-1 text-red-800 font-bold bg-slate-500 dark:bg-slate-600"
                  onClick={() => remove(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const bankName = useRef(null);

  return (
    <div className=" flex capitalize lg:text-xl gap-8 mt-4 flex-col min-h-screen">
      <div className="flex justify-between">
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
        <Button
          text="add bank"
          onClick={() => setOpenModal((prev) => !openModal)}
        />
      </div>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={bankName}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="space-y-6 ">
            <Formik
              initialValues={{ bankName: "", keys: [], app_mode: "" }}
              validationSchema={Yup.object({
                bankName: Yup.string().required("Bank Name is required"),
                keys: Yup.array().of(Yup.string().required("Key is required")),
                app_mode: Yup.string().required("App mode is required"),
              })}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                dispatch(createVendor({ datax: values })).then((result) => {
                  if (result.payload.status) {
                    resetForm();
                  }
                });
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Modal.Body>
                    <div className="space-y-6">
                      <h3 className="lg:text-3xl text-lg font-medium text-gray-900 dark:text-white">
                        Add Vendor
                      </h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="bankName" value="Bank Name" />
                        </div>
                        <Field
                          id="bankName"
                          name="bankName"
                          placeholder="Bank of Baroda"
                          as={TextInput}
                          required
                        />
                        <ErrorMessage
                          name="bankName"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="app_mode" value="Select App" />
                        </div>
                        <Field
                          as="select"
                          id="app_mode"
                          name="app_mode"
                          className="form-select mt-1 rounded-lg block w-full"
                          required
                        >
                          <option value="" label="Select App" />
                          <option value="Payin" label="Payin" />
                          <option value="Payout" label="Payout" />
                        </Field>
                        <ErrorMessage
                          name="app_mode"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <FieldArray name="keys">
                        {({ push, remove }) => (
                          <MultiInputField
                            values={values}
                            handleChange={handleChange}
                            push={push}
                            remove={remove}
                          />
                        )}
                      </FieldArray>
                      <div className="flex items-center justify-center">
                        <Button type="submit" text={"Submit"} />
                      </div>
                    </div>
                  </Modal.Body>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
      <DataTable slug="products" columns={columns} rows={vendors} />
    </div>
  );
};

export default VendorTable;
