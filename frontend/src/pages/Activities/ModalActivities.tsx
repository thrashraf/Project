import React from "react";
import ModalUser from "../../components/ModalUser";

type Props = {
  showActivity: boolean;
  setShowActivity: any;
  activity: any;
};

export const ModalActivities = (props: Props) => {
  return (
    <ModalUser modal={props.showActivity} setModal={props.setShowActivity}>
      <div className="relative mx-auto bg-white max-w-md rounded-lg shadow z-50 ">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => props.setShowActivity(!props.showActivity)}
            className="text-gray-400 bg-transparent absolute top-2 right-2 z-10 hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {props.activity && (
            <>
              <img
                src={
                  props.activity.img_url
                    ? props.activity.img_url
                    : "/assets/default-placeholder.jpg"
                }
                alt={props.activity.title}
                className="rounded-t-lg h-[200px] w-full object-cover"
              />

              <section className="p-4">
                <section className="flex justify-between items-center text-gray-400 text-sm">
                  <p>
                    {props.activity.start
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                  <p>{props.activity.venue}</p>
                </section>

                <section className="mt-3">
                  <h1 className="font-bold">{props.activity.title}</h1>
                  <section className="flex justify-between items-center mt-3 h-10">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      {props.activity.organizer}
                    </span>
                  </section>
                </section>
              </section>
            </>
          )}
        </div>
      </div>
    </ModalUser>
  );
};
