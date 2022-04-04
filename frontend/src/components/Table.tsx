import { useEffect, useState } from "react";
import { More } from "../icons/More";
import { Pagination } from "../components/Pagination"


export const Table = () => {
  const [allInno, setAllInno] = useState<any>()


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
    <div className="pt-10  pb-10" id='Inno'>
      <h1 className=" font-extrabold lg:text-5xl mb-8 text-center rounded-2xl border-gray-800 border-2 w-[50%] mx-auto p-2">
        Innovation
      </h1>
    <div className="h-full mb-[150px]">
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
                  <td className=" whitespace-no-wrap">
                    <div className="flex items-center">
                      
                      <p className=" text-gray-800 ] text-center tracking-normal leading-4 text-sm">
                        {inno.Title}
                      </p>
                    </div>
                  </td>
                  <td className="text-sm whitespace-no-wrap text-center text-gray-800  tracking-normal leading-4">
                    {inno.Name}
                  </td>

                
                
                  <div
                    className={`z-[10px] inset-0 `}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination/>
      </div>
    </div>
  </div>
  );
};
