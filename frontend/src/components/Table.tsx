import { useEffect, useRef, useState } from 'react';

import useModal from '../hooks/useModal';

import DropDown from './Dropdown';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getInnovation,
  handleFilter,
  innovationSelector,
  setFilterHandler,
  setFilterInnovation,
} from '../features/Innovation/Innovation';

import generateYears from '../utils/generateYears';

import { medal } from '../utils/medal';

import ModalInnovation from '../pages/Innovation.tsx/ModalInnovation';

import { userSelector } from '../features/user/User';
import ReactToPrint from 'react-to-print';
import DeleteModal from './DeleteModal';

export const Table = ({
  isShowing,
  toggleAction,
  innovationDetail,
  edit,
  deletePublicationById,
  setMode,
}: any) => {
  const dispatch = useAppDispatch();

  const { query, allInnovation, filterData, showFilter, tempInnovation } =
    useAppSelector(innovationSelector);

  const { user }: any = useAppSelector(userSelector);

  const [medalFilter, setMedalFilter] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const { isShowing: openYear, toggle: toggleYear } = useModal();
  const { isShowing: openMonth, toggle: toggleMonth } = useModal();
  const { isShowing: openModal, toggle: toggleModal } = useModal();

  const { isShowing: deleteModal, toggle: toggleDelete } = useModal();

  const [detailInnovation, setDetailInnovation] = useState(null);

  const years = generateYears();

  const tableRef = useRef<any>(null);

  useEffect(() => {
    dispatch(getInnovation(query));
  }, [query]);

  useEffect(() => {
    if (medalFilter === 'Medal') {
      setMedalFilter('');
      dispatch(setFilterInnovation(tempInnovation));
    }

    if (year === 'Year') {
      setYear('');
      dispatch(setFilterInnovation(tempInnovation));
    }

    if (medalFilter && medalFilter !== 'Medal') {
      const filteredInnovation = tempInnovation?.filter(
        (item: any) => item.Medal === medalFilter
      );
      dispatch(setFilterInnovation(filteredInnovation));
    } else if (year && year !== 'Year') {
      const filteredInnovation = tempInnovation?.filter(
        (item: any) =>
          (new Date(item.Year.toString()).getFullYear() as any) === year
      );
      console.log(filteredInnovation);
      dispatch(setFilterInnovation(filteredInnovation));
    }

    if (year && year !== 'Year' && medalFilter && medalFilter !== 'Medal') {
      const filteredInnovation = tempInnovation?.filter(
        (item: any) =>
          (new Date(item.Year.toString()).getFullYear() as any) === year &&
          item.Medal === medalFilter
      );
      dispatch(setFilterInnovation(filteredInnovation));
    }
  }, [medalFilter, year]);

  const showModal = (innovation: any) => {
    setDetailInnovation(innovation);
    toggleModal();
  };

  return (
    <div className='mt-20  pb-10 relative' id='Inno'>
      <h1 className=' font-extrabold lg:text-5xl mb-8 text-center rounded-2xl border-gray-800 border-2 w-[50%] mx-auto p-2'>
        Innovation
      </h1>

      <div className='flex justify-between items-center'>
        <section className='flex '>
          {user && (
            <button
              className=' bg-blue-500  transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-0 mx-10 text-xl'
              onClick={() => setMode('add')}
            >
              +
            </button>
          )}
          <section className=' bg-blue-50 rounded-lg flex justify-center items-center'>
            <span className='p-2 ml-3 text-gray-400'>
              <i className='fa-solid fa-magnifying-glass' />
            </span>
            <input
              type='text'
              placeholder='search by title'
              className='text-lg px-4 py-3 bg-blue-50 rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none'
              onChange={(e) => dispatch(handleFilter(e.target.value))}
              value={query}
            />
            {filterData.slice(0, 15).length !== 0 && showFilter && (
              <div className='bg-white absolute shadow-md no-scrollbar overflow-hidden z-20 h-[200px] w-[440px] top-40 rounded-lg px-4 py-2 overflow-y-auto'>
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
        <section className='flex w-full justify-end'>
          <section className='flex w-[350px] justify-between my-5'>
            <DropDown
              isOpen={openYear}
              setIsOpen={toggleYear}
              setFilterBy={setYear}
              navdropArr={years}
              filterBy={year}
              bgColor='bg-blue-500'
              title='Year'
              icon='fa-solid fa-calendar mr-3'
            />

            <DropDown
              isOpen={openMonth}
              setIsOpen={toggleMonth}
              setFilterBy={setMedalFilter}
              navdropArr={medal}
              filterBy={medalFilter}
              bgColor='bg-blue-500'
              title='Medal'
              icon='fa-solid fa-calendar mr-3'
            />

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
          </section>
        </section>
      </div>

      <div className='h-full w-full mb-[150px] mt-[50px]'>
        <div className='mx-auto container bg-white dark:bg-gray-800 shadow rounded'></div>
        <div className='w-full lg:overflow-x-hidden h-full'>
          <div ref={tableRef}>
            <h1 className='text-xl hidden text-center print:block mb-10'>
              List of Innovations
            </h1>
            <table className='items-center w-full bg-transparent border-collapse '>
              <thead>
                <tr>
                  {[
                    'No',
                    'Title',
                    'Description',
                    'Name',
                    'Program',
                    'Level',
                    'Medal',
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
                {allInnovation && allInnovation.length > 0 ? (
                  allInnovation?.map((inno: any, index: number) => {
                    return (
                      <tr key={index} className='text-center  odd:bg-slate-100'>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4 '>
                          {`${index + 1}.`}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4 text-blue-500 hover:underline cursor-pointer'>
                          <p onClick={() => showModal(inno)}>{inno.Title}</p>
                        </td>
                        <td className='border-t-0 px-6 text-left border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                          {inno.Description}
                        </td>
                        <td className='border-t-0 px-6 text-left border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                          {inno.Name.split('\n').map(
                            (item: any, index: number) => (
                              <p>
                                {index + 1}) {item}
                              </p>
                            )
                          )}
                        </td>
                        <td className='border-t-0 px-6 text-left border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                          <p>{inno.Program}</p>
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                          {inno.Level}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                          {inno.Medal}
                        </td>
                        <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-pre-wrap p-4'>
                          {inno.Year}
                        </td>
                        {user && (
                          <td className='right-[90px relative '>
                            <section className=''>
                              <button
                                className='top-2 left-10  text-black bg-transparent hover:bg-slate-100 z-10 rounded-lg text-sm py-5 px-3 ml-auto inline-flex items-center focus:outline-none '
                                onClick={() => toggleAction(inno)}
                              >
                                <i className='fa-solid fa-ellipsis-vertical fa-xl ' />
                              </button>

                              {isShowing &&
                              innovationDetail &&
                              inno.id === innovationDetail.id ? (
                                <section className='bg-slate-50 absolute -top-2 -left-28 w-[120px] z-10'>
                                  <ul>
                                    <li
                                      className='cursor-pointer hover:bg-slate-200 py-1 px-5'
                                      onClick={() => edit(inno)}
                                    >
                                      Edit
                                    </li>
                                    <li
                                      className='cursor-pointer hover:bg-slate-200 py-1 px-5'
                                      onClick={() => toggleDelete()}
                                    >
                                      Delete
                                      <DeleteModal
                                        isShowing={deleteModal}
                                        hide={toggleDelete}
                                        deleteItem={() =>
                                          deletePublicationById(inno.id)
                                        }
                                      />
                                    </li>
                                  </ul>
                                </section>
                              ) : null}
                            </section>
                          </td>
                        )}
                        <div className='absolute top-0'>
                          <ModalInnovation
                            show={openModal}
                            setShow={toggleModal}
                            innovation={detailInnovation}
                            role={user?.role}
                          />
                        </div>
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
    </div>
  );
};
