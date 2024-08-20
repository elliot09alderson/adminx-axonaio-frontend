import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserLogin = () => {
  // const data = useSelector((state) => state.counter.couples);
  function onSubmit(values) {
    console.log(values);
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
  return (
    <div className=" red-blast text-white h-screen center-col w-[100vw]">
      <div className="center-col backdrop-blur-lg shadow-lg lg:w-[24vw] lg:h-[50vh] h-[70vh] w-[80vw] backdrop-blur-xl bg-white/5 p-8 rounded-lg">
        <h1 className="text-4xl mb-4">User Login</h1>
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
                  className="text-green-500 text-xs"
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
                <Label
                  htmlFor="remember"
                  className="text-sm hover:underline  cursor-pointer"
                >
                  Forgot passcode ?
                </Label>
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

export default UserLogin;
