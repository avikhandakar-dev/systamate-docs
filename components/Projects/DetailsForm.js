import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import AuthContext from "@lib/AuthContext";
import { useContext } from "react";
const DetailsForm = ({ projectDetails, setProjectDetails, next }) => {
  const { user } = useContext(AuthContext);

  const Schema = Yup.object().shape({
    companyName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Company name is required!"),
    companyAbbreviation: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Company abbreviation is required!"),
    companyProjectManager: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Project manager is required!"),
    projectName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Project name is required!"),
    applicationName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Application name is required!"),
    applicationAbbreviation: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Application abbreviation is required!"),
    consultantName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Consultant name is required!"),
    applicationUsage: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Application usage is required!"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: projectDetails.companyName || "",
      companyAbbreviation: projectDetails.companyAbbreviation || "",
      companyProjectManager: projectDetails.companyProjectManager || "",
      projectName: projectDetails.projectName || "",
      applicationName: projectDetails.applicationName || "",
      applicationAbbreviation: projectDetails.applicationAbbreviation || "",
      consultantName: user.name,
      applicationUsage: projectDetails.applicationUsage || "",
    },
    validationSchema: Schema,
    onSubmit: async ({
      companyName,
      companyAbbreviation,
      companyProjectManager,
      projectName,
      applicationName,
      applicationAbbreviation,
      consultantName,
      applicationUsage,
    }) => {
      setProjectDetails({
        companyName,
        companyAbbreviation,
        companyProjectManager,
        projectName,
        applicationName,
        applicationAbbreviation,
        consultantName,
        applicationUsage,
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
          <div className="flex-1 grid gap-8">
            <div className="shadow-card border-t-4 border-primary-500 p-6 w-full rounded-md dark:border dark:border-t-4 dark:border-t-primary-500 dark:border-slate-600 dark:bg-slate-800">
              <p className="mb-4 font-semibold uppercase">Project details</p>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="companyName"
                  {...getFieldProps("companyName")}
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                    Boolean(touched.companyName && errors.companyName) &&
                    "!border-red-500"
                  }`}
                  placeholder=" "
                />
                {touched.companyName && errors.companyName && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.companyName}
                  </p>
                )}
                <label
                  for="companyName"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Company name
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="companyAbbreviation"
                  {...getFieldProps("companyAbbreviation")}
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                    Boolean(
                      touched.companyAbbreviation && errors.companyAbbreviation
                    ) && "!border-red-500"
                  }`}
                  placeholder=" "
                />
                {touched.companyAbbreviation && errors.companyAbbreviation && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.companyAbbreviation}
                  </p>
                )}
                <label
                  for="companyAbbreviation"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Company abbreviation
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="companyProjectManager"
                  {...getFieldProps("companyProjectManager")}
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                    Boolean(
                      touched.companyProjectManager &&
                        errors.companyProjectManager
                    ) && "!border-red-500"
                  }`}
                  placeholder=" "
                />
                {touched.companyProjectManager &&
                  errors.companyProjectManager && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      {errors.companyProjectManager}
                    </p>
                  )}
                <label
                  for="companyProjectManager"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Company project manager/contact
                </label>
              </div>
              <div className="grid xl:grid-cols-2 xl:gap-8">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="projectName"
                    {...getFieldProps("projectName")}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                      Boolean(touched.projectName && errors.projectName) &&
                      "!border-red-500"
                    }`}
                    placeholder=" "
                  />
                  {touched.projectName && errors.projectName && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      {errors.projectName}
                    </p>
                  )}
                  <label
                    for="projectName"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Project name
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="applicationName"
                    {...getFieldProps("applicationName")}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                      Boolean(
                        touched.applicationName && errors.applicationName
                      ) && "!border-red-500"
                    }`}
                    placeholder=" "
                  />
                  {touched.applicationName && errors.applicationName && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      {errors.applicationName}
                    </p>
                  )}
                  <label
                    for="applicationName"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Application /system name
                  </label>
                </div>
              </div>
              <div className="grid xl:grid-cols-2 xl:gap-8">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="applicationAbbreviation"
                    {...getFieldProps("applicationAbbreviation")}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                      Boolean(
                        touched.applicationAbbreviation &&
                          errors.applicationAbbreviation
                      ) && "!border-red-500"
                    }`}
                    placeholder=" "
                  />
                  {touched.applicationAbbreviation &&
                    errors.applicationAbbreviation && (
                      <p className="text-xs mt-1 text-red-500 font-medium">
                        {errors.applicationAbbreviation}
                      </p>
                    )}
                  <label
                    for="applicationAbbreviation"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Application /system abbreviation
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="consultantName"
                    readOnly
                    {...getFieldProps("consultantName")}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                      Boolean(
                        touched.consultantName && errors.consultantName
                      ) && "!border-red-500"
                    }`}
                    placeholder=" "
                  />
                  {touched.consultantName && errors.consultantName && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      {errors.consultantName}
                    </p>
                  )}
                  <label
                    for="consultantName"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Consultant name
                  </label>
                </div>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <select
                  defaultValue=""
                  {...getFieldProps("applicationUsage")}
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                    !values.applicationUsage &&
                    "!text-gray-500 dark:!text-gray-400"
                  } ${
                    Boolean(
                      touched.applicationUsage && errors.applicationUsage
                    ) && "!border-red-500"
                  }`}
                >
                  <option disabled value="">
                    Application usage...
                  </option>
                  <option value="intranet">Intranet</option>
                  <option value="internet">Internet</option>
                </select>
                {values.applicationUsage && (
                  <label
                    for="applicationUsage"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Application usage
                  </label>
                )}
                {touched.applicationUsage && errors.applicationUsage && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    {errors.applicationUsage}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end my-4">
            <button type="submit" className="btn btn-primary rounded px-16">
              Next
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default DetailsForm;
