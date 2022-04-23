import React from "react";

type Props = {
  view: string;
  setView: any;
};

export const Header = (props: Props) => {
  return (
    <div className="flex justify-between ">
      <section className="flex py-1 ">
        <span className="p-2 mr-3 rounded-md cursor-pointer bg-blue-500 text-white flex justify-center items-center w-[40px]">
          <i className="fa-solid fa-filter" />
        </span>
        
        <section className=" bg-blue-50 rounded-lg">
          <span className="p-2 ml-3 text-gray-400">
            <i className="fa-solid fa-magnifying-glass" />
          </span>
          <input
            type="text"
            className="text-lg px-4 py-2 bg-blue-50 rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none"
          />
        </section>
      </section>

      <section className="flex w-[70px] justify-between text-gray-400 h-[30px]">
        <i
          className={`fa-solid fa-calendar p-2 rounded-sm shadow-md cursor-pointer ${
            props.view === "calendar" && "text-white bg-blue-500"
          }`}
          onClick={() => props.setView("calendar")}
        />
        <i
          className={`fa-solid fa-bars p-2 rounded-sm shadow-md cursor-pointer ${
            props.view === "list" && "text-white bg-blue-500"
          }`}
          onClick={() => props.setView("list")}
        />
      </section>
    </div>
  );
};
