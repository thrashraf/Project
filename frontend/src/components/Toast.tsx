import React, { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
  status: string;
  message: string;
};

const Toast = forwardRef((props: Props, ref) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    showToast() {
      setVisible(true);
      //this to make toast hidden after 3second
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    },
  }));

  return (
    <div
      className={`${
        isVisible ? null : "hidden"
      } z-50 p-5  sm:w-1/2 fixed inset-x-0 mx-auto top-10 rounded-lg animate-fade-in-down`}
    >
      <div
        className={`flex max-w-[400px] justify-center m-auto p-4 mb-4 text-sm   rounded-lg ${props.status === 'success' ? 'text-green-600 bg-green-100' : 'text-red-700 bg-red-100'} `}
        role="alert"
      >
        <svg
          className="inline flex-shrink-0 mr-3 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <span className="font-medium">{props.message}</span> 
        </div>
      </div>
    </div>
  );
});

export default Toast;
