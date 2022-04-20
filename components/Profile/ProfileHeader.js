import Link from "next/link";
import AuthContext from "@lib/AuthContext";
import { useContext } from "react";
import ActiveLink from "@components/Global/ActiveLink";
import { getAvatar } from "@lib/utils";

const Links = [
  {
    name: "Overview",
    href: "/account/profile",
  },
  {
    name: "Settings",
    href: "/account/settings",
  },
  {
    name: "Update Password",
    href: "/account/password",
  },
];
const ProfileHeader = ({ title = "Profile", bc }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="w-full bg-slate-100 dark:bg-slate-700">
        <div className="container max-w-screen-xl mx-auto py-6">
          <h1 className="text-xl font-medium">{title}</h1>
          {bc && (
            <div className="text-sm breadcrumbs">
              <ul>
                {bc.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <Link href={item.href}>
                        <a className="flex gap-2 items-center text-primary-500 font-medium">
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.title}</span>
                        </a>
                      </Link>
                    ) : (
                      <div className="flex gap-2 items-center text-gray-500">
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.title}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto mt-8">
        <div className="px-6 pt-6 bg-slate-100 dark:bg-slate-700 rounded-md border dark:border-slate-600">
          <div className="flex gap-8">
            <div className="avatar placeholder">
              <div className="w-24 rounded bg-primary-500">
                <span className="text-3xl text-white uppercase">
                  {getAvatar(user.name)}
                </span>
              </div>
            </div>
            <div>
              <p
                title={user.name}
                className="text-xl capitalize line-clamp-1 break-all font-semibold"
              >
                {user.name}
              </p>
              <p
                title={user.email}
                className="text-gray-400 line-clamp-1 break-all"
              >
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex gap-8 mt-8">
            {Links.map((item, idx) => (
              <ActiveLink
                activeClassName="!text-primary-500 border-b-2 border-primary-500"
                href={item.href}
              >
                <a className="pb-3">{item.name}</a>
              </ActiveLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
