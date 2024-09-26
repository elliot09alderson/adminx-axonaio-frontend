import { Button } from "../../../components/Buttons/Buttons";
import Swal from "sweetalert2";
import { Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWhiteListDomain,
  getWhitelistDomains,
  whitelistDomain,
} from "../../../rtk/slices/merchantSettingSlice/merchantSettingSlice";
import DataTable from "../../../components/table/dataTable/DataTable";

const DomainWhitelist = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const validationSchema = Yup.object().shape({
    domain: Yup.string().required("domain is required"),
  });
  const initialValues = {
    domain: "",
  };

  const { whitelistDomains } = useSelector((slice) => slice.merchantsettings);
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        console.log("deleting...");
        dispatch(deleteWhiteListDomain({ id })).then((res) => {
          if (res.payload.status) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  }
  const columns = [
    {
      field: "domain",
      type: "string",
      headerName: "Whitelist Domain",
      width: 250,
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <div
              className="delete"
              onClick={() => handleDelete(params.row._id)}
            >
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getWhitelistDomains());
  }, []);
  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <Button
          text="Add Domain"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Domain
        </Button>

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
              Whitelist Domain
            </h1>
          </Modal.Header>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              // console.log(values);
              dispatch(whitelistDomain({ domain: values.domain })).then(
                (result) => {
                  if (result.payload.status) {
                    resetForm();
                    setOpenModal(false);
                  }
                }
              );
              // alert(`Submitted values: ${JSON.stringify(values, null, 2)}`);
            }}
          >
            {({ values, handleSubmit, setValues }) => (
              <Form
                onSubmit={handleSubmit}
                className="gap-8 py-4 mb-2 flex flex-col px-8 "
              >
                <div className="flex flex-col gap-4 ">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="merchant" className="pl-2">
                      Ip / Domain
                    </Label>
                    <Field
                      as={TextInput}
                      type="text"
                      name="domain"
                      className="rounded-lg h-12 pl-2"
                    />

                    <ErrorMessage
                      name="domain"
                      component="p"
                      className="text-red-500 text-sm pl-2"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  text="   Whitelist Domain"
                  className="w-full"
                >
                  Whitelist Domain
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>

      <h1 className="lg:text-2xl dark:text-white text-xl">Whitelist Domains</h1>
      <DataTable columns={columns} rows={whitelistDomains} />
    </div>
  );
};

export default DomainWhitelist;
