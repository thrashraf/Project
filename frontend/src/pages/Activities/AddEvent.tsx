import React from "react";
import ModalContainer from "../../components/ModalContainer";
import Dropzone from "../../components/Dropzone";
import useInput from "../../hooks/useInput";

type Props = {
  isShowing: boolean;
  toggle: any;
};

const AddEvent = (props: Props) => {
  const title = useInput("");
  const startEvent = useInput("");
  const endEvent = useInput("");
  const organizer = useInput("");
  const venue = useInput("");

  return (
    <ModalContainer isShowing={props.isShowing} toggle={props.toggle}>
      <div className="relative mx-auto bg-white max-w-lg rounded-lg shadow z-50 ">
        <div className="flex flex-col px-5 py-3">
          <section className="my-5">
            <p className="my-1 text-sm text-gray-400 ml-1">
              Title
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name=""
              className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
            />
          </section>
          <div className="grid grid-cols-2 gap-5">
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                Start Date
                <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                name=""
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
              />
            </section>
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                End Date
                <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                name=""
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
              />
            </section>
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                Organizer
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                name=""
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
              />
            </section>
            <section className="">
              <p className="my-1 text-sm text-gray-400 ml-1">
                Venue
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                name=""
                className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
              />
            </section>
          </div>
          <section className="my-5">
            <Dropzone />
          </section>
          <section className=" flex justify-end">
            <button className="flex hover:bg-black hover:text-white px-3 py-2  rounded-lg mr-5"
            onClick={props.toggle}
            >
              Cancel
            </button>
            <button className="flex bg-blue-500 px-3 py-2 text-white rounded-lg">
              Create
            </button>
          </section>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddEvent;
