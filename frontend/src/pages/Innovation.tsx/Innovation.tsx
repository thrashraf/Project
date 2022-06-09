import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { Table } from '../../components/Table';
import { deleteInnovationHandler } from '../../features/Innovation/Innovation';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import api from '../../utils/api';
import axiosInstance from '../../utils/axiosInstance';
import ModalInnovation from '../Admin/ModalInnovation';

export const Innovation = (props: any) => {
  const { isShowing, toggle } = useModal();
  const { isShowing: showModal, toggle: toggleModal } = useModal();

  const [innovationDetail, setInnovationDetail] = useState<any>();
  const mode = useInput('');

  const dispatch = useAppDispatch();

  const setMode = (currentMode: string) => {
    toggleModal();
    mode.setInput(currentMode);
  };

  console.log(showModal);

  const edit = (innovation: any) => {
    setInnovationDetail(innovation);
    setMode('update');
  };

  const toggleAction = (innovation: any) => {
    setInnovationDetail(innovation);
    toggle();
  };

  const deletePublicationById = (id: string) => {
    axiosInstance
      .delete(`/inno/deleteInnovation?q=${id}`)
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');

          dispatch(deleteInnovationHandler(id));
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      <div className=' max-w-7xl mx-auto relative'>
        <Table
          isShowing={isShowing}
          toggle={toggle}
          toggleAction={toggleAction}
          innovationDetail={innovationDetail}
          edit={edit}
          deletePublicationById={deletePublicationById}
          setMode={setMode}
        />
      </div>

      <ModalInnovation
        isShowing={showModal}
        toggle={toggleModal}
        innovation={innovationDetail}
        mode={mode.value}
      />

      <Footer />
    </>
  );
};
