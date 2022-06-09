import React, { useEffect, useRef } from 'react';
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
import ReactToPrint from 'react-to-print';

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

  const tableRef = useRef<any>(null);

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
            <h1 className=' font-extrabold lg:text-5xl mb-8 text-center mt-[60px] rounded-2xl border-gray-800 border-2 w-[50%] mx-auto p-2'>
              Publications
            </h1>

            <div className='flex w-[300px]'>
              {user && (
                <button
                  className=' bg-blue-500 left-10 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-7 py-2 mx-10 text-xl'
                  onClick={setEShow}
                >
                  +
                </button>
              )}

              <ReactToPrint
                trigger={() => {
                  return (
                    <button className='text-white bg-orange-500 z-10 font-medium hover:bg-slate-100 hover:text-black px-3 py-2 rounded-md'>
                      <i className='fa-solid fa-print mr-3' />
                      Print
                    </button>
                  );
                }}
                content={() => tableRef.current}
                pageStyle='print'
              />
            </div>

            <CardPublication viewPublicationHandler={viewPublicationHandler} />

            <ModalPublication
              isShowing={eShow}
              toggle={setEShow}
              publication={undefined}
              mode={'add'}
            />
            <Modal2 publication={publication} show={show} setShow={setShow} />
            <div ref={tableRef}>
              <h1 className='text-xl mb-10 hidden print:block text-center'>
                List of Publications
              </h1>
              <table className='items-center w-full bg-transparent border-collapse hidden print:block'>
                <thead>
                  <tr>
                    {[
                      'No',
                      'Title',
                      'Description',
                      'ISBN',
                      'Staff',
                      'Years',
                    ].map((item: any, index: number) => (
                      <th
                        key={index}
                        className={
                          'px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center g-blueGray-50 text-blueGray-500 border-blueGray-100'
                        }
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className=' overflow-y-hidden '>
                  {allPublication && allPublication.length > 0 ? (
                    allPublication?.map((inno: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className='text-center  odd:bg-slate-100'
                        >
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4 '>
                            {`${index + 1}.`}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4 text-blue-500 hover:underline cursor-pointer'>
                            <p>{inno.Title}</p>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                            {inno.Description}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                            <p>{inno.isbn}</p>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                            {inno.staff}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                            {inno.year}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className='text-center flex'>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4'>
                        <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                          No item
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
