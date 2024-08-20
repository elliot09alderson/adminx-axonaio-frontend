import React, { useState, useEffect } from "react";
// responsive done
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { addDetail } from "../Data/apis";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../../utils/Notifications/ToastNotifications";

import { useDispatch } from "react-redux";
import { createEmployee } from "../../../rtk/slices/employeeSlice/employeeSlice";

const OnboardEmployee = ({ setOpenModal, modal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const departments = [
    "Administration",
    "Account",
    "Finance",
    "Settlement",
    "Technical",
    "Networking",
    "Support",
    "Marketing",
    "Sales",
    "Risk & Compliance",  
    "Legal",
  ];

  const roles = [
    "CEO",
    "CFO",
    "CTO",
    "IT_Operation_Head",
    "CMO",
    "COO",
    "HR_Manager",
    "Accounting_Head",
    "Finance_Head",
    "Settlement_Head",
    "Technical_Head",
    "Networking_Head",
    "Support_Head",
    "Marketing_Head",
    "Sales_Head",
    "Risk_&_Compliance_Head",
    "Legal",
    "Employee",
  ];
  const designations = ["Senior Developer ", "Security Engineer"];
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    role: Yup.string().oneOf(roles).required("Role is required"),
    personal_email: Yup.string()
      .email("Invalid email")
      .required("Personal email is required"),
    official_email: Yup.string()
      .email("Invalid email")
      .required("Official email is required"),
    password: Yup.string().required("Password is required"),
    mobile_no: Yup.string().required("Mobile number is required"),
    department: Yup.string()
      .oneOf(departments)
      .required("Department is required"),
    designation: Yup.string().oneOf(designations).required("Role is required"),
  });

  const onSubmitStepFour = async (values, resetForm) => {
    console.log(values);
    const formData = new FormData();

    // Append all form fields to the FormData object
    Object.keys(values).forEach((key) => {
      if (values[key] instanceof File) {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    console.log("formData", formData);
    dispatch(createEmployee({ datax: values })).then((result) => {
      if (result.payload?.status) {
        resetForm();
        setOpenModal(false);
      }
    });

    ToastSuccessNotifications("merchant created successfully");
  };

  return (
    // WITH RESPONSIVE
    <div
      className={`  min-h-[60vh] w-full bg-dashboard-day dark:bg-extra-night flex items-center rounded-xl my-8  justify-center`}
    >
      <div className="w-full sm:w-auto">
        <div className="card rounded-lg px-8  sm:px-16 py-8 ">
          <div>
            <div className="text-center ">
              <div className="">
                <h2 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-white">
                  Employee Onboarding
                </h2>
              </div>
            </div>
            <div className="flex justify-center">
              <Formik
                initialValues={{
                  username: "",
                  first_name: "",
                  last_name: "",
                  designation: "",
                  personal_email: "",
                  official_email: "",
                  password: "",
                  mobile_no: "",
                  department: "",
                  role: "",
                }}
                validationSchema={
                  // Your validation schema
                  validationSchema
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // Your form submission logic

                  onSubmitStepFour(values, setSubmitting, resetForm);
                }}
              >
                {({
                  isSubmitting,
                  errors,
                  touched,
                  setFieldValue,
                  setSubmitting,
                  resetForm,
                }) => (
                  <Form className="w-full sm:w-auto">
                    <>
                      <div className="flex dark:text-white  flex-col gap-5">
                        <h2 className="lg:text-3xl text-xl">
                          Employee Details
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                          <div>
                            <label htmlFor="name">Username:</label>
                            <Field
                              type="text"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="username"
                              placeholder="Enter username"
                            />
                            {errors.username && touched.username ? (
                              <div className="text-red-500">
                                {errors.username}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label htmlFor="name">First Name:</label>
                            <Field
                              type="text"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="first_name"
                              placeholder="Enter name"
                            />
                            {errors.first_name && touched.first_name ? (
                              <div className="text-red-500">
                                {errors.first_name}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label htmlFor="name">Last Name :</label>
                            <Field
                              type="text"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="last_name"
                              placeholder="Enter last name"
                            />
                            {errors.last_name && touched.last_name ? (
                              <div className="text-red-500">
                                {errors.last_name}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label htmlFor="dob">Personal Email</label>
                            <Field
                              type="email"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="personal_email"
                              placeholder="Enter Email"
                            />
                            {errors.personal_email && touched.personal_email ? (
                              <div className="text-red-500">
                                {errors.personal_email}
                              </div>
                            ) : null}
                          </div>

                          <div>
                            <label htmlFor="email">Official Email:</label>
                            <Field
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="official_email"
                              placeholder="Enter official email"
                            />
                            {errors.official_email && touched.official_email ? (
                              <div className="text-red-500">
                                {errors.official_email}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label htmlFor="mobile">password </label>
                            <Field
                              type="password"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="password"
                              placeholder="Enter password"
                            />
                            {errors.password && touched.password ? (
                              <div className="text-red-500">
                                {errors.password}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label htmlFor="mobile">Mobile no. </label>
                            <Field
                              // type="number"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                              name="mobile_no"
                              placeholder="Enter phone number"
                            />
                            {errors.mobile_no && touched.mobile_no ? (
                              <div className="text-red-500">
                                {errors.mobile_no}
                              </div>
                            ) : null}
                          </div>

                          <div>
                            <label>department:</label>
                            <Field
                              as="select"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300  px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent bg-slate-900"
                              name="department"
                              placeholder="Enter department"
                            >
                              <option value="" label="Select department" />
                              {departments.map((item, idx) => (
                                <option value={item} label={item} />
                              ))}
                            </Field>
                            {errors.department && touched.department ? (
                              <div className="text-red-500">
                                {errors.department}
                              </div>
                            ) : null}
                          </div>

                          <div>
                            <label>designation :</label>
                            <Field
                              as="select"
                              name="designation"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent bg-slate-900"
                              placeholder="Enter designation"
                            >
                              <option value="" label="Select designation" />
                              {designations.map((item, idx) => (
                                <option value={item} label={item} />
                              ))}
                            </Field>
                            {errors.designation && touched.designation ? (
                              <div className="text-red-500">
                                {errors.designation}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label>role :</label>
                            <Field
                              as="select"
                              name="role"
                              className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent bg-slate-900"
                              placeholder="Enter role"
                            >
                              <option value="" label="Select role" />
                              {roles.map((item, idx) => (
                                <option value={item} label={item} key={idx} />
                              ))}
                            </Field>
                            {errors.role && touched.role ? (
                              <div className="text-red-500">{errors.role}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center  gap-12 mt-5 lg:mt-10">
                        <button
                          type="submit"
                          disabled={loader}
                          className={` bg-day dark:bg-night ${
                            loader ? " opacity-50 " : ""
                          } duration-500  px-6 py-2  w-1/3 rounded-lg text-white`}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardEmployee;
