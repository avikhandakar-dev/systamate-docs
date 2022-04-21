import ProfileHeader from "@components/Profile/ProfileHeader";
import UpdatePasswordForm from "@components/Profile/UpdatePasswordForm";
import Head from "next/head";
import { MdAccountTree } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Breadcrumbs = [
  {
    title: "Account",
    href: "/",
    icon: <MdAccountTree />,
  },
  {
    title: "Password",
    icon: <RiLockPasswordFill />,
  },
];
const UpdatePassword = () => {
  return (
    <>
      <Head>
        <title>Update Password</title>
      </Head>
      <ProfileHeader bc={Breadcrumbs} />
      <UpdatePasswordForm />
    </>
  );
};

export default UpdatePassword;
