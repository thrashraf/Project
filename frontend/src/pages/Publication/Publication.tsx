import { url } from "inspector";
import React from "react";
import Modal2 from "../../components/Modal2";
import Navbar from "../../components/Navbar";
import Innovation from "../../components/Publication";
import Footer from "../../components/Footer";
import { useState } from "react";

export const Publication = () => {
  const background = {
    backgroundImage: "url(" + "/assets/bookshelves.jpg" + ")",
  };

  const [show, setShow] = useState(false);
  return (
    <>
      <Navbar />

      <section>
        <div className="pt-[10px]">
          <div
            className=" px-20 pb-16 pt-6 grid sm:grid-clos-2 flex right-0 left-0 lg:grid-cols-4 w-full gap-10 bg-no-repeat bg-cover"
            style={background}
          >
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
            <Innovation
              bg={"/assets/diges_psmza.png"}
              text="DIGES 2021"
              show={show}
              setShow={setShow}
            />
          </div>
        </div>
        <Modal2 show={show} setShow={setShow} />
      </section>
      <Footer />
    </>
  );
};
