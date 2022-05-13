import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DeclineModal from './DeclineModal';
import Toast from '../../components/Toast';

// components

import CardTable from '../../components/Cards/CardTable';

export default function Tables() {
  const [allReport, setAllReport] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [report, setReport] = useState<any>();

  //declined message
  const [message, setMessage] = useState<string>('');

  const toastRef = useRef<any>(null);

  const verifyReport = (status: string, id: any) => {
    axios
      .post('/api/activities/verifyReport', { status, report, message })
      .then((res) => {
        //console.log(res);
        const id = report.id;
        const index = allReport.findIndex((report: any) => report.id === id);
        const tempArr = [...allReport];
        tempArr[index].status = status;

        //clear message
        setMessage('');
        setAllReport(tempArr);
        toastHandler(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastHandler = (status: any) => {
    if (toastRef.current !== null) {
      if (status !== 'verified') {
        toastRef.current.showToast();
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(`/api/activities/getAllActivities?q=${''}`);
      setAllReport([...data.data]);
    };
    fetch();
  }, []);

  console.log(allReport);
  return (
    <>
      <Toast
        status={'success'}
        message={'Successful send notification to user!'}
        ref={toastRef}
      />
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <CardTable
            reports={allReport}
            color={'light'}
            setReport={setAllReport}
            modal={modal}
            setModal={setModal}
            verifyReport={verifyReport}
            selectedReport={setReport}
          />
          <DeclineModal
            modal={modal}
            setModal={setModal}
            verifyReport={verifyReport}
            report={report}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </>
  );
}
