import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom";
import { login_admin, verify_otp } from "../../rtk/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";
const AdminLogin = () => {
  // const data = useSelector((state) => state.counter.couples);
  const {
    isAuthenticated,
    isLoggedin,
    role,
    loader,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.log(isLoggedin, "isLoggedIn");
    if (isLoggedin) {
      setSuccess(true);
    }
  }, [isLoggedin]);

  function onSubmit(values) {
    setData(values);
    dispatch(login_admin({ creds: values }));
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .max(12, "max length is 12 characters")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  function submitOtp(e) {
    e.preventDefault();
    const myOtp = otp.join("");
    dispatch(verify_otp({ datax: { email: data.email, otp: myOtp } }));
    console.log(otp);
  }
  return (
    <div className=" bg-gradient-day dark:bg-gradient-night text-white h-screen center-col w-[100vw]">
      {!success ? (
        <div className="center-col backdrop-blur-lg shadow-lg lg:w-[24vw] lg:h-[50vh] h-[70vh] w-[80vw] backdrop-blur-xl bg-white/5 p-8 rounded-lg">
          <h1 className="text-4xl mb-4">Admin Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex max-w-md flex-col gap-6">
                <div className="gap-2 flex flex-col">
                  <Label
                    htmlFor="email1"
                    value="Your email"
                    className="text-lg"
                  />

                  <Field
                    name="email"
                    type="email"
                    className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-56 lg:w-64"
                  />
                  <ErrorMessage
                    className="text-beyond text-xs"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="gap-2 flex flex-col">
                  <Label
                    htmlFor="password1"
                    className="text-lg"
                    value="Your password"
                  />

                  <Field
                    name="password"
                    type="password"
                    className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-56 lg:w-64"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-beyond text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="rounded-full " />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <button
                  type="submit"
                  className="beyond-blast flex gap-2  items-center justify-center rounded-lg bg-gradient-day dark:bg-gradient-night  py-2 px-4"
                  disabled={loader}
                >
                  {loader ? (
                    <ThreeDots
                      visible={true}
                      height="20"
                      width="30"
                      color="#4fa94d"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <p>Submit</p>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="center-col backdrop-blur-lg shadow-lg lg:w-[24vw] lg:h-[50vh] h-[70vh] w-[80vw] backdrop-blur-xl bg-white/5 lg:p-8 p-4 rounded-lg">
          <h1 className="text-4xl mb-4">Enter OTP</h1>
          <div className="h-[20vh] backdrop-blur-lg  bg-white/5 flex items-center justify-center rounded-xl shadow-lg w-full">
            <OTPInput otp={otp} setOtp={setOtp} />
          </div>
          <button
            type="submit"
            onClick={submitOtp}
            disabled={loader}
            className="px-8 py-3 items-center flex  gap-2 justify-center w-64 bg-gradient-day dark:bg-gradient-night rounded-lg"
          >
            {" "}
            {loader ? (
              <ThreeDots
                visible={true}
                height="20"
                width="30"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <p>Submit</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
