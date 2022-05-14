import React, { useEffect } from "react";
import Modal2 from "../../components/Modal2";
import Navbar from "../../components/Navbar";
import CardPublication from "../../components/cardPublication";
import Footer from "../../components/Footer";
import { useState } from "react";
import AddPublication from "./AddPublication";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  publicationSelector,
  getAllPublication,
} from "../../features/Publication/Publication";

export const Publications = () => {
  const background = {
    backgroundImage: "url(" + "/assets/bookshelves.jpg" + ")",
  };

  const { allPublication, isFetching }: any =
    useAppSelector(publicationSelector);

  const [show, setShow] = useState(false);
  const [eShow, setEShow] = useState(false);
  // const [allPublication, setAllPublication] = useState<any>();
  const [publication, setPublication] = useState<any>(null);

  const viewPublicationHandler = (id: string, publication: any) => {
    setPublication(publication);
    setShow(!show);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPublication());
  }, []);

  return (
    <>
      <Navbar />

      <section>
        <div className="pt-[10px]">
          <div
            className=" px-20 pb-16 pt-6 right-0 left-0 lg:h-full w-full bg-no-repeat bg-cover"
            style={background}
          >
            <CardPublication viewPublicationHandler={viewPublicationHandler} />

            <AddPublication isShowing={eShow} toggle={setEShow} />

              <button
                className="inline-flex items-center fixed right-10 bottom-10 justify-center w-16 h-16 mr-2 text-pink-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-900"
                onClick={() => setEShow(!eShow)}
              >
                <p className=" text-2xl">+</p>
              </button>
            <Modal2 publication={publication} show={show} setShow={setShow} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
