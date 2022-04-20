import Link from "next/link";
import AuthContext from "@lib/AuthContext";
import { useContext, useState } from "react";

const ProfileDetails = ({ profile }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto max-w-screen-xl pt-8 pb-8">
      <div className="bg-slate-100 dark:bg-slate-700 rounded-md border dark:border-slate-600">
        <div className="border-b px-6 py-4 dark:border-slate-600 flex items-center justify-between">
          <p className="font-semibold text-lg">Profile Details</p>
          <Link href="/account/settings">
            <a className="btn btn-primary btn-sm rounded">Edit Profile</a>
          </Link>
        </div>

        <div className="grid gap-4 p-6">
          <div className="flex items-center justify-between max-w-md">
            <p className="text-gray-500 dark:text-gray-400">Full Name</p>
            <p>{user.name}</p>
          </div>
          <div className="flex items-center justify-between max-w-md">
            <p className="text-gray-500 dark:text-gray-400">Gender</p>
            <p>{profile.gender}</p>
          </div>
          <div className="flex items-center justify-between max-w-md">
            <p className="text-gray-500 dark:text-gray-400">Contact Phone</p>
            <p>{profile.phone}</p>
          </div>
          <div className="flex items-center justify-between max-w-md">
            <p className="text-gray-500 dark:text-gray-400">Position</p>
            <p>{profile.position}</p>
          </div>
          <div className="flex items-center justify-between max-w-md">
            <p className="text-gray-500 dark:text-gray-400">Department</p>
            <p>{profile.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
