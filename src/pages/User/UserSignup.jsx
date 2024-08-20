import { Avatar, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
// import { FaUserTie } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const UserSignup = () => {
  // const data = useSelector((state) => state.counter.couples);
  function onSubmit(values) {
    console.log(values);
  }

  const handleAvatarChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setFieldValue("avatar", file);
    }
  };
  const [avatar, setAvatar] = useState(null);
  const validationSchema = Yup.object({
    avatar: Yup.mixed().required("Required"),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .max(12, "max length is 12 characters")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    avatar: null,
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  console.log(avatar);
  return (
    <div className=" red-blast text-white min-h-screen center-col w-[100vw]">
      <div className="center-col backdrop-blur-lg shadow-lg lg:w-[30vw] h-[96vh] lg:h-[90vh] w-[80vw] backdrop-blur-xl bg-white/5 p-8 rounded-lg">
        <h1 className=" text-lg  lg:text-4xl mb-2 ">User Signup</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex max-w-md flex-col lg:gap-6 gap-4">
              <div className="w-full flex flex-col items-center">
                <div className="relative w-20 lg:w-28  lg:h-28 h-20">
                  <input
                    type="file"
                    className="opacity-0 w-24 cursor-pointer lg:h-28  rounded-full top-10 left-5      absolute z-20 "
                    onChange={(event) =>
                      handleAvatarChange(event, setFieldValue)
                    }
                  ></input>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt=""
                      className="rounded-full cursor-pointer absolute   left-0 lg:h-28 h-20 lg:w-28 w-20 top-0     z-10"
                    />
                  ) : (
                    <div>
                      <FaUserCircle
                        rounded
                        className="cursor-pointer absolute  left-0 lg:h-28 h-20 lg:w-28 w-20 top-0    z-10 absolute "
                      />
                    </div>
                  )}
                </div>
                {!avatar && <span className="text-xs ">Avatar</span>}
              </div>

              <div className="gap-1 lg:gap-2 flex flex-col">
                <Label
                  htmlFor="email1"
                  value="Your Name"
                  className="lg:text-lg text-sm"
                />

                <Field
                  name="name"
                  type="text"
                  className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-48 lg:w-72"
                />
                <ErrorMessage
                  className="text-green-500 text-xs"
                  name="name"
                  component="div"
                />
              </div>
              <div className="gap-1 lg:gap-2 flex flex-col">
                <Label
                  htmlFor="email1"
                  value=" phone number"
                  className="lg:text-lg text-sm"
                />

                <Field
                  name="phonenumber"
                  type="number"
                  className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-48 lg:w-72"
                />
                <ErrorMessage
                  className="text-green-500 text-xs"
                  name="phonenumber"
                  component="div"
                />
              </div>

              <div className="gap-1 lg:gap-2 flex flex-col">
                <Label
                  htmlFor="email1"
                  value="Your email"
                  className="lg:text-lg text-sm"
                />

                <Field
                  name="email"
                  type="email"
                  className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-48 lg:w-72"
                />
                <ErrorMessage
                  className="text-green-500 text-xs"
                  name="email"
                  component="div"
                />
              </div>
              <div className="gap-1 lg:gap-2 flex flex-col">
                <Label
                  htmlFor="password1"
                  className="lg:text-lg text-sm"
                  value="Your password"
                />

                <Field
                  name="password"
                  type="password"
                  className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-48 lg:w-72"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-green-500 text-xs"
                />
              </div>
              <div className="gap-1 lg:gap-2 flex flex-col">
                <Label
                  htmlFor="password1"
                  className="lg:text-lg text-sm"
                  value="Confirm password"
                />

                <Field
                  name="confirmpassword"
                  type="password"
                  className="h-8 rounded-md text-black pl-2 outline-none  focus:outline-none w-48 lg:w-72"
                />
                <ErrorMessage
                  name="confirmpassword"
                  component="div"
                  className="text-green-500 text-xs"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="rounded-full " />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link to={"/user/login"}>
                  <Label
                    htmlFor="remember"
                    className="text-sm hover:underline  cursor-pointer"
                  >
                    Login ?
                  </Label>
                </Link>
              </div>
              <button
                type="submit"
                className="red-blast rounded-lg py-2 px-4"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserSignup;
