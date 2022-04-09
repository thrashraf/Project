import React from "react";
import ModalUser from "../../components/ModalUser";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/User";

type Props = {
    showModal: boolean,
    setShowModal:  React.Dispatch<React.SetStateAction<boolean>>;
    password: string,
    setPassword: any
    authHandler: any
};

export const PasswordModal = (props: Props) => {

  const { user }: any = useAppSelector(userSelector);

  return (
    <ModalUser modal={props.showModal} setModal={props.setShowModal} >
      <div className="relative bg-white rounded-lg shadow z-50">
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={() => props.setShowModal(!props.showModal)}
            className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form
          className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
          action="#"
        >
          <h3 className="text-xl text-center font-medium text-gray-900 mb-10 ">
            Account confirmation
          </h3>
          {user ? (
            <div className="flex justify-center mb-20">
              <div className="flex ">
                <div className="flex items-center justify-center h-5 flex-col py-5">
                  <img
                    src={
                      user?.profile_picture !== "null"
                        ? user.profile_picture
                        : "/assets/dummy_profile.png"
                    }
                    alt="profile_picture"
                    className="w-[50px] h-[50px] rounded-full object-cover mt-5 mb-7"
                  />

                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900  text-center "
                  >
                    {user.name}
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          <div className="pt-10 ">
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-medium text-gray-900 "
            >
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  outline-none dark:placeholder-gray-400 "
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={props.authHandler}
          >
            Confirm
          </button>
        </form>
      </div>
    </ModalUser>
  );
};
