import axios from "axios";
import React, { useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable";

export default function Tables() {

  useEffect(() => {

    axios.get('').then(res => {
      
    })
    .catch(err => {

    })

  }, [])


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </>
  );
}
