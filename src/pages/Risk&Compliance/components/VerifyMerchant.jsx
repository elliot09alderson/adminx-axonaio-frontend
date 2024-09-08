import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
  getMerchantBasicDetail,
  // updateMerchantDetails,
} from "../../../rtk/slices/adminSlice/MerchantSlice";
import { AiFillWarning } from "react-icons/ai";

const VerifyMerchant = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const params = useParams();

  const fields = [
    { name: "name", label: "Name", reasonOfDeny: "", verified: null },
    { name: "email", label: "Email", reasonOfDeny: "", verified: null },
    {
      name: "isEmailVerify",
      label: "OTP Verified",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "phonenumber",
      label: "Phone number",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "isBasic",
      label: "Basic Details Submitted",
      reasonOfDeny: "",
      verified: null,
    },
    {
      name: "bg_verified",
      label: "Background Verified",
      reasonOfDeny: "",
      verified: null,
    },
    // { name: "m_id", label: "Merchant ID", reasonOfDeny: "", verified: null },
  ];

  const [verifiedArr, setVerifiedArr] = useState(fields);

  useEffect(() => {
    dispatch(getMerchantBasicDetail({ merchantId: params.merchantId }));
  }, [dispatch, params.merchantId]);

  const { merchantBasicDetails } = useSelector((slice) => slice.merchant);

  useEffect(() => {
    if (merchantBasicDetails) {
      setFormValues(merchantBasicDetails);
    }
  }, [merchantBasicDetails]);

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
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-slate-800 w-full relative rounded-xl h-full p-12 pt-24">
        <div className="bg-slate-950 border-4 border-slate-800 absolute top-10 left-20 rounded-full w-32 h-32"></div>
        <div className="py-24 bg-slate-950 rounded-xl">
          <div className="flex justify-evenly gap-12 px-12">
            <div className="w-full text-white bg-slate-950 flex rounded-xl flex-col gap-8">
              {verifiedArr.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-col flex text-white w-full bg-slate-950 gap-1"
                >
                  <label htmlFor={item.name}>{item.label}</label>
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
                    <p className="text-red-300 text-xs">{item.reasonOfDeny}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex justify-end mt-8 gap-4">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 px-4 py-2 rounded-md text-white"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 px-4 py-2 rounded-md text-white"
                >
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="bg-red-500 px-4 py-2 rounded-md text-white"
                >
                  Cancel
                </button>
              </>
            )}
          </div> */}
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

export default VerifyMerchant;
