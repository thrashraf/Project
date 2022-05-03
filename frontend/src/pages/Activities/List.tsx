import React from "react";
import DropDown from "../../components/Dropdown";
import useModal from "../../hooks/useModal";
import generateYears from "../../utils/generateYears";
import filterActivities from "../../constant/filterActivities";


type Props = {
  activities: any;
  setFilterData: any;
  setFilterItem: any;
};

export const List = (props: Props) => {
  const { isShowing: openFilter, toggle: toggleFilter } = useModal();
  const { isShowing: openYear, toggle: toggleYear } = useModal();

  const years = generateYears();

  return (
    <>
      <div className="flex w-[200px] justify-between my-5 ">
        <DropDown
          isOpen={openFilter}
          setIsOpen={toggleFilter}
          setFilterBy={props.setFilterItem}
          navdropArr={filterActivities}
          title="Filter By"
          icon="fa-solid fa-filter mr-3"
        />
        <DropDown
          isOpen={openYear}
          setIsOpen={toggleYear}
          setFilterBy={props.setFilterItem}
          navdropArr={years}
          title="year"
          icon="fa-solid fa-calendar mr-3"
        />
      </div>
      <div className=" first:rounded-t-lg">
        {props.activities.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-6 px-3 text-sm border-[1px] border-gray-300 py-5 shadow-sm first:rounded-t-lg last:rounded-b-lg bg-white"
          >
            <h1 className="col-span-2 font-medium">{item.title}</h1>
            <p className="col-span-1 text-center">
              {item.start.slice(0, 10).split("-").reverse().join("/")}
            </p>
            <div className="col-span-2 mx-auto">
              <span className="bg-blue-100 m-auto  text-blue-800 mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {item.organizer}
              </span>
            </div>
            <p className="text-center">{item.venue}</p>
          </div>
        ))}
      </div>
    </>
  );
};
