import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Buttons/Buttons";
import { Modal, Label, TextInput } from "flowbite-react";

import DataTable from "../../../components/table/dataTable/DataTable";

import { Link } from "react-router-dom";

import { changeMerchantPasscode } from "../../../rtk/slices/merchantSettingSlice/merchantSettingSlice";
import { fetchMerchant } from "../../../rtk/slices/adminSlice/MerchantSlice";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMerchant());
  }, []);
  const { merchants, successMessage, errorMessage } = useSelector(
    (slice) => slice.merchant
  );
  /* -------------------------SELECTORS ------------------------ */

  const initialValues = {
    merchantId: "",
    newPassword: "",
    confirmNewPassword: "",
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
      field: "ra_id",
      type: "string",
      headerName: "Reseller Admin Id",
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
    merchantId: Yup.string().required("merchant is required"),
    newPassword: Yup.string().required("new password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <Button
          text="Change Password"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => {
            setOpenModal(true);
            // dispatch(fetchFreshMerchant());
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
            Change Password
          </h1>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            dispatch(
              changeMerchantPasscode({
                merchantId: values.merchantId,
                newPassword: values.newPassword,
              })
            ).then((result) => {
              if (result.payload.status) {
                resetForm();
                setOpenModal(false);
                // dispatch(fetchResellerAdmin());
              }
            });
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
                  <Label htmlFor="merchant">Select User</Label>
                  <Field
                    as="select"
                    id="merchant"
                    name="merchantId"
                    className="rounded-lg h-12"
                  >
                    <option value="" label="Select User" />
                    {merchants.map((item) => (
                      <option key={item.m_id} value={item.m_id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="merchantId"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="merchant">Password</Label>
                  <Field
                    as={TextInput}
                    type="password"
                    name="newPassword"
                    className="rounded-lg h-12"
                  />

                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="merchant">Confirm Password</Label>
                  <Field
                    as={TextInput}
                    type="password"
                    name="confirmNewPassword"
                    className="rounded-lg h-12"
                  />

                  <ErrorMessage
                    name="confirmNewPassword"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                text=" Change Password"
                className="w-full"
                // disabled={loader}
              >
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <h1 className="lg:text-2xl dark:text-white text-xl">
        Reseller Admin's Table
      </h1>
      <DataTable columns={columns} rows={merchants} />
    </div>
  );
};

export default ChangePassword;
