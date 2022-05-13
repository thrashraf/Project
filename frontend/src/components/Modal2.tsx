import React, { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useModal from "../hooks/useModal";
import More from "../components/More";
import ModalUser from "./ModalUser";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { activitiesSelector, editModeHandler } from "../features/activities/Activities";

type Props = {
  show: boolean;
  setShow: any;
  publication: any;
};

const Modal2 = (props: Props) => {
  const [publication, setPublication] = useState<any>(null);

  const { editMode } = useAppSelector(activitiesSelector);
  const dispatch = useAppDispatch();
  const { isShowing, toggle } = useModal();

  //? for edit mode
  const showEditComp = editMode ? "visible" : "hidden";
  const hideEditComp = editMode ? "hidden" : "visible";

  const title = useInput("");
  const description = useInput("");
  const isbn = useInput("");
  const staff = useInput("");
  const year = useInput("");

  const toggleEditMode = () => dispatch(editModeHandler());

  useEffect(() => {
    if (props.publication) {
      setPublication(props.publication);

      title.setInput(props.publication.Title);
      description.setInput(props.publication.Description);
      isbn.setInput(props.publication.isbn);
      staff.setInput(props.publication.staff);
      year.setInput(props.publication.year);
    }
  }, [props.publication]);

  const closeModal = () => {
    props.setShow(!props.show)
    toggleEditMode()
    toggle()
  }

  return (
    <div>
      <div>
        {props.show && props.publication && (
          <div
            className="py-12 transition duration-150 ease-in-out z-10 absolute top-0  bottom-0 right-0 left-0 text-center"
            id="modal"
          >
            <div
              className="bg-[#00000055] fixed z-10 inset-0 "
              onClick={closeModal}
            />
            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
              <div className="  mt-10 left-0 right-0 mx-6 lg:mx-auto lg:max-w-lg max-h-[600px]  overflow-y-auto  break-words py-8 px-8 lg:md:px-16 bg-white fixed z-20  shadow-md rounded-lg border border-gray-400">
                <div className="w-full flex justify-center text-green-400 mb-4"></div>
                <img
                  src={`/assets/${publication?.img_url}`}
                  className=" rounded-lg mb-10 w-[400px] h-[200px] object-contain"
                ></img>
                <h1
                  className={`${hideEditComp} text-center text-black  font-extrabold tracking-normal leading-tight mb-4`}
                >
                  {publication?.Title}
                </h1>
                <input
                  type="text"
                  onChange={(e) => title.setInput(e.target.value)}
                  value={title.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <p className={`mb-5 text-sm text-gray-900 dark:text-gray-400 text-center font-normal ${hideEditComp}`}>
                  {publication?.Description}
                </p>
                <input
                  type="text"
                  onChange={(e) => description.setInput(e.target.value)}
                  value={description.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <p className={`mb-5 text-sm text-gray-900 dark:text-gray-400 text-center font-normal ${hideEditComp}`}>
                  ISBN:{publication?.isbn}
                </p>
                <input
                  onChange={(e) => isbn.setInput(e.target.value)}
                  value={isbn.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <ol className={`my-5 ${hideEditComp}`}>
                  {publication?.staff.split("\r\n").map((staffName: string) => (
                    <li className=" text-sm text-gray-900 dark:text-gray-400 text-center font-normal my-0">
                      {staffName}
                    </li>
                  ))}
                </ol>
                <textarea
                  onChange={(e) => staff.setInput(e.target.value)}
                  value={staff.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <p className={`mb-5 text-sm text-gray-900 dark:text-gray-400 text-center font-normal ${hideEditComp}`}>
                  {publication?.year}
                </p>
                <input
                  onChange={(e) => year.setInput(e.target.value)}
                  value={year.value}
                  className={`bg-blue-50 px-3 py-2 rounded-md outline-none  text-black mb-4 w-full ${showEditComp}`}
                />

                <div className={`flex items-center mr-3 justify-center w-full ${hideEditComp}`}>
                  <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-blue-500 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                    <a href={`/assets/${publication?.pdf_url}`} target="_blank">
                      View Publication
                    </a>
                  </button>
                </div>

                <section>
                      <button
                        className={`hover:bg-black mr-5 text-black px-4 py-2 rounded-lg hover:text-white ${showEditComp}`}
                        onClick={toggleEditMode}
                      >
                        Cancel
                      </button>
                      <button
                        className={`bg-blue-500 px-4 py-2 rounded-lg text-white ${showEditComp}`}
                        //onClick={updateCurrentActivities}
                      >
                        Save
                      </button>
                    </section>

                <div
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => props.setShow(!props.show)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    className="icon icon-tabler icon-tabler-x"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
                <div className="cursor-pointer absolute top-0 left-3 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out">
                  <section className="fixed w-10">
                    <More isShowing={isShowing} toggle={toggle} />
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal2;
