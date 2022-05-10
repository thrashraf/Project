import { useEffect, useState } from "react";
import { More } from "../icons/More";
import Categories from "./Categories";



export const Table = () => {
  const [allInno, setAllInno] = useState<any>()
  const [filters, setFilters] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const fetchData = async() => {
        const response = await fetch("/api/inno/getAllInno", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            
          });
          let data = await response.json();
          console.log(data)
          setAllInno(data.allInno)

    } 
    fetchData()
},[])



  return (
    <div className="mt-20  pb-10" id='Inno'>
      <h1 className=" font-extrabold lg:text-5xl mb-8 text-center rounded-2xl border-gray-800 border-2 w-[50%] mx-auto p-2">
        Innovation
      </h1>

      <section className="flex justify-end mr-[150px] my-3">
        <Categories
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFilter={undefined}
        filter={""}      
        />
        </section>
      
    <div className="h-full mb-[150px] mx-[5%]">
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
              
             

            </tr>
          </thead>

          <tbody className="">
            {allInno?.map((inno: any) => {

              return (
                <tr
                  className="h-24   border-gray-300 dark:border-gray-200 border-b"
                  key={inno.id}
                >

                  <td className="text-sm pr-5 text-center whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                    {inno.id}
                  </td>
                  <td className=" whitespace-pre-line max-w-[100px]">
                    <div className="flex items-center">
                      
                      <p className=" text-gray-800 ] text-left tracking-normal leading-4 text-sm">
                        {inno.Title}
                      </p>
                    </div>
                  </td>
                  <td className="text-sm whitespace-pre-line max-w-[200px] text-center text-gray-800  tracking-normal leading-4">
                    {inno.Name}
                  </td>
                  <td className="text-sm whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                    {inno.Program}
                  </td>
                  <td className="text-sm whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                    {inno.Level}
                  </td> <td className="text-sm whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                    {inno.Medal}
                  </td>
                  

                
                
                  <div
                    className={`z-[10px] inset-0 `}
                  />
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
