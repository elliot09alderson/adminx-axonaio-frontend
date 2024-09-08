import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
  getMerchantDocDetail,
  // updateMerchantDetails,
} from "../../../rtk/slices/adminSlice/MerchantSlice";
import { FaDownload } from "react-icons/fa";
import { AiFillWarning } from "react-icons/ai";
import { FileInput, Label } from "flowbite-react";
const VerifyMerchantDocs = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const params = useParams();

  const fields = [
    {
      name: "aadharVoterIdPassportAttachment",
      label: "Identity Attachment",
      reasonOfDeny: "",
      type: "file",
      verified: null,
    },
    {
      name: "registrationCertificate",
      label: "Registration Certificate",
      reasonOfDeny: "",
      type: "file",
      verified: null,
    },
    {
      name: "panAttachment",
      label: "Pan Attachment",
      type: "file",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "cancelledChequeAttachment",
      label: "Cancelled Cheque",
      reasonOfDeny: "",
      type: "file",
      verified: null,
    },
    {
      name: "aadharVoterIdPassportDLNumber",
      label: "Adhaar Number",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },
    {
      name: "address",
      label: "Address",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },
    {
      name: "businessCategory",
      label: "Business Category ",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },
    {
      name: "businessType",
      label: "businessType",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },
    {
      name: "cancelledCheque",
      label: "Cancelled Cheque",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },

    {
      name: "city",
      label: "city",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },
    {
      name: "companyName",
      label: "companyName",
      type: "field",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "gstNumber",
      label: "gstNumber",
      type: "field",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "companyPan",
      label: "Company Pan",
      type: "field",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "panNumber",
      label: "Pan Number",
      reasonOfDeny: "",
      type: "field",
      verified: null,
    },
    {
      name: "pincode",
      type: "field",
      label: "Pincode",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "website",
      type: "field",
      label: "Website",
      reasonOfDeny: "",
      verified: null,
    },
  ];
  const [verifiedArr, setVerifiedArr] = useState(fields);

  useEffect(() => {
    dispatch(getMerchantDocDetail({ merchantId: params.merchantId }));
  }, [dispatch, params.merchantId]);

  const { merchantDocDetails } = useSelector((slice) => slice.merchant);

  useEffect(() => {
    if (merchantDocDetails) {
      setFormValues(merchantDocDetails);
    }
  }, [merchantDocDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Dispatch an action to save the updated details
    console.log(formValues);
    // dispatch(
    //   updateMerchantDetails({ merchantId: params.merchantId, data: formValues })
    // );
    setIsEditing(false);
    Swal.fire("Details updated successfully!", "", "success");
  };

  function assignMistake(editField) {
    Swal.fire({
      title: "Please Provide a reason",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Assign unverified",
      showLoaderOnConfirm: true,
      preConfirm: async (reason) => {
        setVerifiedArr(
          verifiedArr.map((item, idx) =>
            item.name === editField
              ? { ...item, reasonOfDeny: reason, verified: false }
              : item
          )
        );
        try {
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Reason submitted", "", "success");
      }
    });
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-slate-800 w-full relative rounded-xl h-full p-12 pt-24">
        <div className="bg-slate-950 border-4 border-slate-800  absolute top-10 left-20 rounded-full w-32 h-32"></div>
        <div className="py-24 bg-slate-950  rounded-xl">
          <div className="flex w-full wrap justify-evenly gap-12 px-12">
            {/* ______________LEFT_____________ */}
            <div className="text-white bg-slate-950 flex rounded-xl flex-col justify-evenly">
              <h1 className="text-4xl shadow-lg">Uploaded Documents</h1>
              {verifiedArr.map(
                (item, idx) =>
                  idx < 4 && (
                    <div
                      key={idx}
                      className="flex w-full flex-col gap-2 items-center "
                    >
                      <div className="flex w-full gap-2 items-center ">
                        {formValues[item.name] ? (
                          <div className="flex flex-col items-center justify-center gap-2 w-full">
                            {!isEditing ? (
                              <a
                                href={formValues[item.name]}
                                download
                                className="text-white text-xl"
                              >
                                <div className="px-8 h-64 items-center w-96 py-3 bg-slate-800 rounded-lg flex gap-4 justify-between">
                                  Download {item.label}
                                  <FaDownload
                                    color="white"
                                    className="bg-slate-950 text-white p-4 rounded-full"
                                    size={50}
                                  />
                                </div>
                              </a>
                            ) : (
                              <>
                                <Label
                                  htmlFor="dropzone-file"
                                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                  </div>
                                  <FileInput
                                    // id={item.name}
                                    name={item.name}
                                    onChange={handleInputChange}
                                    id="dropzone-file"
                                    className="hidden"
                                  />
                                </Label>
                              </>
                            )}
                          </div>
                        ) : (
                          <Label
                            htmlFor={item.name}
                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.5"
                                />
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 12v4l-2-2m12-9-9.588 9.588A1.967 1.967 0 0 1 9 15H5a2 2 0 0 1-2-2V9c0-.53.21-1.039.588-1.413L12 2m4-1h3v3"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload {item.label}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG, or PDF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id={item.name}
                              name={item.name}
                              onChange={handleInputChange}
                              type="file"
                              accept="pdf"
                              className="hidden"
                            />
                          </Label>
                        )}{" "}
                        <div className="flex flex-col">
                          {isEditing && (
                            <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                              {item.verified ? (
                                <MdVerified size={20} />
                              ) : (
                                <>
                                  {!item.reasonOfDeny ? (
                                    <>
                                      <MdVerified
                                        size={20}
                                        onClick={() =>
                                          setVerifiedArr(
                                            verifiedArr.map((i) =>
                                              i.name === item.name
                                                ? { ...item, verified: true }
                                                : i
                                            )
                                          )
                                        }
                                      />
                                      <VscUnverified
                                        size={20}
                                        onClick={() => assignMistake(item.name)}
                                      />
                                    </>
                                  ) : (
                                    <AiFillWarning />
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {item.reasonOfDeny && (
                        <p className="text-red-300 text-xs">
                          {item.reasonOfDeny}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>

            {/* ________________RIGHT_________________ */}
            <div className=" w-1/2  text-white bg-slate-950 flex rounded-xl flex-col gap-8">
              {verifiedArr.map(
                (item, idx) =>
                  idx >= 4 && (
                    <div
                      key={idx}
                      className="flex-col flex text-white w-full bg-slate-950 gap-1"
                    >
                      <label htmlFor={item.name} className="text-2xl">
                        {item.label}
                      </label>
                      <div className="w-full flex gap-1">
                        <input
                          type="text"
                          name={item.name}
                          value={formValues[item.name] || ""}
                          disabled={!isEditing}
                          onChange={handleInputChange}
                          className="h-12 w-full rounded-lg bg-slate-950"
                        />
                        {isEditing && (
                          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                            {item.verified ? (
                              <MdVerified size={20} />
                            ) : (
                              <>
                                {!item.reasonOfDeny ? (
                                  <>
                                    <MdVerified
                                      size={20}
                                      onClick={() =>
                                        setVerifiedArr(
                                          verifiedArr.map((i) =>
                                            i.name === item.name
                                              ? { ...item, verified: true }
                                              : i
                                          )
                                        )
                                      }
                                    />
                                    <VscUnverified
                                      size={20}
                                      onClick={() => assignMistake(item.name)}
                                    />
                                  </>
                                ) : (
                                  <AiFillWarning />
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      {item.reasonOfDeny && (
                        <p className="text-red-300 text-xs">
                          {item.reasonOfDeny}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-12 mt-8 ">
            <button
              className="text-white px-12 py-4 mt-4 cursor-pointer border-slate-300 bg-slate-800 rounded-lg  w-96"
              disabled={verifiedArr.some((item) => item.verified === null)}
              onClick={() => alert("asdasdasd")}
            >
              {" "}
              Submit
            </button>

            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-12 py-4 mt-4 cursor-pointer  bg-slate-800 rounded-lg  w-96"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-12 py-4 mt-4 cursor-pointer  rounded-lg  w-96"
                >
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="bg-red-500 text-white px-12 py-4 mt-4 cursor-pointer  rounded-lg  w-96"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyMerchantDocs;
