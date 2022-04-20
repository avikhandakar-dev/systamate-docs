import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

const ScopeForm = ({ projectScope, setProjectScope, next, back }) => {
  const Schema = Yup.object().shape({
    projectScope: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Project scope is required!"),
  });

  const formik = useFormik({
    initialValues: {
      projectScope: projectScope.projectScope || "",
    },
    validationSchema: Schema,
    onSubmit: ({ projectScope }) => {
      setProjectScope({
        projectScope,
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
          <div className="shadow-card border-t-4 border-indigo-500 p-6 w-full rounded-md dark:border dark:border-t-4 dark:border-t-indigo-500 dark:border-slate-600 dark:bg-slate-800">
            <p className="mb-4 font-semibold uppercase">Project Scope</p>
            <div className="relative z-0 mb-6 w-full group">
              <select
                defaultValue=""
                {...getFieldProps("projectScope")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  !values.projectScope && "!text-gray-500 dark:!text-gray-400"
                } ${
                  Boolean(touched.projectScope && errors.projectScope) &&
                  "!border-red-500"
                }`}
              >
                <option disabled value="">
                  Project scope...
                </option>
                <option value="NVA">Network Vulnerability Assessment</option>
                <option value="WebPT">Web Penetration Testing</option>
                <option value="MPT">Mobile Penetration Testing</option>
                <option value="TCPT">Thick Client Penetration Testing</option>
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

export default ScopeForm;
