import React, { useRef } from 'react';
import DropDown from '../../components/Dropdown';
import useModal from '../../hooks/useModal';
import generateYears from '../../utils/generateYears';
import filterActivities from '../../constant/filterActivities';
import { month } from '../../constant/month';
import ReactToPrint from 'react-to-print';

type Props = {
  activities: any;
  setFilterData: any;
  setFilterItem: any;
};

export const List = (props: Props) => {
  const { isShowing: openFilter, toggle: toggleFilter } = useModal();
  const { isShowing: openYear, toggle: toggleYear } = useModal();
  const { isShowing: openMonth, toggle: toggleMonth } = useModal();

  const years = generateYears();

  const tableRef = useRef<any>(null);

  return (
    <>
      <div className='flex justify-between my-5 '>
        <section className='flex w-[400px] justify-between '>
          <DropDown
            isOpen={openFilter}
            setIsOpen={toggleFilter}
            setFilterBy={props.setFilterItem}
            navdropArr={filterActivities}
            title='Filter By'
            icon='fa-solid fa-filter mr-3'
          />
          <DropDown
            isOpen={openYear}
            setIsOpen={toggleYear}
            setFilterBy={props.setFilterItem}
            navdropArr={years}
            title='year'
            icon='fa-solid fa-calendar mr-3'
          />

          <DropDown
            isOpen={openMonth}
            setIsOpen={toggleMonth}
            setFilterBy={props.setFilterItem}
            navdropArr={month}
            title='Month'
            icon='fa-solid fa-calendar mr-3'
          />
        </section>

        <ReactToPrint
          trigger={() => {
            return (
              <button className='text-white bg-orange-500 font-medium hover:bg-slate-100 hover:text-black px-3 py-2 rounded-md'>
                <i className='fa-solid fa-print mr-3' />
                Print
              </button>
            );
          }}
          content={() => tableRef.current}
          documentTitle='Events'
          pageStyle='print'
        />
      </div>
      <div className='rounded-t-lg bg-white'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className={'font-semibold text-lg '}>Events</h3>
            </div>
          </div>
        </div>

        <table
          className='items-center w-full bg-transparent border-collapse text-center '
          ref={tableRef}
        >
          <thead>
            <tr>
              {['Title', 'Date', 'Organizer', 'Venue'].map((item: any) => (
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  }
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='shadow-md last:rounded-b-lg'>
            {props.activities.map((item: any, index: number) => (
              <tr key={index}>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  <span className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'>
                    {item.title}
                  </span>
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  {item.start.split('-').reverse().join('/')}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  {item.organizer}
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  {item.venue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
