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
import Swal from "sweetalert2";
import {
  fetchFreshMerchant,
  fetchReseller,
  manageMerchantInArray,
  populateResellersMerchant,
} from "../../../rtk/slices/resellerSlice/resellerSlice";
import { Link } from "react-router-dom";
const ResellerMapping = () => {
  const initialValues = {
    merchantId: "",
    resellerId: "",
  };
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectReseller, setSelectReseller] = useState("");

  /* -------------------------SELECTORS ------------------------ */

  useEffect(() => {
    dispatch(populateResellersMerchant({ resellerId: selectReseller }));
  }, [selectReseller]);

  const { resellers, resellersMerchant, loader, freshMerchants } = useSelector(
    (slice) => slice.reseller
  );

  useEffect(() => {
    dispatch(fetchFreshMerchant());
    dispatch(fetchReseller());
  }, []);

  const columns = [
    { field: "r_id", headerName: "merchant id", width: 190 },
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
              onClick={() => unmapMerchant(params.row._id)}
            >
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  const validationSchema = Yup.object().shape({
    merchantId: Yup.string().required("Merchant is required"),
    resellerId: Yup.string().required("Reseller is required"),
  });

  function mapMerchant(values) {
    console.log(values);
    const { merchantId, resellerId } = values;
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
            datax: { resellerId, merchantId, action: "add" },
          })
        ).then((res) => {
          if (res.payload.status) {
            Swal.fire("Saved!", "", "success");
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
        {/* <select
          id="merchant"
          name="merchant"
          onChange={(e) => setMerchantId(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Select Merchant" />
          {freshMerchants.map((item, idx) => (
            <option key={idx} value={item._id} label={item.name} />
          ))}
        </select> */}
        <select
          id="merchant"
          name="merchant"
          onChange={(e) => setSelectReseller(e.target.value)}
          className="rounded-lg cursor-pointer dark:bg-slate-800 text-center bg-day shadow-sm w-64 font-semibold px-4 py-3 dark:text-white"
        >
          <option value="" label="Set Reseller" />
          {resellers.map((item, idx) => (
            <option key={idx} value={item.r_id} label={item.name} />
          ))}
        </select>

        <Button
          text="Map Merchant"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={() => setOpenModal(true)}
        >
          Map Merchant
        </Button>
        {/* <Button
          text="Un Map Merchant"
          className="text-center py-3 rounded-lg bg-day"
          style={{ background: "#9fd3c7", width: "300px" }}
          onClick={unmapMerchant}
        >
          Un Map Merchant
        </Button> */}
      </div>
      <h1 className="lg:text-2xl dark:text-white text-xl">
        Merchant Mapping Table
      </h1>
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
                  <Label htmlFor="merchant">Select Merchant</Label>
                  <Field
                    as="select"
                    id="merchant"
                    name="merchantId"
                    className="rounded-lg h-12"
                    // onChange={() => {
                    //   setMerchantId(e.target.value);
                    // }}
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
                  <Label htmlFor="app">Select Reseller</Label>
                  <Field
                    as="select"
                    id="app"
                    name="resellerId"
                    className="rounded-lg  h-12"
                    // onChange={(e) => setResellerId(e.target.value)}
                  >
                    <option value="" label="Select Reseller" />
                    {resellers.map((item) => (
                      <option key={item.r_id} value={item.r_id}>
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
      <DataTable columns={columns} rows={resellersMerchant} />
    </div>
  );
};

export default ResellerMapping;
