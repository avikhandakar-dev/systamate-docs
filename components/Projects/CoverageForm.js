import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

const CoverageForm = ({
  projectCoverage,
  setProjectCoverage,
  submit,
  back,
  loading,
}) => {
  const Schema = Yup.object().shape({
    hostname: Yup.string().min(3, "Too short!"),
    ipAddress: Yup.string().min(3, "Too short!"),
  });

  const formik = useFormik({
    initialValues: {
      hostname: projectCoverage.hostname || "",
      ipAddress: projectCoverage.ipAddress || "",
    },
    validationSchema: Schema,
    onSubmit: ({ hostname, ipAddress }) => {
      setProjectCoverage({
        hostname,
        ipAddress,
      });
      submit();
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
    <div className="container mx-auto max-w-screen-xl py-8">
      <FormikProvider value={formik}>
        <Form>
          <div className="shadow-card border-t-4 border-green-500 p-6 w-full rounded-md dark:border dark:border-t-4 dark:border-t-green-500 dark:border-slate-600 dark:bg-slate-800">
            <p className="mb-4 font-semibold uppercase">Project Coverage</p>
            <div className="relative z-0 mb-6 w-full group">
              <textarea
                rows={5}
                name="hostname"
                {...getFieldProps("hostname")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.hostname && errors.hostname) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.hostname && errors.hostname && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.hostname}
                </p>
              )}
              <label
                for="hostname"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Hostname
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <textarea
                rows={5}
                name="ipAddress"
                {...getFieldProps("ipAddress")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.ipAddress && errors.ipAddress) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.ipAddress && errors.ipAddress && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.ipAddress}
                </p>
              )}
              <label
                for="ipAddress"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                IP address
              </label>
            </div>
          </div>
          <div className="flex justify-between my-4">
            <button
              onClick={() => back()}
              className="btn btn-secondary rounded px-16"
            >
              Back
            </button>
            <button
              type="submit"
              className={`btn btn-primary rounded px-16 ${
                loading && "loading"
              }`}
            >
              {!loading && "Submit"}
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default CoverageForm;
