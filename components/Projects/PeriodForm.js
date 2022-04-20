import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import date from "date-and-time";

const PeriodForm = ({ projectPeriod, setProjectPeriod, next, back }) => {
  const Schema = Yup.object().shape({
    startDate: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Start date is required!"),
    endDate: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("End date is required!"),
    reportingDate: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("End date is required!"),
  });

  const formik = useFormik({
    initialValues: {
      startDate: projectPeriod.startDate || "",
      endDate: projectPeriod.endDate || "",
      reportingDate: date.format(new Date(), "DD/MM/YYYY"),
    },
    validationSchema: Schema,
    onSubmit: ({ startDate, endDate, reportingDate }) => {
      setProjectPeriod({
        startDate,
        endDate,
        reportingDate,
      });
      next();
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
          <div className="shadow-card border-t-4 border-yellow-500 p-6 w-full rounded-md dark:border dark:border-t-4 dark:border-t-yellow-500 dark:border-slate-600 dark:bg-slate-800">
            <p className="mb-4 font-semibold uppercase">Period of Test</p>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="date"
                name="startDate"
                {...getFieldProps("startDate")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.startDate && errors.startDate) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.startDate && errors.startDate && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.startDate}
                </p>
              )}
              <label
                for="startDate"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Start date
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="date"
                name="endDate"
                {...getFieldProps("endDate")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.endDate && errors.endDate) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.endDate && errors.endDate && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.endDate}
                </p>
              )}
              <label
                for="endDate"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                End date
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                readOnly
                name="reportingDate"
                {...getFieldProps("reportingDate")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.reportingDate && errors.reportingDate) &&
                  "!border-red-500"
                }`}
              />
              {touched.reportingDate && errors.reportingDate && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.reportingDate}
                </p>
              )}
              <label
                for="reportingDate"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Reporting date
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
            <button type="submit" className="btn btn-primary rounded px-16">
              Next
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default PeriodForm;
