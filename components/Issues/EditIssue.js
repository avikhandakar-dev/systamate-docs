import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import toast from "react-hot-toast";
import { fetchPutJSON } from "@lib/utils";
import { GlobalContext } from "@lib/GlobalContext";

const EditIssue = ({ isOpen, closeModal, issue }) => {
  const { doRefrash, setDoRefrash } = useContext(GlobalContext);
  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Title is required"),

    riskRating: Yup.string().max(20, "Too long!").required("This is required"),
    impactRating: Yup.string()
      .max(20, "Too long!")
      .required("This is required"),
    likelihoodRating: Yup.string()
      .max(20, "Too long!")
      .required("This is required"),
    CVERating: Yup.string().max(20, "Too long!"),
    CVSSRating: Yup.string().max(20, "Too long!"),
    CVSSVector: Yup.string().max(20, "Too long!"),
    affectedHost: Yup.string().max(20, "Too long!"),
    observation: Yup.string().max(1000, "Too long!"),
    implication: Yup.string().max(1000, "Too long!"),
    remediation: Yup.string().max(1000, "Too long!"),
    screenshot: Yup.string().max(250, "Too long!"),
    managementComments: Yup.string().max(1000, "Too long!"),
    targetResolutionDate: Yup.string().max(20, "Too long!"),
    status: Yup.string().max(20, "Too long!").required("This is required"),
    dateRaised: Yup.string().max(20, "Too long!"),
    DTOwner: Yup.string().max(20, "Too long!"),
    projectOwner: Yup.string().max(20, "Too long!"),
    DTFollowUpDate: Yup.string().max(20, "Too long!"),
    followUpComments: Yup.string().max(1000, "Too long!"),
    DTFollowUpStatus: Yup.string()
      .max(20, "Too long!")
      .required("This is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: issue.title || "",
      riskRating: issue.riskRating || "",
      impactRating: issue.impactRating || "",
      likelihoodRating: issue.likelihoodRating || "",
      CVERating: issue.CVERating || "",
      CVSSRating: issue.CVSSRating || "",
      CVSSVector: issue.CVSSVector || "",
      affectedHost: issue.affectedHost || "",
      observation: issue.observation || "",
      implication: issue.implication || "",
      remediation: issue.remediation || "",
      screenshot: issue.screenshot || "",
      managementComments: issue.managementComments || "",
      targetResolutionDate: issue.targetResolutionDate || "",
      status: issue.status || "",
      dateRaised: issue.dateRaised || "",
      DTOwner: issue.DTOwner || "",
      projectOwner: issue.projectOwner || "",
      DTFollowUpDate: issue.DTFollowUpDate || "",
      followUpComments: issue.followUpComments || "",
      DTFollowUpStatus: issue.DTFollowUpStatus || "",
    },
    validationSchema: Schema,
    onSubmit: async ({
      title,
      riskRating,
      impactRating,
      likelihoodRating,
      CVERating,
      CVSSRating,
      CVSSVector,
      affectedHost,
      observation,
      implication,
      remediation,
      screenshot,
      managementComments,
      targetResolutionDate,
      status,
      dateRaised,
      DTOwner,
      projectOwner,
      DTFollowUpDate,
      followUpComments,
      DTFollowUpStatus,
    }) => {
      const response = await fetchPutJSON("/api/issue", {
        title,
        riskRating,
        impactRating,
        likelihoodRating,
        CVERating,
        CVSSRating,
        CVSSVector,
        affectedHost,
        observation,
        implication,
        remediation,
        screenshot,
        managementComments,
        targetResolutionDate,
        status,
        dateRaised,
        DTOwner,
        projectOwner,
        DTFollowUpDate,
        followUpComments,
        DTFollowUpStatus,
        id: issue.id,
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
        setDoRefrash(!doRefrash);
        closeModal();
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
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[99] overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black/70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-700 shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Edit issue
                </Dialog.Title>
                <div className="mt-2">
                  <FormikProvider value={formik}>
                    <Form className="w-full flex flex-col gap-4 mt-8">
                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="title"
                            {...getFieldProps("title")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(touched.title && errors.title) &&
                              "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.title && errors.title && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.title}
                            </p>
                          )}
                          <label
                            for="title"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Issue title
                          </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <select
                            defaultValue=""
                            {...getFieldProps("riskRating")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              !values.riskRating &&
                              "!text-gray-500 dark:!text-gray-400"
                            } ${
                              Boolean(
                                touched.riskRating && errors.riskRating
                              ) && "!border-red-500"
                            }`}
                          >
                            <option disabled value="">
                              Risk rating...
                            </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                          {touched.riskRating && errors.riskRating && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.riskRating}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <select
                            defaultValue=""
                            {...getFieldProps("impactRating")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              !values.impactRating &&
                              "!text-gray-500 dark:!text-gray-400"
                            } ${
                              Boolean(
                                touched.impactRating && errors.impactRating
                              ) && "!border-red-500"
                            }`}
                          >
                            <option disabled value="">
                              Impact rating...
                            </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                          {touched.impactRating && errors.impactRating && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.impactRating}
                            </p>
                          )}
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <select
                            defaultValue=""
                            {...getFieldProps("likelihoodRating")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              !values.likelihoodRating &&
                              "!text-gray-500 dark:!text-gray-400"
                            } ${
                              Boolean(
                                touched.likelihoodRating &&
                                  errors.likelihoodRating
                              ) && "!border-red-500"
                            }`}
                          >
                            <option disabled value="">
                              Likelihood rating...
                            </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                          {touched.likelihoodRating &&
                            errors.likelihoodRating && (
                              <p className="text-xs mt-1 text-red-500 font-medium">
                                {errors.likelihoodRating}
                              </p>
                            )}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="CVERating"
                            {...getFieldProps("CVERating")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(touched.CVERating && errors.CVERating) &&
                              "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.CVERating && errors.CVERating && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.CVERating}
                            </p>
                          )}
                          <label
                            for="CVERating"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            CVE rating
                          </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="CVSSRating"
                            {...getFieldProps("CVSSRating")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.CVSSRating && errors.CVSSRating
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.CVSSRating && errors.CVSSRating && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.CVSSRating}
                            </p>
                          )}
                          <label
                            for="CVSSRating"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            CVSS rating
                          </label>
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="CVSSVector"
                            {...getFieldProps("CVSSVector")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.CVSSVector && errors.CVSSVector
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.CVSSVector && errors.CVSSVector && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.CVSSVector}
                            </p>
                          )}
                          <label
                            for="CVSSVector"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            CVSS vector
                          </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="affectedHost"
                            {...getFieldProps("affectedHost")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.affectedHost && errors.affectedHost
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.affectedHost && errors.affectedHost && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.affectedHost}
                            </p>
                          )}
                          <label
                            for="affectedHost"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Affected host
                          </label>
                        </div>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <textarea
                          type="text"
                          name="observation"
                          {...getFieldProps("observation")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            Boolean(
                              touched.observation && errors.observation
                            ) && "!border-red-500"
                          }`}
                          placeholder=" "
                        />
                        {touched.observation && errors.observation && (
                          <p className="text-xs mt-1 text-red-500 font-medium">
                            {errors.observation}
                          </p>
                        )}
                        <label
                          for="observation"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Observation
                        </label>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <textarea
                          type="text"
                          name="implication"
                          {...getFieldProps("implication")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            Boolean(
                              touched.implication && errors.implication
                            ) && "!border-red-500"
                          }`}
                          placeholder=" "
                        />
                        {touched.implication && errors.implication && (
                          <p className="text-xs mt-1 text-red-500 font-medium">
                            {errors.implication}
                          </p>
                        )}
                        <label
                          for="implication"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Implication
                        </label>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <textarea
                          type="text"
                          name="remediation"
                          {...getFieldProps("remediation")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            Boolean(
                              touched.remediation && errors.remediation
                            ) && "!border-red-500"
                          }`}
                          placeholder=" "
                        />
                        {touched.remediation && errors.remediation && (
                          <p className="text-xs mt-1 text-red-500 font-medium">
                            {errors.remediation}
                          </p>
                        )}
                        <label
                          for="remediation"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Remediation
                        </label>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <input
                          type="text"
                          name="screenshot"
                          {...getFieldProps("screenshot")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            Boolean(touched.screenshot && errors.screenshot) &&
                            "!border-red-500"
                          }`}
                          placeholder=" "
                        />
                        {touched.screenshot && errors.screenshot && (
                          <p className="text-xs mt-1 text-red-500 font-medium">
                            {errors.screenshot}
                          </p>
                        )}
                        <label
                          for="screenshot"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Screenshot
                        </label>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <textarea
                          type="text"
                          name="managementComments"
                          {...getFieldProps("managementComments")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            Boolean(
                              touched.managementComments &&
                                errors.managementComments
                            ) && "!border-red-500"
                          }`}
                          placeholder=" "
                        />
                        {touched.managementComments &&
                          errors.managementComments && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.managementComments}
                            </p>
                          )}
                        <label
                          for="managementComments"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Management comments
                        </label>
                      </div>

                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="date"
                            name="targetResolutionDate"
                            {...getFieldProps("targetResolutionDate")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.targetResolutionDate &&
                                  errors.targetResolutionDate
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.targetResolutionDate &&
                            errors.targetResolutionDate && (
                              <p className="text-xs mt-1 text-red-500 font-medium">
                                {errors.targetResolutionDate}
                              </p>
                            )}
                          <label
                            for="targetResolutionDate"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Target resolution date
                          </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <select
                            defaultValue=""
                            {...getFieldProps("status")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              !values.status &&
                              "!text-gray-500 dark:!text-gray-400"
                            } ${
                              Boolean(touched.status && errors.status) &&
                              "!border-red-500"
                            }`}
                          >
                            <option disabled value="">
                              Status...
                            </option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                            <option value="In Progress">In Progress</option>
                          </select>
                          {touched.status && errors.status && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.status}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="date"
                            name="dateRaised"
                            {...getFieldProps("dateRaised")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.dateRaised && errors.dateRaised
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.dateRaised && errors.dateRaised && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.dateRaised}
                            </p>
                          )}
                          <label
                            for="dateRaised"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Date raised
                          </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="DTOwner"
                            {...getFieldProps("DTOwner")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(touched.DTOwner && errors.DTOwner) &&
                              "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.DTOwner && errors.DTOwner && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.DTOwner}
                            </p>
                          )}
                          <label
                            for="DTOwner"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            DT owner
                          </label>
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 lg:gap-8">
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="text"
                            name="projectOwner"
                            {...getFieldProps("projectOwner")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.projectOwner && errors.projectOwner
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.projectOwner && errors.projectOwner && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.projectOwner}
                            </p>
                          )}
                          <label
                            for="projectOwner"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Project owner
                          </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                          <input
                            type="date"
                            name="DTFollowUpDate"
                            {...getFieldProps("DTFollowUpDate")}
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                              Boolean(
                                touched.DTFollowUpDate && errors.DTFollowUpDate
                              ) && "!border-red-500"
                            }`}
                            placeholder=" "
                          />
                          {touched.DTFollowUpDate && errors.DTFollowUpDate && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.DTFollowUpDate}
                            </p>
                          )}
                          <label
                            for="DTFollowUpDate"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            DT follow update
                          </label>
                        </div>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <textarea
                          name="followUpComments"
                          {...getFieldProps("followUpComments")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            Boolean(
                              touched.followUpComments &&
                                errors.followUpComments
                            ) && "!border-red-500"
                          }`}
                          placeholder=" "
                        />
                        {touched.followUpComments &&
                          errors.followUpComments && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.followUpComments}
                            </p>
                          )}
                        <label
                          for="followUpComments"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          FollowUp comments
                        </label>
                      </div>

                      <div className="relative z-0 mb-6 w-full group">
                        <select
                          defaultValue=""
                          {...getFieldProps("DTFollowUpStatus")}
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                            !values.DTFollowUpStatus &&
                            "!text-gray-500 dark:!text-gray-400"
                          } ${
                            Boolean(
                              touched.DTFollowUpStatus &&
                                errors.DTFollowUpStatus
                            ) && "!border-red-500"
                          }`}
                        >
                          <option disabled value="">
                            DT followup status...
                          </option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                        {touched.DTFollowUpStatus &&
                          errors.DTFollowUpStatus && (
                            <p className="text-xs mt-1 text-red-500 font-medium">
                              {errors.DTFollowUpStatus}
                            </p>
                          )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className={`btn btn-primary rounded px-16 w-max mt-8 ${
                            isSubmitting && "loading"
                          }`}
                        >
                          {!isSubmitting && "Update"}
                        </button>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditIssue;
