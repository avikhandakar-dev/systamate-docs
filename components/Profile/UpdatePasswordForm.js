import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { fetchPostJSON } from "@lib/utils";
import toast from "react-hot-toast";

const UpdatePasswordForm = () => {
  const Schema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Too short!")
      .max(50, "Too long!")
      .required("Old password is required"),
    newPassword: Yup.string()
      .min(8, "Too short!")
      .max(50, "Too long!")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .equals([Yup.ref("newPassword")], "Password must match"),
  });
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ oldPassword, newPassword }) => {
      const response = await fetchPostJSON("/api/profile/update-password", {
        oldPassword,
        newPassword,
      });
      if (response.statusCode === 200) {
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
    <div className="container mx-auto max-w-screen-xl pt-8 pb-8">
      <div className="bg-slate-100 dark:bg-slate-700 rounded-md border dark:border-slate-600">
        <div className="border-b px-6 py-4 dark:border-slate-600">
          <p className="font-semibold text-lg">Update Password</p>
        </div>
        <FormikProvider value={formik}>
          <Form className="w-full flex flex-col gap-4 p-6">
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="oldPassword"
                {...getFieldProps("oldPassword")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.oldPassword && errors.oldPassword) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.oldPassword && errors.oldPassword && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.oldPassword}
                </p>
              )}
              <label
                for="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Current password
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="newPassword"
                {...getFieldProps("newPassword")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.newPassword && errors.newPassword) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.newPassword && errors.newPassword && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.newPassword}
                </p>
              )}
              <label
                for="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New password
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="confirmPassword"
                {...getFieldProps("confirmPassword")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.confirmPassword && errors.confirmPassword) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
              <label
                for="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
            </div>

            <button
              type="submit"
              className={`btn btn-primary rounded px-16 w-max mt-8 ${
                isSubmitting && "loading"
              }`}
            >
              {!isSubmitting && "Update"}
            </button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
