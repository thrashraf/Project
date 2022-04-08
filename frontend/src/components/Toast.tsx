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

  const errorIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="flex-none fill-current text-red-500 h-4 w-4"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
    </svg>
  );

  const successfulIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="flex-none fill-current text-green-500 h-4 w-4"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
    </svg>
  );

  return (
    <div
      className={`${
        props.status === "success" ? "bg-green-100" : "bg-red-100"
      } ${isVisible ? null : 'hidden'} z-50 p-5 w-full sm:w-1/2 fixed inset-x-0 mx-auto top-10 rounded-lg animate-fade-in-down`}
    >
      <div className="flex space-x-3">
        {props.status === "success" ? successfulIcon : errorIcon}
        <div className="leading-tight flex flex-col space-y-2">
          <div
            className={`text-sm font-medium ${
              props.status === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {props.status === "success" ? "Successful" : "Something went wrong"}
          </div>
          <div
            className={`flex-1 leading-snug text-sm ${
              props.status === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {props.message}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Toast;
