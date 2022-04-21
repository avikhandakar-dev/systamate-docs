import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { fetchPostJSON } from "@lib/utils";
import toast from "react-hot-toast";
import AuthContext from "@lib/AuthContext";
import { useContext } from "react";

const EditProfileForm = ({ profile }) => {
  const { user, setUser } = useContext(AuthContext);

  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .min(7, "Too short!")
      .max(16, "Too long!")
      .required("Phone is required"),
    position: Yup.string().required("Position is required"),
    department: Yup.string().required("Department is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      gender: profile.gender || "",
      phone: profile.phone || "",
      position: profile.position || "",
      department: profile.department || "",
    },
    validationSchema: Schema,
    onSubmit: async ({ name, gender, phone, position, department }) => {
      const response = await fetchPostJSON("/api/profile/edit", {
        name,
        gender,
        phone,
        position,
        department,
        avatar: "",
      });
      if (response.statusCode === 200) {
        setUser({
          ...user,
          name,
        });
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
          <p className="font-semibold text-lg">Edit Profile</p>
        </div>

        <FormikProvider value={formik}>
          <Form className="w-full flex flex-col gap-4 p-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                {...getFieldProps("name")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.name && errors.name) && "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.name && errors.name && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.name}
                </p>
              )}
              <label
                for="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full name
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <select
                defaultValue=""
                {...getFieldProps("gender")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  !values.gender && "!text-gray-500 dark:!text-gray-400"
                } ${
                  Boolean(touched.gender && errors.gender) && "!border-red-500"
                }`}
              >
                <option disabled value="">
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="I prefer not to say">I prefer not to say</option>
              </select>
              {values.gender && (
                <label
                  for="gender"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Gender
                </label>
              )}
              {touched.gender && errors.gender && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="phone"
                {...getFieldProps("phone")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.phone && errors.phone) && "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.phone && errors.phone && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.phone}
                </p>
              )}
              <label
                for="phone"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <select
                {...getFieldProps("position")}
                defaultValue=""
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  !values.position && "!text-gray-500 dark:!text-gray-400"
                } ${
                  Boolean(touched.position && errors.position) &&
                  "!border-red-500"
                }`}
              >
                <option disabled value="">
                  Position
                </option>
                <option value="Director">Director</option>
                <option value="Senior Manager">Senior Manager</option>
                <option value="Manager">Manager</option>
                <option value="Senior Consultant">Senior Consultant</option>
                <option value="Consultant">Consultant</option>
                <option value="Associate">Associate</option>
                <option value="Technical Associate">Technical Associate</option>
                <option value="Executive">Executive</option>
              </select>
              {values.position && (
                <label
                  for="position"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Position
                </label>
              )}
              {touched.position && errors.position && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.position}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="department"
                {...getFieldProps("department")}
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer ${
                  Boolean(touched.department && errors.department) &&
                  "!border-red-500"
                }`}
                placeholder=" "
              />
              {touched.department && errors.department && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.department}
                </p>
              )}
              <label
                for="department"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Department
              </label>
            </div>
            <button
              type="submit"
              className={`btn btn-primary rounded px-16 w-max mt-8 ${
                isSubmitting && "loading"
              }`}
            >
              {!isSubmitting && "Submit"}
            </button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EditProfileForm;
