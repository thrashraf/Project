import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const IndexDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = useRef <any>(null);
  const popoverDropdownRef = useRef <any>(null);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="hover:text-blue-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href=""
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        MENU
        
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent "
          }
        >
          Layout
        </span>
        
        <Link
          to="/admin/settings"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500"
        >
          Settings
        </Link>
        <Link
          to="/auth/login"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500"
        >
           Profile
        </Link>
        
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100 hover:text-blue-500" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          
          Activity
        </span>
        <Link
          to="/innovation"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500"
        >
          Innovation
        </Link>
        <Link
          to="/publication"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-blue-500"
        >
          Publication
        </Link>
      </div>
    </>
  );
};

export default IndexDropdown;
