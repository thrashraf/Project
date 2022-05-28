import React, { useEffect, useRef, useState } from 'react';
import Toast from '../../components/Toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// components

import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import ModalPublication from './ModalPublication';
import {
  getAllPublication,
  publicationSelector,
  handleFilter,
  setFilterHandler,
  deletePublicationHandler,
} from '../../features/Publication/Publication';
import axiosInstance from '../../utils/axiosInstance';

export default function Publication() {
  const dispatch = useAppDispatch();

  const { allPublication, query, filterData, showFilter, isSuccess } =
    useAppSelector(publicationSelector);

  const { isShowing, toggle } = useModal();
  const { isShowing: showModal, toggle: toggleModal } = useModal();

  const [publicationDetail, setPublicationDetail] = useState<any>();
  const mode = useInput('');

  useEffect(() => {
    const fetch = async () => {
      dispatch(getAllPublication());
    };
    fetch();
  }, []);

  const deletePublicationById = (id: string) => {
    axiosInstance
      .post(`/publication/deletePublication?q=${id}`, {
        withCredentials: true,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log('ok');

          dispatch(deletePublicationHandler(id));
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const setMode = (currentMode: string) => {
    toggleModal();
    mode.setInput(currentMode);
  };

  const edit = () => {
    setMode('update');
  };

  const toggleAction = (publication: any) => {
    toggle();
    setPublicationDetail(publication);
  };

  return (
    <>
      {' '}
      <section className='flex py-1 z-10 w-full justify-center '>
        <button
          className='px-4 py-3 rounded-lg bg-white text-black mr-5 z-10'
          onClick={() => setMode('add')}
        >
          <i className='fa-solid fa-plus' />
        </button>

        <section className=' bg-white rounded-lg z-10'>
          <span className='p-2 ml-3 text-gray-400'>
            <i className='fa-solid fa-magnifying-glass' />
          </span>
          <input
            type='text'
            placeholder='search by Title'
            className='text-lg px-4 py-2 bg-white rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none'
            onChange={(e) => dispatch(handleFilter(e.target.value))}
            value={query}
          />
          {filterData.slice(0, 15).length !== 0 && showFilter && (
            <div className='bg-white absolute shadow-md no-scrollbar overflow-hidden z-10 h-[200px] w-[450px] bottom-52 rounded-lg px-4 py-2 overflow-y-auto'>
              {filterData?.map((item: any, index: number) => (
                <p
                  className='p-3 cursor-pointer hover:bg-slate-100'
                  onClick={() => dispatch(setFilterHandler(item.Title))}
                  key={index}
                >
                  {item.Title}
                </p>
              ))}
            </div>
          )}
        </section>
      </section>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <div
            className={
              'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white'
            }
          >
            <div className='rounded-t mb-0 px-4 py-3 border-0'>
              <div className='flex flex-wrap items-center'>
                <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
                  <h3 className={'font-semibold text-lg text-blueGray-700'}>
                    List of publication
                  </h3>
                </div>
              </div>
            </div>
            <div className='block w-full overflow-x-auto'>
              {/* Projects table */}
              <table className='items-center w-full bg-transparent border-collapse '>
                <thead>
                  <tr>
                    {[
                      'Title',
                      'Description',
                      'ISBN',
                      'Staff',
                      'year',
                      'Actions',
                    ].map((item: any, index: number) => (
                      <th
                        key={index}
                        className={
                          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center g-blueGray-50 text-blueGray-500 border-blueGray-100'
                        }
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allPublication && allPublication.length > 0 ? (
                    allPublication?.map((item: any, index: number) => {
                      return (
                        <tr key={index} className='text-center relative'>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                              {item.Title}
                            </span>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            {item.Description}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            {item.isbn}
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <p>{item.staff}</p>
                          </td>
                          <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                            <p>{item.year}</p>
                          </td>
                          <td className='absolute right-[90px]'>
                            <section className='relative'>
                              <button
                                className='top-2 left-2 absolute text-black bg-transparent hover:bg-slate-100 z-10 rounded-lg text-sm py-5 px-3 ml-auto inline-flex items-center focus:outline-none '
                                onClick={() => toggleAction(item)}
                              >
                                <i className='fa-solid fa-ellipsis-vertical fa-xl ' />
                              </button>

                              {isShowing && item.id === publicationDetail.id ? (
                                <section className='bg-slate-50 absolute -left-32 w-[120px] z-50'>
                                  <ul>
                                    <li
                                      className='cursor-pointer hover:bg-slate-200 py-1 px-5 text-xs'
                                      onClick={edit}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className='cursor-pointer hover:bg-slate-200 py-1 px-5 text-xs'
                                      onClick={() =>
                                        deletePublicationById(item.id)
                                      }
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </section>
                              ) : null}
                            </section>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className='text-center flex'>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                          No item
                        </span>
                      </td>
                    </tr>
                  )}
                  <ModalPublication
                    isShowing={showModal}
                    toggle={toggleModal}
                    publication={publicationDetail}
                    mode={mode.value}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
