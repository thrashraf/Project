import axios from "axios";
import React, { useEffect, useState } from "react";

// components

import CardTable from "../../components/Cards/CardTable";

export default function Tables() {

  const [allReport, setAllReport] = useState<any>([]);

  useEffect(() => {

    const fetch = async () => {
      const data = await axios.get('/api/report/getAllReport');
      setAllReport((report: any) => [...report, ...data.data.reports]);
  }
    fetch();
  }, [])

  console.log(allReport);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable reports={allReport} color={'light'} setReport={setAllReport}/>
        </div>
      </div>
    </>
  );
}
