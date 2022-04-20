import ProfileHeader from "@components/Profile/ProfileHeader";
import { MdAccountTree } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import EditProfileForm from "@components/Profile/EditProfileForm";
import { fetchGetJSON } from "@lib/utils";
import LoadingScreen from "@components/Global/LoadingScreen";
import { useState, useEffect } from "react";

const Breadcrumbs = [
  {
    title: "Account",
    href: "/",
    icon: <MdAccountTree />,
  },
  {
    title: "Settings",
    icon: <FaUserEdit />,
  },
];
const ProfileSettings = () => {
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
      <ProfileHeader bc={Breadcrumbs} />
      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <EditProfileForm profile={profile} />
      )}
    </>
  );
};

export default ProfileSettings;
