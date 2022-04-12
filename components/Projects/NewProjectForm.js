import date from "date-and-time";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { fetchPostJSON } from "@lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "@lib/AuthContext";

const NewProjectForm = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const NewProjectSchema = Yup.object().shape({
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
    projectScope: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Project scope is required!"),
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
    hostname: Yup.string().min(3, "Too short!").max(50, "Too long!"),
    ipAddress: Yup.string().min(3, "Too short!").max(50, "Too long!"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyAbbreviation: "",
      companyProjectManager: "",
      projectName: "",
      applicationName: "",
      applicationAbbreviation: "",
      consultantName: user.name,
      applicationUsage: "",
      projectScope: "",
      startDate: "",
      endDate: "",
      reportingDate: date.format(new Date(), "DD/MM/YYYY"),
      hostname: "",
      ipAddress: "",
    },
    validationSchema: NewProjectSchema,
    onSubmit: async ({
      companyName,
      companyAbbreviation,
      companyProjectManager,
      projectName,
      applicationName,
      applicationAbbreviation,
      consultantName,
      applicationUsage,
      projectScope,
      startDate,
      endDate,
      reportingDate,
      hostname,
      ipAddress,
    }) => {
      const response = await fetchPostJSON("/api/project", {
        companyName,
        companyAbbreviation,
        companyProjectManager,
        projectName,
        applicationName,
        applicationAbbreviation,
        consultantName,
        applicationUsage,
        projectScope,
        startDate,
        endDate,
        reportingDate,
        hostname,
        ipAddress,
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        return router.push("/");
      } else if (response.statusCode === 401) {
        toast.error(response.message);
        router.replace("/sign-out");
      } else {
        return toast.error(response.message);
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
    <div className="container mx-auto max-w-screen-xl py-8">
      <FormikProvider value={formik}>
        <Form>
          <div className="flex gap-8 w-full flex-col md:flex-row">
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
                        touched.companyAbbreviation &&
                          errors.companyAbbreviation
                      ) && "!border-red-500"
                    }`}
                    placeholder=" "
                  />
                  {touched.companyAbbreviation &&
                    errors.companyAbbreviation && (
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
                  {touched.applicationUsage && errors.applicationUsage && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      {errors.applicationUsage}
                    </p>
                  )}
                </div>
              </div>

              <div className="shadow-card border-t-4 border-indigo-500 p-6 w-full rounded-md dark:border dark:border-t-4 dark:border-t-indigo-500 dark:border-slate-600 dark:bg-slate-800">
                <p className="mb-4 font-semibold uppercase">Project Scope</p>
                <div className="relative z-0 mb-6 w-full group">
                  <select
                    defaultValue=""
                    {...getFieldProps("projectScope")}
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                      !values.projectScope &&
                      "!text-gray-500 dark:!text-gray-400"
                    } ${
                      Boolean(touched.projectScope && errors.projectScope) &&
                      "!border-red-500"
                    }`}
                  >
                    <option disabled value="">
                      Project scope...
                    </option>
                    <option value="NVA">
                      Network Vulnerability Assessment
                    </option>
                    <option value="WebPT">Web Penetration Testing</option>
                    <option value="MPT">Mobile Penetration Testing</option>
                    <option value="TCPT">
                      Thick Client Penetration Testing
                    </option>
                    <option value="SCR">Source Code Review</option>
                    <option value="HSA">Host Security Assessment</option>
                  </select>
                  {touched.projectScope && errors.projectScope && (
                    <p className="text-xs mt-1 text-red-500 font-medium">
                      {errors.projectScope}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className=" flex-shrink-0 w-full md:w-80 grid gap-8">
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

              <div className="shadow-card border-t-4 border-green-500 p-6 w-full rounded-md dark:border dark:border-t-4 dark:border-t-green-500 dark:border-slate-600 dark:bg-slate-800">
                <p className="mb-4 font-semibold uppercase">Project Coverage</p>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
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
                  <input
                    type="text"
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

              <button
                type="submit"
                className={`btn btn-primary rounded btn-block ${
                  isSubmitting && "loading"
                }`}
              >
                {!isSubmitting && "Submit"}
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default NewProjectForm;
