import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import { More } from "../icons/More";
import AddInnovation from "../pages/Innovation.tsx/AddInnovation";
import Categories from "./Categories";
import DropDown from "./Dropdown";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getInnovation,
  handleFilter,
  innovationSelector,
  setFilterHandler,
  setFilterInnovation,
} from "../features/Innovation/Innovation";
import useInput from "../hooks/useInput";
import generateYears from "../utils/generateYears";
import { medal } from "../utils/medal";

export const Table = ({ isShowing, toggle }: any) => {
  const dispatch = useAppDispatch();

  const { query, allInnovation, filterData, showFilter, tempInnovation } =
    useAppSelector(innovationSelector);

  const [medalFilter, setMedalFilter] = useState<string>("");

  const { isShowing: openFilter, toggle: toggleFilter } = useModal();
  const { isShowing: openYear, toggle: toggleYear } = useModal();
  const { isShowing: openMonth, toggle: toggleMonth } = useModal();

  const years = generateYears();

  useEffect(() => {
    dispatch(getInnovation(query));
  }, [query]);

  useEffect(() => {
    if (medalFilter) {
      const filteredInnovation = tempInnovation.filter(
        (item: any) => item.Medal === medalFilter
      );
      dispatch(setFilterInnovation(filteredInnovation));
    }

    if (medalFilter === "Medal") {
      setMedalFilter("");
      dispatch(setFilterInnovation(tempInnovation));
    }
  }, [medalFilter]);

  return (
    <div className="mt-20  pb-10" id="Inno">
      <h1 className=" font-extrabold lg:text-5xl mb-8 text-center rounded-2xl border-gray-800 border-2 w-[50%] mx-auto p-2">
        Innovation
      </h1>

      <div className="flex justify-between items-center">
        <section className="flex ">
          <button
            className=" bg-blue-500  transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-0 mx-10 text-xl"
            onClick={() => toggle()}
          >
            +
          </button>
          <section className=" bg-blue-50 rounded-lg flex">
            <span className="p-2 ml-3 text-gray-400">
              <i className="fa-solid fa-magnifying-glass" />
            </span>
            <input
              type="text"
              placeholder="search by title"
              className="text-lg px-4 py-2 bg-blue-50 rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none"
              onChange={(e) => dispatch(handleFilter(e.target.value))}
              value={query}
            />
            {filterData.slice(0, 15).length !== 0 && showFilter && (
              <div className="bg-blue-50 absolute  shadow-md no-scrollbar overflow-hidden z-10 h-[200px] w-[450px] top-60 rounded-lg px-4 py-2 overflow-y-auto">
                {filterData?.map((item: any, index: number) => (
                  <p
                    className="p-3 cursor-pointer hover:bg-slate-100"
                    onClick={() => dispatch(setFilterHandler(item.Title))}
                    key={index}
                  >
                    {item.Title}
                  </p>
                ))}
              </div>
            )}
          </section>
        </section>
        <section className="flex w-full justify-end">
          <section className="flex w-[400px] justify-between my-5">
            <DropDown
              isOpen={openFilter}
              setIsOpen={toggleFilter}
              //setFilterBy={props.setFilterItem}
              //navdropArr={filterActivities}
              //filterBy={props.filterBy}
              bgColor="bg-blue-500"
              title="Filter By"
              icon="fa-solid fa-filter mr-3"
            />
            <DropDown
              isOpen={openYear}
              setIsOpen={toggleYear}
              //setFilterBy={props.setYear}
              navdropArr={years}
              //filterBy={props.year}
              bgColor="bg-blue-500"
              title="Year"
              icon="fa-solid fa-calendar mr-3"
            />

            <DropDown
              isOpen={openMonth}
              setIsOpen={toggleMonth}
              setFilterBy={setMedalFilter}
              navdropArr={medal}
              filterBy={medalFilter}
              bgColor="bg-blue-500"
              title="Medal"
              icon="fa-solid fa-calendar mr-3"
            />
          </section>
        </section>
      </div>

      <div className="h-full w-full mb-[150px] ">
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
          {/* <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
          
        </div> */}
        </div>
        <div className="w-full lg:overflow-x-hidden h-full">
          <table className="w-full bg-white ">
            <thead>
              <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                <th className="text-gray-600 pr-5 dark:text-gray-400 font-normal  text-center text-sm tracking-normal ">
                  No.
                </th>

                <th className="text-gray-600 dark:text-gray-400 font-normal  text-left  text-sm tracking-normal ">
                  Innovasion Title
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal  text-center text-sm  tracking-normal leading-4">
                  Name
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal  text-center text-sm  tracking-normal leading-4">
                  Program
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal  text-center text-sm  tracking-normal leading-4">
                  Level
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal  text-center text-sm  tracking-normal leading-4">
                  Medal
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal  text-center text-sm  tracking-normal leading-4">
                  Years
                </th>
              </tr>
            </thead>

            <tbody className="">
              {allInnovation?.map((inno: any, index: number) => {
                return (
                  <tr
                    className="h-24   border-gray-300 dark:border-gray-200 border-b"
                    key={index}
                  >
                    <td className="text-xs pr-5 text-center whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                      {index + 1}
                    </td>
                    <td className=" whitespace-pre-line max-w-[100px]">
                      <div className="flex items-center">
                        <p className=" text-gray-800 ] text-left tracking-normal leading-4 text-xs">
                          {inno.Title}
                        </p>
                      </div>
                    </td>
                    <td className="text-xs whitespace-pre-line max-w-[200px] text-center text-gray-800  tracking-normal leading-4">
                      {inno.Name}
                    </td>
                    <td className="text-xs whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                      {inno.Program}
                    </td>
                    <td className="text-xs whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                      {inno.Level}
                    </td>{" "}
                    <td className="text-xs whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                      {inno.Medal}
                    </td>
                    <td className="text-xs whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                      {inno.Year}
                    </td>
                    <td>
                      <button
                        className=" bg-blue-500  transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 py-0 mx-2 text-md"
                        onClick={() => toggle()}
                      >
                        Edit
                      </button>
                      
                    </td>
                    <td>
                      <button
                        className=" bg-blue-500  transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-0 mx-2 text-md"
                        onClick={() => toggle()}
                      >
                        Delete
                      </button>
                      
                    </td>

                    <div className={`z-[10px] inset-0 `} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
