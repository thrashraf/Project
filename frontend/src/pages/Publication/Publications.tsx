import React, { useEffect } from 'react';
import Modal2 from '../../components/Modal2';
import Navbar from '../../components/Navbar';
import CardPublication from '../../components/cardPublication';
import Footer from '../../components/Footer';
import { useState } from 'react';
import AddPublication from './AddPublication';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  publicationSelector,
  getAllPublication,
} from '../../features/Publication/Publication';
import { userSelector } from '../../features/user/User';
import ModalInnovation from '../Admin/ModalInnovation';
import useModal from '../../hooks/useModal';
import ModalPublication from '../Admin/ModalPublication';

export const Publications = () => {
  const background = {
    backgroundImage: 'url(' + '/assets/wood.jpg' + ')',
  };

  const { allPublication, isFetching }: any =
    useAppSelector(publicationSelector);

  const [show, setShow] = useState(false);
  const { isShowing: eShow, toggle: setEShow } = useModal();
  // const [allPublication, setAllPublication] = useState<any>();
  const [publication, setPublication] = useState<any>(null);

  const { user }: any = useAppSelector(userSelector);

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
        <div className='pt-[10px]'>
          <div
            className=' px-20 pb-16 pt-6 right-0 left-0 lg:h-full w-full bg-no-repeat bg-cover'
            style={background}
          >
            <CardPublication viewPublicationHandler={viewPublicationHandler} />

            {/* <AddPublication isShowing={eShow} toggle={setEShow} /> */}

            {user && (
              <button
                className=' bg-blue-500 absolute top-20 left-20 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-1 mx-10 text-xl'
                onClick={setEShow}
              >
                +
              </button>
            )}

            <ModalPublication
              isShowing={eShow}
              toggle={setEShow}
              publication={undefined}
              mode={'add'}
            />
            <Modal2 publication={publication} show={show} setShow={setShow} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
