import { More } from "../../../icons/More";

type Props = {
  allUser: any;
  showMore: string;
  showMoreHandler: (id: string, user: object) => void;
  modalHandler: () => void;
  notificationHandler: () => void;
};

export const Table = (props: Props) => {


  return (
    <div className="h-full">

      <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
        {/* <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
          
        </div> */}
      </div>
      <div className="w-full lg:overflow-x-hidden h-full">
        <table className="w-full bg-white ">
          <thead>
            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
              <th className="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                <input
                  type="checkbox"
                  className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
                />
              </th>

              <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                ID
              </th>

              <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Name
              </th>
              <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Email
              </th>
              <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Role
              </th>

              <td className="text-gray-600 dark:text-gray-400 font-normal pr-3 text-left text-sm tracking-normal leading-4">
                More
              </td>
            </tr>
          </thead>

          <tbody className="">
            {props.allUser?.map((user: any) => {

              return (
                <tr
                  className="h-24 border-gray-300 dark:border-gray-200 border-b"
                  key={user.id}
                >
                  <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800  tracking-normal leading-4">
                    <input
                      type="checkbox"
                      className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
                    />
                  </td>

                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                    {user.id}
                  </td>
                  <td className="pr-6 whitespace-no-wrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 sm:flex hidden ">
                        <img
                          src={
                            user.profile_picture !== "null"
                              ? user.profile_picture
                              : "/assets/dummy_profile.png"
                          }
                          className="h-full w-full rounded-full overflow-hidden shadow"
                          alt="profile"
                        />
                      </div>
                      <p className="ml-2 text-gray-800  tracking-normal leading-4 text-sm">
                        {user.name}
                      </p>
                    </div>
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                    {user.email}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                    <div className="bg-yellow-200 h-8 w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                      <div className="flex items-center">
                        <div className="h-1 w-1 rounded-full bg-yellow-500 mr-1" />
                        <span className="text-xs text-yellow-500 font-normal">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="pr-3 relative">
                    <div
                      className={`mt-8 z-50 absolute right-0 -ml-12 shadow-md w-32 ${
                        props.showMore === user.id ? null : "hidden"
                      }`}
                    >
                      <ul className="bg-white dark:bg-gray-800 shadow rounded py-1">
                        <li
                          className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal"
                          onClick={props.modalHandler}
                        >
                          Edit
                        </li>
                        <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal" 
                        onClick={props.notificationHandler}>
                          Delete
                        </li>
                      </ul>
                    </div>
                    <button
                      className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none"
                      onClick={() => props.showMoreHandler(user.id, user)}
                    >
                      <More />
                    </button>
                  </td>

                  <div
                    className={`z-[10px] inset-0 ${
                      props.showMore === user.id ? "absolute" : "hidden"
                    }`}
                    onClick={() => props.showMoreHandler("", {})}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
