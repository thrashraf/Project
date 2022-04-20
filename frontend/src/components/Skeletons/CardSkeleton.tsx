import React from "react";
import Skeleton from "./Skeleton";

const CardSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((arr) => (
        <div
          key={arr}
          className="max-w-sm max-h-[300px] bg-white rounded-lg shadow-lg my-10"
        >
          <Skeleton type="h-[150px] rounded-t-lg w-full" />
          <section className="p-5">
            <Skeleton type="w-[200px] h-[12px]" />

            <section className="flex justify-between my-5">
              <Skeleton type="w-[50px] h-[12px]" />
              <Skeleton type="w-[50px] h-[12px]" />
            </section>
            <section className="flex justify-between">
              <Skeleton type="w-[50px] h-[12px]" />
              <Skeleton type="w-[50px] h-[12px]" />
            </section>
          </section>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
