import React from "react";
import { useState, useEffect } from "react";
import Modal2 from "../components/Modal2";
import { Modal } from "./Modal";

type Props = {
  bg: any;
  text: string;
  show: boolean;
  setShow: any;
};

export const Publication = (props: Props) => {
  const [allPublication, setAllPublication] = useState<any>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/publication/getAllPublication", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data);
      setAllPublication(data.allPublication);
    };
    fetchData();
  }, []);
  return (
    <>
      <div
        className="relative mt-[100px]"
        onClick={() => props.setShow(!props.show)}
      >
        <img src={props.bg} alt="/" className="object-cover h-[150px] w-full" />
        <div className="bg-gray-900/30  absolute top-0 left-0 w-full h-full cursor-pointer"></div>
      </div>
    </>
  );
};
export default Publication;
