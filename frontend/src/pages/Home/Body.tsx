import React from "react";
import Innovation from "../../components/Innovation";

export const Body = () => {
  return (
    <div className="mt-10">
      <h1 className=" font-extrabold lg:text-5xl mb-2 text-center rounded-2xl border-gray-800 border-2 w-[50%] mx-auto p-2">
        Publication
      </h1>
      <div className="max-w-[1240px] mx-auto px-4 pb-16 pt-6 grid sm:grid-clos-2 lg:grid-cols-3 gap-4">
        <Innovation bg={"/assets/diges_psmza.png"} text="DIGES 2021" />
        <Innovation bg={"/assets/Kolaborasi.png"} text="Kolaborasi JKE & UITM" />
        <Innovation bg={"/assets/pelan_transformasi.png"} text="Pelas Tranformasi PSMZA" />
        <Innovation bg={"/assets/Proceeding_3rd.png"} text="Eproceeding MATRIX" />
        <Innovation bg={"/assets/Psmza_skills.png"} text="PSMZA Skills 2021" />
        <Innovation bg={"/assets/Risiko.png"} text="Risiko Dan Peluang PSMZA" />
      </div>
    </div>
  );
};
