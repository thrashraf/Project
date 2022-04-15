import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DeclineModal from "./DeclineModal";
import Toast from "../../components/Toast";

// components

import CardTable from "../../components/Cards/CardTable";

export default function Tables() {

  const [allReport, setAllReport] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [id, setReportId] = useState<string>("");

  //declined message
  const [message, setMessage] = useState<string>("");

  const toastRef = useRef<any>(null);

  const verifyReport = (status: string, id: any) => {

    axios
      .post("/api/report/verify", { status, id, message})
      .then((res) => {
        //console.log(res);
        const index = allReport.findIndex((report: any) => report.id === id);
        const tempArr = [...allReport];
        tempArr[index].status = status;

        //clear message
        setMessage("");
        setAllReport(tempArr);
        toastHandler(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastHandler = (status: any) => {
    if (toastRef.current !== null) {
      if (status !== "verified") {
        toastRef.current.showToast();
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get("/api/report/getAllReport");
      setAllReport((report: any) => [...report, ...data.data.reports]);
    };
    fetch();
  }, []);

  console.log(allReport);
  return (
    <>
      <Toast status={'success'} message={'Successful send notification to user!'} ref={toastRef} />
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable
            reports={allReport}
            color={"light"}
            setReport={setAllReport}
            modal={modal}
            setModal={setModal}
            verifyReport={verifyReport}
            setReportId={setReportId}
          />
          <DeclineModal
            modal={modal}
            setModal={setModal}
            verifyReport={verifyReport}
            id={id}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </>
  );
}
