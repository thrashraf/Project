import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DeclineModal from './DeclineModal';
import Toast from '../../components/Toast';
import { PasswordModal } from '../Report/PasswordModal';
import { useAppSelector } from '../../app/hooks';
// components

import CardTable from '../../components/Cards/CardTable';
import useModal from '../../hooks/useModal';
import { userSelector } from '../../features/user/User';
import api from '../../utils/api';
import useInput from '../../hooks/useInput';
import SignatureModal from '../Report/SignatureModal';

export default function Tables() {
  const { user }: any = useAppSelector(userSelector);

  const [allReport, setAllReport] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [report, setReport] = useState<any>();

  const [password, setPassword] = useState<any>('');

  const { isShowing, toggle } = useModal();
  const { isShowing: showSignatureModal, toggle: toggleSignature } = useModal();

  //declined message
  const [message, setMessage] = useState<string>('');

  const toastStatus = useInput('');
  const toastMessage = useInput('');
  const toastRef = useRef<any>(null);

  const status = useInput('');

  const setReportDetail = (reportStatus: string) => {
    status.setInput(reportStatus);
  };

  useEffect(() => {
    //check if signature exist
    user && !user.signature && toggleSignature();
  }, [user]);

  const verifyReport = (status: string, id: any) => {
    const kjSignature = user.signature;
    const kjName = user.name;
    api
      .post('/api/activities/verifyReport', {
        status,
        report,
        message,
        kjSignature,
        kjName,
      })
      .then((res) => {
        //console.log(res);
        const id = report.id;
        const index = allReport.findIndex((report: any) => report.id === id);
        const tempArr = [...allReport];
        tempArr[index].status = status;

        //clear message
        toastMessage.setInput('Successful send notification to user!');
        toastStatus.setInput('success');
        setAllReport(tempArr);
        toastHandler();
        toggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastHandler = () => {
    if (toastRef.current !== null) {
      toastRef.current.showToast();
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await api.get(`/api/activities/getAllActivities?q=${''}`);
      const report = data.data.filter((item: any) => item.content);
      setAllReport([...report]);
    };
    fetch();
  }, []);

  const authHandler = async (e: any) => {
    e.preventDefault();
    const email = user?.email;
    const reqPassword = password;

    await api
      .post('/api/user/auth', { email, reqPassword })
      .then((res) => {
        //console.log(res);
        verifyReport(status.value, report);
      })
      .catch((err) => {
        toastMessage.setInput('Invalid Password');
        toastStatus.setInput('error');
        toastHandler();
      });
  };

  console.log(allReport);
  return (
    <>
      <Toast
        status={toastStatus.value}
        message={toastMessage.value}
        ref={toastRef}
      />

      <PasswordModal
        showModal={isShowing}
        setShowModal={toggle}
        password={password}
        setPassword={setPassword}
        authHandler={authHandler}
      />

      <SignatureModal isShowing={showSignatureModal} toggle={toggleSignature} />

      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <CardTable
            reports={allReport}
            color={'light'}
            setReport={setAllReport}
            modal={modal}
            setModal={setModal}
            verifyReport={toggle}
            selectedReport={setReport}
            setReportDetail={setReportDetail}
          />
          <DeclineModal
            modal={modal}
            setModal={setModal}
            verifyReport={toggle}
            message={message}
            setMessage={setMessage}
            setReportDetail={setReportDetail}
          />
        </div>
      </div>
    </>
  );
}
