import ProfileDetails from "@components/Profile/ProfileDetails";
import ProfileHeader from "@components/Profile/ProfileHeader";
import { MdAccountTree, MdAccountCircle } from "react-icons/md";
import { fetchGetJSON } from "@lib/utils";
import LoadingScreen from "@components/Global/LoadingScreen";
import { useState, useEffect } from "react";
import Head from "next/head";

const Breadcrumbs = [
  {
    title: "Account",
    href: "/",
    icon: <MdAccountTree />,
  },
  {
    title: "Profile",
    icon: <MdAccountCircle />,
  },
];
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubs = async () => {
      setIsLoading(true);
      const response = await fetchGetJSON("/api/profile/get");
      if (response.statusCode === 200) {
        setProfile(response.data);
      }
      setIsLoading(false);
    };
    unsubs();
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileHeader bc={Breadcrumbs} />
      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <ProfileDetails profile={profile} />
      )}
    </>
  );
};

export default Profile;
