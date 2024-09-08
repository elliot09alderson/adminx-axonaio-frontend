import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../../components/Buttons/Buttons";
import { Modal, Label } from "flowbite-react";

import DataTable from "../../../components/table/dataTable/DataTable";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import {
  fetchFreshReseller,
  manageMerchantInArray,
  fetchFreshMerchant,
  fetchResellerAdmin,
  populateResellerAdmins_Reseller,
  manageResellerInArray,
  populateResellerAdminsMerchant,
} from "../../../rtk/slices/resellerAdminSlice/resellerAdminSlice.js";
const ResellerAdminMapping = () => {
  const initialValues2 = {
    resellerAdminId: "",
    resellerId: "",
  };
  const initialValues = {
    merchantId: "",
    resellerAdminId: "",
  };
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const [selectResellerAdmin, setSelectResellerAdmin] = useState("");
  /* -------------------------SELECTORS ------------------------ */
  useEffect(() => {
    dispatch(fetchResellerAdmin());
  }, []);

  useEffect(() => {
    dispatch(
      populateResellerAdmins_Reseller({ resellerAdminId: selectResellerAdmin })
    );
  }, [selectResellerAdmin]);
  const {
    resellers,
    resellerAdmins,
    resellersMerchant,
    resellerAdminMerchants,
    loader,
    freshResellers,
    freshMerchants,
  } = useSelector((slice) => slice.reselleradmin);

  useEffect(() => {
    dispatch(fetchFreshMerchant());
    dispatch(fetchFreshReseller());
    dispatch(fetchResellerAdmin());
  }, []);

  const columns = [
    // { field: "ra_id", headerName: "Reseller Admin id", width: 190 },
    { field: "r_id", headerName: "Reseller  id", width: 190 },
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
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={`viewdetails/${params.row.m_id}`}>
              <img src="/view.svg" alt="" />
            </Link>
            <div
              className="delete"
              onClick={() => unmapReseller(params.row._id)}
            >
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  const validationSchema2 = Yup.object().shape({
    resellerAdminId: Yup.string().required("Reseller is required"),
    resellerId: Yup.string().required("ResellerAdmin is required"),
  });
  const validationSchema = Yup.object().shape({
    merchantId: Yup.string().required("Merchant is required"),
    resellerAdminId: Yup.string().required("ResellerAdmin is required"),
  });

  function mapReseller(values) {
    console.log(values);
    const { resellerAdminId, resellerId } = values;
    Swal.fire({
      title: "are you sure to map  merchant Chandru inside reseller Pratik ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Do Mapping",
      denyButtonText: `Don't Map`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(
          manageResellerInArray({
            datax: { resellerId, resellerAdminId, action: "add" },
          })
        ).then((res) => {
          if (res.payload.status) {
            Swal.fire("Saved!", "", "success");
            dispatch(
              populateResellerAdmins_Reseller({
                resellerAdminId,
              })
            );
            setOpenModal(false);
          }
        });
      } else if (result.isDenied) {
        setOpenModal(false);
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  function unmapReseller(resellerId) {
    Swal.fire({
      title: "are you sure to unmap  merchant Chandru under reseller Pratik ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Do Un Mapping",
      denyButtonText: `Abort un Map`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(
          manageResellerInArray({
            datax: {
              resellerId,
              resellerAdminId: selectResellerAdmin,
              action: "remove",
            },
          })
        ).then((res) => {
          if (res.payload.status) {
            Swal.fire("Saved!", "", "success");
            dispatch(
              populateResellerAdmins_Reseller({
                resellerAdminId: selectResellerAdmin,
              })
            );
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  function mapMerchant(values) {
    console.log(values, "asdksadasdksadksadksaskad");
    const { merchantId, resellerAdminId } = values;
    Swal.fire({
      title: "are you sure to map  merchant Chandru inside reseller Pratik ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Do Mapping",
      denyButtonText: `Don't Map`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(
          manageMerchantInArray({
            datax: { resellerAdminId, merchantId, action: "add" },
          })
        ).then((res) => {
          if (res.payload.status) {
            Swal.fire("Saved!", "", "success");
            dispatch(populateResellerAdminsMerchant({ resellerAdminId }));
            setOpenModal(false);
          }
        });
      } else if (result.isDenied) {
        setOpenModal(false);
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  function unmapMerchant(merchantId) {
    Swal.fire({
      title: "are you sure to unmap  merchant Chandru under reseller Pratik ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Do Un Mapping",
      denyButtonText: `Abort un Map`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(
          manageMerchantInArray({
            datax: { resellerId: selectReseller, merchantId, action: "remove" },
          })
        ).then((res) => {
          if (res.payload.status) {
            Swal.fire("Saved!", "", "success");
            dispatch(populateResellersMerchant({ resellerId: selectReseller }));
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  return (
    <div className="flex gap-8 flex-col min-h-screen">
      <div className="flex items-center justify-between gap-8 mt-4">
        <select
          id="merchant"
          name="merchant"
          onChange={(e) => setSelectResellerAdmin(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Set Reseller Admin" />
          {resellerAdmins.map((item, idx) => (
            <option key={idx} value={item.ra_id} label={item.name} />
          ))}
        </select>

        <Button
          text="Map Reseller"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => setOpenSecondModal(true)}
        >
          Map Reseller
        </Button>
        <Button
          text="Map Merchant"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => setOpenModal(true)}
        >
          Map Merchant
        </Button>
      </div>
      <h1 className="lg:text-2xl dark:text-white text-xl">
        Reseller Mapping Table
      </h1>

      <Modal
        show={openSecondModal}
        size="md"
        popup
        onClose={() => setOpenSecondModal(false)}
        className="outline-none"
        initialFocus={useRef()}
      >
        <Modal.Header>
          <h1 className="lg:text-2xl dark:text-white my-4 mb-6 ml-4">
            Map Reseller
          </h1>
        </Modal.Header>
        <Formik
          initialValues={initialValues2}
          validationSchema={validationSchema2}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            mapReseller(values);
          }}
        >
          {({ values, handleSubmit, setValues }) => (
            <Form
              onSubmit={handleSubmit}
              className="gap-8 py-4 mb-2 flex flex-col px-8 "
            >
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="merchant">Select Reseller</Label>
                  <Field
                    as="select"
                    id="merchant"
                    name="resellerId"
                    className="rounded-lg h-12"
                  >
                    <option value="" label="Select Reseller" />
                    {freshResellers.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="resellerId"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="app">Select Reseller Admin</Label>
                  <Field
                    as="select"
                    id="app"
                    name="resellerAdminId"
                    className="rounded-lg  h-12"
                  >
                    <option value="" label="Select Reseller Admin" />
                    {resellerAdmins.map((item) => (
                      <option key={item.ra_id} value={item.ra_id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="resellerAdminId"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                text="Map"
                className="w-full"
                disabled={loader}
              >
                Map
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
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
            Map Merchant
          </h1>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            mapMerchant(values);
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
                    name="merchantId"
                    className="rounded-lg h-12"
                  >
                    <option value="" label="Select Merchant" />
                    {freshMerchants.map((item) => (
                      <option key={item._id} value={item._id}>
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
                  <Label htmlFor="app">Select Reseller Admin</Label>
                  <Field
                    as="select"
                    id="app"
                    name="resellerAdminId"
                    className="rounded-lg  h-12"
                  >
                    <option value="" label="Select Reseller Admin" />
                    {resellerAdmins.map((item) => (
                      <option key={item.ra_id} value={item.ra_id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="resellerAdminId"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                text="Map"
                className="w-full"
                disabled={loader}
              >
                Map
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <DataTable columns={columns} rows={resellers} />
    </div>
  );
};

export default ResellerAdminMapping;
