import { Dashboard } from "../../icons/Dashboard";
import { User } from "../../icons/User";
import { Report } from "../../icons/Report";
import { Setting } from "../../icons/Setting";
import { Notification } from "../../icons/Notification";
import { Logout } from "../../icons/Logout";
import { Dispatch, SetStateAction, useState } from "react";
import { Hamburger } from "../../components/Hamburger";
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../features/user/User';

type Props = {
  setTabs: Dispatch<SetStateAction<number>>;
  tabs: number;
};

export const Sidebar = (props: Props) => {
  const [showNav, setShowNav] = useState<Boolean>(true);

  const nav = [
    {
      icon: <Dashboard />,
      name: "Dashboard",
    },
    {
      icon: <User />,
      name: "User",
    },
    {
      icon: <Report />,
      name: "Activities ",
    },
  ];

  const { user }: any = useAppSelector(userSelector);

  return (
    <>
      <div
        className={`w-64 bg-gray-900 shadow  flex-col justify-between flex sm:flex h-screen absolute lg:relative ${
          showNav ? null : "-translate-x-[100%]"
        } transition-all ease-in-out delay-100`}
      >
        <div>
          {/* <div className="h-16 w-full flex items-center px-8">
            logo
          </div> */}

          <ul className="mt-5">
            {nav?.map((item, index) => {
              return (
                <li
                  className={`flex w-full justify-between hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center py-3 px-8 ${
                    props.tabs === index
                      ? "bg-indigo-800 text-white"
                      : "text-gray-600"
                  }`}
                  key={item.name}
                  onClick={() => props.setTabs(index)}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="text-sm  ml-2">{item.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* profile */}
          <div className="flex items-center mb-4 px-8 absolute bottom-10 ">
            <div className="w-10 h-10 bg-cover rounded-md mr-3">
              <img
                src={user?.profile_image ? user.profile_image : '/assets/dummy_profile.png'}
                alt="profile"
                className="rounded-full h-full w-full overflow-hidden shadow"
              />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">{user?.name}</p>
              <p className="text-gray-600 text-xs">View Profile</p>
            </div>
          </div>
        </div>
        <div className="px-8 bg-gray-900">
          <ul className="w-full flex items-center justify-between ">
            {[<Notification />, <User />, <Setting />, <Logout />].map(
              (item, index) => {
                return (
                  <li
                    className="cursor-pointer text-white pt-5 pb-3"
                    key={index}
                  >
                    {item}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
      <div className="text-gray-600 visible sm:hidden absolute right-3 top-2 ">
        <div onClick={() => setShowNav(!showNav)}>
          <Hamburger />
        </div>
      </div>
    </>
  );
};
