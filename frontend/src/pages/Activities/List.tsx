import React from "react";

type Props = {
  activities: any;
};

export const List = (props: Props) => {
  return (
    <>
      {props.activities
        ?.sort(
          (start: any, end: any) =>
            (new Date(start.start) as any) - (new Date(end.start) as any)
        )
        .map((item: any) => (
          <div className="grid grid-cols-6 px-3 text-sm border-[1px] border-gray-300 py-5 shadow-sm first:rounded-t-lg last:rounded-b-lg bg-white">
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
    </>
  );
};
