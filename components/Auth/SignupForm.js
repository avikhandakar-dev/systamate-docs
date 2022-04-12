import Logo from "@components/Global/Logo";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useContext } from "react";
import AuthContext from "@lib/AuthContext";
import { fetchPostJSON } from "@lib/utils";
import toast from "react-hot-toast";

const SignupForm = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Too short!")
      .max(50, "Too long!")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .equals([Yup.ref("password")], "Password must match"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async ({ name, email, password }) => {
      const response = await fetchPostJSON("/api/auth/signup", {
        name,
        email,
        password,
      });
      if (response.statusCode === 200) {
        const { token, user } = response.data;
        setUser(user);
        setToken(token);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    handleChange,
    getFieldProps,
  } = formik;

  return (
    <div className="inline-block relative w-full max-w-sm overflow-hidden align-middle transition-all transform bg-white dark:bg-slate-800 shadow-card">
      <div className="w-full bg-color-ribbon h-[3px] relative z-10" />
      <div className="px-8 py-12">
        <div className="flex gap-12 items-center justify-center flex-col text-center">
          <Logo size={50} />
          <FormikProvider value={formik}>
            <Form className="w-full flex flex-col gap-4">
              <div className="text-left">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  {...getFieldProps("name")}
                  className={`input input-primary dark:input-secondary text-gray-900 w-full rounded-none ${
                    Boolean(touched.name && errors.name) && "input-error"
                  }`}
                />
                {touched.name && errors.name && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="text-left">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...getFieldProps("email")}
                  placeholder="Your email address"
                  className={`input input-primary dark:input-secondary text-gray-900 w-full rounded-none ${
                    Boolean(touched.email && errors.email) && "input-error"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="text-left">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...getFieldProps("password")}
                  placeholder="Your password"
                  className={`input input-primary dark:input-secondary w-full text-gray-900 rounded-none ${
                    Boolean(touched.password && errors.password) &&
                    "input-error"
                  }`}
                />
                {touched.password && errors.password && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="text-left">
                <label
                  for="con-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...getFieldProps("confirmPassword")}
                  placeholder="Confirm password"
                  className={`input input-primary dark:input-secondary w-full text-gray-900 rounded-none ${
                    Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    ) && "input-error"
                  }`}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`btn btn-primary rounded-none capitalize ${
                  isSubmitting && "loading"
                }`}
              >
                {!isSubmitting && "Sign Up"}
              </button>
              <div className="pt-1 text-center text-sm">
                <span className="text-accent-7">Already a member?</span>
                {` `}
                <Link href="/sign-in">
                  <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                    Sign In
                  </a>
                </Link>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
