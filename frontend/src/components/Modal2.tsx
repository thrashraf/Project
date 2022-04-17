import React, { useEffect, useState } from "react";

type Props = {
  show: boolean;
  setShow: any;
  publication: any;
};

const Modal2 = (props: Props) => {

  const [publication, setPublication] = useState<any>(null);

  useEffect(() => {
    if (props.publication) {
      setPublication(props.publication)
    }
  }, [props.publication])

  return (
    <div>
      <div>
        {props.show && props.publication &&  (
          <div
            className="py-12 transition duration-150 ease-in-out z-10 absolute top-0  bottom-0 right-0 left-0"
            
            id="modal"
          >
            <div className="bg-[#00000055] fixed inset-0 "  onClick={() => props.setShow(!props.show)} />
            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
              <div className="  mt-20 lg:mx-auto max-w-lg break-words  py-8 px-8 md:px-16  bg-white  dark:bg-gray-800 fixed dark:border-gray-700 shadow-md rounded-lg border border-gray-400">
                <div className="w-full flex justify-center text-green-400 mb-4"></div>
                <img src={`/assets/${publication?.img_url}`}  className=" rounded-lg mb-10"></img>
                <h1 className="text-center text-gray-800 dark:text-gray-100 font-extrabold tracking-normal leading-tight mb-4">
                  {publication?.Title}
                </h1>
                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                {publication?.Description}
                </p>
                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">
                  ISBN: 978-967-2099-64-2
                </p>
                <div className="flex items-center justify-center w-full">
                  <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                    View Publication
                  </button>
                  <button
                    className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 
                                dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400
                                 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                    onClick={() => props.setShow(!props.show)}
                  >
                    Cancel
                  </button>
                </div>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal2;
