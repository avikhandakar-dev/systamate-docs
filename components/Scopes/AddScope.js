import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import toast from "react-hot-toast";
import { fetchPostJSON } from "@lib/utils";
import { GlobalContext } from "@lib/GlobalContext";

const AddNewScope = ({ isOpen, closeModal, projectId }) => {
  const { doRefrash, setDoRefrash } = useContext(GlobalContext);
  const Schema = Yup.object().shape({
    name: Yup.string().max(50, "Too Long!").required("Name is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ name }) => {
      const response = await fetchPostJSON("/api/scope", {
        name,
        projectId,
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-700 shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Add new scope
                </Dialog.Title>
                <div className="mt-2">
                  <FormikProvider value={formik}>
                    <Form>
                      <div className="mt-8">
                        <div className="space-y-6">
                          <div className="relative z-0 w-full group">
                            <select
                              defaultValue=""
                              {...getFieldProps("name")}
                              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                                !values.name &&
                                "!text-gray-500 dark:!text-gray-400"
                              } ${
                                Boolean(touched.name && errors.name) &&
                                "!border-red-500"
                              }`}
                            >
                              <option disabled value="">
                                Project scope...
                              </option>
                              <option value="NVA">
                                Network Vulnerability Assessment
                              </option>
                              <option value="WebPT">
                                Web Penetration Testing
                              </option>
                              <option value="MPT">
                                Mobile Penetration Testing
                              </option>
                              <option value="TCPT">
                                Thick Client Penetration Testing
                              </option>
                              <option value="SCR">Source Code Review</option>
                              <option value="HSA">
                                Host Security Assessment
                              </option>
                            </select>
                            {values.name && (
                              <label
                                for="name"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Name
                              </label>
                            )}
                            {touched.name && errors.name && (
                              <p className="text-xs mt-1 text-red-500 font-medium">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div className="mt-8 flex justify-end">
                            <button
                              type="submit"
                              className={`btn btn-primary rounded px-16 w-max mt-8 ${
                                isSubmitting && "loading"
                              }`}
                            >
                              {!isSubmitting && "Submit"}
                            </button>
                          </div>
                        </div>
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

export default AddNewScope;
