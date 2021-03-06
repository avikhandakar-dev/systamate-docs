import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { IoMdExit } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import AuthContext from "@lib/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { getAvatar } from "@lib/utils";

const AuthIcon = () => {
  const { user, setUser, setToken } = useContext(AuthContext);
  const MenuItems = [
    {
      name: "Create Project",
      icon: <FaPlus />,
      url: "/project/new",
    },
    {
      name: "My Profile",
      icon: <FaUserEdit />,
      url: "/account/profile",
    },
  ];
  return (
    <Menu as="div" className="relative inline-block text-left mt-1">
      <Menu.Button className="outline-none focus:outline-none border-gray-200 dark:border-gray-600 relative">
        <AiOutlineUser className="text-2xl" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-2 right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div className="p-2 flex gap-4 items-center">
                <div className="avatar placeholder">
                  <div className="w-12 mask mask-squircle bg-primary-500">
                    <span className="text-xl text-white uppercase">
                      {getAvatar(user.name)}
                    </span>
                  </div>
                </div>
                <div>
                  <p
                    title={user.name}
                    className="text-sm capitalize line-clamp-1 break-all"
                  >
                    {user.name}
                  </p>
                  <p
                    title={user.email}
                    className="text-xs text-gray-400 line-clamp-1 break-all"
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </Menu.Item>
          {MenuItems.map((item, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <Link href={item.url}>
                  <a
                    className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <span className="mr-2" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                }}
                className={`group flex rounded-md items-center w-full px-2 py-2 text-sm hover:text-primary dark:text-gray-300 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <span className="mr-2" aria-hidden="true">
                  <IoMdExit />
                </span>
                Sign Out
              </button>
            )}
          </Menu.Item>
          <Menu.Item>{({ active }) => <ThemeToggle />}</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthIcon;
